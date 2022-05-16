import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';

// Import Components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utilities/setAuthToken';


import './App.css';

if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

const App = () => { 
  useEffect(() => {
    if (localStorage.token) {
      store.dispatch(loadUser());
    }
  }, []);

  return (

  <Provider store={store}>
  <Router>
      <Fragment>
        {/* Landing Page */}
        <Navbar />
        <section className='container'>
          <Alert />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="register" element={<Register />} />
            <Route exact path="login" element={<Login />} />
            {/* Shows Personal Info, Route is private */}
            <Route
            path="dashboard"
            element={
              <PrivateRoute component={Dashboard} />
            }
          />
          </Routes>
        </section>
      </Fragment>
    </Router>
  </Provider>

)};


export default App;
