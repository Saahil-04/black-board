import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ClassService } from './class.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../generated/prisma/enums.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateClassDto } from './dto/create-class.dto.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
@Controller('class')
export class ClassController {

    constructor(
        private classService: ClassService
    ) { }

    @Post()
    async create(@Body() dto: CreateClassDto) {
        return this.classService.create(dto)
    }

    @Get()
    async findAll() {
        return this.classService.findAll()
    }

}
