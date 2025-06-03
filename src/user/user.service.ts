import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { hash as bcryptHash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async registerUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepo.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email já cadastrado');
    }

    const hashedPassword = await bcryptHash(createUserDto.password, 10);
    return await this.userRepo.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  listUsers() {
    return this.userRepo.findAll();
  }

  getUser(id: number) {
    return this.userRepo.findById(id);
  }

  getUserByEmail(email: string) {
    return this.userRepo.findByEmail(email);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hashedPassword = await bcryptHash(updateUserDto.password, 10);
      updateUserDto = {
        ...updateUserDto,
        password: hashedPassword,
      };
    }
    return this.userRepo.update(id, updateUserDto);
  }

  deleteUser(id: number) {
    return this.userRepo.destroy(id);
  }
}
