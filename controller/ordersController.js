const Order = require("../model/orders");
const TotalRevenue = require("../model/revenue");
exports.getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    if (orders) {
      res.status(200).json({
        success: true,
        orders,
      });
    }
    console.log(orders);
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

exports.getUserOrder = async (req, res) => {
  try {
    const { id } = req.body;
    const orders = await Order.find({ user_id: id });
    if (orders) {
      res.status(200).json({
        success: true,
        orders,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

exports.GetOrder = async (req, res) => {
  const { order_id } = req.body;
  try {
    const order = await Order.findById(order_id);
    if (order) {
      res.status(200).json({
        status: true,
        order,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

exports.calculateTotalRevenue = async () => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$TotalAmount" },
        },
      },
    ]);

    const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
    return totalRevenue;
  } catch (error) {
    console.error("Error calculating total revenue:", error);
    throw error;
  }
};

exports.updateTotalRevenue = async () => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$TotalAmount" },
        },
      },
    ]);
    const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;

    const totalRevenueAmount = await TotalRevenue.create({
      totalRevenue: totalRevenue,
    });
    return totalRevenueAmount;
  } catch (error) {
    console.error("Error calculating total revenue:", error);
    throw error;
  }
};
