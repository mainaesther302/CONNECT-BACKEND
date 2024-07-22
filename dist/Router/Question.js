"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Questions_1 = require("../Controllers/Questions");
const questionsrouter = express_1.default.Router();
questionsrouter.post('/', Questions_1.AddQuestion);
questionsrouter.get('/:pollId', Questions_1.GetQuestionsByPollId);
questionsrouter.get('/:id', Questions_1.GetQuestion);
questionsrouter.put('/:id', Questions_1.UpdateQuestion);
questionsrouter.delete('/:id', Questions_1.DeleteQuestion);
exports.default = questionsrouter;
