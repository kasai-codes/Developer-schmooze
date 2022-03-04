const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.put('/:id', async (req, res) => {
  try {
      const updateData = await Comment.update(req.body, {
          where: {
              id: req.params.id
          }
      });

      res.status(200).json({
          message: `Comment updated by ${req.session.username} at ${post.updatedAt}`
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

router.post('/', withAuth, (req, res) => {
  // check the session
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id,
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbCommentData => {
          if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
          }
          res.json(dbCommentData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;