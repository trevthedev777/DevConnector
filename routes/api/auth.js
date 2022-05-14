const express = require('express');
// To use the express router
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

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


// @Route       POST api/auth
// @description Authenticate user and get token
// @access      Public
router.post('/', [

    // email validation
    check('email', 'Please include a valid email')
    .isEmail(),

    // Password Validator
    check('password', 'Password is required')
    .exists(),

], 
async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });
    // See if the user exists
        if (!user) {
        return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials '}] });
        }

    // email and password match verification
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res 
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }] 
    });
    }

    // Payload
    const payload = { 
        user: {
            id: user.id
        }
    };

    jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
            if (err) throw err;
            res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
     
});

module.exports = router;
