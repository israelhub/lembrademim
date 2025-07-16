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
    console.log(`Repository: buscando biografias da pasta ${folderId}`);

    // Buscar biografias diretamente
    const relations = await this.biographyfolderModel.findAll({
      where: { folderId },
      include: [
        {
          model: Biography,
          as: 'biography',
        },
      ],
      raw: false,
      nest: true,
    });

    console.log(
      `Repository: encontradas ${relations.length} relações para a pasta ${folderId}`,
    );

    // Adicionar debug para ver o que está em cada relação
    relations.forEach((relation, index) => {
      console.log(`Relação ${index + 1}:`, {
        id: relation.biographyId,
        biography: relation.biography ? 'presente' : 'ausente',
        biographyDataValues: relation.dataValues?.biography
          ? 'presente'
          : 'ausente',
      });
    });

    return relations;
  }

  /**
   * Busca todas as relações por biographyId
   */
  async findAllByBiography(biographyId: number): Promise<Biographyfolder[]> {
    console.log(`Repository: buscando pastas da biografia ${biographyId}`);

    // Buscar pastas diretamente
    const relations = await this.biographyfolderModel.findAll({
      where: { biographyId },
      include: [
        {
          model: Folder,
          as: 'folder',
        },
      ],
      raw: false,
      nest: true,
    });

    console.log(
      `Repository: encontradas ${relations.length} relações para a biografia ${biographyId}`,
    );

    // Adicionar debug para ver o que está em cada relação
    relations.forEach((relation, index) => {
      console.log(`Relação ${index + 1}:`, {
        id: relation.folderId,
        folder: relation.folder ? 'presente' : 'ausente',
        folderDataValues: relation.dataValues?.folder ? 'presente' : 'ausente',
      });
    });

    return relations;
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
