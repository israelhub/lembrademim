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
import { GoogleOAuthGuard } from './guards/google-auth.guard';

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

  @ApiOperation({ summary: 'Login do Usuario' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
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
