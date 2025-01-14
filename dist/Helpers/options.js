"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.OptionSchema = joi_1.default.object({
    QuestionId: joi_1.default.string().uuid().required(),
    Text: joi_1.default.string().required(),
});
