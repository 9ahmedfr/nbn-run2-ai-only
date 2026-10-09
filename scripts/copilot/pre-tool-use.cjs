#!/usr/bin/env node
"use strict";

// Deliberately narrow experiment guard, not a shell parser or security boundary.
// Remote pushes stay with the human, including pushes that implicitly target main.
const fs = require("node:fs");
function deny(reason) {
  return { permissionDecision: "deny", permissionDecisionReason: reason };
}
function decide(input) {
  if (!input || typeof input.toolName !== "string")
    return deny("Malformed hook input.");
  if (!["bash", "powershell"].includes(input.toolName)) return {};
  let args = input.toolArgs;
  if (typeof args === "string") {
    try {
      args = JSON.parse(args);
    } catch {
      return deny("Malformed shell tool arguments.");
    }
  }
  if (!args || typeof args.command !== "string")
    return deny("Shell command is missing.");
  // Conservative lexical check also catches quoted git, -C and chained commands.
  const command = args.command.replace(/["']/g, "");
  if (/\bgit\b[^\n;&|]*\bpush\b/i.test(command)) {
    return deny(
      "Remote git pushes require a human during the build experiment. Keep the change local and request review.",
    );
  }
  // Stop the agent skipping lefthook (commit-msg and pre-commit).
  if (
    /\bgit\b[^\n;&|]*\b(commit|merge|push)\b[^\n;&|]*(--no-verify|\s-n\b|\s-[a-z]*n[a-z]*\b)/i.test(
      command,
    )
  ) {
    return deny(
      "--no-verify skips the repository's git hooks. Fix the commit message or the lint error instead.",
    );
  }
  if (/\bcore\.hooksPath\b|\bLEFTHOOK=0\b/i.test(command)) {
    return deny("Changing or disabling git hooks is not allowed for the agent.");
  }
  return {}; // Preserve Copilot's normal permission checks; do not auto-allow tools.
}
module.exports = { decide };
if (require.main === module) {
  try {
    process.stdout.write(
      JSON.stringify(decide(JSON.parse(fs.readFileSync(0, "utf8")))) + "\n",
    );
  } catch {
    process.stdout.write(JSON.stringify(deny("Invalid hook JSON.")) + "\n");
  }
}
