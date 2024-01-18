import {
    Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({ unique: true, nullable: false })
        email: string;

    @Column({ nullable: false })
        password: string;

    @CreateDateColumn()
        createdAt: Date;

    @UpdateDateColumn()
        updatedAt: Date;
}
