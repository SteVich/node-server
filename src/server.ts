import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import {router as authRouter} from './service/auth'
import {router as subjectRouter} from './service/subjectService'
import {router as groupRouter} from './service/groupService'
import {router as adminRouter} from './service/adminsService'

const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(authRouter)
    .use(subjectRouter)
    .use(groupRouter)
    .use(adminRouter);

const port = process.env.PORT || 8000;

app.listen(port, function() {
    console.log("App is running on port " + port);
});
