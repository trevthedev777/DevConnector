const express = require('express');
// To use the express router
const router = express.Router();
const gravatar = require('gravatar');
// Encrypt Password
const bcrypt = require('bcryptjs');
const res = require('express/lib/response');


const { check, validationResult } = require('express-validator');

const User = require('../../models/User');



// @Route       POST api/users
// @description Register User
// @access      public
router.post('/', [

    // name validation
    check('name', 'Name is required')
    .not()
    .isEmpty(),

    // email validation
    check('email', 'Please include a valid email').isEmail(),

    // Password Validator
    check('password', 'Please enter a password with 6 or more characters')
    .isLength({ min: 6 }),

], 
async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email })
    // See if the user exists
    if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists '}] });
    }
    
    // Get users gravatar
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    });

    // Creates an instance of a new user
    user = new User({
        name, 
        email, 
        avatar, 
        password
    });

    // Encrypt the Password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();


    // Return jwt

    res.send('User Registered');

    } catch(err) {

        console.error(err.message);
        res.status(500).send('Server error')
    }
     
});

module.exports = router;
