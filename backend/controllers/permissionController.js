import { Permission } from '../models/index.js';

export const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.json(permissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPermission = async (req, res) => {
  try {
    const { name } = req.body;
    const permission = await Permission.create({ name });
    res.status(201).json(permission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Permission.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Permission not found' });
    res.json({ message: 'Permission deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
