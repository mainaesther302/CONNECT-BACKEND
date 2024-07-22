"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ViewSchema = joi_1.default.object({
    Image: joi_1.default.string().required().messages({
        'any.required': 'Image is required'
    }),
    Description: joi_1.default.string().required().messages({
        'any.required': 'Description is required'
    }),
});
