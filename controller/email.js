require("dotenv").config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const db = require("../models");
const Subscribers = db.subscribers;

const subscribers = [];

Subscribers.findAll({ attributes: ['email'] })
  .then((data) => {
    data.forEach((subscriber) => {
      subscribers.push(subscriber.email);
    });
  })
  .catch((err) => {
    console.error(err.message || "Some error occurred while retrieving subscribers.");
  });

const sendEmailToSubscribers = () => {
  console.log(subscribers);
  const msg = {
    to: subscribers,
    from: 'youtube@eyoo.fun',
    subject: 'New Reward Question Ready on Eyoo Tube!',
    text: 'New Reward Question Ready on Eyoo Tube!',
    html: `
          <p>Dear Subscriber,</p>
          <p>We're excited to announce that a new reward question is now available on Eyoo Tube! 
            Be sure to check it out and see if you can earn some rewards.</p>
          <p>Thank you for your continued support and participation on our platform.</p>
          <p>Best regards,</p>
          <p>The Eyoo Tube Team</p>
          `,
  };

  sgMail.send(msg)
    .then(() => {
      console.log('Email sent to all subscribers');
    })
    .catch((error) => {
      console.error(error.toString());
    });
};

const scheduleEmailSending = () => {
  const now = new Date();
  const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9,23, 0); // 5:58 pm
  const timeToScheduledTime = scheduledTime.getTime() - now.getTime();

  if (timeToScheduledTime > 0) {
    setTimeout(() => {
      sendEmailToSubscribers();
      setInterval(sendEmailToSubscribers, 24 * 60 * 60 * 1000); // Repeat every day
    }, timeToScheduledTime);
  } else {
    // Scheduled time has already passed, schedule for tomorrow
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const scheduledTimeTomorrow = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 17, 58, 0); // 5:58 pm
    const timeToScheduledTimeTomorrow = scheduledTimeTomorrow.getTime() - now.getTime();

    setTimeout(() => {
      sendEmailToSubscribers();
      setInterval(sendEmailToSubscribers, 24 * 60 * 60 * 1000); // Repeat every day
    }, timeToScheduledTimeTomorrow);
  }
};

module.exports = { sendEmailToSubscribers, scheduleEmailSending };
