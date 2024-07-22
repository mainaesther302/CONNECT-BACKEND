"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Incidents_1 = require("../Controllers/Incidents");
const incidentsRoutes = (0, express_1.Router)();
incidentsRoutes.post("/addincident", Incidents_1.AddIncident);
incidentsRoutes.get("", Incidents_1.GetIncidents);
incidentsRoutes.get(":/IncidentId", Incidents_1.GetIncident);
incidentsRoutes.delete("/:IncidentId", Incidents_1.DeleteIncident);
incidentsRoutes.put("/:IncidentId", Incidents_1.UpdateIncident);
// Register new user
exports.default = incidentsRoutes;
