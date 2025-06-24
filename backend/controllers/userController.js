import { User, Role, Enterprise, Permission } from '../models/index.js';

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
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        {
          model: Enterprise,
          attributes: ['name']
        },
        {
          model: Role,
          include: [Permission]
        }
      ]
    });

    const roles = user.Roles.map(r => r.name);
    const permissions = user.Roles.flatMap(role =>
      role.Permissions.map(p => p.name)
    );

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      enterprise: user.Enterprise?.name || null,
      roles,
      permissions: [...new Set(permissions)]
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        { model: Role, attributes: ['name'] },
        { model: Enterprise, attributes: ['name'] }
      ],
      attributes: ['id', 'name', 'email', 'enterpriseId']
    })
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
} 


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await User.destroy({ where: { id } })
    if (!deleted) return res.status(404).json({ message: 'User not found' })
    res.json({ message: 'User deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
