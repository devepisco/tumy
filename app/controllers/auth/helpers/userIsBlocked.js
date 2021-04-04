const userIsBlocked = ({ isBlocked = true }) => {
  if (isBlocked) {
    return true;
  }
  return false;
};

module.exports = { userIsBlocked };
