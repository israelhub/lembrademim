import { Module } from '@nestjs/common';
import { BiographyService } from './biography.service';
import { BiographyController } from './biography.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Biography } from './entities/biography.entity';

@Module({
  imports: [SequelizeModule.forFeature([Biography])],
  controllers: [BiographyController],
  providers: [BiographyService],
  exports: [BiographyService],
})
export class BiographyModule {}
