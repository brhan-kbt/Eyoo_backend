const isAdmin = (req, res, next) => {
  console.log(req.headers.x_custom_action_secret);

  if (req.headers.x_custom_action_secret === process.env.X_CUSTOM_ACTION_SECRET)
    next();
  else
    res.status(400).send({
      message: "Unauthotized Request!",
    });
};

module.exports = isAdmin;
