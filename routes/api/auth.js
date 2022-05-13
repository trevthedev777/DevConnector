const express = require('express');
const res = require('express/lib/response');

// To use the express router
const router = express.Router();

// @Route       GET api/auth
// @description TEST route
// @access      public
router.get('/', (req, res) => res.send('auth route'));

module.exports = router;
