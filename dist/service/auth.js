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
const typeorm_1 = require("typeorm");
const config_1 = require("../config");
const user_1 = require("../model/user");
exports.router = express_1.Router();
exports.router.get('/user/:username', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const userRepo = conn.getRepository(user_1.User);
                const allUsers = yield userRepo.find({ username: req.params.username });
                yield conn.close();
                res.send(allUsers);
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/user/:email', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const userRepo = conn.getRepository(user_1.User);
                const allUsers = yield userRepo.find({ username: req.params.email });
                yield conn.close();
                res.send(allUsers);
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/user/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var x = req.params.id;
        var y = +x;
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const userRepo = conn.getRepository(user_1.User);
                const allUsers = yield userRepo.find({ id: y });
                yield conn.close();
                res.send(allUsers);
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/registration', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const userRepo = conn.getRepository(user_1.User);
                const findByEmail = yield userRepo.find({ email: req.body.email });
                const findByUsername = yield userRepo.find({ username: req.body.username });
                if (findByEmail.length !== 0 || findByUsername.length !== 0) {
                    res.send(undefined);
                }
                else {
                    const user = new user_1.User();
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
                    if (req.body.specialty !== undefined) {
                        user.specialty = req.body.specialty;
                    }
                    if (req.body.course !== undefined) {
                        user.course = req.body.course;
                    }
                    const result = yield userRepo.save(user);
                    yield conn.close();
                    res.send(result);
                }
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/users', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
                const userRepo = conn.getRepository(user_1.User);
                const allUsers = yield userRepo.find();
                yield conn.close();
                res.send(allUsers);
            }))();
        }
        catch (err) {
            return next(err);
        }
    });
});
