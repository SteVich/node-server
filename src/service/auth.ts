import {NextFunction, Request, Response, Router} from 'express';
import {createConnection, getConnectionManager} from "typeorm";
import {typeOrmConfig} from "../config";
import {User} from "../model/user";

export const router: Router = Router();

router.get('/user/:username', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
            const conn = await createConnection(typeOrmConfig);

            const userRepo = conn.getRepository(User);
            const allUsers = await userRepo.find({username: req.params.username});

            await conn.close();

            res.send(allUsers);
        })();
    } catch (err) {
        // If AlreadyHasActiveConnectionError occurs, return already existent connection
        if (err.name === "AlreadyHasActiveConnectionError") {
            return getConnectionManager().get("default");
        }
    }
})

router.get('/user/:email', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
            const conn = await createConnection(typeOrmConfig);

            const userRepo = conn.getRepository(User);
            const allUsers = await userRepo.find({username: req.params.email});

            await conn.close();

            res.send(allUsers);
        })();
    } catch (err) {
        // If AlreadyHasActiveConnectionError occurs, return already existent connection
        if (err.name === "AlreadyHasActiveConnectionError") {
            return getConnectionManager().get("default");
        }
    }
});

router.get('/user/:id', async function (req: Request, res: Response, next: NextFunction) {
    var x = req.params.id;
    var y = +x;
    try {
        (async () => {
            const conn = await createConnection(typeOrmConfig);

            const userRepo = conn.getRepository(User);
            const allUsers = await userRepo.find({id: y});

            await conn.close();

            res.send(allUsers);
        })();
    } catch (err) {
        // If AlreadyHasActiveConnectionError occurs, return already existent connection
        if (err.name === "AlreadyHasActiveConnectionError") {
            return getConnectionManager().get("default");
        }
    }
});

router.post('/registration', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
            const conn = await createConnection(typeOrmConfig);
            const userRepo = conn.getRepository(User);

            const findByEmail = await userRepo.find({email: req.body.email});
            const findByUsername = await userRepo.find({username: req.body.username});

            if (findByEmail.length !== 0 || findByUsername.length !== 0) {
                res.send(undefined);
            } else {
                const user = new User();
                user.name = req.body.name;
                user.username = req.body.username;
                user.email = req.body.email;
                user.password = req.body.password;
                user.isActive = false;
                user.role = "student";
                user.subjects = null;
                user.group = null;
                user.isTeacher = req.body.isTeacher;
                user.mark = null;
                if(req.body.specialty !== undefined){
                    user.specialty = req.body.specialty
                }
                if(req.body.course !== undefined){
                    user.course = req.body.course
                }

                const result = await userRepo.save(user);

                await conn.close();

                res.send(result);
            }
        })();

    } catch (err) {
        // If AlreadyHasActiveConnectionError occurs, return already existent connection
        if (err.name === "AlreadyHasActiveConnectionError") {
            return getConnectionManager().get("default");
        }
    }

});

router.get('/users', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
            const conn = await createConnection(typeOrmConfig);

            const userRepo = conn.getRepository(User);
            const allUsers = await userRepo.find();

            await conn.close();

            res.send(allUsers);
        })();
    } catch (err) {
        // If AlreadyHasActiveConnectionError occurs, return already existent connection
        if (err.name === "AlreadyHasActiveConnectionError") {
            return getConnectionManager().get("default");
        }
    }
});

