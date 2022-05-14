const express = require('express');
const { defaultProxyHeaderWhiteList } = require('request/request');
// To use the express router
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @Route       GET api/profile/me
// @description Get current users profile
// @access      Private
router.get('/me', auth, async (req, res) => {

    try {
        // Pertains to Profile Model user id
        const profile = await Profile.findOne({ user : req.user.id }).populate('user', ['name', 'avatar']);

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user'});
        }

        // Returns the profile
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
