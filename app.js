const express = require("express");
const app = express();
const webpush = require("web-push");
const cors = require("cors");

const port = process.env.PORT || 4000;

const apiKeys = {
  publicKey:
    "BF9h2-vsgcn3oitYD1Hwf5vGQXJNEshGCy8MmCf_ToRe7qDrYTiFDgux8h0qB3l3hjrZtVpwajXNgBfKnWUD0cI",
  privateKey: "gHsjw1FDGD963Ja6Ov69_Tmq5Q7FInQTsExaDmchTcs",
};

webpush.setVapidDetails(
  "mailto:shivamgoyal@tutedude.com",
  apiKeys.publicKey,
  apiKeys.privateKey
);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

const subDatabase = [];

app.post("/save-subscription", (req, res) => {
  subDatabase.push(req.body);

  console.log(subDatabase);
  res.json({ status: "Success", message: "Subscription saved!" });
});
const sendNotification = (subscription, payload) => {
  webpush
    .sendNotification(subscription, payload)
    .then(() => console.log("Notification sent successfully"))
    .catch((error) => console.error("Error sending notification:", error));
};
app.get("/send-notification", (req, res) => {
  const payload = JSON.stringify({
    title: "Notification Title",
    body: "Hello world!",
  });
  subDatabase.forEach((subscription) => {
    sendNotification(subscription, payload);
  });
  res.json({ status: "Success", message: "Message sent to push service" });
});

app.listen(port, () => {
  console.log("Server running on port 4000!");
});
