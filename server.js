// main server will be written down here
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const multer  = require('multer');
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const questionsRouter = require("./routes/questions");
const subscribersRouter = require("./routes/subscribers");
const contentsRouter = require("./routes/contents");
const respondersRouter = require("./routes/responders");
const winnersRouter = require("./routes/winners");
const ideasRouter = require("./routes/ideas");
const userRouter = require('./routes/user');
const db = require("./models");
const upload = require("./handler/upload");
const notify  = require("./handler/notify");
const login = require("./handler/login");
const { sendEmailToSubscribers, scheduleEmailSending } = require('./controller/email'); // Import functions from emailSender.js

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const PORT = process.env.PORT || 5000;

// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: "50MB" })); // file upload limit
app.use(express.json());

// SERVER STARTER
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

scheduleEmailSending();


// 3) ROUTER    FIXME:
app.use("/api/v1/questions", questionsRouter); //  if the number of question is 4 in that day it should prenvent from adding that questiont to db
app.use("/api/v1/all_question", questionsRouter); // for the next version     ============> needs middleware for admin authentication
app.use("/api/v1/subscribers", subscribersRouter); //  for subscribtion
app.use("/api/v1/contents", contentsRouter); // for landing page content creation
app.use("/api/v1/response", respondersRouter); // question answering route and need meddleware to check whether the question is available for now or not
app.use("/api/v1/winners", winnersRouter); // winners list route
app.use("/api/v1/ideas", ideasRouter); // idea routes
app.use('/api/v1/user', userRouter);
// app.use("/api/v1/upload", upload);
app.get("/api/v1/notify", notify);
app.post("/api/v1/upload", upload);
app.post("/api/v1/login", login);
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "FAIL",
    message: `CAN'T FIND ${req.originalUrl} ON THE SERVER`,
  });
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.listen(PORT, () => {
  console.log(`server running on ${PORT}...`);
});
