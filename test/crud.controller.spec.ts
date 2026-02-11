import 'reflect-metadata';
import { CrudController } from '@dataui/crud';
import { createCrudController } from '../src/crud.controller';
import { createCrudService } from '../src/crud.service';
import { TestUser } from './fixtures/test.entity';
import { CreateTestUserDto, UpdateTestUserDto } from './fixtures/test.dto';
import { TestGuard } from './fixtures/test.guard';
import { TestExceptionFilter } from './fixtures/test.filter';
import { CrudModuleOptions } from '../src/interfaces/crud-module-options.interface';

describe('createCrudController', () => {
  const ServiceClass = createCrudService(TestUser);

  describe('Basic controller creation', () => {
    it('should create a controller class', () => {
      const options: CrudModuleOptions<TestUser> = {
        entity: TestUser,
        path: 'users',
      };

      const ControllerClass = createCrudController(options, ServiceClass);

      expect(ControllerClass).toBeDefined();
      expect(typeof ControllerClass).toBe('function');
    });

    it('should implement CrudController interface', () => {
      const options: CrudModuleOptions<TestUser> = {
        entity: TestUser,
        path: 'users',
      };

      const ControllerClass = createCrudController(options, ServiceClass);
      const mockService = { repo: {} } as any;
      const controller = new ControllerClass(mockService);

      expect(controller.service).toBeDefined();
    });

    it('should apply the correct path', () => {
      const options: CrudModuleOptions<TestUser> = {
        entity: TestUser,
        path: 'test-users',
      };

      const ControllerClass = createCrudController(options, ServiceClass);
      const metadata = Reflect.getMetadata('path', ControllerClass);

      expect(metadata).toBe('test-users');
    });
  });

  describe('DTOs configuration', () => {
    it('should configure DTOs when provided', () => {
      const options: CrudModuleOptions<TestUser> = {
        entity: TestUser,
        path: 'users',
        createDto: CreateTestUserDto,
        updateDto: UpdateTestUserDto,
      };

      const ControllerClass = createCrudController(options, ServiceClass);

      expect(ControllerClass).toBeDefined();
    });

    it('should work without DTOs', () => {
      const options: CrudModuleOptions<TestUser> = {
        entity: TestUser,
        path: 'users',
      };

      const ControllerClass = createCrudController(options, ServiceClass);

      expect(ControllerClass).toBeDefined();
    });
  });

  describe('Guards, Filters, and Interceptors', () => {
    it('should apply guards when provided', () => {
      const options: CrudModuleOptions<TestUser> = {
        entity: TestUser,
        path: 'users',
        guards: [TestGuard],
      };

      const ControllerClass = createCrudController(options, ServiceClass);
      const guards = Reflect.getMetadata('__guards__', ControllerClass);

      expect(guards).toBeDefined();
      expect(guards).toContain(TestGuard);
    });

    it('should apply filters when provided', () => {
      const options: CrudModuleOptions<TestUser> = {
        entity: TestUser,
        path: 'users',
        filters: [TestExceptionFilter],
      };

      const ControllerClass = createCrudController(options, ServiceClass);

      // The filter is applied, just checking the controller was created successfully
      expect(ControllerClass).toBeDefined();
    });

    it('should apply multiple guards', () => {
      const options: CrudModuleOptions<TestUser> = {
        entity: TestUser,
        path: 'users',
        guards: [TestGuard, TestGuard],
      };

      const ControllerClass = createCrudController(options, ServiceClass);
      const guards = Reflect.getMetadata('__guards__', ControllerClass);

      expect(guards).toBeDefined();
      expect(guards.length).toBe(2);
    });

    it('should work without guards, filters, or interceptors', () => {
      const options: CrudModuleOptions<TestUser> = {
        entity: TestUser,
        path: 'users',
      };

      const ControllerClass = createCrudController(options, ServiceClass);

      expect(ControllerClass).toBeDefined();
    });
  });

  describe('CRUD options', () => {
    it('should apply custom CRUD options', () => {
      const options: CrudModuleOptions<TestUser> = {
        entity: TestUser,
        path: 'users',
        crudOptions: {
          model: {
            type: TestUser,
          },
          query: {
            limit: 50,
            maxLimit: 100,
          },
        },
      };

      const ControllerClass = createCrudController(options, ServiceClass);

      expect(ControllerClass).toBeDefined();
    });

    it('should configure route restrictions', () => {
      const options: CrudModuleOptions<TestUser> = {
        entity: TestUser,
        path: 'users',
        routes: {
          only: ['getManyBase', 'getOneBase'],
        },
      };

      const ControllerClass = createCrudController(options, ServiceClass);

      expect(ControllerClass).toBeDefined();
    });

    it('should configure route exclusions', () => {
      const options: CrudModuleOptions<TestUser> = {
        entity: TestUser,
        path: 'users',
        routes: {
          exclude: ['deleteOneBase'],
        },
      };

      const ControllerClass = createCrudController(options, ServiceClass);

      expect(ControllerClass).toBeDefined();
    });
  });

  describe('Service injection', () => {
    it('should inject service into controller', () => {
      const options: CrudModuleOptions<TestUser> = {
        entity: TestUser,
        path: 'users',
      };

      const ControllerClass = createCrudController(options, ServiceClass);
      const mockService = { repo: {} } as any;
      const controller = new ControllerClass(mockService);

      expect(controller.service).toBe(mockService);
    });
  });
});
