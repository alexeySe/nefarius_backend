import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/player/player.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { BasicAuthStrategy } from './basic.strategy';

@Module({
    imports: [
        PassportModule,
        TypeOrmModule.forFeature([Player]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: '24h' },
            }),
            inject: [ConfigService],
        })],
    providers: [AuthService, JwtStrategy, LocalStrategy, BasicAuthStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
