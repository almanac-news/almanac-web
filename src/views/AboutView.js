import React from 'react';
import { Link } from 'react-router';
import Tools from '../layouts/Tools';

const AboutView = () => (
  <div className='container text-center'>
    <h1>About Us</h1>
    <hr />
      <Tools />
    <Link to='/'>Back To Home View</Link>
  </div>
);

export default AboutView;
