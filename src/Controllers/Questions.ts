import { Request, Response, RequestHandler } from 'express';
import { v4 as uuid } from 'uuid';
import { sqlConfig } from '../config/Index';
import mssql from 'mssql';
import { QuestionRequest, Question } from '../Models/Questions';
import { DbHelper } from '../Database Helpers/index';
import { QuestionSchema } from '../Helpers/Question';

// *******************************ADD Question****************************
const dbInstance = new DbHelper();
export const AddQuestion: RequestHandler = async (req: QuestionRequest, res: Response) => {
  try {
    const QuestionId = uuid();
    const { PollId, Text } = req.body;

    // Validate request body
    const { error } = QuestionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Execute stored procedure to add a question
    await dbInstance.exec("addQuestion", { QuestionId, PollId, Text });
    res.status(201).json({ message: 'Question added successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// *******************************GET ALL Questions by Poll ID****************************
export const GetQuestionsByPollId: RequestHandler = async (req: Request, res: Response) => {
  try {
    const questions = (await dbInstance.exec("getQuestionsByPollId", { PollId: req.params.pollId })).recordset as Question[];
    res.status(200).json(questions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// *******************************GET Question****************************
export const GetQuestion: RequestHandler = async (req, res) => {
  try {
    const question = (await dbInstance.exec("getQuestion", { QuestionId: req.params.id })).recordset[0] as Question;
    if (question) {
      return res.status(200).json(question);
    } else {
      return res.status(404).json({ message: 'Question not found' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: "Something went wrong " + error });
  }
};

// ********************UPDATE Question**********************************
export const UpdateQuestion = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { error } = QuestionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const question = (await dbInstance.exec("getQuestion", { QuestionId: req.params.id })).recordset[0] as Question;
    if (question && question.QuestionId) {
      const { Text } = req.body;
      await dbInstance.exec("updateQuestion", { QuestionId: req.params.id, Text });
      return res.status(200).json({ message: "Question updated successfully" });
    } else {
      return res.status(404).json({ message: 'Question not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// *******************************DELETE Question****************************
export const DeleteQuestion: RequestHandler = async (req: Request, res: Response) => {
  try {
    const question = (await dbInstance.exec("getQuestion", { QuestionId: req.params.id })).recordset[0] as Question;
    if (question && question.QuestionId) {
      await dbInstance.exec("deleteQuestion", { QuestionId: req.params.id });
      res.status(200).json({ message: 'Question deleted successfully' });
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
