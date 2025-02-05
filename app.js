const express = require("express");
const userRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");
const app = express();
const cors = require("cors");
const cron = require("node-cron");
const controller = require("./controller/ordersController");
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

cron.schedule("0 * * * * *", async () => {
  try {
    const orders = await controller.calculateTotalRevenue();
    if (orders) {
      await controller.updateTotalRevenue();
    }
  } catch (error) {
    console.error("Error updating total revenue:", error);
  }
});
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/order", orderRoutes);
module.exports = app;
