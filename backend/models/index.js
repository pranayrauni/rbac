import sequelize from '../config/db.js';
import User from './User.js';
import Role from './Role.js';
import Permission from './Permission.js';
import UserRole from './UserRole.js';
import RolePermission from './RolePermission.js';
import Employee from './Employee.js';
import Enterprise from './Enterprise.js';
import Product from './Product.js';
import PasswordResetToken from './PasswordResetToken.js';





User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

Role.belongsToMany(Permission, { through: RolePermission });
Permission.belongsToMany(Role, { through: RolePermission });

User.belongsTo(Enterprise, { foreignKey: 'enterpriseId' });
Enterprise.hasMany(User, { foreignKey: 'enterpriseId' });

Enterprise.hasMany(Product, { foreignKey: 'enterpriseId' });
Product.belongsTo(Enterprise, { foreignKey: 'enterpriseId' });

PasswordResetToken.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(PasswordResetToken, { foreignKey: 'userId' });


export {
  sequelize,
  User,
  Role,
  Permission,
  UserRole,
  RolePermission,
  Employee,
  Enterprise,
  Product,
  PasswordResetToken,
};
