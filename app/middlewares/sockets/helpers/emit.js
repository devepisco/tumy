const emit = (name, data) => {
    const { io } = require('../../../server')
    const s = io.emit(name, data);
    console.log(name, data, s)
  };
  
  module.exports = { emit }