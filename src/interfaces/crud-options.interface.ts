import { Type } from '@nestjs/common';
import { CrudOptions } from '@dataui/crud';

/**
 * Configuration options for CRUD module
 */
export interface CrudModuleOptions<Entity = any> {
  /**
   * TypeORM Entity class
   */
  entity: Type<Entity>;

  /**
   * DTO for creating entity
   */
  createDto?: Type<any>;

  /**
   * DTO for updating entity
   */
  updateDto?: Type<any>;

  /**
   * DTO for replacing entity
   */
  replaceDto?: Type<any>;

  /**
   * Guards to apply to CRUD controller
   */
  guards?: Array<Type<any>>;

  /**
   * Filters to apply to CRUD controller
   */
  filters?: Array<Type<any>>;

  /**
   * Interceptors to apply to CRUD controller
   */
  interceptors?: Array<Type<any>>;

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
  service?: Type<any>;

  /**
   * Enable/disable specific routes
   */
  routes?: {
    only?: Array<'getManyBase' | 'getOneBase' | 'createOneBase' | 'createManyBase' | 'updateOneBase' | 'replaceOneBase' | 'deleteOneBase'>;
    exclude?: Array<'getManyBase' | 'getOneBase' | 'createOneBase' | 'createManyBase' | 'updateOneBase' | 'replaceOneBase' | 'deleteOneBase'>;
  };
}
