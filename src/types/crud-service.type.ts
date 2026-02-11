import { Type } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { ObjectLiteral } from 'typeorm';

/**
 * Type for the CRUD service constructor
 */
export type CrudServiceType<Entity extends ObjectLiteral> = Type<TypeOrmCrudService<Entity>>;
