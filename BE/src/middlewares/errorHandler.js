// Middleware xử lý lỗi tập trung
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error('[ERROR]', err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Lỗi server không xác định.',
  });
};

module.exports = errorHandler;
