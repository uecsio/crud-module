# Continuous Integration (CI) Documentation

This document describes the CI/CD pipelines configured for the NestJS CRUD Module.

## CI Workflows

### 1. Main CI Pipeline (`ci.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests targeting `main` or `develop`

**Jobs:**

#### Build & Test
- **Runs on:** Ubuntu Latest
- **Node versions:** 18.x, 20.x, 22.x (matrix)
- **Steps:**
  1. Checkout code
  2. Setup Node.js with caching
  3. Install dependencies (`npm ci`)
  4. Build TypeScript (`npm run build`)
  5. Run tests (`npm test`)
  6. Generate coverage report
  7. Upload coverage to Codecov (Node 20.x only)

#### Security Audit
- **Runs on:** Ubuntu Latest
- **Node version:** 20.x
- **Steps:**
  1. Run `npm audit` with moderate level
  2. Run `npm audit --production` with high level
  3. Fail if high-severity vulnerabilities in production dependencies

#### Lint & Type Check
- **Runs on:** Ubuntu Latest
- **Node version:** 20.x
- **Steps:**
  1. TypeScript type checking (`tsc --noEmit`)
  2. Prettier formatting check (if configured)

#### Coverage Check
- **Runs on:** Ubuntu Latest
- **Node version:** 20.x
- **Steps:**
  1. Generate coverage report
  2. Check against thresholds (80% minimum)
  3. Archive coverage artifacts (30-day retention)

### 2. Dependency Review (`dependency-review.yml`)

**Triggers:**
- Pull requests targeting `main`

**Purpose:**
- Reviews dependencies for security issues
- Checks for license compliance
- Blocks GPL-2.0 and GPL-3.0 licenses
- Fails on moderate or higher severity vulnerabilities

### 3. CodeQL Security Analysis (`codeql.yml`)

**Triggers:**
- Push to `main`
- Pull requests targeting `main`
- Weekly schedule (Monday at midnight)

**Purpose:**
- Static code analysis for security vulnerabilities
- Detects common security issues
- Analyzes JavaScript/TypeScript code
- Runs security and quality queries

### 4. NPM Publish (`publish.yml`)

**Triggers:**
- Release creation
- Manual workflow dispatch

**Purpose:**
- Publishes package to NPM registry
- Runs full test suite before publishing
- Requires NPM_TOKEN secret

**Steps:**
1. Run all tests
2. Build package
3. Publish to NPM with public access

### 5. Dependabot (`dependabot.yml`)

**Schedule:** Weekly on Monday

**Purpose:**
- Automatically updates dependencies
- Keeps GitHub Actions up to date
- Ignores major version updates for critical dependencies
- Auto-labels PRs as "dependencies"

## Required Secrets

Configure these in your GitHub repository settings:

### NPM_TOKEN
- **Required for:** Publishing to NPM
- **How to get:**
  1. Login to npmjs.com
  2. Go to Access Tokens
  3. Generate new token (Automation)
  4. Add to GitHub Secrets

### CODECOV_TOKEN
- **Required for:** Code coverage reporting
- **How to get:**
  1. Login to codecov.io
  2. Add your repository
  3. Copy the upload token
  4. Add to GitHub Secrets

## Status Badges

The following badges are displayed in the README:

- **CI Status:** Shows build/test status
- **Code Coverage:** Shows test coverage percentage
- **NPM Version:** Shows latest published version
- **License:** Shows MIT license

## Coverage Requirements

Minimum coverage thresholds (configured in `jest.config.js`):

- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

## Running CI Checks Locally

### Build Check
```bash
npm run build
```

### Test Check
```bash
npm test
npm run test:coverage
```

### Security Audit
```bash
npm audit
npm audit --production --audit-level=high
```

### Type Check
```bash
npx tsc --noEmit
```

### Format Check (if Prettier configured)
```bash
npx prettier --check "src/**/*.ts" "test/**/*.ts"
```

## Troubleshooting

### Build Failures

**Issue:** Build fails with TypeScript errors
```bash
# Fix: Check TypeScript compilation locally
npx tsc --noEmit
```

**Issue:** Node version incompatibility
```bash
# Fix: Test with specific Node version
nvm use 20
npm ci
npm run build
```

### Test Failures

**Issue:** Tests pass locally but fail in CI
```bash
# Fix: Use npm ci instead of npm install
npm ci
npm test
```

**Issue:** Coverage below threshold
```bash
# Fix: Add more tests or adjust thresholds
npm run test:coverage
```

### Security Audit Failures

**Issue:** Vulnerabilities detected
```bash
# Fix: Update vulnerable dependencies
npm audit fix

# Or update specific package
npm update package-name
```

**Issue:** No fix available
```bash
# Temporary: Add exception (not recommended)
# Long-term: Wait for fix or find alternative package
```

## Best Practices

1. **Always run tests locally** before pushing
2. **Check build status** before creating PR
3. **Keep dependencies updated** via Dependabot
4. **Review security alerts** promptly
5. **Maintain coverage** above thresholds
6. **Test on multiple Node versions** if making core changes

## Workflow Status

Check workflow status:
- GitHub Actions tab in repository
- Status checks on pull requests
- README badges

## Contributing

When contributing:
1. Ensure all CI checks pass
2. Add tests for new features
3. Update documentation
4. Follow pull request template

## Support

For CI issues:
1. Check workflow logs in GitHub Actions
2. Review this documentation
3. Open an issue with CI logs
