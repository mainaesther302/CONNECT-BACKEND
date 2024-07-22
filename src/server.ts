import express,{json} from 'express';
import authRoutes from './Router/Auth';
import viewRoutes from './Router/views';
import incidentsRoutes from './Router/Incident';
import pollsrouter from './Router/polls';
import questionsrouter from './Router/Question';
import optionsrouter from './Router/options';
import { authorize } from './MiddleWare';

const app = express();

app.use(json());

app.use('/auth',authRoutes);
app.use('/view',viewRoutes);
app.use('/incident', incidentsRoutes)
app.use('/polls', pollsrouter);
app.use('/questions', questionsrouter);
app.use('/options', optionsrouter)


app.listen(4000, () => {console.log('Server Running on port 4000...')});