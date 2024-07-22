import { Request, Response, RequestHandler } from 'express';
import { v4 as uuid } from 'uuid';
import { sqlConfig } from '../config/Index';
import mssql from 'mssql';
import { IncidentRequest, Incident } from '../Models/Incident';
import { DbHelper } from '../Database Helpers/index';
import { IncidentSchema } from '../Helpers/Incident';

// *******************************ADD INCIDENTS****************************
const dbInstance = new DbHelper()
export const AddIncident: RequestHandler = async (req: IncidentRequest, res: Response) => {
  try {
    const Id = uuid();
    const {UserId ,Image,Description,Title,Location } = req.body;
    
    const { error } = IncidentSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })

        }
        await dbInstance.exec("addIncidents", { IncidentId: Id,UserId, Image, Description,Title,Location })
    res.status(201).json({ message: 'Incident added successfully' });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
// *******************************GET ALL Incidents****************************

export const GetIncidents: RequestHandler = async (req, res) => {
  try {
    const incident = (await dbInstance.exec(" getAllIncidents", {})).recordset as Incident[]
    res.status(200).json(incident);
  } catch (error:any) {
    res.status(500).json({ error: error.Message });
  }
};

// *******************************GET Incident****************************
export const  GetIncident:RequestHandler=async (req,res)=>{
    try {
        const incident=( await dbInstance.exec("getIncident",{IncidentId:req.params.Id})).recordset[0] as Incident
        if (incident){
            return res.status(200).json(incident);
        }
        else{
            return res.status(404).json({message:'Incident not found'})
        }
        
    } catch (error) {
        return res.status(500).json({message:"Something went wrong "+error });
        
    }

}



// ********************UPDATE INCIDENT**********************************
export const UpdateIncident = async (req: Request<{id:string}>, res: Response) => {
  try {
    
    const { error } = IncidentSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })

        }

        const Incident=( await dbInstance.exec("getIncident",{IncidentId:req.params.id})).recordset[0] as Incident
        console.log(Incident);
        
        if (Incident && Incident.IncidentId) {
            const { Image, Description,Title,Location } = req.body
            await dbInstance.exec("updateIncident", { IncidentId: req.params.id, Image, Description,Title,Location})
            return res.status(200).json({ message: "Incident updated successfully" })

        }

    
    }
   
  catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
// *******************************DELETE Incident****************************

export const DeleteIncident: RequestHandler = async (req: Request, res: Response) => {
    try {
        const incident = (await dbInstance.exec("getIncident", { IncidentId: req.params.Id })).recordset[0] as Incident
        if (incident && incident.IncidentId) {
            await dbInstance.exec("deleteIncident", { IncidentId: req.params.Id })

            res.status(200).json({ message: ' Incident deleted successfully' });
        } else {
            res.status(404).json({ message: 'Incident not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}