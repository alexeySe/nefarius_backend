import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PlayerController } from './player.controller';
import { Player } from './player.entity';
import { PlayerService } from './player.service';

@Module({
    controllers: [PlayerController],
    providers: [PlayerService],
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([Player]),
    ],

})
export class PlayerModule { }
