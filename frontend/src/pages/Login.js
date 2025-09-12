import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [shopName, setShopName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { mobile, password, shopName });

      if (res && res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", JSON.stringify(res.data._id));
        localStorage.setItem("userName", JSON.stringify(res.data.name));
        localStorage.setItem("userRole", JSON.stringify(res.data.role));
        localStorage.setItem("userMobile", JSON.stringify(res.data.mobile));
        localStorage.setItem("userShopName", JSON.stringify(res.data.shopName));

        if (res.data.role === 'customer') {
          navigate('/customer');
        } else {
          navigate('/owner');
        }
      } else {
        return console.error("No token received");
      }

    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="tel"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Shop Name"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p className="register-link">
          New user? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
