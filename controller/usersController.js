const User = require("../model/users");

exports.getUserData = async (req, res) => {
  try {
    const { user_id } = req.body;
    const user = await User.findById(user_id);
    if (user) {
      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await User.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "CustomerID",
          foreignField: "CustomerID",
          as: "orders",
        },
      },
      {
        $project: {
          customerId: "$CustomerID",
          customerName: "$Name",
          numberOfOrders: { $size: "$orders" },
          registeredDate: "$_id",
        },
      },
      { $sort: { registeredDate: -1 } },
    ]);

    res.status(200).json({
      success: true,
      customers,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to fetch customers",
    });
  }
};

exports.createUsers = async (req, res) => {
  const { Email, Name } = req.body;

  try {
    const user = await User.findOne({ Email: Email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }
    const newUser = await User.create({ Email, Name });
    if (newUser) {
      res.status(200).json({
        success: true,
        user: newUser,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};
