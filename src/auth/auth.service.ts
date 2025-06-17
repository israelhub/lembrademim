import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RequestResetDto } from './dto/request-reset.dto';
import { ValidateCodeDto } from './dto/validate-code.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { compare, hash as bcryptHash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as crypto from 'crypto';

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

  /**
   * Solicita reset de senha - gera código e salva no banco
   */
  async requestReset(requestResetDto: RequestResetDto) {
    const { email } = requestResetDto;
    
    // Verifica se o usuário existe
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Gera código de 6 dígitos
    const code = crypto.randomInt(100000, 999999).toString();
    
    // Define expiração em 15 minutos
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    // Salva o código no banco
    await this.userService.setResetCode(user.id, code, expiresAt);

    // TODO: Implementar envio de email com o código
    console.log(`Código de reset para ${email}: ${code}`);

    return {
      message: 'Código de reset enviado por email',
      // Em ambiente de desenvolvimento, retorna o código
      ...(process.env.NODE_ENV === 'development' && { code }),
    };
  }

  /**
   * Valida código de reset de senha
   */
  async validateCode(validateCodeDto: ValidateCodeDto) {
    const { email, code } = validateCodeDto;

    const user = await this.userService.findByResetCode(email, code);

    if (!user) {
      throw new BadRequestException('Código inválido ou expirado');
    }

    return {
      message: 'Código válido',
      valid: true,
    };
  }

  /**
   * Realiza o reset da senha
   */
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email, code, newPassword } = resetPasswordDto;

    // Verifica se o código é válido
    const user = await this.userService.findByResetCode(email, code);
    if (!user) {
      throw new BadRequestException('Código inválido ou expirado');
    }

    // Criptografa a nova senha
    const hashedPassword = await bcryptHash(newPassword, 10);

    // Atualiza a senha do usuário e limpa o código de reset
    await this.userService.updateUser(user.id, {
      password: hashedPassword,
    });

    // Limpa o código de reset
    await this.userService.clearResetCode(user.id);

    return {
      message: 'Senha alterada com sucesso',
    };
  }
}
