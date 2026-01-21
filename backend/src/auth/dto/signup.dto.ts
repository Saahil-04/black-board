import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../../generated/prisma/enums.js';

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'John Doe' })
    name: string;

    @IsEmail()
    @ApiProperty({ example: 'test@example.com' })
    email: string;

    @IsString()
    @MinLength(8)
    @ApiProperty({ example: 'password123' })
    password: string;

    @IsOptional()
    @IsEnum(Role)
    @ApiProperty({ enum: Role, default: Role.STUDENT })
    role?: Role;
}
