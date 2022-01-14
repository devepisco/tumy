const OneSignal = require('onesignal-node');
const {config} = require('../../../config/onesignal');

const oneSignalClients = new OneSignal.Client(
  config.oneSignal.clients.ONE_SIGNAL_APP_ID,
  config.oneSignal.clients.ONESIGNAL_API_KEY,
);

const generateAppNotification = (
  name = 'Notificacion',
  title = 'Notificacion',
  message = 'Mensaje por defecto',
  include_players_ids_array = [],
  image = null,
) => {
  return {
    headings: {
      en: title,
    },
    name: name,
    contents: {
      en: message,
    },
    large_icon:
      '',
    big_picture: image || null,
    include_player_ids: include_players_ids_array,
  };
};

module.exports = {
  generateAppNotification,
  oneSignalClients,
};
