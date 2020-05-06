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
const config_1 = require("../config");
const typeorm_1 = require("typeorm");
const group_1 = require("../model/group");
const user_1 = require("../model/user");
exports.router = express_1.Router();
exports.router.post('/group', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const groupRepo = conn.getRepository(group_1.Group);
                const findByName = yield groupRepo.find({ name: req.body.name });
                if (findByName.length !== 0) {
                    res.send(undefined);
                }
                else {
                    const group = new group_1.Group();
                    group.name = req.body.name;
                    const result = yield groupRepo.save(group);
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
exports.router.post('/group/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const repository = conn.getRepository(group_1.Group);
                const group = yield repository.findOne({ id: req.body.id });
                req.body.students.forEach(e => group.users.push(e));
                const result = yield repository.save(group);
                res.send(result);
                yield conn.close();
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/groups', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const repository = conn.getRepository(group_1.Group);
                const groups = yield repository.find();
                res.send(groups);
                yield conn.close();
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/allStudentsFromGroup', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const repository = conn.getRepository(group_1.Group);
                const group = yield repository.findOne({ id: req.body.id });
                res.send(group.users);
                yield conn.close();
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/allStudents', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const repository = conn.getRepository(user_1.User);
                var students = yield repository.find({ role: "student", isActive: true });
                const groupRepo = conn.getRepository(group_1.Group);
                const groups = yield groupRepo.find();
                var studentIdsFromAllGroups = [];
                groups.forEach(e => {
                    if (e.users.length > 0) {
                        e.users.forEach(item => studentIdsFromAllGroups.push(item.id));
                    }
                });
                students = students.filter(x => !studentIdsFromAllGroups.find(y => y === x.id));
                res.send(students);
                yield conn.close();
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.put('/updateStudentMark', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const repository = conn.getRepository(user_1.User);
                const student = yield repository.findOne({ id: req.body.id });
                student.mark = req.body.mark;
                var result = yield repository.save(student);
                res.send(result);
                yield conn.close();
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
