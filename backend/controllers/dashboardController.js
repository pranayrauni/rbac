import { User, Employee, Product, Enterprise } from '../models/index.js';

export const getDashboardData = async (req, res) => {
  const user = req.user;

  const isAdmin = user.Roles.some(r => r.name === 'Admin');

  const [employeeCount, productCount, activeCount, inactiveCount] = await Promise.all([
    Employee.count(),
    Product.count(),
    Product.count({ where: { status: 'active' } }),
    Product.count({ where: { status: 'inactive' } })
  ]);

  let enterpriseCount = 0;
  let userCount = 0;

  if (isAdmin) {
    enterpriseCount = await Enterprise.count();
    userCount = await User.count();
  }

  res.json({
    user: {
      id: user.id,
      name: user.name,
      roles: user.Roles.map(r => r.name)
    },
    stats: {
      employees: employeeCount,
      products: {
        total: productCount,
        active: activeCount,
        inactive: inactiveCount
      },
      ...(isAdmin && {
        enterprises: enterpriseCount,
        users: userCount
      })
    }
  });
};
