import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Permission = sequelize.define('Permission', {
  name: { type: DataTypes.STRING, unique: true },
});

export default Permission;
