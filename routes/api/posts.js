const express = require('express');
// To use the express router
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// All Models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @Route       POST api/posts
// @description Create a post
// @access      Private
router.post(
  '/', [ auth, [
    check('text', 'Text is required')
    .not()
    .isEmpty()
  ]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      
      const user = await User.findById(req.user.id).select('-password');

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });

    const post = await newPost.save();

    res.json(post);
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error: Can not submit post');
    }
    
  }
);

// @Route       GET api/posts/:id
// @description Get all posts
// @access      Private

router.get('/:id', auth, async (req, res) => {
  try {
    // this will display them in newest posts first
    const post = await Post
    .findById(req.params.id);

    if  (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }
    // Return 
    res.json(post)
  } catch (err) {
    console.error(err.message);
    if  (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }
      res.status(500).send('Server Error: Can not load all posts');
  }
});

// @Route       GET api/posts
// @description Get all posts
// @access      Private

router.get('/', auth, async (req, res) => {
  try {
    // this will display them in newest posts first
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts)
  } catch (err) {
    console.error(err.message);
      res.status(500).send('Server Error: Can not load all posts');
  }
});

// @Route       DELETE api/posts/:id
// @description Delete a post
// @access      Private

router.delete('/:id', auth, async (req, res) => {
  try {
    // this will display them in newest posts first
    const posts = await Post.findbyId(req.params.id);

    if  (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }

    //  Check User
    if (post.user.toString !== req.user.id) {
      return res.status(41).json({ msg: 'User Not Authorized'});
    };

    await this.post.remove();

    res.json(posts)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error: Can not load all posts');
  }
});

// @Route       PUT api/posts/like/:id
// @description Like A Post
// @access      Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked by the user
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Post already liked'})
    };

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error: Can not like post');
  }
});

// @Route       PUT api/posts/unlike/:id
// @description Unlike A Post
// @access      Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked by the user
    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: 'Post has not yet been liked'})
    };

    // Get Remove Index
    const removeIndex = post.likes.map(like => like.user.toString().indexOf(req.user.id));

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error: Can not like post');
  }
});

// @Route       POST api/posts/comment/:id
// @description Comment on a post
// @access      Private
router.post(
  '/comment/:id', 
  [ auth, [
    check('text', 'Text is required')
    .not()
    .isEmpty()
  ]], async (req, res) => {
    const errors = validationResult(req);

     if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error, Can Not Comment');
    }
  }
);

// @Route       DELETE api/posts/comment/:id/:comment_id
// @description Delete comment on a post
// @access      Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    // Get Post by id
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(comment => comment.id === req.params.comment_id);

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist'});
    }

    // Check User
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized '});
    }

      // Get Remove Index
    const removeIndex = post.comments
    .map(comment => comment.user.toString()
    .indexOf(req.user.id));

    post.comments.splice(removeIndex, 1);

    res.json(post.comments);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error, Can Not Delete Comment');
  };
});
module.exports = router;
