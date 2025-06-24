import { User, Role, Enterprise } from '../models/index.js';

export const assignRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;

    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);

    if (!user || !role) return res.status(404).json({ message: 'User or Role not found' });

    await user.addRole(role);

    res.json({ message: `Role '${role.name}' assigned to user '${user.name}'` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const assignUserToEnterprise = async (req, res) => {
  try {
    const { userId, enterpriseId } = req.body;

    const user = await User.findByPk(userId);
    const enterprise = await Enterprise.findByPk(enterpriseId);

    if (!user || !enterprise) {
      return res.status(404).json({ message: 'User or Enterprise not found' });
    }

    user.enterpriseId = enterpriseId;
    await user.save();

    res.json({ message: `User '${user.name}' assigned to Enterprise '${enterprise.name}'` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  await user.update(req.body);
  res.json(user);
};


export const getMe = async (req, res) => {
  const user = req.user; 

  const roles = user.Roles.map(r => r.name);
  const permissions = user.Roles.flatMap(role =>
    role.Permissions.map(p => p.name)
  );

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    enterpriseId: user.enterpriseId,
    roles,
    permissions: [...new Set(permissions)] 
  });
};
