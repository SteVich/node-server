import {NextFunction, Request, Response, Router} from 'express';
import {typeOrmConfig} from "../config";
import {createConnection} from "typeorm";
import {User} from "../model/user";
import {Specialty} from "../model/specialty";

export const router: Router = Router();

router.post('/admin/createTeacher', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
            const conn = await createConnection(typeOrmConfig);
            const repository = conn.getRepository(User);

            const user = await repository.findOne({id: req.body.id});

            user.isActive = true;
            user.role = 'teacher';

            const result = await repository.save(user);

            res.send(result);

            await conn.close();
        })();
    } catch (err) {
        return next(err);
    }
});

router.post('/admin/confirmStudents', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
            const conn = await createConnection(typeOrmConfig);
            const repository = conn.getRepository(User);

            for (const e of req.body) {
                let user = await repository.findOne({id: e.id});
                user.isActive = true;
                await repository.save(user);
            }

            res.sendStatus(201);

            await conn.close();
        })();
    } catch (err) {
        return next(err);
    }
});

router.post('/admin/specialty', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
            const conn = await createConnection(typeOrmConfig);
            const repository = conn.getRepository(Specialty);

            const findByName = await repository.find({name: req.body.name});

            if (findByName.length !== 0) {
                res.send(undefined);
            } else {
                let specialty = new Specialty();
                specialty.name = req.body.name;
                let result = await repository.save(specialty);
                res.send(result);
            }

            await conn.close();
        })();
    } catch (err) {
        return next(err);
    }
});

router.get('/admin/futureTeachers', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
            const conn = await createConnection(typeOrmConfig);

            const repository = conn.getRepository(User);
            const result = await repository.find({role: "student", isTeacher: true});
            await conn.close();

            res.send(result);
        })();
    } catch (err) {
        return next(err);
    }
});

router.get('/admin/futureStudents', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
            const conn = await createConnection(typeOrmConfig);

            const repository = conn.getRepository(User);
            const result = await repository.find({role: "student", isTeacher: false, isActive: false});
            await conn.close();

            res.send(result);
        })();
    } catch (err) {
        return next(err);
    }
});

router.get('/admin/specialties', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
            const conn = await createConnection(typeOrmConfig);

            const repository = conn.getRepository(Specialty);
            const result = await repository.find();
            await conn.close();

            res.send(result);
        })();
    } catch (err) {
        return next(err);
    }
});

