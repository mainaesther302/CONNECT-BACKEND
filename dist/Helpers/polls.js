"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.PollSchema = joi_1.default.object({
    Title: joi_1.default.string().required(),
    Description: joi_1.default.string().required(),
});
