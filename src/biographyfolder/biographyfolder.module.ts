import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BiographyfolderService } from './biographyfolder.service';
import { BiographyfolderController } from './biographyfolder.controller';
import { BiographyfolderRepository } from './biographyfolder.repository';
import { Biographyfolder } from './entities/biographyfolder.entity';
import { Biography } from 'src/biography/entities/biography.entity';
import { Folder } from 'src/folder/entities/folder.entity';
import { BiographyModule } from 'src/biography/biography.module';
import { FolderModule } from 'src/folder/folder.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Biographyfolder, Biography, Folder]),
    BiographyModule,
    FolderModule,
  ],
  controllers: [BiographyfolderController],
  providers: [BiographyfolderService, BiographyfolderRepository],
})
export class BiographyfolderModule {}
