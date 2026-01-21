import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module.js';
import { UserService } from '../user/user.service.js';
import { LocalStrategy } from './local.strategy.js';

@Module({
  imports:[JwtModule,PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, UserService,LocalStrategy]
})

export class AuthModule { }
