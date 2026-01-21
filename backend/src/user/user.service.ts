import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from './dto/create_user.dto.js';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

    constructor(
        private prisma: PrismaService,
    ) { }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email: email
            },
        })
    }

    async create_user(data: CreateUserDto) {

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: data.role
            },
        });

        if (data.role === 'STUDENT') {
            await this.prisma.student.create({
                data: {
                    userId: user.id,
                }
            });
        }
        return user
    }
}
