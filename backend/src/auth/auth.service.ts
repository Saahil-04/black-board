import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        jwt: JwtService,

    ) { }

    async validate(email: string, password: string) {

    }

}
