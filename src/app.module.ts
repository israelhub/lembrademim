import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FolderModule } from './folder/folder.module';
import { UserModule } from './user/user.module';
import { BiographyModule } from './biography/biography.module';
import { BiographyfolderModule } from './biographyfolder/biographyfolder.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    FolderModule,
    UserModule,
    BiographyModule,
    BiographyfolderModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
