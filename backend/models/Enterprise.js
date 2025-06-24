import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Enterprise = sequelize.define('Enterprise', {
  name: { type: DataTypes.STRING, allowNull: false },
  location: DataTypes.STRING,
  contactInfo: DataTypes.STRING
});



export default Enterprise;
