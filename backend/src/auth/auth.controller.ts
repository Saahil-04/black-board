import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LocalAuthGuard } from './guards/local-auth.guard.js';
import { UserService } from '../user/user.service.js';
import { SignUpDto } from './dto/signup.dto.js';
import { ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { }
    @ApiBody({type:LoginDto})
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: any) {
        return this.authService.login(req.user)
    }

    @Post('signup')
    async signup(@Body() dto: SignUpDto) {
        return this.authService.signup(dto)
    }

}
