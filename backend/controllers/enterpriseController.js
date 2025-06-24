import { Enterprise, User } from '../models/index.js';

export const createEnterprise = async (req, res) => {
  const { name, location, contactInfo } = req.body;
  const enterprise = await Enterprise.create({ name, location, contactInfo });
  res.status(201).json(enterprise);
};

export const getEnterprises = async (req, res) => {
  const list = await Enterprise.findAll({ include: User });
  res.json(list);
};

export const updateEnterprise = async (req, res) => {
  const { id } = req.params;
  const enterprise = await Enterprise.findByPk(id);
  if (!enterprise) return res.status(404).json({ message: 'Not found' });
  await enterprise.update(req.body);
  res.json(enterprise);
};

export const deleteEnterprise = async (req, res) => {
  const { id } = req.params;
  const count = await Enterprise.destroy({ where: { id } });
  if (!count) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Enterprise deleted' });
};
