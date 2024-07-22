"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const options_1 = require("../Controllers/options");
const optionsrouter = express_1.default.Router();
optionsrouter.post('/', options_1.AddOption);
optionsrouter.get('/:questionId', options_1.GetOptionsByQuestionId);
optionsrouter.get('/:id', options_1.GetOption);
optionsrouter.put('/:id', options_1.UpdateOption);
optionsrouter.delete('/:id', options_1.DeleteOption);
exports.default = optionsrouter;
