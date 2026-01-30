import { Module } from '@nestjs/common';
import { StudentController } from './student.controller.js';
import { StudentService } from './student.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { ClassService } from '../class/class.service.js';
import { SubjectService } from '../subject/subject.service.js';

@Module({
  imports: [PrismaModule],
  controllers: [StudentController],
  providers: [StudentService, ClassService, SubjectService]
})
export class StudentModule { }
