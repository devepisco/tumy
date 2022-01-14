const config = {
  oneSignal: {
    clients: {
      ONE_SIGNAL_APP_ID:
        process.env.ONESIGNAL_APP_ID_MOBILE ||
        '1be00967-b727-42c7-93f7-672ed90fd0bd',
      ONESIGNAL_API_KEY:
        process.env.ONESIGNAL_API_KEY_MOBILE ||
        'M2RjMTFmMzktZDViYi00NDk1LWFmNDYtM2RiNDAzMGNhOWE2',
    },
  },
};

module.exports = { config };

