module.exports = function async_handler(handler) {
  return async (req, res, next) => {
    try {
      await handler();
    } catch (ex) {
      next(ex);
    }
  };
};
