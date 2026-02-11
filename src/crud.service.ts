import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectLiteral } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

/**
 * Factory function to create a CRUD service for a given entity
 */
export function createCrudService<Entity extends ObjectLiteral>(
  entity: new () => Entity,
): new (repo: Repository<Entity>) => TypeOrmCrudService<Entity> {
  @Injectable()
  class CrudService extends TypeOrmCrudService<Entity> {
    constructor(@InjectRepository(entity) repo: Repository<Entity>) {
      super(repo);
    }
  }

  return CrudService as any;
}
