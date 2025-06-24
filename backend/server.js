import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./models/index.js";
import authRoutes from "./routes/auth.js";
import seedRolesAndPermissions from "./seeders/initRBAC.js";
import roleRoutes from "./routes/roles.js";
import permissionRoutes from "./routes/permissions.js";
import userRoutes from "./routes/users.js";
import employeeRoutes from "./routes/employees.js";
import enterpriseRoutes from "./routes/enterprises.js";
import productRoutes from "./routes/products.js";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("RBAC system is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/enterprises", enterpriseRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);

sequelize
  .sync()  
  .then(async () => {
    console.log("Database has synced");
    await seedRolesAndPermissions();
    app.listen(process.env.PORT, () =>
      console.log(`Server running at http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("DB Sync Error:", err));
