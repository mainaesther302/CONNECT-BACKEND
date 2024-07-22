import { Router } from 'express';
import { loginUser, registerUser, updateUser, deleteUser, getAllUsers } from '../Controllers/Auth';
import { authorize } from '../MiddleWare/index';

const authRoutes = Router();

// Register new user (No authorization needed)
authRoutes.post('/register', registerUser);

// Login user (No authorization needed)
authRoutes.post('/login', loginUser);

// Routes that require authentication and specific roles
authRoutes.get('/users', authorize(['Admin']), getAllUsers); 
authRoutes.put('/update', authorize(['Admin']), updateUser); 
authRoutes.delete('/delete', authorize(['Admin']), deleteUser); 

export default authRoutes;
