const on = (io, name, callback) => {
    io.on(name, callback);
  };
  
  module.exports = { on };
  