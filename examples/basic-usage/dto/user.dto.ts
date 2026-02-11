import { IsString, IsEmail, IsNumber, IsBoolean, IsOptional, Min, Max } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  @Min(0)
  @Max(150)
  age: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNumber()
  @Min(0)
  @Max(150)
  @IsOptional()
  age?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
