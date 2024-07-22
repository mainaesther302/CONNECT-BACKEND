import express from 'express';
import {
  AddPoll,
  GetPolls,
  GetPoll,
  UpdatePoll,
  DeletePoll
} from '../Controllers/Polls';

const pollsrouter = express.Router();

pollsrouter.post('/addpoll', AddPoll);
pollsrouter.get('/', GetPolls);
pollsrouter.get('/:id', GetPoll);
pollsrouter.put('/:id', UpdatePoll);
pollsrouter.delete('/:id', DeletePoll);

export default pollsrouter;
