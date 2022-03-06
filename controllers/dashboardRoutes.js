const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get("/", withAuth, (req, res) => {
Post.findAll({
  where: {
    user_id: req.session.user_id
  }
})
  .then(postData => {
    const posts = postData.map((post) => post.get({ plain: true }));
    
    res.render("dashboard", {
      posts,
     
    });
  })
  .catch(err => {
    console.log(err);
    res.redirect("login");
  });
});



router.post('/', withAuth, async (req, res) => {
try {
  const newPost = await Post.create({
    ...req.body,
    user_id: req.session.user_id,
  });

  res.status(200).json(newPost);
} catch (err) {
  res.status(400).json(err);
}
});


module.exports = router;