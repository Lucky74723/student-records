import React from 'react';
import './SignInForm.css'; // Import CSS file for styling

const SignInForm = () => {
  return (
    <div className="auth-container">
      <div className="auth-header">
        <button className="auth-toggle active">Sign In</button>
        <button className="auth-toggle">Sign Up</button>
      </div>
      <form>
        <input type="email" placeholder="Email Address" required />
        <input type="password" placeholder="Password" required />
        <a href="#" className="forgot-password">Forgot password?</a>
        <button type="submit" className="primary">Sign In</button>
      </form>
      <p>Not a member? <a href="/signup">Sign up now</a></p>
    </div>
  );
};

export default SignInForm;