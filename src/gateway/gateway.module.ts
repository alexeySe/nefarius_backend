import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/player/player.entity';
import { Game } from 'src/game/game.entity';
import { GameGateway } from './gamegateway.gateway';

@Module({
    controllers: [],
    providers: [GameGateway],
    exports: [GameGateway],
    imports: [AuthModule,
        TypeOrmModule.forFeature([Game, Player]),
    ],

})
export class GatewayModule {}
