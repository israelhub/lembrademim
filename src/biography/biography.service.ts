import { Injectable } from '@nestjs/common';
import { CreateBiographyDto } from './dto/create-biography.dto';
import { UpdateBiographyDto } from './dto/update-biography.dto';
import { BiographyRepository } from './biography.repository';

@Injectable()
export class BiographyService {
  constructor(private readonly biographyRepo: BiographyRepository) {}
  createBiography(createBiographyDto: CreateBiographyDto, userId: number) {
    return this.biographyRepo.create(createBiographyDto, userId);
  }

  getAllBiographyByUser(userId: number) {
    return this.biographyRepo.findAllByUser(userId);
  }

  async getBiography(id: number) {
    console.log(`BiographyService.getBiography chamado com id: ${id}`);
    const biography = await this.biographyRepo.findOne(id);
    console.log(`BiographyService.getBiography resultado:`, biography);
    return biography;
  }

  updateBiography(id: number, updateBiographyDto: UpdateBiographyDto) {
    return this.biographyRepo.update(id, updateBiographyDto);
  }

  deleteBiography(id: number) {
    return this.biographyRepo.remove(id);
  }

  searchBiographies(userId: number, search?: string, tag?: string) {
    return this.biographyRepo.findByNameOrTag(userId, search, tag);
  }
}
