import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {User} from "./model/user";
import {Subject} from "./model/subject";
import {Group} from "./model/group";
import {Specialty} from "./model/specialty";

const typeOrmConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: "ec2-79-125-26-232.eu-west-1.compute.amazonaws.com",
    port: 5432,
    username: "gipoetdphrnpvz",
    password: "eefec3d5b967d0225dad438c85c0cf878960e6de0643671250f4d1305c0c5c2b",
    database: "dc0jmn65sd82vi",
    synchronize: false,
    logging: false,
    entities: [
        User,
        Subject,
        Group,
        Specialty
    ],
    extra: {
        "connectionLimit": 10
    }
};

export { typeOrmConfig };
