const app = require("./app");
const db = require("./config/DBconfig");
const userModel = require("./models/Usermodel");
const express = require("express");
const path = require("path");

const port = 3001;
// const SchedulePickupModel=require("./models/SchedulePickupModel")
GOOGLE_APPLICATION_CREDENTIALS =
  "C:UserssasitDesktopProject 02Backendgoogle.json";

app.get("/", (req, res) => {
  res.send("Hello world !!!");
});

app.get("/aaa", (req, res) => {
  res.send("Hello world a !!!");
});

app.get("/she", (req, res) => {
  const { formdata } = req.body;
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`Server is runnnig on port ${port}`);
});

// const vision = require("@google-cloud/vision");

// const CREDENTIALS = JSON.parse(
//   JSON.stringify({
//     type: "service_account",
//     project_id: "famous-cursor-387802",
//     private_key_id: "95e4727a1ddb77ed72d44c0301ef1af8d5abfe49",
//     private_key:
//       "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDufktxc2LxBHUx\njq9N7oljeaPG3ntnTw4pdTaTW/efejohcSBvclGmppuAHwQkWenY74D4NP+ChhXn\nMpzIYzy8T6ai4oYZMgDjLDmhLhLxsYGgSG8W7UOKDbGzB0jDjxvUN9Bnw/fS5uAa\ncHcDhr9+buTV6l41lKkgbkSvyidT5ZQiYY7twG0Q7N+B6wiUbvDoFPeB9Vs9ZHPm\ntv3ovjMVeBh/MYokzNTEhMn+pWUQyTlLKNh2KecPT0oapXRCbdK62H899zzqUoD0\nHdZiUe3yVp/rj1WQxReDLPFEpjdqKlTUHMxeCclZ3I3NskBLh3/YE5usuKZoaVz4\nCyybdB1zAgMBAAECggEABIilpPaeFTb045DhbCy1SruXkGhmPp4dWDc8FYCbqVne\niAhPSfNyWr0WLFEe/eZ2Z6M1lMJbWJN1hH/eft2his/P6aYnw6MgHxotWnfTny+d\n0AB033Nixp9mqIliUoFlXUPtdBT98fHZvLEdos966oueIwvTOUugOujq0aE79G7O\nIVXpw+foX9o5t9A1bu1bqj36pqQzMuAg38SfnSLhfdvyovgCXJOifo/dKWJ9V15x\n6tiFN/I8KLZxbzko5EQzwMDkMQE26MhdyFmJ1mFoG6YeE9LWSmbn9QXUjwJk05IG\nL2CqrbmfxshJa/QlPakb6NSdtPjUnefPd63jL3n6lQKBgQD+mEV+BHzXWNlmXQ9y\njP9iq6n/huX10PaqOueWtPAxQAI+1Jyo4Iycf0q4Gyf1o5EtqPJhmU+oMN0pilqh\nGVHBz7cBreKECRoLrFbOc7eW/XIG5QhbzzxM65tqV5OLpLGc4NDjv0qOrn66gdYR\nzHBkB+/iwUz5VDWXQ+9DUdm6BwKBgQDvz0XSua20T2Q7JX0/g0L5vMtl6m2fdyie\n2Y7XYN8N7S/inM2ZZ9sNkwCJRwX1UQmRG5uv9KRGsBuXBEQwQhfxc6lJZGrHp/5n\n7S3MQbwYxzYeETOmETOS/KvBdvp6DXUlFvpNitZYaJKQU2lj86Wc/2UJ4Rn/jJ59\nOi+9aHwWNQKBgGTv/AU1REWgnTifRqOU0R/OjWyYkA2AVnsxNWYjwGLWTM2aP64Y\nsMbPFNGfOp2BxupCZC5buSAml1iD2OCsCCT99EF/LiJI9YGRRy085ZnAS/f9z+2O\nYQriElD7/axMlHptC4Rv7+BXwDizhyqxUhHmr63IE3t6bnDVZ0PabKb7AoGATyAc\n8cLCRdRMRhfAk8xDtRNOKXqIYS14AbHXJ8mWz4mLW0JRtGRIKtpuOt1sYd0zQuXR\nIOWfrpM9Bz8pIKMuM0TufoDbmrUbhD8F9XdbEPHqMVGLsSfL1Jv6MAOJ8euu02YZ\ngKxmvRUEBwr+ozQpWPwL4o6bfW5wfPFN/zkSeGECgYEA8KHQokGHnwNWy99fPCmb\nfqsYZj6qWLQO9SL2kQ+XQjDKVNvGvujPmPhMv0B0kKyVVrAB+G+WKaOqF8m35evy\nxL0Su0SAa6ti/rbzHc6wboh9p0GdG47MiawaZ/GdicRJxgy0XsVSxApp6UBv+vHx\nHsOG4jU8pAS+up2NXNzmCZ0=\n-----END PRIVATE KEY-----\n",
//     client_email:
//       "famous-cursor-387802@famous-cursor-387802.iam.gserviceaccount.com",
//     client_id: "109019471329135594224",
//     auth_uri: "https://accounts.google.com/o/oauth2/auth",
//     token_uri: "https://oauth2.googleapis.com/token",
//     auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//     client_x509_cert_url:
//       "https://www.googleapis.com/robot/v1/metadata/x509/famous-cursor-387802%40famous-cursor-387802.iam.gserviceaccount.com",
//     universe_domain: "googleapis.com",
//   })
// );

// const CONFIG = {
//   credentials: {
//     private_key: CREDENTIALS.private_key,
//     client_email: CREDENTIALS.client_email,
//   },
// };

// const client = new vision.ImageAnnotatorClient(CONFIG);

// const detectLandmark = async (file_path) => {
//   let [result] = await client.landmarkDetection(file_path);
//   console.log(result);
// };
// const detectItems = async (file_path) => {
//   let [result] = await client.objectLocalization(file_path);
//   console.log(result);
// };

// const detectText = async (file_path) => {
//   let [result] = await client.textDetection(file_path);
//   console.log(result.fullTextAnnotation);
// };

// detectItems("01.jpg");
