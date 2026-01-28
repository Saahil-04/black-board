import { Module } from '@nestjs/common';
import { ClassController } from './class.controller.js';
import { ClassService } from './class.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { TeacherService } from '../teacher/teacher.service.js';

@Module({
  imports:[PrismaModule],
  controllers: [ClassController],
  providers: [ClassService,TeacherService]
})
export class ClassModule {}
