"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const Auth_1 = __importDefault(require("./Router/Auth"));
const views_1 = __importDefault(require("./Router/views"));
const Incident_1 = __importDefault(require("./Router/Incident"));
const polls_1 = __importDefault(require("./Router/polls"));
const Question_1 = __importDefault(require("./Router/Question"));
const options_1 = __importDefault(require("./Router/options"));
const app = (0, express_1.default)();
app.use((0, express_1.json)());
app.use('/auth', Auth_1.default);
app.use('/view', views_1.default);
app.use('/incident', Incident_1.default);
app.use('/polls', polls_1.default);
app.use('/questions', Question_1.default);
app.use('/options', options_1.default);
app.listen(4000, () => { console.log('Server Running on port 4000...'); });
