import { Employee } from '../models/index.js';

export const getEmployees = async (req, res) => {
  const employees = await Employee.findAll();
  res.json(employees);
};

export const createEmployee = async (req, res) => {
  const employee = await Employee.create(req.body);
  res.status(201).json(employee);
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findByPk(id);

  if (!employee) return res.status(404).json({ message: 'Not found' });

  await employee.update(req.body);
  res.json(employee);
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const deleted = await Employee.destroy({ where: { id } });

  if (!deleted) return res.status(404).json({ message: 'Not found' });

  res.json({ message: 'Employee deleted' });
};
