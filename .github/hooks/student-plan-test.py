import json
import sys
import time

data = json.load(sys.stdin)

tool_input = data.get("tool_input", {})
command = tool_input.get("command", "")

if "COPILOT_HOOK_TIMEOUT_TEST" in command:
    time.sleep(3)
    sys.exit(0)

if "COPILOT_HOOK_TEST" in command:
    print(
        "Student plan PreToolUse hook blocked the command.",
        file=sys.stderr
    )
    sys.exit(2)

sys.exit(0)