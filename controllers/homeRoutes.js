const router = require('express').Router();
// const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    const posts = postData.map((post) => post.toJSON());

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
      username: req.session.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get one post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username', 'id'],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['username', 'id'],
          },
        },
      ],
      order: [[Comment, 'createdAt', 'DESC']],
    });

    const post = postData.toJSON();

    res.render('post', {
      post,
      logged_in: req.session.logged_in,
      username: req.session.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

// dashboard page with logged in user's posts
router.get('/dashboard', withAuth, async (req, res) => {
  const postsData = await Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    order: [['createdAt', 'DESC']],
  });
  const posts = postsData.map((post) => post.toJSON());
  res.render('dashboard', {
    posts,
    user_id: req.session.user_id,
    username: req.session.username,
    logged_in: req.session.logged_in,
  });
});

router.get('/create', withAuth, (req, res) => {
  res.render('create', {
    user_id: req.session.user_id,
    username: req.session.username,
    logged_in: req.session.logged_in,
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  const postData = await Post.findByPk(req.params.id);
  const post = postData.toJSON();
  post.content = post.content.replaceAll('<br />', '\n');

  res.render('edit', {
    post,
    user_id: req.session.user_id,
    username: req.session.username,
    logged_in: req.session.logged_in,
  });
});

module.exports = router;
