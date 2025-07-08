import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Folder } from './entities/folder.entity';
import { FolderRepository } from './folder.repository';

@Module({
  imports: [SequelizeModule.forFeature([Folder])],
  controllers: [FolderController],
  providers: [FolderService, FolderRepository],
  exports: [FolderService],
})
export class FolderModule {}
