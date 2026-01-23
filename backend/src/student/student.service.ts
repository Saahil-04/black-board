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
                        name:true,
                        email: true,
                        role: true,
                    },
                },
            },
        });
    }

}
