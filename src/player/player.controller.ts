import {
    Body, Controller, Delete, Get, Post, Put, Req, UseGuards,
} from '@nestjs/common';
import {
    ApiBasicAuth, ApiOperation,
} from '@nestjs/swagger/dist';
import { BasicAuthGuard } from 'src/auth/basic-auth.guard';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayerService } from './player.service';

@Controller('players')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) { }

    @ApiOperation({ summary: 'Create player' })
    @Post()
    register(@Body() playerDto: CreatePlayerDto) {
        return this.playerService.createPlayer(playerDto);
    }

    @ApiOperation({ summary: 'Get all players' })
    @ApiBasicAuth()
    @UseGuards(BasicAuthGuard)
    @Get()
    findAllPlayersByEmail() {
        return this.playerService.getAllPlayerByEmail();
    }

    @ApiOperation({ summary: 'Update player' })
    @ApiBasicAuth()
    @UseGuards(BasicAuthGuard)
    @Put()
    updatePlayer(@Body() playerDto: CreatePlayerDto, @Req() req) {
        return this.playerService.updatePlayer(playerDto, +req.player.id);
    }

    @ApiOperation({ summary: 'Delete player' })
    @ApiBasicAuth()
    @UseGuards(BasicAuthGuard)
    @Delete()
    deleteUser(@Req() req) {
        return this.playerService.deleteUser(+req.player.id);
    }
}
