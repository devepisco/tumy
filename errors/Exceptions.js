class Exceptions extends Error {
  constructor(status, message) {
    super();
    this.status = status || 500
    this.message = message;
    this.name = "Error";
  }
  toJson() {
    return {
      status: this.status,
      message: this.message,
    };
  }
}
module.exports = Exceptions;
