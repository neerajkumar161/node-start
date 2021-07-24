const { Error } = require('mongoose');
const User = require('../models/user');
const Post = require('../models/post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { listenerCount } = require('../models/user');

const bcryptPassword = async (password) => {
  return bcrypt.hashSync(password, 10);
};

const bcryptCompare = async (password, hashPw) => {
  return bcrypt.compareSync(password, hashPw);
};

const jwtSign = (payload) => {
  return jwt.sign(
    {
      _id: payload._id.toString(),
    },
    'somesupersecretkey',
    { expiresIn: '2h' }
  );
};

exports.signup = async (req, res, next) => {
  // console.log(req.body);
  // User.findOne({ email: req.body.email }).then((user) => {
  //   console.log('User Found', user);
  //   if (user) return res.json({ message: 'User Already Exists' });
  //   else {
  //     User.create(req.body)
  //       .then((result) => {
  //         console.log(result);
  //         res.json({ message: 'User REgistered!', user: result });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // });
  // console.log('Here');
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) throw 'User Already Exists!';

    req.body.password = await bcryptPassword(req.body.password);
    user = await User.create(req.body);
    res.json({ message: 'User Registered', user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email }).lean();
    if (!user) throw 'User Not Exists!';

    const isMatch = await bcryptCompare(req.body.password, user.password);
    if (!isMatch) throw 'Password Mismatched!';

    const token = jwtSign(user);
    res.json({ message: 'User Loggedin', token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.findAllUsers = async (req, res, next) => {
  const user = req.user;
  console.log(user);
  const users = await User.find({});
  res.json({ message: 'All users', users });
};

exports.addPost = async (req, res, next) => {
  try {
    req.body.userId = req.user._id;
    const post = await Post.create(req.body);
    res.json({ message: 'Post Created!', post });
  } catch (error) {
    next(error);
  }
};

exports.getPost = async (req, res, next) => {
  console.log(req.query);
  const post = await Post.findOne({ _id: req.params.postId }).populate('userId', 'firstname lastname');
  if (!post) throw 'Post Not found!';
  res.json({ message: 'Post Found!', post });
};

exports.updatePost = async (req, res, next) => {
  // let post = await Post.findOne({ _id: req.params.postId }).lean();
  try {
    let post = await Post.findOneAndUpdate({ _id: req.params.postId }, req.body, {
      new: true,
      fields: {
        description: 1,
        _id: 0,
      },
    }).lean();
    if (!post) throw 'Post Not found!';

    // post = await post.updateOne(req.body);
    console.log(post);

    res.json({ message: 'Post Updated!', post });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    let post = await Post.findOneAndRemove({ _id: req.params.postId }).lean();
    if (!post) throw 'Post Not found!';

    // post = await post.updateOne(req.body);
    console.log(post);

    res.json({ message: 'Post Deleted!', post });
  } catch (err) {
    next(err);
  }
};
