import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_URL, {
  dialect: 'mysql',
  logging: false,
  }
); 

export default sequelize;
