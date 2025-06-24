import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  sku: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  category: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' }
});

export default Product;
