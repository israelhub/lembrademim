import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create({ ...createUserDto });
  }

  findById(userId: number) {
    return this.userModel.findByPk(userId);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  findAll() {
    return this.userModel.findAll();
  }
  async update(userId: number, updateUserDto: UpdateUserDto) {
    await this.userModel.update(updateUserDto, { where: { id: userId } });

    return this.userModel.findByPk(userId);
  }
  remove(userId: number) {
    return this.userModel.destroy({ where: { id: userId } });
  }

  async setResetCode(userId: number, code: string, expiresAt: Date) {
    return await this.userModel.update(
      { resetCode: code, resetCodeExpiresAt: expiresAt },
      { where: { id: userId } },
    );
  }

  async findByResetCode(email: string, code: string) {
    return this.userModel.findOne({
      where: {
        email,
        resetCode: code,
        resetCodeExpiresAt: {
          [Op.gt]: new Date(),
        },
      },
    });
  }

  async clearResetCode(userId: number) {
    return await this.userModel.update(
      { resetCode: null, resetCodeExpiresAt: null },
      { where: { id: userId } },
    );
  }
}
