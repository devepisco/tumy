class Exceptions extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = "Error";
  }
  toJson() {
    return {
      message: this.message,
    };
  }
}
module.exports = Exceptions;
