import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy } from 'passport-http';
import { AuthService } from './auth.service';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(BasicStrategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(email: string, password: string) {
        const player = await this.authService.validatePlayer(email, password);
        if (!player) {
            throw new UnauthorizedException({ message: 'Incorrect email or password' });
        }
        return player;
    }
}
