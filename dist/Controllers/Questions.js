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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteQuestion = exports.UpdateQuestion = exports.GetQuestion = exports.GetQuestionsByPollId = exports.AddQuestion = void 0;
const uuid_1 = require("uuid");
const index_1 = require("../Database Helpers/index");
const Question_1 = require("../Helpers/Question");
// *******************************ADD Question****************************
const dbInstance = new index_1.DbHelper();
const AddQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const QuestionId = (0, uuid_1.v4)();
        const { PollId, Text } = req.body;
        // Validate request body
        const { error } = Question_1.QuestionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        // Execute stored procedure to add a question
        yield dbInstance.exec("addQuestion", { QuestionId, PollId, Text });
        res.status(201).json({ message: 'Question added successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.AddQuestion = AddQuestion;
// *******************************GET ALL Questions by Poll ID****************************
const GetQuestionsByPollId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questions = (yield dbInstance.exec("getQuestionsByPollId", { PollId: req.params.pollId })).recordset;
        res.status(200).json(questions);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.GetQuestionsByPollId = GetQuestionsByPollId;
// *******************************GET Question****************************
const GetQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = (yield dbInstance.exec("getQuestion", { QuestionId: req.params.id })).recordset[0];
        if (question) {
            return res.status(200).json(question);
        }
        else {
            return res.status(404).json({ message: 'Question not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong " + error });
    }
});
exports.GetQuestion = GetQuestion;
// ********************UPDATE Question**********************************
const UpdateQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = Question_1.QuestionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const question = (yield dbInstance.exec("getQuestion", { QuestionId: req.params.id })).recordset[0];
        if (question && question.QuestionId) {
            const { Text } = req.body;
            yield dbInstance.exec("updateQuestion", { QuestionId: req.params.id, Text });
            return res.status(200).json({ message: "Question updated successfully" });
        }
        else {
            return res.status(404).json({ message: 'Question not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.UpdateQuestion = UpdateQuestion;
// *******************************DELETE Question****************************
const DeleteQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = (yield dbInstance.exec("getQuestion", { QuestionId: req.params.id })).recordset[0];
        if (question && question.QuestionId) {
            yield dbInstance.exec("deleteQuestion", { QuestionId: req.params.id });
            res.status(200).json({ message: 'Question deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Question not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.DeleteQuestion = DeleteQuestion;
