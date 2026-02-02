import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller.js';
import { AttendanceService } from './attendance.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { SubjectService } from '../subject/subject.service.js';
import { TeacherService } from '../teacher/teacher.service.js';
import { StudentService } from '../student/student.service.js';

@Module({
  imports: [PrismaModule],
  controllers: [AttendanceController],
  providers: [AttendanceService, SubjectService, TeacherService, StudentService]
})
export class AttendanceModule { }
