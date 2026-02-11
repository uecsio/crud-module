import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('test_users')
export class TestUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  age: number;
}
