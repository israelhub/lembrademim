import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGoogleUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  picture?: string;
}
