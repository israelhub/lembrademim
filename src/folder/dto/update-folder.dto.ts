import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFolderDto } from './create-folder.dto';

export class UpdateFolderDto extends PartialType(CreateFolderDto) {
  @ApiProperty({
    example: 'Nova Família',
    description: 'Novo nome da pasta (opcional)',
    required: false,
    maxLength: 25,
  })
  name?: string;
}
