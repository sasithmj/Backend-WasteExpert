const admin = require("firebase-admin");

class NotificationService {
  static async sendNotification(token, title, body) {
    const message = {
      notification: {
        title: title,
        body: body,
      },
      token: token, // Use the token parameter
    };

    try {
      const response = await admin.messaging().send(message);
      console.log("Successfully sent message:", response);
      return { success: true, message: response };
    } catch (error) {
      console.log("Error sending message:", error);
      return { success: false, message: error.message };
    }
  }
}

module.exports = NotificationService;
