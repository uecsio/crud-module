# Test Suite

This package includes comprehensive tests for all modules and functionality.

## Test Coverage

```
--------------------|---------|----------|---------|---------|-------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------|---------|----------|---------|---------|-------------------
All files           |   97.72 |    84.61 |     100 |   97.61 |
 crud.controller.ts |   93.33 |    77.77 |     100 |   93.33 |
 crud.module.ts     |     100 |      100 |     100 |     100 |
 crud.service.ts    |     100 |      100 |     100 |     100 |
--------------------|---------|----------|---------|---------|-------------------
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Suites

### 1. `crud.service.spec.ts`
Tests for the CRUD service factory function.

**Coverage:**
- Service instance creation
- TypeOrmCrudService inheritance
- Repository access
- CRUD method availability
- Factory uniqueness

**Test Count:** 7 tests

### 2. `crud.controller.spec.ts`
Tests for the CRUD controller factory function.

**Coverage:**
- Controller class creation
- CrudController interface implementation
- Route path configuration
- DTO configuration (create, update, replace)
- Guards, filters, and interceptors application
- Custom CRUD options
- Route restrictions (only/exclude)
- Service injection

**Test Count:** 14 tests

### 3. `crud.module.spec.ts`
Tests for the dynamic CRUD module.

**Coverage:**
- Dynamic module creation (single)
- Dynamic module creation (multiple)
- TypeORM integration
- Controller and provider registration
- Service export
- Custom service support
- Empty array handling

**Test Count:** 13 tests

### 4. `integration.spec.ts`
Integration tests for the complete module functionality.

**Coverage:**
- Full configuration with all options
- Multiple module registration
- Custom service integration
- Route configuration
- CRUD options configuration
- Complex scenarios

**Test Count:** 8 tests

## Test Fixtures

Located in `test/fixtures/`:

- `test.entity.ts` - Sample TypeORM entity for testing
- `test.dto.ts` - Sample DTOs for create/update operations
- `test.guard.ts` - Sample guard implementation
- `test.filter.ts` - Sample exception filter implementation

## Configuration

Jest configuration is located in `jest.config.js`:

- **Test Environment:** Node
- **Test Pattern:** `**/*.spec.ts`
- **Coverage Threshold:** 80% for all metrics
- **Transform:** ts-jest for TypeScript support

## Continuous Integration

All tests must pass before merging or publishing:

```bash
npm test
```

Coverage reports are generated in the `coverage/` directory.
