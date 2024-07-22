import { Request, Response, RequestHandler } from 'express';
import { v4 as uid } from 'uuid';
import { sqlConfig } from '../config/Index'; // Ensure correct import path
import mssql from 'mssql';
import { RegisterSchema } from '../Helpers/Auth';
import bcrypt from 'bcrypt';
import { Payload, User } from '../Models/auth';
import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const registerUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const UserId = uid();
    const { UserName, Email, Password, Role } = req.body;

    const { error } = RegisterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const hashPassword = await bcrypt.hash(Password, 10);
    let pool = await mssql.connect(sqlConfig);

    await pool.request()
      .input('UserId', mssql.VarChar, UserId)
      .input('UserName', mssql.VarChar, UserName)
      .input('Email', mssql.VarChar, Email)
      .input('Password', mssql.VarChar, hashPassword)
      .input('Role', mssql.VarChar, Role)  // Add role here
      .execute('addUser');

    return res.status(201).json({ Message: 'User added successfully' });
  } catch (error: any) {
    return res.status(500).json({ Message: error.message });
  }
};


export const getAllUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    let pool = await mssql.connect(sqlConfig);
    let result = await pool.request().execute('getAllUsers');

    let users: User[] = result.recordset;
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ Message: error.message });
  }
};

export const updateUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { UserId, UserName, Email, Role, Status, Password } = req.body;

    let pool = await mssql.connect(sqlConfig);
    await pool.request()
      .input('UserId', mssql.VarChar, UserId)
      .input('UserName', mssql.VarChar, UserName)
      .input('Email', mssql.VarChar, Email)
      .input('Role', mssql.VarChar, Role)  
      .input('Status', mssql.VarChar, Status)
      .input('Password', mssql.VarChar, Password)
      .execute('updateUser');

    return res.status(200).json({ Message: 'User updated successfully' });
  } catch (error: any) {
    return res.status(500).json({ Message: error.message });
  }
};


export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { UserId } = req.body;

    let pool = await mssql.connect(sqlConfig);
    await pool.request()
      .input('UserId', mssql.VarChar, UserId)
      .execute('deleteUser');

    return res.status(200).json({ Message: 'User deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ Message: error.message });
  }
};

export const loginUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { Email, Password } = req.body;

    let pool = await mssql.connect(sqlConfig);
    let result = await pool.request()
      .input('Email', mssql.VarChar, Email)
      .execute('getUser');

    let user: User = result.recordset[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    const isValid = await bcrypt.compare(Password, user.Password);

    if (isValid) {
      const payload: Payload = {
        sub: user.UserId,
        UserName: user.UserName,
        Role: user.Role  // Add role here
      };
      const token = await jwt.sign(payload, process.env.SECRET as string, { expiresIn: '4h' });
      return res.status(200).json({ Message: 'Login Successful', token });
    } else {
      return res.status(401).json({ Message: 'Invalid Credentials' });
    }
  } catch (error: any) {
    return res.status(500).json({ Message: error.message });
  }
};

