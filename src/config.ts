import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {User} from "./model/user";
import {Subject} from "./model/subject";
import {Group} from "./model/group";
import {Specialty} from "./model/specialty";

const typeOrmConfig: PostgresConnectionOptions = {
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "1234",
            database: "angular",
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
