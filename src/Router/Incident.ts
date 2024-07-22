
import {Router} from 'express';
import { AddIncident,GetIncidents,GetIncident,UpdateIncident,DeleteIncident } from '../Controllers/Incidents';

const incidentsRoutes = Router()

incidentsRoutes.post("/addincident", AddIncident)
incidentsRoutes.get("", GetIncidents)
incidentsRoutes.get(":/IncidentId", GetIncident)
incidentsRoutes.delete("/:IncidentId", DeleteIncident)

incidentsRoutes.put("/:IncidentId", UpdateIncident)


    // Register new user

export default incidentsRoutes;