import { Type, CanActivate, ExceptionFilter, NestInterceptor } from '@nestjs/common';
import { CrudOptions } from '@dataui/crud';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { ObjectLiteral } from 'typeorm';
import { DtoType } from '../types/dto.type';
import { CrudRouteName } from '../types/crud-route-name.type';

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
   * Interceptors to apply to specific CRUD routes
   */
  interceptors?: Partial<Record<CrudRouteName, Array<Type<NestInterceptor>>>>;

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
