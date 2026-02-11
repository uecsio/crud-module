import { DynamicModule, Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectLiteral } from 'typeorm';
import { CrudModuleOptions } from './interfaces/crud-options.interface';
import { createCrudService } from './crud.service';
import { createCrudController } from './crud.controller';

@Module({})
export class CrudModule {
  /**
   * Register a CRUD module for a specific entity
   * @param options Configuration options for the CRUD module
   * @returns DynamicModule
   */
  static register<Entity extends ObjectLiteral = any>(
    options: CrudModuleOptions<Entity>,
  ): DynamicModule {
    // Create or use provided service
    const ServiceClass = options.service || createCrudService(options.entity as new () => Entity);

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
  static registerMany(
    optionsArray: CrudModuleOptions[],
  ): DynamicModule {
    const controllers: Type<any>[] = [];
    const providers: Type<any>[] = [];
    const entities: Type<any>[] = [];

    for (const options of optionsArray) {
      // Create or use provided service
      const ServiceClass = options.service || createCrudService(options.entity as any);

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
