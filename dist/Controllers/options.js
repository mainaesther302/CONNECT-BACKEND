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
exports.DeleteOption = exports.UpdateOption = exports.GetOption = exports.GetOptionsByQuestionId = exports.AddOption = void 0;
const uuid_1 = require("uuid");
const index_1 = require("../Database Helpers/index");
const options_1 = require("../Helpers/options");
// *******************************ADD Option****************************
const dbInstance = new index_1.DbHelper();
const AddOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const OptionId = (0, uuid_1.v4)();
        const { QuestionId, Text } = req.body;
        // Validate request body
        const { error } = options_1.OptionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        // Execute stored procedure to add an option
        yield dbInstance.exec("addOption", { OptionId, QuestionId, Text });
        res.status(201).json({ message: 'Option added successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.AddOption = AddOption;
// *******************************GET ALL Options by Question ID****************************
const GetOptionsByQuestionId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = (yield dbInstance.exec("getOptionsByQuestionId", { QuestionId: req.params.questionId })).recordset;
        res.status(200).json(options);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.GetOptionsByQuestionId = GetOptionsByQuestionId;
// *******************************GET Option****************************
const GetOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const option = (yield dbInstance.exec("getOption", { OptionId: req.params.id })).recordset[0];
        if (option) {
            return res.status(200).json(option);
        }
        else {
            return res.status(404).json({ message: 'Option not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong " + error });
    }
});
exports.GetOption = GetOption;
// ********************UPDATE Option**********************************
const UpdateOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = options_1.OptionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const option = (yield dbInstance.exec("getOption", { OptionId: req.params.id })).recordset[0];
        if (option && option.OptionId) {
            const { Text } = req.body;
            yield dbInstance.exec("updateOption", { OptionId: req.params.id, Text });
            return res.status(200).json({ message: "Option updated successfully" });
        }
        else {
            return res.status(404).json({ message: 'Option not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.UpdateOption = UpdateOption;
// *******************************DELETE Option****************************
const DeleteOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const option = (yield dbInstance.exec("getOption", { OptionId: req.params.id })).recordset[0];
        if (option && option.OptionId) {
            yield dbInstance.exec("deleteOption", { OptionId: req.params.id });
            res.status(200).json({ message: 'Option deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Option not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.DeleteOption = DeleteOption;
