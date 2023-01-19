const self = (module.exports = {
  /**
   * @param {{message: String, status: Number}} err
   * @param {e.Request} req
   * @param {e.Response} res
   * @param {e.NextFunction} next
   */
  errorHandler: (err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }

    return res.status(err.status || 500).send({
      success: false,
      error: err.message,
    });
  },

  /**
   * @param {e.Response} res
   * @param {String|Object} message
   * @param {Number} status
   */
  responseError: (res, message, status = 422) => {
    if (typeof message !== 'string') {
      message = message.message;
      status = message.status;
    }

    return self.errorHandler(
      {
        message,
        status: status,
      },
      null,
      res,
      null
    );
  },

  /**
   * @param {e.Response} res
   * @param {String|Object} message
   */
  notFoundError: (res, message) => {
    return self.responseError(res, message, 404);
  },

  /**
   * @param {e.Response} res
   * @param {String|Object} data
   * @param {Number} status
   */
  responseSuccess: (res, data, status = 200) => {
    return res.status(status).json({
      success: true,
      data: data,
    });
  },
});
