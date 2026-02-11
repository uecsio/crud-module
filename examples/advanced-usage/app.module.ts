import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudModule } from '@your-org/nestjs-crud-module';
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'crud_example',
      entities: [User, Product],
      synchronize: true,
    }),

    // Register multiple CRUD modules with different configurations
    CrudModule.registerMany([
      // Users endpoint with authentication
      {
        entity: User,
        path: 'users',
        createDto: CreateUserDto,
        updateDto: UpdateUserDto,
        guards: [JwtAuthGuard],
        crudOptions: {
          query: {
            limit: 20,
            maxLimit: 100,
            alwaysPaginate: true,
            sort: [{ field: 'createdAt', order: 'DESC' }],
          },
        },
      },

      // Products endpoint with limited routes
      {
        entity: Product,
        path: 'products',
        createDto: CreateProductDto,
        updateDto: UpdateProductDto,
        routes: {
          exclude: ['deleteOneBase'], // Prevent deletion via API
        },
        crudOptions: {
          query: {
            limit: 50,
            join: {
              category: { eager: true },
            },
          },
        },
      },
    ]),
  ],
})
export class AppModule {}
