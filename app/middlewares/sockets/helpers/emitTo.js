const emitTo = (to, name, data) => {
    const { io } = require("../../../../server");
    return io.to(to).emit(name, data);

  };
  
  module.exports = { emitTo };
  