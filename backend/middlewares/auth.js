import jwt from 'jsonwebtoken';
import { User, Role, Permission } from '../models/index.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Token missing' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id, {
      include: {
        model: Role,
        include: Permission,
      },
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorize = (permissionName) => {
  return (req, res, next) => {
    const hasPermission = req.user.Roles.some(role =>
      role.Permissions.some(p => p.name === permissionName)
    );

    if (!hasPermission) {
      return res.status(403).json({ message: 'Forbidden: Permission denied' });
    }

    next();
  };
};
