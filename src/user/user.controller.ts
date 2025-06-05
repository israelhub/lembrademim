import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/auth.decorator';

@UseGuards(AuthGuard)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @ApiOperation({ summary: 'Cria um  usuário' })
  @ApiResponse({ status: 201, description: 'Criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'Email já existe' })
  @Post()
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lista usuários' })
  @ApiResponse({ status: 200, description: 'Listado com sucesso' })
  @Get()
  listUsers() {
    return this.userService.listUsers();
  }

  @ApiBearerAuth()
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(+id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
}
