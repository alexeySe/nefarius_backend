import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/player/player.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { Game } from './game.entity';
import { GameService } from './game.service';
import { GameController } from './game.controller';

@Module({
    controllers: [GameController],
    providers: [GameService, AuthService],
    imports: [
        TypeOrmModule.forFeature([Game, Player]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: '24h' },
            }),
            inject: [ConfigService],
        }),
        AuthModule,
    ],
})
export class GameModule { }
