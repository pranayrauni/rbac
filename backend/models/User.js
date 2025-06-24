import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Enterprise from './Enterprise.js';

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
});

User.belongsTo(Enterprise, { foreignKey: 'enterpriseId' });

export default User;
