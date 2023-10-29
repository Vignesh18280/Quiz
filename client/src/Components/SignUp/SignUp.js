import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

function SignUp() {
  const history = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;
    const newErrors = {};

    const emailRegex = /^\S+@\S+\.\S+$/; 

    if (!name) {
      newErrors.name = 'Name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 5) {
      newErrors.password = 'Password must be at least 5 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:4000/api/auth/register', formData);

        if (response.status === 201) {
          console.log(response.data)
          toast.success('Signup successful!');
          setTimeout(() => {
            history('/login');
          }, 2000); 
        } else {
          toast.error('An error occurred. Please try again.');
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 409) {
            toast.error('Email is already in use. Please choose a different one.');
          } else if (error.response.status === 400) {
            toast.error('Invalid data. Please check your input.');
          } else {
            toast.error('An error occurred. Please try again.');
          }
        } else {
          toast.error('An error occurred. Please try again.');
        }
      }
    }
  };

  return (
    <div className='signup-container'>
      <form onSubmit={handleSubmit}>
           <h1 className="title">QUIZZIE</h1>
              <div className="both">
                
                <h3 className="imp" >Sign Up</h3>
                 <h3 className="imp"><Link className='check' to='/'>Log In</Link></h3>
              </div>
        <div>
          <label htmlFor="name" style={{marginRight : "20px"}}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={errors.name}
            style={{height: "20px",
              width : "300px",
              margin: "15px",
              borderRadius: "3px",
              marginLeft: "10px",
               border :"rgba(0.5, 0.5, 0.5, 0.5)",
               backgroundColor:" #f0f0f0"
            }}
          />
        </div>
        <div>
          <label htmlFor="email" style={{marginRight : "20px"}}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={errors.email}
            style={{height: "20px",
              width : "300px",
              margin: "15px",
              borderRadius: "3px",
              marginLeft: "10px",
               border :"rgba(0.5, 0.5, 0.5, 0.5)",
               backgroundColor:" #f0f0f0"
            }}
          />
        </div>
        <div>
          <label htmlFor="password"  style={{marginRight : "1px"}}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={errors.password}
            style={{height: "20px",
              width : "300px",
              margin: "15px",
              borderRadius: "3px",
              marginLeft: "10px",
               border :"rgba(0.5, 0.5, 0.5, 0.5)",
               backgroundColor:" #f0f0f0"
            }}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" style={{marginRight : "10px"}}>Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder={errors.confirmPassword}
            style={{height: "20px",
              width : "300px",
              margin: "15px",
              borderRadius: "3px",
              marginLeft: "40px",
               border :"rgba(0.5, 0.5, 0.5, 0.5)",
               backgroundColor:" #f0f0f0"
            }}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default SignUp;
