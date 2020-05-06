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
const user_1 = require("../model/user");
const specialty_1 = require("../model/specialty");
exports.router = express_1.Router();
exports.router.post('/admin/createTeacher', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const repository = conn.getRepository(user_1.User);
                const user = yield repository.findOne({ id: req.body.id });
                user.isActive = true;
                user.role = 'teacher';
                const result = yield repository.save(user);
                res.send(result);
                yield conn.close();
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/admin/confirmStudents', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const repository = conn.getRepository(user_1.User);
                for (const e of req.body) {
                    let user = yield repository.findOne({ id: e.id });
                    user.isActive = true;
                    yield repository.save(user);
                }
                res.sendStatus(201);
                yield conn.close();
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/admin/specialty', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const repository = conn.getRepository(specialty_1.Specialty);
                const findByName = yield repository.find({ name: req.body.name });
                if (findByName.length !== 0) {
                    res.send(undefined);
                }
                else {
                    let specialty = new specialty_1.Specialty();
                    specialty.name = req.body.name;
                    let result = yield repository.save(specialty);
                    res.send(result);
                }
                yield conn.close();
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/admin/futureTeachers', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const repository = conn.getRepository(user_1.User);
                const result = yield repository.find({ role: "student", isTeacher: true });
                yield conn.close();
                res.send(result);
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/admin/futureStudents', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const repository = conn.getRepository(user_1.User);
                const result = yield repository.find({ role: "student", isTeacher: false, isActive: false });
                yield conn.close();
                res.send(result);
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/admin/specialties', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const repository = conn.getRepository(specialty_1.Specialty);
                const result = yield repository.find();
                yield conn.close();
                res.send(result);
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
