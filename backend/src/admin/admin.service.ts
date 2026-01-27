import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AdminService {

    constructor(
        private prisma: PrismaService
    ) { }

    assignStudentToClass(studentId: number, classId: number) {
        return this.prisma.student.update({
            where: { id: studentId },
            data: { classId }
        });
    }

    assignTeacherToClass(teacherId: number, classId: number) {
        return this.prisma.teacher.update({
            where: { id: teacherId },
            data: {
                classes: {
                    connect: { id: classId }
                },
            },
            include: {
                classes: true,
            },
        });
    }

}
