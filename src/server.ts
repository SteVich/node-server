import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
const bearerToken = require('express-bearer-token');
import {router as authRouter} from './service/auth'
import {router as subjectRouter} from './service/subjectService'
import {router as groupRouter} from './service/groupService'
import {router as adminRouter} from './service/adminsService'

const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(bearerToken())
    .use(authRouter)
    .use(subjectRouter)
    .use(groupRouter)
    .use(adminRouter)

app.listen(process.env.PORT || 8080);

