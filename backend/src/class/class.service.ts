import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateClassDto } from './dto/create-class.dto.js';

@Injectable()
export class ClassService {

    constructor(
        private prisma: PrismaService
    ) { }

    create(dto: CreateClassDto) {
        return this.prisma.class.create({ data: dto })
    }

    findAll() {
        return this.prisma.class.findMany()
    }

}
