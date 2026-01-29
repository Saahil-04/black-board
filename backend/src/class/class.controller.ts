import { Body, Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { ClassService } from './class.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Role } from '../generated/prisma/enums.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateClassDto } from './dto/create-class.dto.js';
import type { RequestWithUser } from 'src/auth/types/request-with-user.type.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { ClassAccessPolicy } from './policies/class-access.policy.js';


@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('class')
export class ClassController {

    constructor(
        private classService: ClassService,
        private classAccessPoilcy: ClassAccessPolicy
    ) { }

    @Roles(Role.ADMIN)
    @Get()
    async findAll() {
        return this.classService.findAll()
    }

    @Get(':id/roster')
    async getClassRoster(
        @Param('id', ParseIntPipe) id: number,
        @Request() req: RequestWithUser
    ) {
        await this.classAccessPoilcy.assertCanViewRoster(req.user, id)

        return this.classService.getClassRoster(id)
    }

    @Roles(Role.ADMIN)
    @Post()
    async create(@Body() dto: CreateClassDto) {
        return this.classService.create(dto)
    }



}
