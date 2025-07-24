import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BiographyfolderService } from './biographyfolder.service';
import { CreateBiographyfolderDto } from './dto/create-biographyfolder.dto';
import { RemoveBiographyfolderDto } from './dto/remove-biographyfolder.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('biographyfolder')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('biographyfolder')
export class BiographyfolderController {
  constructor(
    private readonly biographyfolderService: BiographyfolderService,
  ) {}

  @ApiOperation({ summary: 'Busca todas as biografias de uma pasta' })
  @Get('folder/:folderId')
  getAllBiographysByFolder(
    @Param('folderId') folderId: number,
    @CurrentUser() user: User,
  ) {
    return this.biographyfolderService.getAllBiographysByFolder(
      folderId,
      user.id,
    );
  }

  @ApiOperation({ summary: 'Busca todas as pastas de uma biografia' })
  @Get('biography/:biographyId')
  getAllFoldersByBiography(
    @Param('biographyId') biographyId: number,
    @CurrentUser() user: User,
  ) {
    return this.biographyfolderService.getAllFoldersByBiography(
      biographyId,
      user.id,
    );
  }

  @ApiOperation({ summary: 'Adiciona uma biografia a uma pasta' })
  @Post()
  addBiographyToFolder(
    @Body() createBiographyfolderDto: CreateBiographyfolderDto,
    @CurrentUser() user: User,
  ) {
    return this.biographyfolderService.addBiographyToFolder(
      createBiographyfolderDto,
      user.id,
    );
  }

  @ApiOperation({ summary: 'Remove uma biografia de uma pasta' })
  @Delete()
  remove(
    @Body() removeBiographyfolderDto: RemoveBiographyfolderDto,
    @CurrentUser() user: User,
  ) {
    return this.biographyfolderService.removeBiographyFromFolder(
      removeBiographyfolderDto.biographyId,
      removeBiographyfolderDto.folderId,
      user.id,
    );
  }
}
