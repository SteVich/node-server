import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {User} from "./model/user";
import {Subject} from "./model/subject";
import {Group} from "./model/group";
import {Specialty} from "./model/specialty";

const typeOrmConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: "ec2-46-137-84-140.eu-west-1.compute.amazonaws.com",
    port: 5432,
    username: "qwkblrnhbpsvwj",
    password: "27e5dc0781d4f44c30084b2c4c0aeb1b3934d701945c957c769445f450e65c94",
    database: "da8ric32f5pm4m",
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
