import { Player } from 'src/player/player.entity';
import {
    Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable,
} from 'typeorm';

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({ unique: false, nullable: false })
        title: string;

    @Column({ nullable: true })
        password: string;

    @CreateDateColumn()
        createdAt: Date;

    @UpdateDateColumn()
        updatedAt: Date;

    @ManyToMany(() => Player)
    @JoinTable()
        players: Player[];
}
