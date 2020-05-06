import {
    Column,
    Entity, JoinColumn, ManyToMany,
    ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import {User} from "./user";
import {Group} from "./group";

@Entity('Subject')
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => User, user => user.subjects, {eager: true})
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToMany(type => Group, group => group.subjects, {eager: true})
    groups: Group[];
}


