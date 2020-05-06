"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./model/user");
const subject_1 = require("./model/subject");
const group_1 = require("./model/group");
const specialty_1 = require("./model/specialty");
const typeOrmConfig = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "angular",
    synchronize: true,
    logging: false,
    entities: [
        user_1.User,
        subject_1.Subject,
        group_1.Group,
        specialty_1.Specialty
    ]
};
exports.typeOrmConfig = typeOrmConfig;
