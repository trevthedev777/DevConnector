const express = require('express');
const { defaultProxyHeaderWhiteList } = require('request/request');
// To use the express router
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { normalizeType } = require('express/lib/utils');
const res = require('express/lib/response');


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

// @Route       POST api/profile
// @description Create or update user profile
// @access      Private
router.post(
  '/',
  auth,
  check('status', 'Status is required').notEmpty(),
  check('skills', 'Skills is required').notEmpty(),
  async (req, res) => {

    const errors = validationResult(req);

    // Check For Errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    // Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    };

    // Build Social Media Object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;


   try {
    let profile = await Profile.findOne({ user: req.user.id });

    // Search for profile
    if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
            { user: req.user.id }, 
            { $set: profileFields }, 
            { new: true }
        );

        return res.json(profile);
    }

    // Create Profile
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);

   } catch (err) {
     console.error(err.message);
     res.status(500).send('Server Error');
   };
;});

// @Route       GET api/profile
// @description Get all profiles
// @access      Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

    
// @Route       GET api/profile/user/:user_id
// @description Get all profiles by user ID
// @access      Public

router.get(
    '/user/:user_id',
    async (req, res) => {
        try {

            const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

            if (!profile) return res.status(400).json({ msg: 'Profile not found1'});


            res.json(profiles);
        } catch (err) {
            console.error(err.message);
            if (err.kind == 'ObjectId') {
                ({ msg: 'Profile not found' });
            }
            res.status(500).send('Profile Not Found2')
        }
    });

module.exports = router
