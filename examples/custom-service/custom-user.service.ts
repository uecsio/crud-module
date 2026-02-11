import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class CustomUserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }

  /**
   * Custom method to find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  /**
   * Override createOne to add custom validation
   */
  async createOne(req: any, dto: any): Promise<User> {
    // Check if email already exists
    const existingUser = await this.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    // Call parent implementation
    return super.createOne(req, dto);
  }

  /**
   * Custom method to activate/deactivate users
   */
  async toggleUserStatus(id: number): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    user.isActive = !user.isActive;
    return this.repo.save(user);
  }

  /**
   * Custom method to get active users count
   */
  async getActiveUsersCount(): Promise<number> {
    return this.repo.count({ where: { isActive: true } });
  }
}
