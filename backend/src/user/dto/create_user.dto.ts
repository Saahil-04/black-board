import { Role } from "src/generated/prisma/enums.js";

export class CreateUserDto {
    name: string;
    password: string;
    email: string;
    role: Role;
}