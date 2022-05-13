const express = require('express');
const res = require('express/lib/response');

// To use the express router
const router = express.Router();

// @Route       POST api/posts
// @description TEST route
// @access      public
router.get('/', (req, res) => res.send('posts route'));

module.exports = router;
