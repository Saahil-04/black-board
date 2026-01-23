import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import type { RequestWithUser } from '../auth/types/request-with-user.type.js';
import { StudentService } from './student.service.js';


@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('student')
export class StudentController {

    constructor(
        private studentService: StudentService
    ) { }

    @Get('me')
    async getMyStudentProfile(@Request() req: RequestWithUser) {
        return this.studentService.findByUserId(req.user.userId)
    }

}
