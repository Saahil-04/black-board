import { ForbiddenException, Injectable } from "@nestjs/common";
import { Role } from "../../generated/prisma/enums.js";
import { TeacherService } from "../../teacher/teacher.service.js";

@Injectable()
export class ClassAccessPolicy {

    constructor(
        private teacherService: TeacherService,
    ) { }

    async assertCanViewRoster(user: {
        userId: number, role: Role
    }, classId: number) {

        if (user.role === Role.ADMIN) {
            return;
        }

        if (user.role === Role.TEACHER) {
            const allowed = await this.teacherService.isTeacherOfClass(user.userId, classId)

            if (!allowed) {
                throw new ForbiddenException("You are not assigned to this class");
            }
            return;
        }
        throw new ForbiddenException("Access Denied!")
    }

}