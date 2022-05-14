const express = require('express');
const res = require('express/lib/response');

const Profile = require('../../routes/api/')

// To use the express router
const router = express.Router();

// @Route       GET api/profile
// @description TEST route
// @access      public
router.get('/', (req, res) => res.send('profile route'));

module.exports = router;
