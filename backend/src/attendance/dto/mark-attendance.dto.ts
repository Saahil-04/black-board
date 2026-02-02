import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsEnum, IsInt } from "class-validator";

import { AttendanceStatus } from "../../generated/prisma/enums.js";


export class AttendanceEntryDto {
    @ApiProperty({ example: 5 })
    @IsInt()
    studentId: number;

    @ApiProperty({ enum: AttendanceStatus })
    @IsEnum(AttendanceStatus)
    status: 'PRESENT' | 'ABSENT'
}

export class MarkAttendanceDto {

    @ApiProperty({ example: 2 })
    @IsInt()
    subjectId: number;

    @ApiProperty({ example: '2026-01-01' })
    @IsDateString()
    date: string;

    @ApiProperty({ type: [AttendanceEntryDto] })
    @IsArray()
    records: AttendanceEntryDto[];
}