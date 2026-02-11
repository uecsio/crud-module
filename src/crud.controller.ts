import { Controller, Type, UseGuards, UseFilters, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController, CrudOptions } from '@dataui/crud';
import { CrudModuleOptions } from './interfaces/crud-options.interface';

/**
 * Factory function to create a CRUD controller for a given entity
 */
export function createCrudController<Entity>(
  options: CrudModuleOptions<Entity>,
  service: any,
): Type<CrudController<Entity>> {
  // Build the @Crud() decorator options
  const crudOptions: CrudOptions = {
    model: {
      type: options.entity,
    },
    dto: {
      create: options.createDto,
      update: options.updateDto,
      replace: options.replaceDto,
    },
    routes: options.routes,
    ...options.crudOptions,
  };

  // Create the controller class
  @Crud(crudOptions)
  @Controller(options.path)
  class CrudControllerHost implements CrudController<Entity> {
    constructor(public service: any) {}
  }

  // Apply guards if provided
  if (options.guards && options.guards.length > 0) {
    UseGuards(...options.guards)(CrudControllerHost);
  }

  // Apply filters if provided
  if (options.filters && options.filters.length > 0) {
    UseFilters(...options.filters)(CrudControllerHost);
  }

  // Apply interceptors if provided
  if (options.interceptors && options.interceptors.length > 0) {
    UseInterceptors(...options.interceptors)(CrudControllerHost);
  }

  return CrudControllerHost;
}
