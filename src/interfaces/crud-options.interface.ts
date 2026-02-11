import { Type, CanActivate, ExceptionFilter, NestInterceptor } from '@nestjs/common';
import { CrudOptions } from '@dataui/crud';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { ObjectLiteral } from 'typeorm';

/**
 * Base DTO type - any class with a constructor
 */
export type DtoType = new (...args: unknown[]) => object;

/**
 * Route names type for enabling/disabling routes
 */
export type CrudRouteName =
  | 'getManyBase'
  | 'getOneBase'
  | 'createOneBase'
  | 'createManyBase'
  | 'updateOneBase'
  | 'replaceOneBase'
  | 'deleteOneBase';

/**
 * Configuration options for CRUD module
 */
export interface CrudModuleOptions<Entity extends ObjectLiteral = ObjectLiteral> {
  /**
   * TypeORM Entity class
   */
  entity: Type<Entity>;

  /**
   * DTO for creating entity
   */
  createDto?: DtoType;

  /**
   * DTO for updating entity
   */
  updateDto?: DtoType;

  /**
   * DTO for replacing entity
   */
  replaceDto?: DtoType;

  /**
   * Guards to apply to CRUD controller
   */
  guards?: Array<Type<CanActivate>>;

  /**
   * Filters to apply to CRUD controller
   */
  filters?: Array<Type<ExceptionFilter>>;

  /**
   * Interceptors to apply to CRUD controller
   */
  interceptors?: Array<Type<NestInterceptor>>;

  /**
   * Controller route path
   */
  path: string;

  /**
   * Additional @dataui/crud options
   */
  crudOptions?: CrudOptions;

  /**
   * Custom service class (must extend TypeOrmCrudService)
   */
  service?: Type<TypeOrmCrudService<Entity>>;

  /**
   * Enable/disable specific routes
   */
  routes?: {
    only?: Array<CrudRouteName>;
    exclude?: Array<CrudRouteName>;
  };
}
