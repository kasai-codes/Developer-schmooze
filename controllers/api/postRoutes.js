const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const postData = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    const post = postData.toJSON();

    res.status(200).json({
      message: `"${post.title}" published by ${req.session.username} at ${post.createdAt}`,
    });
  } catch (err) {
    let message = 'Something went wrong.';

    if (!err.errors) {
      res.status(400).json({
        message,
      });
      return;
    }

    res.status(400).json({
      message,
      // ...err
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const postData = await post.findByPk(req.params.id);
    const post = postData.toJSON();

    res.status(200).json({
      message: `"${post.title}" updated by ${req.session.username} at ${post.updatedAt}`,
    });
  } catch (err) {
    let message = 'Something went wrong.';

    if (!err.errors) {
      res.status(400).json({
        message,
      });
      return;
    }

    res.status(400).json({
      message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      message: `post id: ${req.params.id} deleted by ${req.session.username}`,
    });
  } catch (err) {
    let message = 'Something went wrong.';

    if (!err.errors) {
      res.status(400).json({
        message,
      });
      return;
    }

    res.status(400).json({
      message,
    });
  }
});

module.exports = router;
