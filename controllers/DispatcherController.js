const DispatcherService = require("../services/DispatcherService");

exports.addDispatcher = async (req, res, next) => {
  console.log("addDispatcher function invoked");

  try {
    const { username, password, fullName, address, phoneNum, email } = req.body.formData;
    console.log("Request Body:", req.body);

    const newDispatcher = await DispatcherService.addDispatcher({
      username,
      password,
      fullName,
      address,
      phoneNum,
      email,
    });

    console.log("Service Response:", newDispatcher);

    if (newDispatcher.success) {
      console.log("Success: New Dispatcher added successfully");
      return res
        .status(201)
        .json({ status: true, success: newDispatcher.message });
    } else {
      console.error("Error: Adding new Dispatcher failed:", newDispatcher.message);
      return res
        .status(400)
        .json({ status: false, error: newDispatcher.message });
    }
  } catch (error) {
    console.error("Error in addDispatcher controller:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};
