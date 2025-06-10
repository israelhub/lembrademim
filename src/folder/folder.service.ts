import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { FolderRepository } from './folder.repository';

@Injectable()
export class FolderService {
  constructor(private readonly folderRepo: FolderRepository) {}
  createFolder(createFolderDto: CreateFolderDto, userId: number) {
    return this.folderRepo.create(createFolderDto, userId);
  }

  listAllByUser(userId: number) {
    return this.folderRepo.findAllByUser(userId);
  }

  getFolder(folderId: number) {
    return this.folderRepo.findOne(folderId);
  }

  updateFolder(folderId: number, updateFolderDto: UpdateFolderDto) {
    return this.folderRepo.update(folderId, updateFolderDto);
  }

  deleteFolder(folderId: number) {
    return this.folderRepo.remove(folderId);
  }
}
