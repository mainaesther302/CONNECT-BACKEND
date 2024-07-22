import { Request } from "express";

  
  export interface Poll {
    PollId: string;
    UserId: string;
    Title: string;
    Description: string;
  }
  export interface AddPoll{
    
   
      Title: string;
      Description: string;
    
  }
  export interface PollRequest extends Request {
   body: AddPoll
  }
  