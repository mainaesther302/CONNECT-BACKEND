"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.registerUser = void 0;
const uuid_1 = require("uuid");
const Index_1 = require("../config/Index"); // Ensure correct import path
const mssql_1 = __importDefault(require("mssql"));
const Auth_1 = require("../Helpers/Auth");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserId = (0, uuid_1.v4)();
        const { UserName, Email, Password, Role } = req.body;
        const { error } = Auth_1.RegisterSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const hashPassword = yield bcrypt_1.default.hash(Password, 10);
        let pool = yield mssql_1.default.connect(Index_1.sqlConfig);
        yield pool.request()
            .input('UserId', mssql_1.default.VarChar, UserId)
            .input('UserName', mssql_1.default.VarChar, UserName)
            .input('Email', mssql_1.default.VarChar, Email)
            .input('Password', mssql_1.default.VarChar, hashPassword)
            .input('Role', mssql_1.default.VarChar, Role) // Add role here
            .execute('addUser');
        return res.status(201).json({ Message: 'User added successfully' });
    }
    catch (error) {
        return res.status(500).json({ Message: error.message });
    }
});
exports.registerUser = registerUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(Index_1.sqlConfig);
        let result = yield pool.request().execute('getAllUsers');
        let users = result.recordset;
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ Message: error.message });
    }
});
exports.getAllUsers = getAllUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UserId, UserName, Email, Role, Status, Password } = req.body;
        let pool = yield mssql_1.default.connect(Index_1.sqlConfig);
        yield pool.request()
            .input('UserId', mssql_1.default.VarChar, UserId)
            .input('UserName', mssql_1.default.VarChar, UserName)
            .input('Email', mssql_1.default.VarChar, Email)
            .input('Role', mssql_1.default.VarChar, Role)
            .input('Status', mssql_1.default.VarChar, Status)
            .input('Password', mssql_1.default.VarChar, Password)
            .execute('updateUser');
        return res.status(200).json({ Message: 'User updated successfully' });
    }
    catch (error) {
        return res.status(500).json({ Message: error.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UserId } = req.body;
        let pool = yield mssql_1.default.connect(Index_1.sqlConfig);
        yield pool.request()
            .input('UserId', mssql_1.default.VarChar, UserId)
            .execute('deleteUser');
        return res.status(200).json({ Message: 'User deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ Message: error.message });
    }
});
exports.deleteUser = deleteUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = req.body;
        let pool = yield mssql_1.default.connect(Index_1.sqlConfig);
        let result = yield pool.request()
            .input('Email', mssql_1.default.VarChar, Email)
            .execute('getUser');
        let user = result.recordset[0];
        if (!user) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        const isValid = yield bcrypt_1.default.compare(Password, user.Password);
        if (isValid) {
            const payload = {
                sub: user.UserId,
                UserName: user.UserName,
                Role: user.Role // Add role here
            };
            const token = yield jsonwebtoken_1.default.sign(payload, process.env.SECRET, { expiresIn: '4h' });
            return res.status(200).json({ Message: 'Login Successful', token });
        }
        else {
            return res.status(401).json({ Message: 'Invalid Credentials' });
        }
    }
    catch (error) {
        return res.status(500).json({ Message: error.message });
    }
});
exports.loginUser = loginUser;
