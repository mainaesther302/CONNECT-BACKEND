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
exports.DeletePoll = exports.UpdatePoll = exports.GetPoll = exports.GetPolls = exports.AddPoll = void 0;
const uuid_1 = require("uuid");
const index_1 = require("../Database Helpers/index");
const polls_1 = require("../Helpers/polls");
// *******************************ADD Poll****************************
const dbInstance = new index_1.DbHelper();
const AddPoll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const PollId = (0, uuid_1.v4)();
        const { Title, Description } = req.body;
        // Validate request body
        const { error } = polls_1.PollSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        console.log(req.body);
        // Execute stored procedure to add a poll
        yield dbInstance.exec("addPoll", { PollId, Title, Description });
        return res.status(201).json({ message: 'Poll added successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.AddPoll = AddPoll;
// *******************************GET ALL Polls****************************
const GetPolls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const polls = (yield dbInstance.exec("getAllPolls", {})).recordset;
        res.status(200).json(polls);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.GetPolls = GetPolls;
// *******************************GET Poll****************************
const GetPoll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poll = (yield dbInstance.exec("getPoll", { PollId: req.params.Id })).recordset[0];
        if (poll) {
            return res.status(200).json(poll);
        }
        else {
            return res.status(404).json({ message: 'Poll not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong " + error });
    }
});
exports.GetPoll = GetPoll;
// ********************UPDATE Poll**********************************
const UpdatePoll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = polls_1.PollSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const poll = (yield dbInstance.exec("getPoll", { PollId: req.params.id })).recordset[0];
        if (poll && poll.PollId) {
            const { Title, Description } = req.body;
            yield dbInstance.exec("updatePoll", { PollId: req.params.id, Title, Description });
            return res.status(200).json({ message: "Poll updated successfully" });
        }
        else {
            return res.status(404).json({ message: 'Poll not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.UpdatePoll = UpdatePoll;
// *******************************DELETE Poll****************************
const DeletePoll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poll = (yield dbInstance.exec("getPoll", { PollId: req.params.Id })).recordset[0];
        if (poll && poll.PollId) {
            yield dbInstance.exec("deletePoll", { PollId: req.params.Id });
            res.status(200).json({ message: 'Poll deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Poll not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.DeletePoll = DeletePoll;
