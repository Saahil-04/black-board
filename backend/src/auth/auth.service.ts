import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service.js';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup.dto.js';
import { Role } from '../generated/prisma/enums.js';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) { }

    async validate(email: string, password: string) {
        const user = await this.userService.findByEmail(email)
        if (!user) return null

        const match = await bcrypt.compare(password, user.password)
        if (!match) return null

        return user;
    }

    async login(user: any) {
        const payload = {
            sub: user.id,
            role: user.role
        }

        return {
            access_token: this.jwtService.sign(payload)
        }

    }

    async signup(dto: SignUpDto) {
        return this.userService.create_user({
            ...dto,
            role: dto.role ?? Role.STUDENT
        })
    }

}
