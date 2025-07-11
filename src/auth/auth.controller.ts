import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RequestResetDto } from './dto/request-reset.dto';
import { ValidateCodeDto } from './dto/validate-code.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { GoogleOAuthGuard } from './guards/google-auth.guard';
import { Public } from './decorators/auth.decorator';

interface AuthenticatedRequest extends Request {
  user: {
    access_token: string;
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @ApiOperation({ summary: 'Login do Usuario' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @ApiOperation({ summary: 'Solicita reset de senha' })
  @ApiResponse({ status: 200, description: 'Código de reset enviado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @Post('request-reset')
  requestReset(@Body() requestResetDto: RequestResetDto) {
    return this.authService.requestReset(requestResetDto);
  }

  @Public()
  @ApiOperation({ summary: 'Valida código de reset' })
  @ApiResponse({ status: 200, description: 'Código válido' })
  @ApiResponse({ status: 400, description: 'Código inválido ou expirado' })
  @Post('validate-code')
  validateCode(@Body() validateCodeDto: ValidateCodeDto) {
    return this.authService.validateCode(validateCodeDto);
  }

  @Public()
  @ApiOperation({ summary: 'Realiza reset da senha' })
  @ApiResponse({ status: 200, description: 'Senha alterada com sucesso' })
  @ApiResponse({ status: 400, description: 'Código inválido ou expirado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @ApiOperation({ summary: 'Login com Google' })
  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {
    // Redireciona para o processo de autenticação do Google
  }

  @ApiOperation({ summary: 'Callback do Google OAuth' })
  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    const result = req.user;

    // Redireciona para o frontend com o token
    const redirectUrl = `http://localhost:3000/auth/success?token=${result.access_token}`;
    return res.redirect(redirectUrl);
  }
}
