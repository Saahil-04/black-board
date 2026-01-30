import { Controller, Get, Post, UseGuards, Body, Request } from '@nestjs/common';
import { SubjectService } from './subject.service.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../generated/prisma/enums.js';
import { CreateSubjectDto } from './dto/create-subject.dto.js';
import type { RequestWithUser } from '../auth/types/request-with-user.type.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('subject')
export class SubjectController {

    constructor(
        private subjectService: SubjectService,
    ) { }
    @Roles(Role.ADMIN)
    @Post()
    create(@Body() dto: CreateSubjectDto) {
        return this.subjectService.create(dto)
    }

    @Roles(Role.TEACHER)
    @Get('me')
    getMySubjects(@Request() req: RequestWithUser) {
        return this.subjectService.findByTeacher(req.user.userId)
    }

}
