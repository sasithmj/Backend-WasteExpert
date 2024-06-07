const app = require("./app");
const db = require("./config/DBconfig");
const userModel=require("./models/Usermodel")
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world!!!");
});

app.listen(port, () => {
  console.log(`Server is runnnig on port ${port}`);
});
