import { Request } from "express";

export interface OptionRequest extends Request {
    body: {
      QuestionId: string;
      Text: string;
    };
  }
  
  export interface Option {
    OptionId: string;
    QuestionId: string;
    Text: string;
  }
  