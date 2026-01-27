import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../generated/prisma/enums.js';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AssignStudentDto } from './dto/assign-student.dto.js';
import { AssignTeacherDto } from './dto/assign-teacher.dto.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
@Controller('admin')
export class AdminController {

    constructor(
        private adminService: AdminService
    ) { }
    @ApiOkResponse({ type: AssignStudentDto })
    @Post('assign-student')
    async assignStudent(@Body() dto: AssignStudentDto) {
        return this.adminService.assignStudentToClass(dto.studentId, dto.classId)
    }
    @ApiOkResponse({ type: AssignTeacherDto })
    @Post('assign-teacher')
    async assignTeacher(@Body() dto: AssignTeacherDto) {
        return this.adminService.assignTeacherToClass(dto.teacherId, dto.classId)
    }

}
