// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      error: err.message,
    });
  }

  if (err.name === 'NotFoundError') {
    return res.status(404).json({
      success: false,
      message: 'Not Found',
      error: err.message,
    });
  }

  // Default error response
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
};

module.exports = errorHandler;
