import 'reflect-metadata';
import { CrudModule } from '../src/crud.module';
import { TestUser } from './fixtures/test.entity';
import { CreateTestUserDto, UpdateTestUserDto } from './fixtures/test.dto';
import { TestGuard } from './fixtures/test.guard';
import { TestExceptionFilter } from './fixtures/test.filter';

describe('CrudModule Integration', () => {
  it('should create a dynamic module configuration', () => {
    const dynamicModule = CrudModule.register({
      entity: TestUser,
      path: 'users',
      createDto: CreateTestUserDto,
      updateDto: UpdateTestUserDto,
      guards: [TestGuard],
    });

    expect(dynamicModule).toBeDefined();
    expect(dynamicModule.module).toBe(CrudModule);
    expect(dynamicModule.controllers).toHaveLength(1);
    expect(dynamicModule.providers).toHaveLength(1);
  });

  it('should work with all configuration options', () => {
    const dynamicModule = CrudModule.register({
      entity: TestUser,
      path: 'users',
      createDto: CreateTestUserDto,
      updateDto: UpdateTestUserDto,
      guards: [TestGuard],
      filters: [TestExceptionFilter],
      routes: {
        exclude: ['deleteOneBase'],
      },
      crudOptions: {
        model: {
          type: TestUser,
        },
        query: {
          limit: 50,
        },
      },
    });

    expect(dynamicModule).toBeDefined();
    expect(dynamicModule.controllers).toHaveLength(1);
    expect(dynamicModule.providers).toHaveLength(1);
    expect(dynamicModule.exports).toHaveLength(1);
  });

  describe('Multiple modules registration', () => {
    it('should register multiple CRUD modules', () => {
      const dynamicModule = CrudModule.registerMany([
        {
          entity: TestUser,
          path: 'users',
          createDto: CreateTestUserDto,
          updateDto: UpdateTestUserDto,
        },
        {
          entity: TestUser,
          path: 'admins',
          routes: {
            exclude: ['deleteOneBase'],
          },
        },
      ]);

      expect(dynamicModule).toBeDefined();
      expect(dynamicModule.controllers).toHaveLength(2);
      expect(dynamicModule.providers).toHaveLength(2);
      expect(dynamicModule.exports).toHaveLength(2);
    });

    it('should handle different configurations for each module', () => {
      const dynamicModule = CrudModule.registerMany([
        {
          entity: TestUser,
          path: 'users',
          guards: [TestGuard],
        },
        {
          entity: TestUser,
          path: 'admins',
          filters: [TestExceptionFilter],
        },
      ]);

      expect(dynamicModule.controllers).toHaveLength(2);
      expect(dynamicModule.providers).toHaveLength(2);
    });
  });

  describe('Custom service', () => {
    it('should accept custom service class', () => {
      const mockServiceClass = jest.fn() as any;

      const dynamicModule = CrudModule.register({
        entity: TestUser,
        path: 'custom-users',
        service: mockServiceClass,
      });

      expect(dynamicModule).toBeDefined();
      expect(dynamicModule.providers).toContain(mockServiceClass);
    });
  });

  describe('Route configuration', () => {
    it('should configure route restrictions', () => {
      const dynamicModule = CrudModule.register({
        entity: TestUser,
        path: 'restricted-users',
        routes: {
          only: ['getManyBase', 'getOneBase'],
        },
      });

      expect(dynamicModule).toBeDefined();
      expect(dynamicModule.controllers).toHaveLength(1);
    });

    it('should configure route exclusions', () => {
      const dynamicModule = CrudModule.register({
        entity: TestUser,
        path: 'safe-users',
        routes: {
          exclude: ['deleteOneBase'],
        },
      });

      expect(dynamicModule).toBeDefined();
      expect(dynamicModule.controllers).toHaveLength(1);
    });
  });

  describe('CRUD options', () => {
    it('should configure custom query options', () => {
      const dynamicModule = CrudModule.register({
        entity: TestUser,
        path: 'query-users',
        crudOptions: {
          model: {
            type: TestUser,
          },
          query: {
            limit: 50,
            maxLimit: 100,
            alwaysPaginate: true,
          },
        },
      });

      expect(dynamicModule).toBeDefined();
      expect(dynamicModule.controllers).toHaveLength(1);
    });

    it('should work with complex CRUD options', () => {
      const dynamicModule = CrudModule.register({
        entity: TestUser,
        path: 'complex-users',
        crudOptions: {
          model: {
            type: TestUser,
          },
          query: {
            limit: 25,
            maxLimit: 100,
            cache: 2000,
          },
          params: {
            id: {
              field: 'id',
              type: 'number',
              primary: true,
            },
          },
        },
      });

      expect(dynamicModule).toBeDefined();
      expect(dynamicModule.module).toBe(CrudModule);
    });
  });
});
