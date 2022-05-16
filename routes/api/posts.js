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

module.exports = router;
