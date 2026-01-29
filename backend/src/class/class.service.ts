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

    async getClassRoster(classId: number) {
        return this.prisma.class.findUnique({
            where: { id: classId },
            select: {
                id: true,
                name: true,
                section: true,
                student: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
                teacher: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async getStudentRoster(classId: number) {
        return this.prisma.class.findUnique({
            where: { id: classId },
            select: {
                id: true,
                name: true,
                section: true,
                student: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
                teacher: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });
    }

}
