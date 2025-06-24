import { Product, Enterprise } from '../models/index.js';

export const createProduct = async (req, res) => {
  const { name, sku, price, category, status, enterpriseId } = req.body;

  const enterprise = await Enterprise.findByPk(enterpriseId);
  if (!enterprise) return res.status(404).json({ message: 'Enterprise not found' });

  const product = await Product.create({ name, sku, price, category, status, enterpriseId });
  res.status(201).json(product);
};

export const getProducts = async (req, res) => {
  const products = await Product.findAll({ include: Enterprise });
  res.json(products);
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  await product.update(req.body);
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const count = await Product.destroy({ where: { id } });
  if (!count) return res.status(404).json({ message: 'Product not found' });

  res.json({ message: 'Product deleted' });
};
