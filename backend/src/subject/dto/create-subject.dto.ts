import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateSubjectDto {
    @ApiProperty({ example: 'Mathematics' })
    @IsString()
    name: string;

    @ApiProperty({ example: 2 })
    @IsInt()
    classId: number;

    @ApiProperty({ example: 2 })
    @IsInt()
    teacherId: number;
}