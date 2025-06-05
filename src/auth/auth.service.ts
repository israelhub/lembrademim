import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

interface GoogleUserData {
  email: string;
  name: string;
  picture: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credencias inválidas');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async validateGoogleUser(googleUser: GoogleUserData) {
    let user = await this.userService.getUserByEmail(googleUser.email);

    if (!user) {
      // Criar novo usuário se não existir
      user = await this.userService.registerGoogleUser({
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
      });
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async validateUser(userId: number) {
    return await this.userService.getUser(userId);
  }
}
