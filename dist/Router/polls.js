"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Polls_1 = require("../Controllers/Polls");
const pollsrouter = express_1.default.Router();
pollsrouter.post('/addpoll', Polls_1.AddPoll);
pollsrouter.get('/', Polls_1.GetPolls);
pollsrouter.get('/:id', Polls_1.GetPoll);
pollsrouter.put('/:id', Polls_1.UpdatePoll);
pollsrouter.delete('/:id', Polls_1.DeletePoll);
exports.default = pollsrouter;
