import { Exclude } from 'class-transformer';
import {
    Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({ unique: true, nullable: false })
        email: string;

    @Exclude()
    @Column({ nullable: false })
        password: string;

    @Exclude()
    @CreateDateColumn()
        createdAt: Date;

    @Exclude()
    @UpdateDateColumn()
        updatedAt: Date;
}
