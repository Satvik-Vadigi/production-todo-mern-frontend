import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './AuthStyles.css'
import AuthServices from '../../Services/AuthServices'
import { toast } from 'react-hot-toast';
import { getErrorMessage } from '../../Utils/ErrorMessage';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();
  //login function
  const loginHandler = async(e) => {
    try {
      e.preventDefault();
      const data = {email, password}
      const res = await AuthServices.loginUser(data);
      toast.success(res.data.message);
      navigate('/home');
      localStorage.setItem('todoapp', JSON.stringify(res.data));
      console.log(res.data);
    } catch (err) {
      toast.error(getErrorMessage(err));
      console.log(err);
    }
  }

  return (
    <div className='form-container'>
      <form className='form' onSubmit={loginHandler}>
        <div className='mb3'>
          <i className='fa-solid fa-circle-user'></i>
        </div>
        <div className='mb3'>
          <input type='email' className='form-control' placeholder='Email id' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='mb3'>
          <input type='password' className='form-control' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='form-bottom'>
          <p className='text-center'>
            Not a user? Please <Link to='/register'> Register</Link>
          </p>
          <button type='submit' className='login-btn'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login
