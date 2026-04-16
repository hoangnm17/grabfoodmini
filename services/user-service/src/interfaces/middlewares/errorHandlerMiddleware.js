const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.statusCode || 400; // Mặc định lỗi nghiệp vụ là 400 Bad Request
  res.status(status).json({ message: err.message || 'Internal Server Error' });
};

module.exports = errorHandlerMiddleware;
