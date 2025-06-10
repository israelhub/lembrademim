import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max } from 'class-validator';

export class CreateFolderDto {
  @ApiProperty({ example: 'Familia' })
  @IsNotEmpty()
  @Max(25)
  name: string;
}
