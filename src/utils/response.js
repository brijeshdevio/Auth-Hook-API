const response = (res, statusCode, data, rest) => {
  const message = data?.message || "Success";
  delete data?.message;

  return res.status(statusCode).json({
    success: true,
    status: statusCode,
    message,
    data,
    ...rest,
  });
};

export default response;
