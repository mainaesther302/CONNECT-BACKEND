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
exports.DeleteView = exports.UpdateView = exports.GetView = exports.GetViews = exports.AddView = void 0;
const uuid_1 = require("uuid");
const index_1 = require("../Database Helpers/index");
const views_1 = require("../Helpers/views");
// *******************************ADD Views****************************
const dbInstance = new index_1.DbHelper();
const AddView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ViewId = (0, uuid_1.v4)();
        const { UserId, Image, Description } = req.body;
        // Validate request body
        const { error } = views_1.ViewSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        // Log request data for debugging purposes
        console.log(req.body);
        // Execute stored procedure to add a view
        yield dbInstance.exec("addView", { ViewId, UserId, Image, Description });
        res.status(201).json({ message: 'View added successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
    console.log(req.body);
});
exports.AddView = AddView;
// *******************************GET ALL Views****************************
const GetViews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const views = (yield dbInstance.exec("getAllViews", {})).recordset;
        console.log(views);
        if (views.length > 0) {
            console.log(views);
            return res.status(200).json(views);
        }
        return res.status(404).json({ message: 'No views found' });
    }
    catch (error) {
        return res.status(500).json({ error: error.Message });
    }
});
exports.GetViews = GetViews;
// *******************************GET VIEW****************************
const GetView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const view = (yield dbInstance.exec("getView", { ViewId: req.params.Id })).recordset[0];
        if (view) {
            return res.status(200).json(view);
        }
        else {
            return res.status(404).json({ message: 'view not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong " + error });
    }
});
exports.GetView = GetView;
// ********************UPDATE HOTEL**********************************
const UpdateView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = views_1.ViewSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const View = (yield dbInstance.exec("getView", { ViewId: req.params.id })).recordset[0];
        console.log(View);
        if (View && View.ViewId) {
            const { Image, Description } = req.body;
            yield dbInstance.exec("updateView", { ViewId: req.params.id, Image, Description });
            return res.status(200).json({ message: "View updated successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.UpdateView = UpdateView;
// *******************************DELETE HOTEL****************************
const DeleteView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const View = (yield dbInstance.exec("getView", { ViewId: req.params.Id })).recordset[0];
        if (View && View.ViewId) {
            yield dbInstance.exec("deleteView", { Id: req.params.Id });
            res.status(200).json({ message: 'View deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'View not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.DeleteView = DeleteView;
