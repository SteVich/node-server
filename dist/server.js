"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bearerToken = require('express-bearer-token');
const auth_1 = require("./service/auth");
const subjectService_1 = require("./service/subjectService");
const groupService_1 = require("./service/groupService");
const adminsService_1 = require("./service/adminsService");
const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(bearerToken())
    .use(auth_1.router)
    .use(subjectService_1.router)
    .use(groupService_1.router)
    .use(adminsService_1.router);
app.listen(process.env.PORT || 8080);
