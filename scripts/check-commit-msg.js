#!/usr/bin/env node
/**
 * Validates commit messages follow Conventional Commits.
 * Called by Lefthook commit-msg hook.
 *
 * Usage: node scripts/check-commit-msg.js <commit-msg-file>
 */
const fs = require('fs')

const msgFile = process.argv[2]
if (!msgFile) {
  console.error('Usage: node scripts/check-commit-msg.js <commit-msg-file>')
  process.exit(1)
}

// Subject line only.
const subject = fs.readFileSync(msgFile, 'utf8').split('\n')[0].trim()

// Git's own default messages for merges and reverts are allowed through.
if (/^Merge (branch|remote-tracking branch|pull request) /.test(subject)) process.exit(0)
if (/^Revert ".+"$/.test(subject)) process.exit(0)

const pattern =
  /^(feat|fix|docs|style|refactor|test|chore|build|ci|perf|revert)(\([a-z0-9-]+\))?!?: \S.{0,99}$/

if (!pattern.test(subject)) {
  console.error('\n❌ Commit message does not follow Conventional Commits.\n')
  console.error('  Format: type(scope): description   (100 characters or fewer after the colon)')
  console.error('  Types:  feat | fix | docs | style | refactor | test | chore | build | ci | perf | revert')
  console.error('  Scope:  lower-case kebab-case, e.g. feat(auth): ...')
  console.error('  Breaking change: feat!: description')
  console.error('\n  Examples:')
  console.error('    feat: add invoice PDF export')
  console.error('    fix(auth): handle token expiry on refresh')
  console.error('    docs: update Firestore schema')
  console.error('    chore: upgrade firebase-admin to v13\n')
  process.exit(1)
}

process.exit(0)
