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
exports.DeleteIncident = exports.UpdateIncident = exports.GetIncident = exports.GetIncidents = exports.AddIncident = void 0;
const uuid_1 = require("uuid");
const index_1 = require("../Database Helpers/index");
const Incident_1 = require("../Helpers/Incident");
// *******************************ADD INCIDENTS****************************
const dbInstance = new index_1.DbHelper();
const AddIncident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Id = (0, uuid_1.v4)();
        const { UserId, Image, Description, Title, Location } = req.body;
        const { error } = Incident_1.IncidentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        yield dbInstance.exec("addIncidents", { IncidentId: Id, UserId, Image, Description, Title, Location });
        res.status(201).json({ message: 'Incident added successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.AddIncident = AddIncident;
// *******************************GET ALL Incidents****************************
const GetIncidents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incident = (yield dbInstance.exec(" getAllIncidents", {})).recordset;
        res.status(200).json(incident);
    }
    catch (error) {
        res.status(500).json({ error: error.Message });
    }
});
exports.GetIncidents = GetIncidents;
// *******************************GET Incident****************************
const GetIncident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incident = (yield dbInstance.exec("getIncident", { IncidentId: req.params.Id })).recordset[0];
        if (incident) {
            return res.status(200).json(incident);
        }
        else {
            return res.status(404).json({ message: 'Incident not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong " + error });
    }
});
exports.GetIncident = GetIncident;
// ********************UPDATE INCIDENT**********************************
const UpdateIncident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = Incident_1.IncidentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const Incident = (yield dbInstance.exec("getIncident", { IncidentId: req.params.id })).recordset[0];
        console.log(Incident);
        if (Incident && Incident.IncidentId) {
            const { Image, Description, Title, Location } = req.body;
            yield dbInstance.exec("updateIncident", { IncidentId: req.params.id, Image, Description, Title, Location });
            return res.status(200).json({ message: "Incident updated successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.UpdateIncident = UpdateIncident;
// *******************************DELETE Incident****************************
const DeleteIncident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incident = (yield dbInstance.exec("getIncident", { IncidentId: req.params.Id })).recordset[0];
        if (incident && incident.IncidentId) {
            yield dbInstance.exec("deleteIncident", { IncidentId: req.params.Id });
            res.status(200).json({ message: ' Incident deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Incident not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.DeleteIncident = DeleteIncident;
