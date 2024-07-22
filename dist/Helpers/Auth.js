"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.RegisterSchema = joi_1.default.object({
    UserName: joi_1.default.string().required().messages({
        'any.required': 'Name is required'
    }),
    Email: joi_1.default.string().email().required().messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
    }),
    Role: joi_1.default.string().required().messages({
        'any.required': 'Please selct your Role'
    }),
    Password: joi_1.default.string().required()
        .messages({
        'string.pattern.base': 'Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character',
        'any.required': 'Password is required'
    })
});
