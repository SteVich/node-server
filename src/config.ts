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
    password: "eefec3d5b967d0225dad438c85c0cf878960e6de0643671250f4d1305c0c5c2b",
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
