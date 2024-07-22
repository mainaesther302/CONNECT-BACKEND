import express from 'express';
import {
  AddOption,
  GetOptionsByQuestionId,
  GetOption,
  UpdateOption,
  DeleteOption
} from '../Controllers/options';

const optionsrouter = express.Router();

optionsrouter.post('/', AddOption);
optionsrouter.get('/:questionId', GetOptionsByQuestionId);
optionsrouter.get('/:id', GetOption);
optionsrouter.put('/:id', UpdateOption);
optionsrouter.delete('/:id', DeleteOption);

export default optionsrouter;
