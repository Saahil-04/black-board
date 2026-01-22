import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import type { RequestWithUser } from 'src/auth/types/request-with-user.type.js';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Get('me')
    async getMe(@Request() req: RequestWithUser) {
        return this.userService.findById(req.user.userId)
    }

}
