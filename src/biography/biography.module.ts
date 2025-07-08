import { Module } from '@nestjs/common';
import { BiographyService } from './biography.service';
import { BiographyController } from './biography.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Biography } from './entities/biography.entity';
import { BiographyRepository } from './biography.repository';

@Module({
  imports: [SequelizeModule.forFeature([Biography])],
  controllers: [BiographyController],
  providers: [BiographyService, BiographyRepository],
  exports: [BiographyService],
})
export class BiographyModule {}
