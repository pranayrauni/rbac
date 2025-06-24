import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Employee = sequelize.define('Employee', {
  name: DataTypes.STRING,
  position: DataTypes.STRING,
  department: DataTypes.STRING,
  salary: DataTypes.FLOAT
});

export default Employee;
