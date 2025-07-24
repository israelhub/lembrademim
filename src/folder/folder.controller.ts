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
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('folder')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @ApiOperation({
    summary: 'Cria uma nova pasta',
    description:
      'Cria uma pasta para organizar biografias do usuário autenticado',
  })
  @ApiResponse({
    status: 201,
    description: 'Pasta criada com sucesso',
    example: {
      id: 1,
      name: 'Família',
      userId: 1,
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    example: {
      message: ['Nome da pasta é obrigatório'],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @Post()
  create(@Body() createFolderDto: CreateFolderDto, @CurrentUser() user: User) {
    return this.folderService.createFolder(createFolderDto, user.id);
  }

  @ApiOperation({
    summary: 'Lista todas as pastas do usuário',
    description: 'Retorna todas as pastas criadas pelo usuário autenticado',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de pastas retornada com sucesso',
    example: [
      {
        id: 1,
        name: 'Família',
        userId: 1,
      },
      {
        id: 2,
        name: 'Trabalho',
        userId: 1,
      },
    ],
  })
  @Get()
  findAll(@CurrentUser() user: User) {
    return this.folderService.listAllByUser(user.id);
  }

  @ApiOperation({
    summary: 'Busca uma pasta pelo ID',
    description: 'Retorna os dados de uma pasta específica pelo seu ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da pasta',
    example: 1,
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Pasta encontrada',
    example: {
      id: 1,
      name: 'Família',
      userId: 1,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Pasta não encontrada',
    example: {
      message: 'Pasta não encontrada',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.folderService.getFolder(id);
  }

  @ApiOperation({
    summary: 'Atualiza uma pasta pelo ID',
    description: 'Atualiza os dados de uma pasta existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da pasta a ser atualizada',
    example: 1,
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Pasta atualizada com sucesso',
    example: {
      id: 1,
      name: 'Família Atualizada',
      userId: 1,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Pasta não encontrada',
    example: {
      message: 'Pasta não encontrada',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFolderDto: UpdateFolderDto) {
    return this.folderService.updateFolder(id, updateFolderDto);
  }

  @ApiOperation({
    summary: 'Remove uma pasta pelo ID',
    description:
      'Exclui permanentemente uma pasta. Atenção: as biografias não serão excluídas, apenas a associação com a pasta.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da pasta a ser removida',
    example: 1,
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Pasta removida com sucesso',
    example: {
      message: 'Pasta removida com sucesso',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Pasta não encontrada',
    example: {
      message: 'Pasta não encontrada',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.folderService.deleteFolder(id);
  }
}
