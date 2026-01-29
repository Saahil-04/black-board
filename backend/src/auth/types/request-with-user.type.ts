import { Request } from "express";
import { Role } from "../../generated/prisma/enums.js";

export interface RequestWithUser extends Request {
    user: {
        userId: number,
        role: Role,
    };
}