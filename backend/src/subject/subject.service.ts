import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSubjectDto } from './dto/create-subject.dto.js';

@Injectable()
export class SubjectService {

    constructor(
        private prismaService: PrismaService,
    ) { }

    create(data: CreateSubjectDto) {
        return this.prismaService.subject.create({
            data: data,
        })
    }

    findByTeacher(userId: number) {
        return this.prismaService.subject.findMany({
            where: {
                teacher: {
                    userId
                },
            },
            include: {
                class: {
                    select: {
                        id: true,
                        name: true,
                        section: true,
                    },
                },
            },
        });
    }

    findByStudentClass(classId: number) {
        return this.prismaService.subject.findMany({
            where: {
                classId,
            },
            include: {
                teacher: {
                    select: {
                        user: {
                            select: { id: true, name: true }
                        },
                    },
                },
            },
        });
    }

}
