// Main module
export { CrudModule } from './crud.module';

// Interfaces
export * from './interfaces';

// Types
export * from './types';

// Factory functions
export { createCrudService } from './crud.service';
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
