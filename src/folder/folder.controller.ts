import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('folder')
@UseGuards(AuthGuard)
@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @ApiOperation({ summary: 'Cria uma pasta' })
  @Post()
  create(@Body() createFolderDto: CreateFolderDto, @CurrentUser() user: User) {
    return this.folderService.createFolder(createFolderDto, user.id);
  }

  @ApiOperation({ summary: 'Lista todas as pastas do usuário' })
  @Get()
  findAll(@CurrentUser() user: User) {
    return this.folderService.listAllByUser(user.id);
  }

  @ApiOperation({ summary: 'Busca uma pasta pelo ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.folderService.getFolder(+id);
  }

  @ApiOperation({ summary: 'Atualiza uma pasta pelo ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto) {
    return this.folderService.updateFolder(+id, updateFolderDto);
  }

  @ApiOperation({ summary: 'Remove uma pasta pelo ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.folderService.deleteFolder(+id);
  }
}
