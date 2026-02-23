import React from 'react';
import {useNavigate, Link} from 'react-router-dom';
import './css/login.css'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleInput = async () => {
    try{
      let response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-type' : 'application/json'
        },
        body:JSON.stringify({
          email: email,
          password: password
        })
      })
      if(!response.ok){
        throw new Error("Data Gagal Dikirim!!!")
      }
      let data = await response.json()
      if(data.role === 'dosen'){
        navigate(`/dashboard-dosen/${data.id}`)
      }else if(data.role === 'mahasiswa'){
        navigate('/dashboard-mahasiswa')
      }
      
    }catch(err){
      console.error(err)
    }
  }

    return(
        <div className="login-container">
          <div className="login-card">
            <h2>Absensi Online</h2>
            <p className="subtitle">Sign in to continue</p>
        
            <input className="input" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            <input className="input" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
        
            <button className="login-btn" onClick={handleInput}>Sign In</button>
        
            <p className="switch-auth">
              Belum punya akun? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>   
    )
}

export default Login;