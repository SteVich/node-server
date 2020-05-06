import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne, JoinColumn
} from 'typeorm';
import {Subject} from "./subject";
import {Group} from "./group";

@Entity("User")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column()
    isActive: boolean;

    @Column({nullable:true})
    course: number

    @Column({nullable:true})
    specialty: string

    @Column({nullable:true})
    isTeacher: boolean;

    @Column({nullable:true})
    mark: number;

    @OneToMany(type => Subject, subject => subject.user,{ cascade: ["insert", "update"],
        eager:false})
    subjects: Subject[];

    @ManyToOne(type => Group, group => group.users )
    @JoinColumn({ name: "group_id" })
    group: Group;
}


