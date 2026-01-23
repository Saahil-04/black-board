import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../generated/prisma/enums.js";


export class UserProfileDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    name:string

    @ApiProperty()
    email: string;

    @ApiProperty()
    role: Role;

    @ApiProperty()
    createdAt: Date
}