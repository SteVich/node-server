import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {User} from "./model/user";
import {Subject} from "./model/subject";
import {Group} from "./model/group";
import {Specialty} from "./model/specialty";

const typeOrmConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: "ec2-34-200-72-77.compute-1.amazonaws.com",
    port: 5432,
    username: "wofqajshrfbwpg",
    password: "5c54d7f17fee8696243bc715707705a84bdcef106b9c06820d9a0f0c6194556c",
    database: "d8t7u84tfhjv8n",
    synchronize: true,
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
