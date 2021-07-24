const express = require('express');
const User = require('../models/user');

const router = express.Router();

const userController = require('../controllers/user');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    if (req.headers.auth) {
      const token = req.headers.auth;
      jwt.verify(token, 'somesupersecretkey', async (err, token) => {
        if (err) throw 'Invalid Token';

        const user = await User.findOne({ _id: token._id }).lean();
        if (!user) throw 'User Not Exists';
        else {
          req.user = user;
          next();
        }
      });
    } else {
      throw 'Token is Required';
    }
  } catch (err) {
    next(err);
  }
};

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/allUsers', authMiddleware, userController.findAllUsers);

router.post('/post', authMiddleware, userController.addPost); // req.query.hello = 'worlds';

// /post/12345
router.get('/post/:postId', authMiddleware, userController.getPost); // req.params.postId

router.put('/post/:postId', authMiddleware, userController.updatePost);

router.delete('/post/:postId', authMiddleware, userController.deletePost);

module.exports = router;
