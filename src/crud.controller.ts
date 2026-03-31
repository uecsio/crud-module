import { Controller, Type, UseGuards, UseFilters, Inject } from '@nestjs/common';
import { Crud, CrudController, CrudOptions } from '@dataui/crud';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { ObjectLiteral } from 'typeorm';
import { CrudModuleOptions } from './interfaces/crud-module-options.interface';

/**
 * Factory function to create a CRUD controller for a given entity
 */
export function createCrudController<Entity extends ObjectLiteral>(
  options: CrudModuleOptions<Entity>,
  ServiceClass: Type<TypeOrmCrudService<Entity>>,
): Type<CrudController<Entity>> {
  // Build per-route interceptors config
  const routesWithInterceptors: Record<string, { interceptors: any[] }> = {};
  if (options.interceptors) {
    for (const [routeName, interceptors] of Object.entries(options.interceptors)) {
      if (interceptors && interceptors.length > 0) {
        routesWithInterceptors[routeName] = { interceptors };
      }
    }
  }

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
    routes: {
      ...options.routes,
      ...routesWithInterceptors,
    },
    ...options.crudOptions,
  };

  // Create the controller class
  @Crud(crudOptions)
  @Controller(options.path)
  class CrudControllerHost implements CrudController<Entity> {
    constructor(@Inject(ServiceClass) public service: TypeOrmCrudService<Entity>) {}
  }

  // Apply guards if provided
  if (options.guards && options.guards.length > 0) {
    UseGuards(...options.guards)(CrudControllerHost);
  }

  // Apply filters if provided
  if (options.filters && options.filters.length > 0) {
    UseFilters(...options.filters)(CrudControllerHost);
  }

  return CrudControllerHost;
}
