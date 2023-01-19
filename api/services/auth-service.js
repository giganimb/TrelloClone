const User = require('../models/User');
const bcrypt = require('bcryptjs');

const tokenService = require('./token-service');
const AuthDto = require('../dtos/auth-dto');
const ApiError = require('../errors/api-error');

module.exports = {
  async signup(email, userName, name, surname, password) {
    const candidateByEmail = await User.findOne({ email });
    const candidateByUserName = await User.findOne({ userName });

    if (candidateByEmail) {
      throw ApiError.UnprocessableEntity('User with this email already exists');
    } else if (candidateByUserName) {
      throw ApiError.UnprocessableEntity('User with this username already exists');
    }

    let userRole = userName === 'admin' ? 'admin' : 'user';

    const hashedPassword = await bcrypt.hashSync(password, 8);

    const user = await User.create({
      email: email,
      userName: userName,
      name: name,
      surname: surname,
      password: hashedPassword,
      roles: [userRole],
    });

    const authDto = new AuthDto(user);
    const tokens = tokenService.generateTokens({ ...authDto });
    await tokenService.saveToken(authDto.id, tokens.refreshToken);

    return { ...tokens, user: authDto };
  },

  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw ApiError.Unauthorized();
    }

    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw ApiError.Unauthorized();
    }

    const authDto = new AuthDto(user);
    const tokens = tokenService.generateTokens({ ...authDto });
    await tokenService.saveToken(authDto.id, tokens.refreshToken);

    return { ...tokens, user: authDto };
  },

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  },

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.Unauthorized();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.Unauthorized();
    }

    const user = await User.findById(userData.id);
    const authDto = new AuthDto(user);
    const tokens = tokenService.generateTokens({ ...authDto });
    await tokenService.saveToken(authDto.id, tokens.refreshToken);

    return { ...tokens, user: authDto };
  },
};
