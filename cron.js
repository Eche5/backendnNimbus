const cron = require("node-cron");
const controller = require("./controller/ordersController");

cron.schedule("* * * * * *", async () => {
  try {
    const orders = await controller.calculateTotalRevenue();
    let totalRevenue = 0;
    if (orders.length > 0) {
      totalRevenue = orders?.reduce((sum, order) => sum + order.TotalAmount, 0);
    }
    // await updateTotalRevenueInDB(totalRevenue);

  } catch (error) {
    console.error("Error updating total revenue:", error);
  }
});
