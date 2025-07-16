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
  async getAllBiographysByFolder(
    folderId: number,
    userId: number,
  ): Promise<Biography[]> {
    try {
      // Valida se a pasta existe e pertence ao usuário
      const folder = await this.folderService.getFolder(folderId);
      if (!folder || Number(folder.userId) !== Number(userId)) {
        throw new NotFoundException('Pasta não encontrada');
      }

      const biographyFolders =
        await this.biographyfolderRepo.findAllByFolder(folderId);

      console.log('BiographyFolders por pasta encontrados:', biographyFolders);

      if (!biographyFolders || biographyFolders.length === 0) {
        return [];
      }

      // Filtra apenas biografias que pertencem ao usuário usando o método auxiliar
      const biographies: Biography[] = [];

      for (const relation of biographyFolders) {
        const biography = relation.getBiography();

        // Se encontrou uma biografia e ela pertence ao usuário, adiciona ao array
        if (biography && Number(biography.userId) === Number(userId)) {
          biographies.push(biography);
        }
      }

      console.log(
        `Encontradas ${biographies.length} biografias para o usuário ${userId}`,
      );
      return biographies;
    } catch (error) {
      console.error('Erro ao buscar biografias da pasta:', error);
      throw error;
    }
  }

  /**
   * Obtém todas as pastas que contêm uma biografia específica
   */
  async getAllFoldersByBiography(
    biographyId: number,
    userId: number,
  ): Promise<Folder[]> {
    try {
      // Valida se a biografia existe e pertence ao usuário
      const biography = await this.biographyService.getBiography(biographyId);
      if (!biography || Number(biography.userId) !== Number(userId)) {
        throw new NotFoundException('Biografia não encontrada');
      }

      const biographyFolders =
        await this.biographyfolderRepo.findAllByBiography(biographyId);

      console.log(
        'BiographyFolders por biografia encontrados:',
        biographyFolders,
      );

      if (!biographyFolders || biographyFolders.length === 0) {
        return [];
      }

      // Filtra apenas pastas que pertencem ao usuário usando o método auxiliar
      const folders: Folder[] = [];

      for (const relation of biographyFolders) {
        const folder = relation.getFolder();

        // Se encontrou uma pasta e ela pertence ao usuário, adiciona ao array
        if (folder && Number(folder.userId) === Number(userId)) {
          folders.push(folder);
        }
      }

      console.log(
        `Encontradas ${folders.length} pastas para o usuário ${userId}`,
      );
      return folders;
    } catch (error) {
      console.error('Erro ao buscar pastas da biografia:', error);
      throw error;
    }
  }

  /**
   * Adiciona uma biografia a uma pasta
   */
  async addBiographyToFolder(
    createBiographyfolderDto: CreateBiographyfolderDto,
    userId: number,
  ): Promise<Biographyfolder> {
    // Valida se a biografia existe e pertence ao usuário
    console.log(
      `Buscando biografia com ID: ${createBiographyfolderDto.biographyId}`,
    );
    const biography = await this.biographyService.getBiography(
      createBiographyfolderDto.biographyId,
    );

    console.log('Biography found:', biography);
    console.log(
      `Comparando userId da biografia (${biography?.userId}) com userId do token (${userId})`,
    );

    if (!biography) {
      throw new NotFoundException('Biografia não encontrada - não existe');
    }

    // Convertendo para número para garantir a comparação correta
    if (Number(biography.userId) !== Number(userId)) {
      throw new NotFoundException(
        'Biografia não encontrada - não pertence ao usuário',
      );
    }

    // Valida se a pasta existe e pertence ao usuário
    console.log(`Buscando pasta com ID: ${createBiographyfolderDto.folderId}`);
    const folder = await this.folderService.getFolder(
      createBiographyfolderDto.folderId,
    );

    console.log('Folder found:', folder);
    console.log(
      `Comparando userId da pasta (${folder?.userId}) com userId do token (${userId})`,
    );

    if (!folder) {
      throw new NotFoundException('Pasta não encontrada - não existe');
    }

    // Convertendo para número para garantir a comparação correta
    if (Number(folder.userId) !== Number(userId)) {
      throw new NotFoundException(
        'Pasta não encontrada - não pertence ao usuário',
      );
    }

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
    userId: number,
  ): Promise<boolean> {
    // Valida se a biografia pertence ao usuário
    const biography = await this.biographyService.getBiography(biographyId);
    if (!biography || Number(biography.userId) !== Number(userId)) {
      throw new NotFoundException('Biografia não encontrada');
    }

    // Valida se a pasta pertence ao usuário
    const folder = await this.folderService.getFolder(folderId);
    if (!folder || Number(folder.userId) !== Number(userId)) {
      throw new NotFoundException('Pasta não encontrada');
    }

    return await this.biographyfolderRepo.remove(biographyId, folderId);
  }
}
