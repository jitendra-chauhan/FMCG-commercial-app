class ApiError extends Error {
  public statusCode: any;
  constructor(statusCode: any, message?: string, stack: string = '') {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export = ApiError;
