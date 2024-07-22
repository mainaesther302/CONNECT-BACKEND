import { Request } from "express";

export interface QuestionRequest extends Request {
    body: {
      PollId: string;
      Text: string;
    };
  }
  
  export interface Question {
    QuestionId: string;
    PollId: string;
    Text: string;
  }
  