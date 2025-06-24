import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Enterprise from './Enterprise.js';

const Employee = sequelize.define("Employee", {
  name: DataTypes.STRING,
  position: DataTypes.STRING,
  department: DataTypes.STRING,
  salary: DataTypes.FLOAT,
  status: {
    type: DataTypes.ENUM("active", "inactive"),
    defaultValue: "active",
  },
  enterpriseId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}); 

Employee.belongsTo(Enterprise, { foreignKey: 'enterpriseId' });

export default Employee;
