import {
    Controller, Post, UseGuards, Request, Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { BasicAuthGuard } from './basic-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @ApiBearerAuth()
    @UseGuards(BasicAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return req.user;
    }
}
