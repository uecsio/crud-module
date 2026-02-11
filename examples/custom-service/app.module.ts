import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudModule } from '@your-org/nestjs-crud-module';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { CustomUserService } from './custom-user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'crud_example',
      entities: [User],
      synchronize: true,
    }),

    // Use custom service with CRUD module
    CrudModule.register({
      entity: User,
      path: 'users',
      service: CustomUserService, // Use our custom service
      createDto: CreateUserDto,
      updateDto: UpdateUserDto,
    }),
  ],
})
export class AppModule {}
