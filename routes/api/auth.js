const express = require('express');
// To use the express router
const router = express.Router();
const auth = require('../../middleware/auth')

const User = require('../../models/User')

// @Route       GET api/auth
// @description TEST route
// @access      public
router.get('/', auth, async (req, res) => {

    // return user information
    try {
        const user = await User
        .findById(req.user.id)
        .select('-password');
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error, Auth Failed')
    }
});

module.exports = router;
