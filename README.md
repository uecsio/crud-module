# NestJS CRUD Module

[![CI](https://github.com/your-org/nestjs-crud-module/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/nestjs-crud-module/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/your-org/nestjs-crud-module/branch/main/graph/badge.svg)](https://codecov.io/gh/your-org/nestjs-crud-module)
[![npm version](https://badge.fury.io/js/@your-org%2Fnestjs-crud-module.svg)](https://badge.fury.io/js/@your-org%2Fnestjs-crud-module)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A dynamic CRUD module for NestJS with TypeORM, based on [@dataui/crud](https://github.com/gid-oss/dataui-nestjs-crud). This package simplifies the creation of RESTful CRUD endpoints by providing a configurable module that accepts TypeORM entities, DTOs, guards, and filters.

## Features

- 🚀 Quick setup with minimal boilerplate
- 🔧 Configurable DTOs for create, update, and replace operations
- 🛡️ Support for guards, filters, and interceptors
- 📦 TypeORM integration out of the box
- 🎯 Based on the powerful @dataui/crud framework
- 🔄 Register single or multiple CRUD resources
- ✨ Full TypeScript support

## Installation

```bash
npm install @uecsio/nestjs-crud-module @dataui/crud @dataui/crud-typeorm @nestjs/typeorm typeorm class-validator class-transformer
```

## Quick Start

### 1. Define Your Entity

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  age: number;
}
```

### 2. Define Your DTOs

```typescript
import { IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  age: number;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNumber()
  @IsOptional()
  age?: number;
}
```

### 3. Register the CRUD Module

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudModule } from '@your-org/nestjs-crud-module';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // Your TypeORM configuration
    }),
    CrudModule.register({
      entity: User,
      path: 'users',
      createDto: CreateUserDto,
      updateDto: UpdateUserDto,
    }),
  ],
})
export class AppModule {}
```

That's it! You now have a fully functional CRUD API with the following endpoints:

- `GET /users` - Get all users (with filtering, sorting, pagination)
- `GET /users/:id` - Get a specific user
- `POST /users` - Create a new user
- `POST /users/bulk` - Create multiple users
- `PATCH /users/:id` - Update a user
- `PUT /users/:id` - Replace a user
- `DELETE /users/:id` - Delete a user

## Advanced Usage

### With Guards and Filters

```typescript
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { HttpExceptionFilter } from './filters/http-exception.filter';

CrudModule.register({
  entity: User,
  path: 'users',
  createDto: CreateUserDto,
  updateDto: UpdateUserDto,
  guards: [JwtAuthGuard],
  filters: [HttpExceptionFilter],
});
```

### With Custom CRUD Options

```typescript
CrudModule.register({
  entity: User,
  path: 'users',
  createDto: CreateUserDto,
  updateDto: UpdateUserDto,
  crudOptions: {
    query: {
      limit: 10,
      maxLimit: 100,
      alwaysPaginate: true,
      sort: [{ field: 'id', order: 'DESC' }],
      join: {
        profile: { eager: true },
        'profile.avatar': {},
      },
    },
    params: {
      id: {
        field: 'id',
        type: 'uuid',
        primary: true,
      },
    },
  },
});
```

### Limiting Routes

```typescript
// Only enable specific routes
CrudModule.register({
  entity: User,
  path: 'users',
  createDto: CreateUserDto,
  updateDto: UpdateUserDto,
  routes: {
    only: ['getManyBase', 'getOneBase', 'createOneBase'],
  },
});

// Or exclude specific routes
CrudModule.register({
  entity: User,
  path: 'users',
  createDto: CreateUserDto,
  updateDto: UpdateUserDto,
  routes: {
    exclude: ['deleteOneBase'],
  },
});
```

### Registering Multiple CRUD Resources

```typescript
import { Product } from './product.entity';
import { Category } from './category.entity';

@Module({
  imports: [
    CrudModule.registerMany([
      {
        entity: User,
        path: 'users',
        createDto: CreateUserDto,
        updateDto: UpdateUserDto,
        guards: [JwtAuthGuard],
      },
      {
        entity: Product,
        path: 'products',
        createDto: CreateProductDto,
        updateDto: UpdateProductDto,
      },
      {
        entity: Category,
        path: 'categories',
        createDto: CreateCategoryDto,
        updateDto: UpdateCategoryDto,
      },
    ]),
  ],
})
export class AppModule {}
```

### Custom Service

If you need custom business logic, you can extend the base service:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { User } from './user.entity';

@Injectable()
export class CustomUserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }

  // Add your custom methods
  async findByEmail(email: string): Promise<User> {
    return this.repo.findOne({ where: { email } });
  }
}

// Then use it in the module
CrudModule.register({
  entity: User,
  path: 'users',
  service: CustomUserService,
  createDto: CreateUserDto,
  updateDto: UpdateUserDto,
});
```

## Query Parameters

Thanks to @dataui/crud, you can use powerful query parameters:

### Filtering

```
GET /users?filter=age||$gt||18
GET /users?filter=name||$cont||John
GET /users?filter=email||$notnull
```

### Sorting

```
GET /users?sort=name,ASC
GET /users?sort=age,DESC&sort=name,ASC
```

### Pagination

```
GET /users?page=1&limit=10
GET /users?offset=20&limit=10
```

### Relations

```
GET /users?join=profile
GET /users?join=profile||email,avatar
```

### Field Selection

```
GET /users?fields=id,name,email
GET /users?fields=id,name&join=profile||email
```

## API Reference

### CrudModuleOptions

| Property       | Type           | Required | Description                                     |
| -------------- | -------------- | -------- | ----------------------------------------------- |
| `entity`       | `Type<Entity>` | Yes      | TypeORM entity class                            |
| `path`         | `string`       | Yes      | Controller route path                           |
| `createDto`    | `Type<any>`    | No       | DTO for create operations                       |
| `updateDto`    | `Type<any>`    | No       | DTO for update operations                       |
| `replaceDto`   | `Type<any>`    | No       | DTO for replace operations                      |
| `guards`       | `Type<any>[]`  | No       | Guards to apply to the controller               |
| `filters`      | `Type<any>[]`  | No       | Exception filters to apply                      |
| `interceptors` | `Type<any>[]`  | No       | Interceptors to apply                           |
| `service`      | `Type<any>`    | No       | Custom service (must extend TypeOrmCrudService) |
| `routes`       | `object`       | No       | Enable/disable specific routes                  |
| `crudOptions`  | `CrudOptions`  | No       | Additional @dataui/crud options                 |

## Testing

The package includes comprehensive tests with >97% coverage:

```bash
npm test                # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
```

See [test/README.md](test/README.md) for detailed testing documentation.

## License

MIT

## Credits

Built on top of [@dataui/crud](https://github.com/gid-oss/dataui-nestjs-crud) by the GID team.
