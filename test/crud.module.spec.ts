import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudModule } from '../src/crud.module';
import { TestUser } from './fixtures/test.entity';
import { CreateTestUserDto, UpdateTestUserDto } from './fixtures/test.dto';
import { TestGuard } from './fixtures/test.guard';
import { TestExceptionFilter } from './fixtures/test.filter';
import { CrudModuleOptions } from '../src/interfaces/crud-module-options.interface';

describe('CrudModule', () => {
  describe('register', () => {
    it('should return a DynamicModule', () => {
      const options: CrudModuleOptions<TestUser> = {
        entity: TestUser,
        path: 'users',
      };

      const result = CrudModule.register(options);

      expect(result).toBeDefined();
      expect(result.module).toBe(CrudModule);
      expect(result.imports).toBeDefined();
      expect(result.controllers).toBeDefined();
      expect(result.providers).toBeDefined();
      expect(result.exports).toBeDefined();
    });

    it('should include TypeOrmModule.forFeature with entity', () => {
      const options: CrudModuleOptions<TestUser> = {
        entity: TestUser,
        path: 'users',
      };

      const result = CrudModule.register(options);

      expect(result.imports).toHaveLength(1);
      expect(result.imports?.[0]).toBeDefined();
    });

    it('should create controller and provider', () => {
      const options: CrudModuleOptions<TestUser> = {
        entity: TestUser,
        path: 'users',
      };

      const result = CrudModule.register(options);

      expect(result.controllers).toHaveLength(1);
      expect(result.providers).toHaveLength(1);
      expect(result.exports).toHaveLength(1);
    });

    it('should work with all options', () => {
      const options: CrudModuleOptions<TestUser> = {
        entity: TestUser,
        path: 'users',
        createDto: CreateTestUserDto,
        updateDto: UpdateTestUserDto,
        guards: [TestGuard],
        filters: [TestExceptionFilter],
        crudOptions: {
          model: {
            type: TestUser,
          },
          query: {
            limit: 10,
          },
        },
        routes: {
          exclude: ['deleteOneBase'],
        },
      };

      const result = CrudModule.register(options);

      expect(result).toBeDefined();
      expect(result.controllers).toHaveLength(1);
      expect(result.providers).toHaveLength(1);
    });

    it('should use custom service when provided', () => {
      const mockServiceClass = jest.fn();

      const options: CrudModuleOptions<TestUser> = {
        entity: TestUser,
        path: 'users',
        service: mockServiceClass as any,
      };

      const result = CrudModule.register(options);

      expect(result.providers).toContain(mockServiceClass);
    });

    it('should export the service', () => {
      const options: CrudModuleOptions<TestUser> = {
        entity: TestUser,
        path: 'users',
      };

      const result = CrudModule.register(options);

      expect(result.exports).toHaveLength(1);
      expect(result.providers).toEqual(result.exports);
    });
  });

  describe('registerMany', () => {
    it('should return a DynamicModule with multiple controllers', () => {
      const optionsArray: CrudModuleOptions<TestUser>[] = [
        {
          entity: TestUser,
          path: 'users',
        },
        {
          entity: TestUser,
          path: 'admins',
        },
      ];

      const result = CrudModule.registerMany(optionsArray);

      expect(result).toBeDefined();
      expect(result.module).toBe(CrudModule);
      expect(result.controllers).toHaveLength(2);
      expect(result.providers).toHaveLength(2);
    });

    it('should include all entities in TypeOrmModule', () => {
      const optionsArray: CrudModuleOptions<TestUser>[] = [
        {
          entity: TestUser,
          path: 'users',
        },
        {
          entity: TestUser,
          path: 'admins',
        },
      ];

      const result = CrudModule.registerMany(optionsArray);

      expect(result.imports).toHaveLength(1);
    });

    it('should work with different configurations per entity', () => {
      const optionsArray: CrudModuleOptions<TestUser>[] = [
        {
          entity: TestUser,
          path: 'users',
          createDto: CreateTestUserDto,
          guards: [TestGuard],
        },
        {
          entity: TestUser,
          path: 'admins',
          routes: {
            exclude: ['deleteOneBase'],
          },
        },
      ];

      const result = CrudModule.registerMany(optionsArray);

      expect(result.controllers).toHaveLength(2);
      expect(result.providers).toHaveLength(2);
    });

    it('should export all services', () => {
      const optionsArray: CrudModuleOptions<TestUser>[] = [
        {
          entity: TestUser,
          path: 'users',
        },
        {
          entity: TestUser,
          path: 'admins',
        },
      ];

      const result = CrudModule.registerMany(optionsArray);

      expect(result.exports).toHaveLength(2);
      expect(result.exports).toEqual(result.providers);
    });

    it('should handle empty array', () => {
      const result = CrudModule.registerMany([]);

      expect(result).toBeDefined();
      expect(result.controllers).toHaveLength(0);
      expect(result.providers).toHaveLength(0);
      expect(result.exports).toHaveLength(0);
    });

    it('should handle single entity in array', () => {
      const optionsArray: CrudModuleOptions<TestUser>[] = [
        {
          entity: TestUser,
          path: 'users',
        },
      ];

      const result = CrudModule.registerMany(optionsArray);

      expect(result.controllers).toHaveLength(1);
      expect(result.providers).toHaveLength(1);
    });

    it('should support custom services in multiple registrations', () => {
      const mockServiceClass1 = jest.fn();
      const mockServiceClass2 = jest.fn();

      const optionsArray: CrudModuleOptions<TestUser>[] = [
        {
          entity: TestUser,
          path: 'users',
          service: mockServiceClass1 as any,
        },
        {
          entity: TestUser,
          path: 'admins',
          service: mockServiceClass2 as any,
        },
      ];

      const result = CrudModule.registerMany(optionsArray);

      expect(result.providers).toContain(mockServiceClass1);
      expect(result.providers).toContain(mockServiceClass2);
    });
  });

  describe('Integration', () => {
    it('should create a valid NestJS module structure', () => {
      const options: CrudModuleOptions<TestUser> = {
        entity: TestUser,
        path: 'users',
      };

      const moduleMetadata = CrudModule.register(options);

      // Verify all required DynamicModule properties
      expect(moduleMetadata.module).toBeDefined();
      expect(moduleMetadata.imports).toBeDefined();
      expect(moduleMetadata.controllers).toBeDefined();
      expect(moduleMetadata.providers).toBeDefined();
      expect(moduleMetadata.exports).toBeDefined();
    });
  });
});
