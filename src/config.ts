import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {User} from "./model/user";
import {Subject} from "./model/subject";
import {Group} from "./model/group";
import {Specialty} from "./model/specialty";

const typeOrmConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: "ec2-54-246-87-132.eu-west-1.compute.amazonaws.com",
    port: 5432,
    username: "zrhncsonbavazm",
    password: "b2d2b385d02e83bf524e2a5caf62a0d22555aaa0e60e84fd5f925e1f1244df78",
    database: "dapfabilptiap1",
    synchronize: true,
    logging: false,
    entities: [
        User,
        Subject,
        Group,
        Specialty
    ]
};

export { typeOrmConfig };
