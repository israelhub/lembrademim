import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBiographyfolderDto {
  @IsNotEmpty({ message: 'Biography ID é obrigatório' })
  @IsNumber({}, { message: 'Biography ID deve ser um número' })
  biographyId: number;

  @IsNotEmpty({ message: 'Folder ID é obrigatório' })
  @IsNumber({}, { message: 'Folder ID deve ser um número' })
  folderId: number;
}