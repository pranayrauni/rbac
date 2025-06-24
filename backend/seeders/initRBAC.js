import { Role, Permission, RolePermission } from "../models/index.js";

const seedRolesAndPermissions = async () => {
  const roles = ["Admin", "Manager", "Employee"];
  const permissions = [
    "create_user",
    "view_user",
    "delete_user",
    "manage_roles",
    "add_employee",
    "view_employee",
    "edit_employee",
    "delete_employee",
    "create_enterprise",
    "view_enterprise",
    "edit_enterprise",
    "delete_enterprise",
    "create_product",
    "view_product",
    "edit_product",
    "delete_product",
    "assign_user",
    'edit_user',
  ];

  
  const roleRecords = {};
  for (const name of roles) {
    const [role] = await Role.findOrCreate({ where: { name } });
    roleRecords[name] = role;
  }

  const permissionRecords = {};
  for (const name of permissions) {
    const [perm] = await Permission.findOrCreate({ where: { name } });
    permissionRecords[name] = perm;
  }

  await roleRecords.Admin.setPermissions(Object.values(permissionRecords));

  await roleRecords.Manager.setPermissions([
    permissionRecords.view_user,
    permissionRecords.view_employee,
    permissionRecords.edit_employee,
    permissionRecords.add_employee,
  ]);

  await roleRecords.Employee.setPermissions([permissionRecords.view_employee]);

  console.log("Roles and permissions seeded");
};

export default seedRolesAndPermissions;
