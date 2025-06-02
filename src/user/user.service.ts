import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { hash as bcryptHash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcryptHash(createUserDto.password, 10);

    return await this.userRepo.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  findAll() {
    return this.userRepo.findAll();
  }

  findOne(id: number) {
    return this.userRepo.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hashedPassword = await bcryptHash(updateUserDto.password, 10);
      updateUserDto = {
        ...updateUserDto,
        password: hashedPassword,
      };
    }
    return this.userRepo.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepo.destroy(id);
  }
}
