import {NextFunction, Request, Response, Router} from 'express';
import {Subject} from "../model/subject";
import {typeOrmConfig} from "../config";
import {createConnection} from "typeorm";
import {User} from "../model/user";
import {Group} from "../model/group";

export const router: Router = Router();

router.post('/subject', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
                const conn = await createConnection(typeOrmConfig);

                const subjectRepo = conn.getRepository(Subject);
                const findByName = await subjectRepo.find({name: req.body.subjectName});

                if (findByName.length !== 0) {
                    res.send(undefined);
                } else {
                    const subject = new Subject();
                    subject.name = req.body.subjectName;

                    const userRepo = await conn.getRepository(User);
                    subject.user = await userRepo.findOne({id: req.body.teacher.id});
                    const result = await subjectRepo.save(subject);

                    res.send(result);
                    await conn.close();
                }
            }
        )();
    } catch (err) {
        return next(err);
    }
});

router.post('/subject/:id', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
            const conn = await createConnection(typeOrmConfig);
            const repository = conn.getRepository(Subject);

            const subject = await repository.findOne({id: req.body.id});
            subject.user = req.body.teacher;

            const result = await repository.save(subject);
            res.send(result);

            await conn.close();
        })();
    } catch (err) {
        return next(err);
    }
});

router.get('/subjects', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
            const conn = await createConnection(typeOrmConfig);

            const repository = conn.getRepository(Subject);
            const allSubjects = await repository.find();
            console.log(allSubjects)
            res.send(allSubjects);
            await conn.close();
        })();
    } catch (err) {
        return next(err);
    }
});

router.get('/subject/teachers', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
            const conn = await createConnection(typeOrmConfig);

            const repository = conn.getRepository(User);
            const allTeachers = await repository.find({role: "teacher", isActive: true});
            await conn.close();

            res.send(allTeachers);
        })();
    } catch (err) {
        return next(err);
    }
});

router.post('/addGroupToSubject', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
            const conn = await createConnection(typeOrmConfig);
            const repository = conn.getRepository(Subject);
            const subject = await repository.findOne({relations: ['groups'], where: {id: req.body.subjectId}});
            const groupRepository = conn.getRepository(Group);
            const group = await groupRepository.findOne({id: req.body.id});

            subject.groups.push(group);

            const result = await repository.save(subject);
            res.send(result);

            await conn.close();
        })();
    } catch (err) {
        return next(err);
    }
});

router.get('/groupsFromSubject', async function (req: Request, res: Response, next: NextFunction) {
    try {
        (async () => {
            const conn = await createConnection(typeOrmConfig);
            const repository = conn.getRepository(Subject);

            const subject = await repository.findOne({id: req.body.id});
            console.log(subject.groups)
            res.send(subject.groups);

            await conn.close();
        })();
    } catch (err) {
        return next(err);
    }
});
