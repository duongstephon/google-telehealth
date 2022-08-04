import React from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';
import GoogleLogo from '../../assets/images/Google Logo 2.png';
import TelehealthLogo from '../../assets/images/Telehealth Logo.png';

const LoginPage = () => {
  return (
    <section className='homepage'>
      <div className='header'>
        <img className='main-logo' src={GoogleLogo} alt='main google logo'/>
        <img className='text-logo' src={TelehealthLogo} alt='main google logo'/>
      </div>
      <Link to='/video' className='google-signin'>
      <img className='alt-logo' src={GoogleLogo} alt='alt google logo'/>
      <h3 className='google-signin__text'>Continue with Google</h3>
      </Link>
      <p className='or'>Or</p>
      <Link to='/video' className='create-account'><h3>Create Account</h3></Link>
    </section>
  );
};

export default LoginPage;
