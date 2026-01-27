import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TeacherService {

    constructor(
        private prisma: PrismaService,
    ) { }

    async findByUserId(userId: number) {

        return this.prisma.teacher.findUnique({
            where: { userId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                    },
                },
            },
        });
    }

    async findMyClasses(userId: number) {
        return this.prisma.teacher.findUnique({
            where: { userId },
            select: {
                id: true,
                classes: {
                    select: {
                        id: true,
                        name: true,
                        section: true,
                    },
                },
            },
        });
    }
}
