import React, { useState } from 'react';
import axios from '../services/api';
import '../styles/Register.css'
const Register = () => {
  const [name,setName]=useState('');
  const [mobile,setMobile]=useState('');
  const [password,setPassword]=useState('');
  const [shopName,setShopName]=useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/register', {"name":name,"mobile":mobile,"password":password,"role":"owner","shopName":shopName});
      localStorage.setItem('token', res.data.token);
      alert('Registration Successful!');
      window.location.href = '/'; // redirect to home
    } catch (error) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type="text" name="name" placeholder="Name" onChange={(e)=>{setName(e.target.value)}} required/>
      <input type="tel" name="mobile" placeholder="Mobile" onChange={(e)=>{setMobile(e.target.value)}} required/>
      <input type="password" name="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} required/>
      <input type="text" name="shopName" placeholder="Shop Name" onChange={(e)=>{setShopName(e.target.value)}} required/>
      <button type="submit">Register</button>
    </form>
    <p><a href='/'>Login</a></p>
    </>
  );
};

export default Register;
