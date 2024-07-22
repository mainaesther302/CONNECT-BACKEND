import express from 'express';
import {
  AddQuestion,
  GetQuestionsByPollId,
  GetQuestion,
  UpdateQuestion,
  DeleteQuestion
} from '../Controllers/Questions';

const questionsrouter = express.Router();

questionsrouter.post('/', AddQuestion);
questionsrouter.get('/:pollId', GetQuestionsByPollId);
questionsrouter.get('/:id', GetQuestion);
questionsrouter.put('/:id', UpdateQuestion);
questionsrouter.delete('/:id', DeleteQuestion);

export default questionsrouter;
