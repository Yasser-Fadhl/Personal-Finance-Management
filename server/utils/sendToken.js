module.exports = sendToken = async (user, status, res) => {
  const token = await user.assignJwt();
  res.status(status).setHeader("x-access-token", token).json({
    success: true,
    user,
    token,
  });
};
