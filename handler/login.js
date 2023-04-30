const login = async (req, res) => {
  try {
    const password = req.body.password;

    if (password === process.env.ADMIN_PASSWORD) {
      res.status(200).send({
        message: "eyoo_tube_admin_panel_secret",
      });
      return;
    }

    res.status(400).send({
      message: "wrong password!",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "some error occured while uploading file",
    });
    console.error(error);
  }
};

module.exports = login;
