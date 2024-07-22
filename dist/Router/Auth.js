"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_1 = require("../Controllers/Auth");
const index_1 = require("../MiddleWare/index");
const authRoutes = (0, express_1.Router)();
// Register new user (No authorization needed)
authRoutes.post('/register', Auth_1.registerUser);
// Login user (No authorization needed)
authRoutes.post('/login', Auth_1.loginUser);
// Routes that require authentication and specific roles
authRoutes.get('/users', (0, index_1.authorize)(['Admin']), Auth_1.getAllUsers);
authRoutes.put('/update', (0, index_1.authorize)(['Admin']), Auth_1.updateUser);
authRoutes.delete('/delete', (0, index_1.authorize)(['Admin']), Auth_1.deleteUser);
exports.default = authRoutes;
