const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    // console.log(req.body);
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};
export { asyncHandler };
