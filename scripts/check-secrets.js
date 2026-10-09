#!/usr/bin/env node
/**
 * Pre-commit secret scan. Runs gitleaks against the staged changes when it is
 * installed, so a leaked key is caught before the commit leaves the machine.
 * CI runs the same scanner on every pull request as the backstop.
 *
 * Install: winget install Gitleaks.Gitleaks (Windows) · brew install gitleaks (macOS)
 *          https://github.com/gitleaks/gitleaks#installing
 */
const { spawnSync } = require('child_process')

const probe = spawnSync('gitleaks', ['version'], { encoding: 'utf8' })
if (probe.error || probe.status !== 0) {
  console.warn(
    '\n⚠ gitleaks is not installed, so the staged changes were not scanned for secrets locally.\n' +
      '  CI still scans every pull request. Install it to catch leaks before they leave your machine:\n' +
      '    winget install Gitleaks.Gitleaks   (Windows)\n' +
      '    brew install gitleaks              (macOS)\n',
  )
  process.exit(0)
}

// `gitleaks git --staged` replaced `gitleaks protect --staged` in 8.19.
const [major = 0, minor = 0] = String(probe.stdout).trim().replace(/^v/, '').split('.').map(Number)
const args =
  major > 8 || (major === 8 && minor >= 19)
    ? ['git', '--pre-commit', '--staged', '--redact', '--no-banner']
    : ['protect', '--staged', '--redact', '--no-banner']

const scan = spawnSync('gitleaks', args, { stdio: 'inherit' })
if (scan.status !== 0) {
  console.error('\n❌ gitleaks found a possible secret in the staged changes. Remove it before committing.\n')
  process.exit(scan.status ?? 1)
}
process.exit(0)
