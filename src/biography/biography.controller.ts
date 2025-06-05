import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BiographyService } from './biography.service';
import { CreateBiographyDto } from './dto/create-biography.dto';
import { UpdateBiographyDto } from './dto/update-biography.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('biography')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('biography')
export class BiographyController {
  constructor(private readonly biographyService: BiographyService) {}

  @ApiOperation({ summary: 'Cria uma biografia' })
  @Post()
  create(
    @Body() createBiographyDto: CreateBiographyDto,
    @CurrentUser() user: User,
  ) {
    return this.biographyService.createBiography(createBiographyDto, user.id);
  }

  @ApiOperation({ summary: 'Busca todas as biografias do usuário' })
  @Get()
  findAll(@CurrentUser() user: User) {
    return this.biographyService.getAllBiographyByUser(user.id);
  }

  @ApiOperation({ summary: 'Busca biografias por nome ou tag' })
  @Get('search')
  search(
    @CurrentUser() user: User,
    @Query('search') search?: string,
    @Query('tag') tag?: string,
  ) {
    return this.biographyService.searchBiographies(user.id, search, tag);
  }

  @ApiOperation({ summary: 'Busca uma biografia por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.biographyService.getBiography(+id);
  }

  @ApiOperation({ summary: 'Atualiza uma biografia' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBiographyDto: UpdateBiographyDto,
  ) {
    return this.biographyService.updateBiography(+id, updateBiographyDto);
  }

  @ApiOperation({ summary: 'Remove uma biografia' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.biographyService.deleteBiography(+id);
  }
}
