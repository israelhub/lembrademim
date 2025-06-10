import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  create(@Body() createFolderDto: CreateFolderDto, @CurrentUser() user: User) {
    return this.folderService.createFolder(createFolderDto, user.id);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.folderService.listAllByUser(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.folderService.getFolder(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto) {
    return this.folderService.updateFolder(+id, updateFolderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.folderService.deleteFolder(+id);
  }
}
