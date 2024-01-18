import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
    @ApiProperty({ example: 'example@mail.com', description: 'Уникальный email' })
    readonly email: string;

    @ApiProperty({ example: '12345678', description: 'Пароль пользователя' })
    readonly password: string;
}
