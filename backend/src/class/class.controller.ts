import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { ClassService } from './class.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Role } from '../generated/prisma/enums.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateClassDto } from './dto/create-class.dto.js';
import type { RequestWithUser } from 'src/auth/types/request-with-user.type.js';
import { TeacherService } from '../teacher/teacher.service.js';


@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('class')
export class ClassController {

    constructor(
        private classService: ClassService,
        private teacherService: TeacherService,
    ) { }

    @Get()
    async findAll() {
        return this.classService.findAll()
    }

    @Get(':id/roster')
    async getClassRoster(
        @Param('id', ParseIntPipe) id: number,
        @Request() req: RequestWithUser
    ) {
        if (req.user.role === Role.ADMIN) {
            return this.classService.getClassRoster(id);
        }

        if (req.user.role === Role.TEACHER) {
            const allowed = await this.teacherService.isTeacherOfClass(
                req.user.userId,
                id,
            );

            if (!allowed) {
                throw new ForbiddenException();
            }

            return this.classService.getClassRoster(id);
        }

        throw new ForbiddenException();
    }

    @Post()
    async create(@Body() dto: CreateClassDto) {
        return this.classService.create(dto)
    }



}
