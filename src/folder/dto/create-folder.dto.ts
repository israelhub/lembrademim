import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateFolderDto {
  @ApiProperty({
    example: 'Família',
    description: 'Nome da pasta para organizar biografias',
    maxLength: 25,
  })
  @IsNotEmpty({ message: 'Nome da pasta é obrigatório' })
  @MaxLength(25, { message: 'Nome da pasta deve ter no máximo 25 caracteres' })
  name: string;
}
