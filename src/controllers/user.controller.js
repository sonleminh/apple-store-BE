// const { model } = require('../models/prisma');
const prisma = require('../models/prisma');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const initPassportLocal = require('./auth/passportLocal');
const jwt = require('jsonwebtoken');

initPassportLocal();
let refreshTokens = [];

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const isEmailExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (isEmailExist) return res.status(200).json({ message: 'email_exist' });
    const createNewUser = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        hashPassword: await bcrypt.hash(password, 10),
      },
    });
    // const token = JsonWebTokenError.sign(
    //   { user_id: user._id, email },
    //   process.env.TOKEN_KEY,
    //   {
    //     expiresIn: '2h',
    //   }
    // );
    // save user token
    // user.token = token;

    // return new user
    res.json(createNewUser);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) res.json({ message: 'email_not_exist' });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        const accessToken = jwt.sign(
          {
            id: user.id,
            admin: user.isAdmin,
          },
          'secretkey',
          { expiresIn: '30d' }
        );
        const refreshToken = jwt.sign(
          {
            id: user.id,
            admin: user.isAdmin,
          },
          'secretkey',
          { expiresIn: '365d' }
        );
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'strict',
        });
        // console.log(req.user);
        res.status(200).json({ user, accessToken });
      });
    }
  })(req, res, next);
};

const requestRefreshToken = async (req, res) => {
  //Take refresh token from user
  const refreshToken = req.cookies.refreshToken;
  //Send error if token is not valid
  if (!refreshToken) return res.status(401).json("You're not authenticated");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json('Refresh token is not valid');
  }
  jwt.verify(refreshToken, 'secretkey', (err, user) => {
    if (err) {
      console.log(err);
    }
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    //create new access token, refresh token and send to user
    const newAccessToken = jwt.sign(
      {
        id: user.id,
        admin: user.isAdmin,
      },
      'secretkey',
      { expiresIn: '30d' }
    );
    const newRefreshToken = jwt.sign(
      {
        id: user.id,
        admin: user.isAdmin,
      },
      'secretkey',
      { expiresIn: '365d' }
    );
    refreshTokens.push(newRefreshToken);
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: '/',
      sameSite: 'strict',
    });
    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
};

const logout = async (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.clearCookie('refreshToken');
  res.status(200).json('Logged out successfully!');
};

const getMyProfile = async (req, res, next) => {
  try {
    return res.status(200).json({
      ...req.user,
      loginStatus: req.isAuthenticated(),
    });
  } catch (error) {
    return next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.json('Delete successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getMyProfile,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
