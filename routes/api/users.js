const express = require('express');
const res = require('express/lib/response');
const { check, validationResult } = require('express-validator');

// To use the express router
const router = express.Router();

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

], (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.send('User route');
});

module.exports = router;
