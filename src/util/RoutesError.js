class RoutesError {
  /**
   * Error class for routes
   * @param {*} code The status code
   * @param {*} error The error message
   */
  constructor(code, error) {
    this.code = code;
    this.error = error;
  }
}

module.exports = RoutesError;
