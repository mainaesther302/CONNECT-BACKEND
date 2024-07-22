import { Request, Response, RequestHandler } from 'express';
import { v4 as uuid } from 'uuid';
import { sqlConfig } from '../config/Index';
import mssql from 'mssql';
import { PollRequest, Poll } from '../Models/Polls';
import { DbHelper } from '../Database Helpers/index';
import { PollSchema } from '../Helpers/polls';

// *******************************ADD Poll****************************
const dbInstance = new DbHelper();
export const AddPoll: RequestHandler = async (req: PollRequest, res: Response) => {
  try {
    const PollId = uuid();
    const {  Title, Description } = req.body;

    

    // Validate request body
    const { error } = PollSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    console.log(req.body)
    // Execute stored procedure to add a poll
    await dbInstance.exec("addPoll", { PollId,  Title, Description });
   return res.status(201).json({ message: 'Poll added successfully' });
  } catch (error: any) {
   return res.status(500).json({ error: error.message });
  }
};

// *******************************GET ALL Polls****************************
export const GetPolls: RequestHandler = async (req: PollRequest, res: Response) => {
  try {
    const polls = (await dbInstance.exec("getAllPolls", {})).recordset as Poll[];
    res.status(200).json(polls);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// *******************************GET Poll****************************
export const GetPoll: RequestHandler = async (req, res) => {
  try {
    const poll = (await dbInstance.exec("getPoll", { PollId: req.params.Id })).recordset[0] as Poll;
    if (poll) {
      return res.status(200).json(poll);
    } else {
      return res.status(404).json({ message: 'Poll not found' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: "Something went wrong " + error });
  }
};

// ********************UPDATE Poll**********************************
export const UpdatePoll = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { error } = PollSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const poll = (await dbInstance.exec("getPoll", { PollId: req.params.id })).recordset[0] as Poll;
    if (poll && poll.PollId) {
      const { Title, Description } = req.body;
      await dbInstance.exec("updatePoll", { PollId: req.params.id, Title, Description });
      return res.status(200).json({ message: "Poll updated successfully" });
    } else {
      return res.status(404).json({ message: 'Poll not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// *******************************DELETE Poll****************************
export const DeletePoll: RequestHandler = async (req: Request, res: Response) => {
  try {
    const poll = (await dbInstance.exec("getPoll", { PollId: req.params.Id })).recordset[0] as Poll;
    if (poll && poll.PollId) {
      await dbInstance.exec("deletePoll", { PollId: req.params.Id });
      res.status(200).json({ message: 'Poll deleted successfully' });
    } else {
      res.status(404).json({ message: 'Poll not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
