import { DynamicModule, Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectLiteral } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { CrudController } from '@dataui/crud';
import { CrudModuleOptions } from './interfaces/crud-module-options.interface';
import { createCrudService } from './crud.service';
import { createCrudController } from './crud.controller';

@Module({})
export class CrudModule {
  /**
   * Register a CRUD module for a specific entity
   * @param options Configuration options for the CRUD module
   * @returns DynamicModule
   */
  static register<Entity extends ObjectLiteral>(
    options: CrudModuleOptions<Entity>,
  ): DynamicModule {
    // Create or use provided service
    const ServiceClass = options.service || createCrudService(options.entity);

    // Create controller with all configurations
    const ControllerClass = createCrudController(options, ServiceClass);

    return {
      module: CrudModule,
      imports: [TypeOrmModule.forFeature([options.entity])],
      controllers: [ControllerClass],
      providers: [ServiceClass],
      exports: [ServiceClass],
    };
  }

  /**
   * Register multiple CRUD modules at once
   * @param optionsArray Array of configuration options
   * @returns DynamicModule
   */
  static registerMany<Entity extends ObjectLiteral>(
    optionsArray: Array<CrudModuleOptions<Entity>>,
  ): DynamicModule {
    const controllers: Array<Type<CrudController<Entity>>> = [];
    const providers: Array<Type<TypeOrmCrudService<Entity>>> = [];
    const entities: Array<Type<Entity>> = [];

    for (const options of optionsArray) {
      // Create or use provided service
      const ServiceClass = options.service || createCrudService(options.entity);

      // Create controller with all configurations
      const ControllerClass = createCrudController(options, ServiceClass);

      controllers.push(ControllerClass);
      providers.push(ServiceClass);
      entities.push(options.entity);
    }

    return {
      module: CrudModule,
      imports: [TypeOrmModule.forFeature(entities)],
      controllers,
      providers,
      exports: providers,
    };
  }
}
