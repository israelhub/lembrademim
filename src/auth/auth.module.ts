import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './guards/jwt-auth.guard';
import { UserModule } from 'src/user/user.module';
import { GoogleOAuthGuard } from './guards/google-auth.guard';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, GoogleOAuthGuard, GoogleStrategy],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
