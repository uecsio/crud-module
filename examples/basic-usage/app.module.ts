import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudModule } from '@your-org/nestjs-crud-module';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Module({
  imports: [
    // Configure TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'crud_example',
      entities: [User],
      synchronize: true, // Don't use in production!
    }),

    // Register CRUD module for User entity
    CrudModule.register({
      entity: User,
      path: 'users',
      createDto: CreateUserDto,
      updateDto: UpdateUserDto,
    }),
  ],
})
export class AppModule {}
