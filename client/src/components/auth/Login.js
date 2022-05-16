import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    // Set State for Login
    const [ formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Destructure State
    const { email, password } = formData;

    // Change The Name state ONLY onChange
    // change so that it only happens on name declaration
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Form Submit
    const onSubmit = async e => {
        e.preventDefault();
        console.log('SUCCESS');
    }

  return (

    <Fragment>
        <section className="container">

            {/* Section Header Text */}
            <h1 className="large text-primary">
                Sign In
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> 
                Sign Into Your Account
            </p>

            {/* Form */}
            <form className="form" onSubmit={onSubmit}>

                {/* Form Groups */}
                <div className="form-group">
                    <input 
                    type="email" 
                    placeholder="Email Address" 
                    name="email"
                    value={email} 
                    onChange={ e => onChange(e) } 
                    required />       
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
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>

            <p className="my-1">
                Don't have an account? 
                <Link to="/register">Sign Up</Link>
            </p>
        </section>
    </Fragment>
  )
};

export default Login;
