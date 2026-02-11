import { Injectable, Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectLiteral } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { CrudServiceType } from './types/crud-service.type';

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
