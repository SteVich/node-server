import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('Specialty')
export class Specialty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}
