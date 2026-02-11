# Examples

This directory contains example usage patterns for the NestJS CRUD Module.

## Basic Usage

The `basic-usage` directory demonstrates the simplest way to get started:

- Single entity (User)
- Basic DTOs with validation
- Default CRUD configuration

**Files:**
- `app.module.ts` - Module registration
- `entities/user.entity.ts` - TypeORM entity
- `dto/user.dto.ts` - DTOs for create and update operations

## Advanced Usage

The `advanced-usage` directory shows more complex scenarios:

- Multiple entities (User and Product)
- Using `registerMany()` for bulk registration
- Guards for authentication
- Custom CRUD options (pagination, sorting, joins)
- Route restrictions (excluding delete endpoint)

**Files:**
- `app.module.ts` - Multiple CRUD modules with different configs
- `entities/product.entity.ts` - Entity with relationships
- `dto/product.dto.ts` - DTOs with complex validations

## Custom Service

The `custom-service` directory demonstrates extending the base service:

- Custom business logic methods
- Overriding default CRUD operations
- Adding validation to create operations
- Domain-specific methods

**Files:**
- `app.module.ts` - Using custom service
- `custom-user.service.ts` - Extended service with custom methods

## Running the Examples

1. Install dependencies:
```bash
npm install
```

2. Set up a PostgreSQL database:
```bash
createdb crud_example
```

3. Update database credentials in `app.module.ts` files

4. Copy the example files to your NestJS project and import the module

5. Run your NestJS application:
```bash
npm run start:dev
```

## Testing the API

Once running, you can test the endpoints:

### Create a user
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","age":30}'
```

### Get all users
```bash
curl http://localhost:3000/users
```

### Get users with filtering
```bash
curl "http://localhost:3000/users?filter=age||$gt||25"
```

### Get users with pagination
```bash
curl "http://localhost:3000/users?page=1&limit=10"
```

### Get a specific user
```bash
curl http://localhost:3000/users/1
```

### Update a user
```bash
curl -X PATCH http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"age":31}'
```

### Delete a user
```bash
curl -X DELETE http://localhost:3000/users/1
```

## Next Steps

- Add authentication with JWT guards
- Implement custom exception filters
- Add request interceptors for logging
- Configure query parameters and relations
- Extend services with custom business logic
