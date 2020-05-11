import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {User} from "./model/user";
import {Subject} from "./model/subject";
import {Group} from "./model/group";
import {Specialty} from "./model/specialty";

const typeOrmConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: "ec2-46-137-84-140.eu-west-1.compute.amazonaws.com",
    port: 5432,
    username: "axblpefsjqxjoo",
    password: "56bd0b2011943a3640f32d29d680c093b65a4b685596113da259c45d97f7f2cc",
    database: "d655ptdtso1nj0",
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
