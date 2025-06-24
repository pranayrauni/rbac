import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const PasswordResetToken = sequelize.define('PasswordResetToken', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  token: { type: DataTypes.STRING, allowNull: false },
  expiresAt: { type: DataTypes.DATE, allowNull: false }
});

export default PasswordResetToken;
