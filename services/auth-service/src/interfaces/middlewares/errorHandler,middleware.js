module.exports = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    errors: err.errors || null,
  });
};