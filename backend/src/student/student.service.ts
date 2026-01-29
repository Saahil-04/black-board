import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class StudentService {

    constructor(
        private prisma: PrismaService,
    ) { }

    async findByUserId(userId: number) {

        return this.prisma.student.findUnique({
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

    async findMyClass(userId: number) {
        return this.prisma.student.findUnique({
            where: { userId },
            select: {
                id: true,
                class: {
                    select: {
                        id: true,
                        name: true,
                        section: true,
                    }
                }
            }
        })
    }

    async getMyClassId(userId: number): Promise<number | null> {

        const student = await this.prisma.student.findUnique({
            where: { userId },
            select: { classId: true },
        });
        return student?.classId ?? null
    }

}
