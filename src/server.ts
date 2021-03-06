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


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://univer-sv.herokuapp.com"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = process.env.PORT || 8000;

app.listen(port, function() {
    console.log("App is running on port " + port);
});
