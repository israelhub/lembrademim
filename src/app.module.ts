import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BiographyModule } from './biography/biography.module';
import { FolderModule } from './folder/folder.module';
import { BiographyfolderModule } from './biographyfolder/biographyfolder.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    DatabaseModule,
    AuthModule,
    BiographyModule,
    FolderModule,
    BiographyfolderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
