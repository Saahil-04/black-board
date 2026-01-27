import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";



export class CreateClassDto {

    @ApiProperty({ example: 'MCA 1st Year' })
    @IsString()
    name: string;


    @ApiProperty({ example: 'A', required: false })
    @IsOptional()
    @IsString()
    section?: string;

}