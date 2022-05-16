import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {

    // Set State
    const [ formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    // Destructure State
    const { name, email, password, password2 } = formData;

    // Change The Name state ONLY onChange
    // change so that it only happens on name declaration
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Form Submit
    const onSubmit = async e => {
        e.preventDefault();

        if (password !== password2) {
            console.log('Passwords do not match')
        } else {
            console.log('SUCCESS');
        }
    }

  return (

    <Fragment>
        <section className="container">

            {/* Section Header Text */}
            <h1 className="large text-primary">
                Sign Up
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Create Your Account
            </p>

            {/* Form */}
            <form className="form" onSubmit={onSubmit}>

                {/* Form Groups */}
                <div className="form-group">
                    <input 
                    type="text"
                    placeholder="Name" 
                    name="name" 
                    value={name} 
                    onChange={ e => onChange(e) }
                    required />
                </div>
                <div className="form-group">
                    <input 
                    type="email" 
                    placeholder="Email Address" 
                    name="email"
                    value={email} 
                    onChange={ e => onChange(e) } 
                    required />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image, use a
                        Gravatar email
                    </small>         
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password} 
                        onChange={ e => onChange(e) }
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        value={password2} 
                        onChange={ e => onChange(e) }
                    />
                </div>
                <input 
                type="submit" 
                className="btn btn-primary" 
                value="Register" 
                />
            </form>

            <p className="my-1">
                Already have an account? 
                <Link to="/login">
                     Sign In
                </Link>
            </p>
        </section>
    </Fragment>
  )
};

export default Register
