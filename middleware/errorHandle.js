// exports. errorHandler = (err, req, res, next) => {
//   const StatusCode = res.StatusCode ? res.StatusCode : 500

//   res.status(StatusCode).json({
//     message: err.message,
//     statck : err.statck
//   })
// }

exports.globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "_error"

  res.status(err.statusCode).json({
    message: err.message,
    status: err.status,
    error: err,
    stack : err.stack // The Error happen where
  })
}