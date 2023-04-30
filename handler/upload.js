const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = async (req, res) => {
  try {
    const image = req.body.file;
    let url = "";
    let data = await cloudinary.uploader.upload(image, {
      unique_filename: true,
      discard_original_filename: true,
      folder: "eyoo_tube",
      timeout: 120000,
    });
    url = data.url; // return url for uploaded file

    res.status(200).send({
      url
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "some error occured while uploading file",
    });
    console.error(error);
  }
};

module.exports = upload
