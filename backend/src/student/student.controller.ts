import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import type { RequestWithUser } from '../auth/types/request-with-user.type.js';
import { StudentService } from './student.service.js';
import { ClassService } from '../class/class.service.js';
import { SubjectService } from '../subject/subject.service.js';


@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('student')
export class StudentController {

    constructor(
        private studentService: StudentService,
        private classService: ClassService,
        private subjectService: SubjectService
    ) { }

    @Get('me')
    async getMyStudentProfile(@Request() req: RequestWithUser) {
        return this.studentService.findByUserId(req.user.userId)
    }

    @Get('me/class')
    async getMyClass(@Request() req: RequestWithUser) {
        return this.studentService.findMyClass(req.user.userId)
    }

    @Get('me/roster')
    async getMyClassRoster(@Request() req: RequestWithUser) {
        const classId = await this.studentService.getMyClassId(req.user.userId)

        if (!classId) {
            return {
                class: null,
                students: [],
                teachers: [],
            }
        }
        return this.classService.getStudentRoster(classId)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('me/subjects')
    async getMySubjects(@Request() req: RequestWithUser) {
        const classId = await this.studentService.getMyClassId(req.user.userId)

        if (!classId) {
            return []
        }

        return this.subjectService.findByStudentClass(classId)

    }


}
