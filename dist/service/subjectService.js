"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subject_1 = require("../model/subject");
const config_1 = require("../config");
const typeorm_1 = require("typeorm");
const user_1 = require("../model/user");
const group_1 = require("../model/group");
exports.router = express_1.Router();
exports.router.post('/subject', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const subjectRepo = conn.getRepository(subject_1.Subject);
                const findByName = yield subjectRepo.find({ name: req.body.subjectName });
                if (findByName.length !== 0) {
                    res.send(undefined);
                }
                else {
                    const subject = new subject_1.Subject();
                    subject.name = req.body.subjectName;
                    const userRepo = yield conn.getRepository(user_1.User);
                    subject.user = yield userRepo.findOne({ id: req.body.teacher.id });
                    const result = yield subjectRepo.save(subject);
                    res.send(result);
                    yield conn.close();
                }
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/subject/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const repository = conn.getRepository(subject_1.Subject);
                const subject = yield repository.findOne({ id: req.body.id });
                subject.user = req.body.teacher;
                const result = yield repository.save(subject);
                res.send(result);
                yield conn.close();
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/subjects', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const repository = conn.getRepository(subject_1.Subject);
                const allSubjects = yield repository.find();
                console.log(allSubjects);
                res.send(allSubjects);
                yield conn.close();
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/subject/teachers', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const repository = conn.getRepository(user_1.User);
                const allTeachers = yield repository.find({ role: "teacher", isActive: true });
                yield conn.close();
                res.send(allTeachers);
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/addGroupToSubject', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const repository = conn.getRepository(subject_1.Subject);
                const subject = yield repository.findOne({ relations: ['groups'], where: { id: req.body.subjectId } });
                const groupRepository = conn.getRepository(group_1.Group);
                const group = yield groupRepository.findOne({ id: req.body.id });
                subject.groups.push(group);
                const result = yield repository.save(subject);
                res.send(result);
                yield conn.close();
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/groupsFromSubject', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const repository = conn.getRepository(subject_1.Subject);
                const subject = yield repository.findOne({ id: req.body.id });
                console.log(subject.groups);
                res.send(subject.groups);
                yield conn.close();
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
