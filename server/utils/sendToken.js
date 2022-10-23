module.exports = sendToken = async (user, status, res) => {
  const token = await user.assignJwt();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRY * 20 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(status).cookie("token", token, options).json({
    success: true,
    user,
  });
};
