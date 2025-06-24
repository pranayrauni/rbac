import sequelize from '../config/db.js';

const RolePermission = sequelize.define('RolePermission', {}, { timestamps: false });

export default RolePermission;
