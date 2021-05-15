const { updateMe } = require('./updateMe')
const { createService } = require('./createService');
const { saveDetailsService } = require('./saveDetailsService');
const { getPaymentMethods } = require('./getPaymentMethods');
const { getAllDataServices } = require('./getAllDataServices');

module.exports = {
    updateMe,
    createService,
    saveDetailsService,
    getPaymentMethods,
    getAllDataServices
}