// Main module
export { CrudModule } from './crud.module';

// Interfaces and types
export {
  CrudModuleOptions,
  DtoType,
  CrudRouteName,
} from './interfaces/crud-options.interface';

// Factory functions and types
export { createCrudService, CrudServiceType } from './crud.service';
export { createCrudController } from './crud.controller';

// Re-export from @dataui/crud for convenience
export {
  Crud,
  CrudController,
  CrudRequest,
  CrudRequestInterceptor,
  CrudAuth,
  Override,
  ParsedRequest,
  ParsedBody,
  CreateManyDto,
} from '@dataui/crud';

export { TypeOrmCrudService } from '@dataui/crud-typeorm';
