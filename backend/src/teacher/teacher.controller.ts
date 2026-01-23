import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import type { RequestWithUser } from '../auth/types/request-with-user.type.js';
import { TeacherService } from './teacher.service.js';


@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('teacher')
export class TeacherController {
    constructor(
        private teacherService: TeacherService,
    ) { }

    @Get('me')
    async getMyStudentProfile(@Request() req: RequestWithUser) {
        return this.teacherService.findByUserId(req.user.userId)
    }

}
