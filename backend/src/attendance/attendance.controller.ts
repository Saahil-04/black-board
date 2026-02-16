import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, Post, Query, Request, UseGuards } from '@nestjs/common';
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

    private buildDateFilter(from?: string, to?: string) {
        if (!from && !to) return undefined

        const filter: any = {}

        if (from) {
            const fromDate = new Date(from);
            if (!isNaN(fromDate.getTime())) {
                filter.gte = fromDate;
            }
        }

        if (to) {
            const toDate = new Date(to)
            if (!isNaN(toDate.getTime())) {
                toDate.setHours(23, 59, 59, 999);
                filter.lte = toDate
            }
        }
        return Object.keys(filter).length ? filter : undefined
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
    async getMyAttendanceSummary(
        @Request() req: RequestWithUser,
        @Query('from') from?: string,
        @Query('to') to?: string,
    ) {



        if (req.user.role !== Role.STUDENT) {
            throw new ForbiddenException()
        }

        const student = await this.studentService.findByUserId(req.user.userId)

        const dateFilter = this.buildDateFilter(from, to)


        return {
            overall: await this.attendanceService.getStudentOverallSummary(student!.id, dateFilter),
            subjects: await this.attendanceService.getStudentSubjectSummary(student!.id, dateFilter)
        };
    }

    @Get('me/eligibility')
    async getMyEligibilty(
        @Request() req: RequestWithUser,
    ) {
        if (req.user.role !== Role.STUDENT) {
            throw new ForbiddenException()
        }

        const student = await this.studentService.findByUserId(req.user.userId)

        return this.attendanceService.getMyEligibilty(student!.id)
    }

    @Get('teacher/subject/:subjectId/summary')
    async getTeacherSubjectSummary(
        @Param('subjectId', ParseIntPipe) subjectId: number,
        @Request() req: RequestWithUser,
        @Query('from') from?: string,
        @Query('to') to?: string,
    ) {
        if (req.user.role !== Role.TEACHER) {
            throw new ForbiddenException()
        }

        await this.subjectService.isTeacherofSubject(req.user.userId, subjectId)

        const dateFilter = this.buildDateFilter(from, to)

        return this.attendanceService.getTeacherSubjectSummary(subjectId, dateFilter)

    }

    @Get('teacher/subject/:subjectId/eligibility')
    async getTeacherSubjectEligibility(
        @Param('subjectId', ParseIntPipe) subjectId: number,
        @Request() req: RequestWithUser
    ) {
        if (req.user.role !== Role.TEACHER) {
            throw new ForbiddenException()
        }

        await this.subjectService.isTeacherofSubject(req.user.userId, subjectId)

        return this.attendanceService.getTeacherSubjectEligibility(subjectId)

    }

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
}
