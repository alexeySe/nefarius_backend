import {
    Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Put, Req, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ApiBasicAuth } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/auth/basic-auth.guard';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game-dto';

@Controller('game')
export class GameController {
    constructor(
        private gameService: GameService,
        private authService: AuthService,
    ) { }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiBasicAuth()
    @UseGuards(BasicAuthGuard)
    async createGame(@Body() dto: CreateGameDto, @Req() req) {
        const game = await this.gameService.createGame(dto, +req.user.id);
        const token = await this.authService.generateToken(`${game.id}`, +req.user.id);
        return { game, token };
    }


    // проверять количество участников
    @Put(':roomId/join')
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiBasicAuth()
    @UseGuards(BasicAuthGuard)
    async joinGame(@Param('roomId') roomId: string, @Req() req) {
        const game = await this.gameService.joinGame(+roomId, +req.user.id);
        const token = await this.authService.generateToken(`${game.id}`, +req.user.id);
        return { game, token };
    }

    @Put(':roomId/leaveGame')
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiBasicAuth()
    @UseGuards(BasicAuthGuard)
    async leaveGame(@Param('roomId') roomId: string, @Req() req) {
        try {
            return await this.gameService.leaveGame(roomId, +req.user.id);
        } catch (e) {
            throw new Error();
        }
    }

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiBasicAuth()
    @UseGuards(BasicAuthGuard)
    async findAllGame() {
        return this.gameService.findAllGame();
    }

    @Get(':roomId')
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiBasicAuth()
    @UseGuards(BasicAuthGuard)
    async findOneGame(@Param('roomId') roomId: string) {
        return this.gameService.findOneGame(roomId);
    }
}
