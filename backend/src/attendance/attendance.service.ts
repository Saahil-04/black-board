import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { MarkAttendanceDto } from './dto/mark-attendance.dto.js';

@Injectable()
export class AttendanceService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async markAttendance(teacherId: number, dto: MarkAttendanceDto) {

        const date = new Date(dto.date)

        const records = dto.records.map((r) => ({
            date,
            status: r.status,
            studentId: r.studentId,
            subjectId: dto.subjectId,
            teacherId,
        }));

        return this.prisma.attendance.createMany({
            data: records,
            skipDuplicates: true,
        });
    }

    async getMyAttendance(studentId: number) {
        return this.prisma.attendance.findMany({
            where: { studentId },
            include: {
                subject: {
                    select: { id: true, name: true }
                },
            },
            orderBy: { date: 'desc' }
        });
    }

}
