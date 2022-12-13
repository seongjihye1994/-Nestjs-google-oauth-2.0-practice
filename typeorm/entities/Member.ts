import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Member {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    displayName: string;

    
}