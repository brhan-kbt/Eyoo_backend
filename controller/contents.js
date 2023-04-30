const db = require("../models");
const Content = db.content;
require("dotenv").config();
const Subscribers = db.subscribers;
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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

 

// exports.update = async (req, res) => {
//     const updated = req.body.updated
//     const content = {
//         daily_quote: req.body.daily_quote ? req.body.daily_quote: null,
//         main_image: req.body.main_image ? req.body.main_image : null,
//         video_link_1: req.body.video_link_1 ? req.body.video_link_1 : null,
//         video_link_2: req.body.video_link_2 ? req.body.video_link_2: null,
//       };

//       switch(updated){
//         case "quote": // then update the daily quote section
//           await Content.update(
//             {
//               daily_quote: content.daily_quote
//             },
//             {
//               where: { id : "fb870029-c941-4d43-9804-7831f36d6c73"}
//             }
//           ).then(() => {
//             res.status(200).send({
//                 message: "Quote updated successfully",
//             });
//             })
//             .catch((err) => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred.",
//             });
//             });
//             break;
//         case "image": // then update main image section
//         if(content.main_image)
//             await Content.update(
//               {
//                 main_image: content.main_image
//               },
//               {
//                 where: { id : "fb870029-c941-4d43-9804-7831f36d6c73"}
//               }
//             ).then(() => {
//               res.status(200).send({
//                   message: "image updated successfully",
//               });
//               })
//               .catch((err) => {
//               res.status(500).send({
//                   message: err.message || "Some error occurred.",
//               });
//               });
//         else{
//           res.status(500).send({
//             message: "no_image_link_available",
//         });
//         }
        
//             break;
//         case "video_link_1": // then update video_link_1 section
//           await Content.update(
//             {
//               video_link_1: content.video_link_1
//             },
//             {
//               where: { id : "fb870029-c941-4d43-9804-7831f36d6c73"}
//             }
//             ).then(() => {
//               res.status(200).send({
//                   message: "video_1_updated_successfully",
//               });
//               })
//               .catch((err) => {
//               res.status(500).send({
//                   message: err.message || "Some error occurred.",
//               });
//               });
//             break;
//         case "video_link_2": // then update video_link_2 section
//             await Content.update(
//               {
//                 video_link_2: content.video_link_2
//               },
//               {
//                 where: { id : "fb870029-c941-4d43-9804-7831f36d6c73"}
//               }
//               ).then(() => {
//                 res.status(200).send({
//                     message: "video_2_updated_successfully",
//                 });
//                 })
//                 .catch((err) => {
//                 res.status(500).send({
//                     message: err.message || "Some error occurred.",
//                 });
//                 });
//               break;
//         default: 
//         res.status(500).send({ message: "updated_content_not_specified"}) 
//       }
// }

// exports.update = async (req, res) => {
//   const updated = req.body.updated
//   const content = {
//       daily_quote: req.body.daily_quote ? req.body.daily_quote: null,
//       main_image: req.body.main_image ? req.body.main_image : null,
//       video_link_1: req.body.video_link_1 ? req.body.video_link_1 : null,
//       video_link_2: req.body.video_link_2 ? req.body.video_link_2: null,
//   };

//   switch(updated){
//       case "quote": // then update the daily quote section
//           await Content.update(
//               { daily_quote: content.daily_quote },
//               { where: { id : req.body.id } }
//           ).then(() => {
//               res.status(200).send({
//                   message: "Quote updated successfully",
//               });
//           })
//           .catch((err) => {
//               res.status(500).send({
//                   message: err.message || "Some error occurred.",
//               });
//           });
//           break;
//       case "image": // then update main image section
//           if(content.main_image){
//               await Content.update(
//                   { main_image: content.main_image },
//                   { where: { id : req.body.id } }
//               ).then(() => {
//                   res.status(200).send({
//                       message: "Image updated successfully",
//                   });
//               })
//               .catch((err) => {
//                   res.status(500).send({
//                       message: err.message || "Some error occurred.",
//                   });
//               });
//           } else {
//               res.status(500).send({
//                   message: "No image link available",
//               });
//           }
//           break;
//       case "video_link_1": // then update video_link_1 section
//           await Content.update(
//               { video_link_1: content.video_link_1 },
//               { where: { id : req.body.id } }
//           ).then(() => {
//               res.status(200).send({
//                   message: "Video 1 updated successfully",
//               });
//           })
//           .catch((err) => {
//               res.status(500).send({
//                   message: err.message || "Some error occurred.",
//               });
//           });
//           break;
//       case "video_link_2": // then update video_link_2 section
//           await Content.update(
//               { video_link_2: content.video_link_2 },
//               { where: { id : req.body.id } }
//           ).then(() => {
//               res.status(200).send({
//                   message: "Video 2 updated successfully",
//               });
//           })
//           .catch((err) => {
//               res.status(500).send({
//                   message: err.message || "Some error occurred.",
//               });
//           });
//           break;
//       default: 
//           res.status(500).send({ message: "Updated content not specified"}) 
//   }
// }

exports.update = async (req, res) => {
 
  const content = req.body;
  const id = req.params.id;

  // Update the database with the new content
  await Content.update(content, {
    where: { id: id },
  })
    .then(() => {
      res.status(200).send({
        message: "Content updated successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while updating the content.",
      });
    });
};


/* create and save new subscribers */
exports.create = (req, res) => {

  //  const msg = {
   //  to: 'berhanukebito05@gmail.com', // Change to your recipient
     //from: 'em9449.eyoo.fun', // Change to your verified sender
    // subject: 'Sending with SendGrid is Fun',
     //text: 'and easy to do anywhere, even with Node.js',
     //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  //  }

    const content = {
        daily_quote: req.body.daily_quote,
        main_image: req.body.main_image,
        video_link_1: req.body.video_link_1,
        video_link_2: req.body.video_link_2
      };
    
      
      const msg = {
        to: subscribers, // Change to your recipient
        from: 'youtube@eyoo.fun', // Change to your verified sender
        subject: 'New video to our Eyoo YouTube channel',
        text: 'New video to our Eyoo YouTube channel',
        html: `
             p>We are excited to announce that we have just uploaded a new video to our Eyoo YouTube channel! 
             Check it out at the following link:</p>
            <p><a href="${req.body.video_link_1}" class="button">Watch Now</a></p>
            <p><a href="${req.body.video_link_2}" class="button">Watch Now</a></p>
            <p>Thank you for subscribing to our channel and supporting our work.</p>
            <p>Best regards,<br>The Eyoo team</p>
             
             `
      }

      Content.create(content)
        .then(() => {
        res.status(200).send({
            message: "content created successfully",
        });

        console.log(subscribers);
        sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent to all subscribers')
        })
        .catch((error) => {
          console.error(error.response.body)
        })
        })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred.",
        });
        });
}

// Retrieve all Ideas from the database.
exports.findAll = (req, res) => {
    Content.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Ideas.",
      });
    });
};
