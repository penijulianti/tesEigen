const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dotenv = require("dotenv");
dotenv.config();
const bookRoutes = require("./src/routes/bookRoutes");
const memberRoutes = require("./src/routes/memberRoutes");
const borrowedBookRoutes = require("./src/routes/borrowedBookRoutes");
const swaggerUi = require("swagger-ui-express");
const apiDocumentation = require("./swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDocumentation));
app.use("", bookRoutes);
app.use("", memberRoutes);
app.use("", borrowedBookRoutes);
app.listen(process.env.APP_PORT, () => {
  console.log("Server is running");
});
