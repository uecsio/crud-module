import { Injectable, Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectLiteral } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

/**
 * Type for the CRUD service constructor
 */
export type CrudServiceType<Entity extends ObjectLiteral> = Type<TypeOrmCrudService<Entity>>;

/**
 * Factory function to create a CRUD service for a given entity
 */
export function createCrudService<Entity extends ObjectLiteral>(
  entity: Type<Entity>,
): CrudServiceType<Entity> {
  @Injectable()
  class CrudService extends TypeOrmCrudService<Entity> {
    constructor(@InjectRepository(entity) repo: Repository<Entity>) {
      super(repo);
    }
  }

  return CrudService;
}
