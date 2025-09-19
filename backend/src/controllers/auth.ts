import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getEnv } from '../utils/env';

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name)
    return res.status(400).json({ message: 'Email, password, and name are required' });

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  const jwtSecret = getEnv('JWT_SECRET');
  const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

  res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

  const jwtSecret = getEnv('JWT_SECRET');
  const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
};