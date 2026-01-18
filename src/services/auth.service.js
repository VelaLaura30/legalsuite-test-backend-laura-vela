import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

if (!env.jwtSecret) {
  throw new Error('JWT secret no está definido en el archivo .env');
}

export const validateUser = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password);
  return valid ? user : null;
};

export const generateToken = (user) => {
  if (!user) throw new Error('Usuario inválido para generar token');
  return jwt.sign(
    { id: user.id, role: user.role },
    env.jwtSecret,
    { expiresIn: '1d' }
  );
};
