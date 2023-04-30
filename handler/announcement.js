const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res) => {
  let { status } = req.body.input;
  let sent = true;
  let templates = [
    // list of template id
    // "d-8f0ad48760b34ff0b38e0c13a8537216",
    // "d-b9611f042c1740ed9d92e0c68e7295ee",
    // "d-fb95ab303bfa464c9378141c3de3203b",
  ];
  let status_template = "";
  let subscribers = [];
  let subscriber = [];

  switch (status) {
    case "question":
      status_template = templates[0];
      break;
    case "video":
      status_template = templates[1];
      break;
    default:
      sent = false;
      status_template = "";
  }

  try {
    for (
      let subscriber_number = 0;
      subscriber_number < subscribers.length;
      subscriber_number++
    ) {
      subscriber = null; // assingn every subscribers

      const msg = {
        personalizations: [
          {
            to: [
              {
                email: subscriber.email,
                name: subscriber.name,
              },
            ],
          },
        ],
        from: {
          email: process.env.SENDGRID_USER_NAME,
          name: process.env.SENDGRID_NAME,
        },
        dynamic_template_data: {
          subscriberName: subscriber.name,
        },
        template_id: status_template,
      };

      try {
        sgMail
          .send(msg)
          .then(() => {})
          .catch((error) => {
            sent = false;
            console.log("sent failure", error);
            return error;
          });
      } catch (error) {
        console.log(error);
        sent = false;
        return error;
      }
    }
  } catch (error) {
    sent = false;
    console.log(error);
    return error;
  }

  res.send({
    sent: sent,
  });
};


