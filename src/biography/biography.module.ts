import { Module } from '@nestjs/common';
import { BiographyService } from './biography.service';
import { BiographyController } from './biography.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Biography } from './entities/biography.entity';
import { BiographyRepository } from './biography.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Biography]), AuthModule],
  controllers: [BiographyController],
  providers: [BiographyService, BiographyRepository],
  exports: [BiographyService],
})
export class BiographyModule {}
