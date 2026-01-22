import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module.js';
import { LocalStrategy } from './local.strategy.js';
import { UserModule } from '../user/user.module.js';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: '1d' },
    }),
    PrismaModule,
    UserModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})

export class AuthModule { }
