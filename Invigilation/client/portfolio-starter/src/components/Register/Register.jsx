import React ,{useState} from 'react';
import './Register.css'; 


const Register = () => {
   const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
           if (response.ok) {
        const result = await response.json();
        console.log('User registered successfully:', result);
        // Optionally, you can redirect the user to another page or show a success message
      } else {
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  return (
    <div className="container">
      <div className="heading">Sign Up</div>
      <form onSubmit={handleSubmit} className="form">
        <input required className="input" type="email" name="email" id="email" placeholder="E-mail" onChange={handleChange} />
        <input required className="input" type="password" name="password" id="password" placeholder="Password" onChange={handleChange}/>
        
        
        <input required className="input" type="text" name="username" id="username" placeholder="Username" onChange={handleChange} />

        
        <span className="forgot-password"><a href="#">Forgot Password?</a></span>
        <input className="login-button" type="submit" value="Sign Up" />
      </form>
      <div className="social-account-container">
        <span className="title">Or Sign up with</span>
        <div className="social-accounts">
          <button className="social-button google">
           <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512">
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
          </button>
          <button className="social-button apple">
           <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
            </svg>
          </button>
          <button className="social-button twitter">
             <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.041-47.106 8.447.974 16.445 1.299 25.442 1.299 49.055 0 94.213-16.445 130.297-44.505-46.125-.975-84.842-31.368-98.118-73.206 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.842-1.3 27.589-3.573-48.207-9.747-84.191-51.94-84.191-102.985v-1.299c13.644 7.796 29.237 12.67 45.181 13.645-26.294-17.543-43.688-47.431-43.688-81.558 0-17.868 4.222-34.911 11.591-49.055 42.188 51.616 105.582 85.743 177.169 89.366-1.624-7.796-2.599-15.314-2.599-23.007 0-55.178 44.505-99.658 99.658-99.658 28.083 0 53.961 11.941 72.355 31.018 22.765-4.548 44.225-12.671 63.444-24.117-7.796 23.657-23.006 43.363-43.012 55.178 19.493-2.273 38.712-7.796 56.98-15.942-13.969 18.267-31.666 34.911-51.291 48.533z"></path>
            </svg>
          </button>
        </div>
      </div>
      <span className="agreement"><a href="#">Already have an account? Sign In</a></span>
    </div>
  );
};

export default Register;
