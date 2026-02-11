import { IsString, IsEmail, IsNumber } from 'class-validator';

export class CreateTestUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  age: number;
}

export class UpdateTestUserDto {
  @IsString()
  name?: string;

  @IsEmail()
  email?: string;

  @IsNumber()
  age?: number;
}
