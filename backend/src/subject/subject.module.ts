import { Module } from '@nestjs/common';
import { SubjectController } from './subject.controller.js';
import { SubjectService } from './subject.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [SubjectController],
  providers: [SubjectService]
})
export class SubjectModule { }
