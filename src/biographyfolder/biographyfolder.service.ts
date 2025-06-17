import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBiographyfolderDto } from './dto/create-biographyfolder.dto';
import { BiographyfolderRepository } from './biographyfolder.repository';
import { BiographyService } from 'src/biography/biography.service';
import { FolderService } from 'src/folder/folder.service';
import { Biography } from 'src/biography/entities/biography.entity';
import { Folder } from 'src/folder/entities/folder.entity';
import { Biographyfolder } from './entities/biographyfolder.entity';

@Injectable()
export class BiographyfolderService {
  constructor(
    private readonly biographyfolderRepo: BiographyfolderRepository,
    private readonly biographyService: BiographyService,
    private readonly folderService: FolderService,
  ) {}

  /**
   * Obtém todas as biografias que estão em uma pasta específica
   */
  async getAllBiographysByFolder(folderId: number): Promise<Biography[]> {
    // Valida se a pasta existe usando o FolderService
    await this.folderService.getFolder(folderId);

    const biographyFolders =
      await this.biographyfolderRepo.findAllByFolder(folderId);
    return biographyFolders.map((bf) => bf.biography);
  }

  /**
   * Obtém todas as pastas que contêm uma biografia específica
   */
  async getAllFoldersByBiography(biographyId: number): Promise<Folder[]> {
    // Valida se a biografia existe usando o BiographyService
    await this.biographyService.getBiography(biographyId);

    const biographyFolders =
      await this.biographyfolderRepo.findAllByBiography(biographyId);
    return biographyFolders.map((bf) => bf.folder);
  }

  /**
   * Adiciona uma biografia a uma pasta
   */
  async addBiographyToFolder(
    createBiographyfolderDto: CreateBiographyfolderDto,
  ): Promise<Biographyfolder> {
    // Valida se a biografia existe
    await this.biographyService.getBiography(
      createBiographyfolderDto.biographyId,
    );

    // Valida se a pasta existe
    await this.folderService.getFolder(createBiographyfolderDto.folderId);

    // Verifica se a relação já existe
    const existingRelation = await this.biographyfolderRepo.findOne(
      createBiographyfolderDto.biographyId,
      createBiographyfolderDto.folderId,
    );
    if (existingRelation) {
      return existingRelation;
    }

    // Cria a nova relação
    return await this.biographyfolderRepo.create(
      createBiographyfolderDto.biographyId,
      createBiographyfolderDto.folderId,
    );
  }

  /**
   * Remove uma biografia de uma pasta
   */
  async removeBiographyFromFolder(
    biographyId: number,
    folderId: number,
  ): Promise<boolean> {
    return await this.biographyfolderRepo.remove(biographyId, folderId);
  }
}
