import { Request, Response, RequestHandler } from 'express';
import { v4 as uuid } from 'uuid';
import { sqlConfig } from '../config/Index';
import mssql from 'mssql';
import { OptionRequest, Option } from '../Models/options';
import { DbHelper } from '../Database Helpers/index';
import { OptionSchema } from '../Helpers/options';

// *******************************ADD Option****************************
const dbInstance = new DbHelper();
export const AddOption: RequestHandler = async (req: OptionRequest, res: Response) => {
  try {
    const OptionId = uuid();
    const { QuestionId, Text } = req.body;

    // Validate request body
    const { error } = OptionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Execute stored procedure to add an option
    await dbInstance.exec("addOption", { OptionId, QuestionId, Text });
    res.status(201).json({ message: 'Option added successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// *******************************GET ALL Options by Question ID****************************
export const GetOptionsByQuestionId: RequestHandler = async (req: Request, res: Response) => {
  try {
    const options = (await dbInstance.exec("getOptionsByQuestionId", { QuestionId: req.params.questionId })).recordset as Option[];
    res.status(200).json(options);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// *******************************GET Option****************************
export const GetOption: RequestHandler = async (req, res) => {
  try {
    const option = (await dbInstance.exec("getOption", { OptionId: req.params.id })).recordset[0] as Option;
    if (option) {
      return res.status(200).json(option);
    } else {
      return res.status(404).json({ message: 'Option not found' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: "Something went wrong " + error });
  }
};

// ********************UPDATE Option**********************************
export const UpdateOption = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { error } = OptionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const option = (await dbInstance.exec("getOption", { OptionId: req.params.id })).recordset[0] as Option;
    if (option && option.OptionId) {
      const { Text } = req.body;
      await dbInstance.exec("updateOption", { OptionId: req.params.id, Text });
      return res.status(200).json({ message: "Option updated successfully" });
    } else {
      return res.status(404).json({ message: 'Option not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// *******************************DELETE Option****************************
export const DeleteOption: RequestHandler = async (req: Request, res: Response) => {
  try {
    const option = (await dbInstance.exec("getOption", { OptionId: req.params.id })).recordset[0] as Option;
    if (option && option.OptionId) {
      await dbInstance.exec("deleteOption", { OptionId: req.params.id });
      res.status(200).json({ message: 'Option deleted successfully' });
    } else {
      res.status(404).json({ message: 'Option not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
