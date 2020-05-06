import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "./user";
import {Subject} from "./subject";

@Entity('Group')
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => User, user => user.group, {
        cascade: ["insert", "update"],
        eager: true
    })
    users: User[];

    @ManyToMany(type => Subject, subject => subject.groups, {
        cascade: ["insert", "update"]
    })
    @JoinTable()
    subjects: Subject[];
}
