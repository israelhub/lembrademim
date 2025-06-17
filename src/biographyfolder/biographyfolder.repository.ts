import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Biographyfolder } from './entities/biographyfolder.entity';
import { Biography } from 'src/biography/entities/biography.entity';
import { Folder } from 'src/folder/entities/folder.entity';

@Injectable()
export class BiographyfolderRepository {
  constructor(
    @InjectModel(Biographyfolder)
    private readonly biographyfolderModel: typeof Biographyfolder,
  ) {}

  /**
   * Busca todas as relações por folderId
   */
  async findAllByFolder(folderId: number): Promise<Biographyfolder[]> {
    return await this.biographyfolderModel.findAll({
      where: { folderId },
      include: [Biography],
    });
  }

  /**
   * Busca todas as relações por biographyId
   */
  async findAllByBiography(biographyId: number): Promise<Biographyfolder[]> {
    return await this.biographyfolderModel.findAll({
      where: { biographyId },
      include: [Folder],
    });
  }

  /**
   * Busca uma relação específica
   */
  async findOne(
    biographyId: number,
    folderId: number,
  ): Promise<Biographyfolder | null> {
    return await this.biographyfolderModel.findOne({
      where: { biographyId, folderId },
    });
  }

  /**
   * Cria uma nova relação
   */
  async create(
    biographyId: number,
    folderId: number,
  ): Promise<Biographyfolder> {
    return await this.biographyfolderModel.create({
      biographyId,
      folderId,
    });
  }

  /**
   * Remove uma relação específica
   */
  async remove(biographyId: number, folderId: number): Promise<boolean> {
    const relation = await this.findOne(biographyId, folderId);

    if (!relation) {
      throw new NotFoundException(
        `Relationship between Biography ${biographyId} and Folder ${folderId} not found`,
      );
    }

    await relation.destroy();
    return true;
  }
}
