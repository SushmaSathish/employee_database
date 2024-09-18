import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (data.message === 'Login successful') {
      if (data.designation === 'Manager') {
        navigate('/manager', { state:  {username, password, managerId: data.employee_id } });
      } else {
        navigate('/employee', { state: { employeeId: data.employee_id } });
      }
    } else {
        setError('Invalid Credentials');
       }
    } catch (error) {
    setError('Failed to login');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
     {error && <div className="error-message">{error}</div>}
      <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
/*import React, { useState } from 'react';
import "./Login.module.css";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.message === 'Login successful') {
        onLogin(data); // Pass login data to parent
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Failed to login');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input 
          type="text" 
          id="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;*/

