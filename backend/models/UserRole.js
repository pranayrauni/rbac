import sequelize from '../config/db.js';

const UserRole = sequelize.define('UserRole', {}, { timestamps: false });

export default UserRole;
