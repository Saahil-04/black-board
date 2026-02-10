import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { MarkAttendanceDto } from './dto/mark-attendance.dto.js';
import { AttendanceStatus } from '../generated/prisma/enums.js';


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

    async getStudentOverallSummary(studentId: number, dateFilter?: { gte?: Date, lte?: Date }) {

        const where: any = { studentId }

        if (dateFilter) {
            where.date = dateFilter
        }

     

        const total = await this.prisma.attendance.count({ where });
        const present = await this.prisma.attendance.count({
            where: {
                ...where,
                status: 'PRESENT'
            },
        });

        return {
            totalClasses: total,
            presentClasses: present,
            percentage: total === 0 ? 0 : Math.round((present / total) * 100),
        }
    }

    async getStudentSubjectSummary(studentId: number, dateFilter?: { gte?: Date, lte?: Date }) {

        const where: any = { studentId }

        if (dateFilter) {
            where.date = dateFilter
        }



        const records = await this.prisma.attendance.groupBy({
            by: ['subjectId', 'status'],
            where,
            _count: {
                _all: true,
            },
        });

        const subjectMap = new Map<number, { present: number, total: number }>();

        for (const r of records) {
            const entry = subjectMap.get(r.subjectId) || { present: 0, total: 0 };

            entry.total += r._count._all;
            if (r.status === AttendanceStatus.PRESENT) {
                entry.present += r._count._all
            }
            subjectMap.set(r.subjectId, entry)

        }

        const subjectIds = [...subjectMap.keys()];

        const subjects = await this.prisma.subject.findMany({
            where: { id: { in: subjectIds } },
            select: { id: true, name: true }
        });

        return subjects.map((s) => {

            const data = subjectMap.get(s.id)
            return {
                subjectId: s.id,
                subjectName: s.name,
                presentClasses: data?.present ?? 0,
                totalClasses: data?.total ?? 0,
                percentage:
                    data?.total === 0
                        ? 0
                        : Math.round((data!.present / data!.total) * 100)
            };
        });
    }

    async getTeacherSubjectSummary(subjectId: number, dateFilter: { gte: Date, lte: Date }) {

        const where: any = { subjectId }

        if (dateFilter) {
            where.date = dateFilter
        }

        const records = await this.prisma.attendance.groupBy({
            by: ['studentId', 'status'],
            where,
            _count: {
                _all: true
            },
        });

        const studentMap = new Map<number, { present: number, total: number }>();

        for (const r of records) {
            const entry = studentMap.get(r.studentId) || { present: 0, total: 0 }

            entry.total += r._count._all
            if (r.status === AttendanceStatus.PRESENT) {
                entry.present += r._count._all
            }
            studentMap.set(r.studentId, entry)
        }

        const studentIds = [...studentMap.keys()]

        const students = await this.prisma.student.findMany({
            where: { id: { in: studentIds } },
            select: {
                id: true,
                user: {
                    select: {
                        id: true,
                        name: true
                    },
                },
            },
        });

        return students.map((s) => {
            const data = studentMap.get(s.id)
            return {
                studentId: s.id,
                studentName: s.user.name,
                totalClasses: data?.total ?? 0,
                presentClasses: data?.present ?? 0,
                percentage:
                    data?.total === 0
                        ? 0
                        : Math.round((data!.present / data!.total) * 100)

            }
        });
    }

}

