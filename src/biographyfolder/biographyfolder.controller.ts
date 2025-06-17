import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BiographyfolderService } from './biographyfolder.service';
import { CreateBiographyfolderDto } from './dto/create-biographyfolder.dto';
import { RemoveBiographyfolderDto } from './dto/remove-biographyfolder.dto';

@Controller('biographyfolder')
export class BiographyfolderController {
  constructor(
    private readonly biographyfolderService: BiographyfolderService,
  ) {}

  @Get(':folderId')
  getAllBiographysByFolder(@Param('folderId') folderId: string) {
    return this.biographyfolderService.getAllBiographysByFolder(+folderId);
  }

  @Get(':biographyId')
  getAllFoldersByBiography(@Param('biographyId') biographyId: string) {
    return this.biographyfolderService.getAllFoldersByBiography(+biographyId);
  }

  @Post()
  addBiographyToFolder(
    @Body() createBiographyfolderDto: CreateBiographyfolderDto,
  ) {
    return this.biographyfolderService.addBiographyToFolder(
      createBiographyfolderDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') removeBiographyfolderDto: RemoveBiographyfolderDto) {
    return this.biographyfolderService.removeBiographyFromFolder(
      removeBiographyfolderDto.biographyId,
      removeBiographyfolderDto.folderId,
    );
  }
}
