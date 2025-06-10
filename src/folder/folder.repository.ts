import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Folder } from './entities/folder.entity';

@Injectable()
export class FolderRepository {
  constructor(
    @InjectModel(Folder)
    private readonly folderModel: typeof Folder,
  ) {}
  create(createFolderDto: CreateFolderDto, userId: number) {
    return this.folderModel.create({ ...createFolderDto, userId: userId });
  }

  findAllByUser(userId: number) {
    return this.folderModel.findAll({ where: { userId: userId } });
  }

  findOne(folderId: number) {
    return this.folderModel.findByPk(folderId);
  }

  async update(folderId: number, updateFolderDto: UpdateFolderDto) {
    await this.folderModel.update(updateFolderDto, { where: { folderId } });

    return this.folderModel.findByPk(folderId);
  }

  remove(folderId: number) {
    return this.folderModel.destroy({ where: { folderId } });
  }
}
