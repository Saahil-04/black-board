import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './user/user.module.js';
import { StudentModule } from './student/student.module.js';
import { TeacherModule } from './teacher/teacher.module.js';
import { ClassModule } from './class/class.module.js';
import { AdminController } from './admin/admin.controller.js';
import { AdminService } from './admin/admin.service.js';
import { AdminModule } from './admin/admin.module.js';
import { SubjectModule } from './subject/subject.module.js';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, StudentModule, TeacherModule, ClassModule, AdminModule, SubjectModule],
  controllers: [AppController, AdminController],
  providers: [AppService, AdminService],
})
export class AppModule {}
