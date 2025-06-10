import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable } from '@nestjs/common';

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

  async update(folderId: number, updateFolderDto: UpdateUserDto) {
    await this.userModel.update(updateFolderDto, { where: { folderId } });

    return this.userModel.findByPk(folderId);
  }

  remove(userId: number) {
    return this.userModel.destroy({ where: { id: userId } });
  }
}
