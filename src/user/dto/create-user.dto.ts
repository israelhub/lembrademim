import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  @Length(0, 200)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'joao@email.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'joao123@' })
  @IsString()
  @Length(6, 24)
  @IsNotEmpty()
  password: string;
}
