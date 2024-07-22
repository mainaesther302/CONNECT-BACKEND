import {Request } from 'express'
export interface View{
    ViewId: string,
    UserId: string,
    
    Image: string,
    Description: string
    
    
    
    
}
interface AddView{
    
    UserId: string
    Image: string,
    Description: string
   
    
    
}
export interface ViewRequest extends Request{
    body: AddView
}