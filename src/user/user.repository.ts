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

  async update(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<[number, User]> {
    // Atualiza o usuário e obtém o número de registros afetados
    const [affectedCount, affectedRows] = (await this.userModel.update(
      updateUserDto,
      {
        where: { id: userId },
        returning: true,
      },
    )) as [number, User[]];

    // Obter o usuário atualizado
    const updatedUser = affectedRows[0] || (await this.findById(userId));

    // Retorna uma tupla com o número de registros afetados e o usuário atualizado
    return [affectedCount, updatedUser];
  }

  destroy(userId: number) {
    return this.userModel.destroy({ where: { id: userId } });
  }
}
