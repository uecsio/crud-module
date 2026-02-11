import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { createCrudService } from '../src/crud.service';
import { TestUser } from './fixtures/test.entity';

describe('createCrudService', () => {
  let service: TypeOrmCrudService<TestUser>;
  let repository: Repository<TestUser>;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orWhere: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([]),
      getOne: jest.fn().mockResolvedValue(null),
      getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
    })),
    metadata: {
      columns: [],
      relations: [],
      connection: {
        options: {
          type: 'postgres',
        },
      },
    },
  };

  beforeEach(async () => {
    const CrudService = createCrudService(TestUser);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrudService,
        {
          provide: getRepositoryToken(TestUser),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TypeOrmCrudService<TestUser>>(CrudService);
    repository = module.get<Repository<TestUser>>(getRepositoryToken(TestUser));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a service instance', () => {
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(TypeOrmCrudService);
  });

  it('should extend TypeOrmCrudService', () => {
    expect(service).toBeInstanceOf(TypeOrmCrudService);
  });

  it('should have access to repository', () => {
    expect(service['repo']).toBe(repository);
  });

  it('should have all CRUD methods', () => {
    expect(service.getMany).toBeDefined();
    expect(service.getOne).toBeDefined();
    expect(service.createOne).toBeDefined();
    expect(service.createMany).toBeDefined();
    expect(service.updateOne).toBeDefined();
    expect(service.replaceOne).toBeDefined();
    expect(service.deleteOne).toBeDefined();
  });

  describe('Service factory', () => {
    it('should create unique service classes for different entities', () => {
      const ServiceA = createCrudService(TestUser);
      const ServiceB = createCrudService(TestUser);

      // Should create new class instances each time
      expect(ServiceA).not.toBe(ServiceB);
    });

    it('should return a class constructor', () => {
      const ServiceClass = createCrudService(TestUser);
      expect(typeof ServiceClass).toBe('function');
      expect(ServiceClass.prototype).toBeDefined();
    });
  });
});
