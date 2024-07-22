import {Request } from 'express'
export interface Incident{
    IncidentId: string,
    UserId: string,
    
    Image: string,
    Title: string,
    Location: string,
    Description: string
    
    
    
    
}
interface AddIncident{
    UserId: string,
    Image: string,
    Title: string,
    Location: string
    Description: string

    
}
export interface IncidentRequest extends Request{
    body: AddIncident
}