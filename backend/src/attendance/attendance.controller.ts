import { Body, Controller, ForbiddenException, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SubjectService } from '../subject/subject.service.js';
import { StudentService } from '../student/student.service.js';
import { TeacherService } from '../teacher/teacher.service.js';
import type { RequestWithUser } from 'src/auth/types/request-with-user.type.js';
import { MarkAttendanceDto } from './dto/mark-attendance.dto.js';
import { Role } from '../generated/prisma/enums.js';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('attendance')
export class AttendanceController {

    constructor(
        private attendanceService: AttendanceService,
        private subjectService: SubjectService,
        private studentService: StudentService,
        private teacherService: TeacherService,
    ) { }

    @Post('mark')
    async markAttendance(
        @Request() req: RequestWithUser,
        @Body() dto: MarkAttendanceDto,
    ) {
        if (req.user.role !== Role.TEACHER) {
            throw new ForbiddenException()
        }

        const teacher = await this.teacherService.findByUserId(req.user.userId)

        const allowed = await this.subjectService.isTeacherofSubject(req.user.userId, dto.subjectId)

        if (!allowed) {
            throw new ForbiddenException('You are not assigned to this Subject')
        }

        return this.attendanceService.markAttendance(teacher!.id, dto)
    }

    @Get('me')
    async getMyAttendance(@Request() req: RequestWithUser) {
        if (req.user.role !== Role.STUDENT) {
            throw new ForbiddenException()
        }

        const student = await this.studentService.findByUserId(req.user.userId)

        return this, this.attendanceService.getMyAttendance(student!.id)
    }


    @Get('me/summary')
    async getMyAttendanceSummary(@Request() req: RequestWithUser) {
        if (req.user.role !== Role.STUDENT) {
            throw new ForbiddenException()
        }

        const student = await this.studentService.findByUserId(req.user.userId)

        return {
            overall: await this.attendanceService.getStudentOverallSummary(student!.id),
            subjects: await this.attendanceService.getStudentSubjectSummary(student!.id)
        };
    }

}
