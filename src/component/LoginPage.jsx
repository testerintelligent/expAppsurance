import axios from "axios";
import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "../style/LoginPage.css"

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleLogin = async() => {
   
    try {
      const response = await axios.post('http://localhost:5000/home', {
        username,
        password,
      });
      console.log('Response:', response);
      if (response.status === 200) {
        navigate('/home');
      }
    } catch (error) {
      setError('Invalid username or password'); 
    } 
    setUsername('');
    setPassword('');
  };

  return (
    <div className="loginPage">
      <div className="login-container">
      <h1>Sign in</h1>
      <div className="form-group">
        <input type="text" className="inputField" id="username" name="username" placeholder="Email Address"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}/>
      </div>
      <div className="form-group">
        <input type="password" className="inputField" id="Password" name="Password" placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)} />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" className="loginButton" onClick={handleLogin}>Submit</button>
      <a href="http://localhost:3000/register" className="loginLink"><h4>Register new account</h4></a>
      <a href="" className="loginLink"><h4>Forgot password</h4></a>
      </div>
    </div>
  );
};

export default LoginPage;
