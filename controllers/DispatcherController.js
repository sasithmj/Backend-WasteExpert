const DispatcherService = require("../services/DispatcherService");


exports.dispatcherLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Attempt to login dispatcher
    const loginResult = await DispatcherService.dispatcherLogin(email, password);

    // Handle login result
    if (loginResult.success) {
      res.status(200).json({ status: true, token: loginResult.token });
    } else {
      res.status(401).json({ status: false, error: loginResult.error });
    }
  } catch (error) {
    console.error("Error in dispatcherLogin controller:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

exports.addDispatcher = async (req, res, next) => {
  console.log("addDispatcher function invoked");

  try {
    const { username, password, fullName, address, phoneNum, email } = req.body;
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

exports.getAllDis = async (req, res, next) => {
  try {
    const { username, fullName, address, phoneNum, email } = req.body;

    // Log the received request body
    console.log("Request Body:", req.body);

    const successRes = await DispatcherService.getAllDis(
      username, 
      fullName, 
      address, 
      phoneNum, 
      email
    );
    // Log the success response
    console.log("Success Response:", successRes);

    if (successRes.success) {
      res.status(201).json({
        status: true,
        dispatchers: successRes.dispatchers,
      });
    } else {
      res.status(400).json({ status: false, error: successRes.message });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};