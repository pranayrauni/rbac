import { Role, Permission } from '../models/index.js';

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({ include: Permission });
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = await Role.create({ name });
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Role.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Role not found' });
    res.json({ message: 'Role deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
