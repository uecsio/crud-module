# Contributing to NestJS CRUD Module

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [CI/CD Pipeline](#cicd-pipeline)

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/nestjs-crud-module.git
   cd nestjs-crud-module
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Building

```bash
npm run build
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

## Pull Request Process

### Before Submitting

1. Ensure all tests pass:
   ```bash
   npm test
   ```

2. Verify build succeeds:
   ```bash
   npm run build
   ```

3. Check code quality:
   ```bash
   npm run lint
   ```

4. Update documentation if needed

5. Add tests for new features

### Submitting a PR

1. Push your changes to your fork
2. Create a pull request against `main` branch
3. Fill out the pull request template
4. Wait for CI checks to pass
5. Address any review comments

### PR Requirements

- ✅ All CI checks must pass
- ✅ Code coverage must remain above 80%
- ✅ No security vulnerabilities introduced
- ✅ Code follows project style guidelines
- ✅ Includes tests for new functionality
- ✅ Documentation updated if needed

## Coding Standards

### TypeScript

- Use TypeScript for all code
- No `any` types (use proper typing)
- Enable strict mode
- Use ESNext features appropriately

### File Organization

- One type/interface per file
- Use barrel exports (`index.ts`)
- Descriptive file names
- Separate interfaces and types

### Naming Conventions

```typescript
// Interfaces
export interface CrudModuleOptions { }

// Types
export type DtoType = ...

// Classes
export class CrudModule { }

// Functions
export function createCrudService() { }

// Constants
export const DEFAULT_LIMIT = 10;
```

### Documentation

- Add JSDoc comments for public APIs
- Include examples in documentation
- Update README for significant changes
- Keep CHANGELOG.md updated

## Testing Guidelines

### Test Structure

```typescript
describe('FeatureName', () => {
  describe('method or scenario', () => {
    it('should do something specific', () => {
      // Arrange
      const input = ...;

      // Act
      const result = ...;

      // Assert
      expect(result).toBe(...);
    });
  });
});
```

### Coverage Requirements

- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

### Test Types

1. **Unit Tests**: Test individual functions/classes
2. **Integration Tests**: Test module interactions
3. **E2E Tests**: Test complete workflows (if applicable)

### Writing Good Tests

- Use descriptive test names
- Test edge cases
- Mock external dependencies
- Keep tests focused and simple
- Avoid test interdependencies

## CI/CD Pipeline

All pull requests run through our CI pipeline:

### Build & Test
- Runs on Node 18.x, 20.x, 22.x
- Builds TypeScript
- Runs all tests
- Generates coverage report

### Security Audit
- Scans for vulnerabilities
- Checks dependency licenses
- Blocks moderate+ severity issues

### Code Quality
- Type checking
- Code formatting
- Static analysis (CodeQL)

### Coverage Check
- Enforces 80% minimum coverage
- Archives coverage reports

See [CI Documentation](.github/CI.md) for details.

## Commit Message Format

Use conventional commits:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

**Examples:**
```
feat(module): add support for custom interceptors

fix(controller): resolve guard application issue

docs(readme): update installation instructions

test(service): add tests for edge cases
```

## Release Process

Releases are managed by maintainers:

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create git tag
4. Push tag to trigger publish workflow
5. GitHub release created automatically

## Questions?

- Check existing issues
- Read [CI Documentation](.github/CI.md)
- Read [Structure Documentation](STRUCTURE.md)
- Open a discussion for questions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
