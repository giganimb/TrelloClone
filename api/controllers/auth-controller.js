const authService = require('../services/auth-service');

module.exports = {
  async signup(req, res) {
    try {
      const { email, userName, name, surname, password } = await req.body;

      const userData = await authService.signup(email, userName, name, surname, password);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

      return res.status(200).json({ userData: userData, message: 'User successfully registered' });
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const userData = await authService.login(email, password);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

      return res.status(200).json({ userData: userData, message: 'User successfully authorized' });
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);
      res.clearCookie('refreshToken');

      return res.status(200).json({ message: 'User successfully logout' });
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

      return res.status(200).json({ userData: userData, message: 'User successfully authorized' });
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },
};
