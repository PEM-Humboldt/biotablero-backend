const RestifyErrors = require('restify-errors');

const config = require('config');

module.exports = () => {
  const usersConfig = config.users || [];

  return {
    /**
     * Authenticate a user
     *
     * @param {String} username username to authenticate
     * @param {String} password password to authenticate
     *
     * @returns {Object} authenticated user
     */
    login: (username, password) => {
      const user = usersConfig.find(
        ({ username: userSaved, password: passwordSaved }) =>
          username === userSaved && password === passwordSaved,
      );

      if (!user) {
        throw new RestifyErrors.BadRequestError('Invalid username or password');
      }
      const { password: remove, ...rest } = user;
      return rest;
    },
  };
};
