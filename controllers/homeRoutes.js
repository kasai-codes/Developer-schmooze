const router = require('express').Router();
// const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require("../utils/auth");

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// VIEW SINGLE POSTS WITH COMMENTS.
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {

      include: [
        User,
        {
          model: Comment,
          attributes: ['id', 'post_comment', 'post_id', 'date_created', 'user_id'],
          include: [User],
        }
      ],
    });

    const post = postData.get({ plain: true });
    const userPost = postData.user_id === req.session.user_id

    res.render('post', {
      ...post,
      userPost,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// EDIT SINGLE POST
router.get('/post/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {   
      title: req.body.title,
      content: req.body.content
    }, 
    {
    where: {
      id: req.params.id,
      user_id: req.session.user_id,
    },
      
    });

    const post = postData.get({ plain: true });

    res.render('edit', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ALLOWS USER TO LOGIN.
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


module.exports = router;