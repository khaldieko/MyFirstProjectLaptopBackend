class AppError extends Error {
  constructor(code = "GENERIC", status = 500, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }

    this.code = code;
    this.status = status;
  }
}

class ValidationError extends AppError {
  constructor(message, cause, code = 400) {
    super(message);
    this.code = code;
    this.cause = cause;
    this.message = message;
  }
}

class NotFound extends AppError {
  constructor(message, cause, code = 404) {
    super(message);
    this.code = code;
    this.cause = cause;
    this.message = message;
  }
}

class InvalidRequest extends AppError {
  constructor(message, cause, code = 400) {
    super(message);
    this.code = code;
    this.cause = cause;
    this.message = message;
  }
}

module.exports = {
  AppError,
  ValidationError,
  NotFound,
  InvalidRequest,
};
