import * as authService from '../services/auth.service.js';

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await authService.validateUser(username, password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const token = authService.generateToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};
