import { Injectable } from '@nestjs/common';
import { CreateBiographyDto } from './dto/create-biography.dto';
import { UpdateBiographyDto } from './dto/update-biography.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Biography } from './entities/biography.entity';
import { Op } from 'sequelize';

@Injectable()
export class BiographyRepository {
  constructor(
    @InjectModel(Biography)
    private readonly biographyModel: typeof Biography,
  ) {}

  create(createBiographyDto: CreateBiographyDto, userId: number) {
    return this.biographyModel.create({ ...createBiographyDto, userId });
  }

  findAllByUser(userId: number) {
    return this.biographyModel.findAll({ where: { userId } });
  }

  findOne(id: number) {
    return this.biographyModel.findByPk(id);
  }

  async update(id: number, updateBiographyDto: UpdateBiographyDto) {
    const [affectedCount] = await this.biographyModel.update(
      updateBiographyDto,
      { where: { id } },
    );

    if (affectedCount === 0) {
      return null;
    }

    return this.biographyModel.findByPk(id);
  }

  remove(id: number) {
    return this.biographyModel.destroy({ where: { id } });
  }

  findByNameOrTag(userId: number, search?: string, tag?: string) {
    const baseCondition = { userId };

    if (!search && !tag) {
      return this.biographyModel.findAll({
        where: baseCondition,
        order: [['name', 'ASC']],
      });
    }

    const conditions: any[] = [];

    if (search) {
      conditions.push({
        name: {
          [Op.iLike]: `%${search}%`,
        },
      });
    }

    if (tag) {
      conditions.push({
        tags: {
          [Op.contains]: [tag],
        },
      });
    }

    const whereCondition = {
      ...baseCondition,
      [Op.or]: conditions,
    };

    return this.biographyModel.findAll({
      where: whereCondition,
      order: [['name', 'ASC']],
    });
  }
}
