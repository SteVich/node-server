import {NextFunction, Request, Response, Router} from 'express';
import {typeOrmConfig} from "../config";
import {createConnection, getConnectionManager} from "typeorm";
import {Group} from "../model/group";
import {User} from "../model/user";

export const router: Router = Router();

router.post('/group', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
                const conn = await createConnection(typeOrmConfig);

                const groupRepo = conn.getRepository(Group);
                const findByName = await groupRepo.find({name: req.body.name});

                if (findByName.length !== 0) {
                    res.send(undefined);
                } else {
                    const group = new Group();
                    group.name = req.body.name;
                    const result = await groupRepo.save(group);

                    res.send(result);
                    await conn.close();
                }
            }
        )();
    } catch (err) {
        // If AlreadyHasActiveConnectionError occurs, return already existent connection
        if (err.name === "AlreadyHasActiveConnectionError") {
            return getConnectionManager().get("default");
        }
    }
});

router.post('/group/:id', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
            const conn = await createConnection(typeOrmConfig);
            const repository = conn.getRepository(Group);

            const group = await repository.findOne({id: req.body.id});
            req.body.students.forEach(e => group.users.push(e));

            const result = await repository.save(group);

            res.send(result);

            await conn.close();
        })();
    } catch (err) {
        return next(err);
    }
});

router.get('/groups', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
            const conn = await createConnection(typeOrmConfig);

            const repository = conn.getRepository(Group);
            const groups = await repository.find();
            res.send(groups);
            await conn.close();
        })();
    } catch (err) {
        // If AlreadyHasActiveConnectionError occurs, return already existent connection
        if (err.name === "AlreadyHasActiveConnectionError") {
            return getConnectionManager().get("default");
        }
    }
});

router.get('/allStudentsFromGroup/:id', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
            const conn = await createConnection(typeOrmConfig);
            const repository = conn.getRepository(Group);

            var x = req.params.id;
            var y = +x;

            const group = await repository.findOne({id: y});
            res.send(group.users);

            await conn.close();
        })();
    } catch (err) {
        // If AlreadyHasActiveConnectionError occurs, return already existent connection
        if (err.name === "AlreadyHasActiveConnectionError") {
            return getConnectionManager().get("default");
        }
    }
});

router.get('/allStudents', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
            const conn = await createConnection(typeOrmConfig);

            const repository = conn.getRepository(User);
            var students = await repository.find({role: "student", isActive: true});

            const groupRepo = conn.getRepository(Group);
            const groups = await groupRepo.find();
            var studentIdsFromAllGroups = [];
            groups.forEach(e => {
                if (e.users.length > 0) {
                    e.users.forEach(item => studentIdsFromAllGroups.push(item.id))
                }
            });

            students = students.filter(x => !studentIdsFromAllGroups.find(y => y === x.id));

            res.send(students);

            await conn.close();
        })();
    } catch (err) {
        // If AlreadyHasActiveConnectionError occurs, return already existent connection
        if (err.name === "AlreadyHasActiveConnectionError") {
            return getConnectionManager().get("default");
        }
    }
});

router.put('/updateStudentMark', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
            const conn = await createConnection(typeOrmConfig);

            const repository = conn.getRepository(User);
            const student = await repository.findOne({id: req.body.id});
            student.mark = req.body.mark;

            var result = await repository.save(student);
            res.send(result);

            await conn.close();
        })();
    } catch (err) {
        // If AlreadyHasActiveConnectionError occurs, return already existent connection
        if (err.name === "AlreadyHasActiveConnectionError") {
            return getConnectionManager().get("default");
        }
    }
});
