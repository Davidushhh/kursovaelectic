import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import './login-page.css'

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/user/login', { email, password }, { withCredentials: true });
      console.log(response.data);
      setTimeout(()=>{
        navigate('/');
      },1000);
    } catch (error) {
      console.error(error);

    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/user/register', { email, password, username });
      console.log(response.data);

      toggleForm();
    } catch (error) {
      console.error(error);

    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
    <div className='logincnt'>
    <Header page="login" />
      <Typography variant="h5">{isLogin ? 'Login' : 'Register'}</Typography>
      <form>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        {!isLogin && (
          <TextField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
          />
        )}
        <Button variant="contained" onClick={isLogin ? handleLogin : handleRegister}>
          {isLogin ? 'Login' : 'Register'}
        </Button>
      </form>
      <Button onClick={toggleForm}>{isLogin ? 'Switch to Register' : 'Switch to Login'}</Button>
      </div>
    </>
  );
};

export default LoginPage;
