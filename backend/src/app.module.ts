import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './user/user.module.js';
import { StudentModule } from './student/student.module.js';
import { TeacherModule } from './teacher/teacher.module.js';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, StudentModule, TeacherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
