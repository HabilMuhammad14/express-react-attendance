import './css/register.css';
import {Link, useNavigate} from 'react-router-dom';
import react from 'react';

const Register = () => {
  const navigate = useNavigate()
  const [nama, setNama] = react.useState('');
  const [email, setEmail] = react.useState('');
  const [password, setPassword] = react.useState('');
  const [role, setRole] = react.useState('')
  const handleInput = async  () =>{
    try{
      let response = await fetch('http://localhost:5000/auth/register',{
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          nama : nama,
          email: email,
          password: password,
          role: role
        })
      })
      if(!response.ok){
        throw new Error("Data Gagal Dikirim!")
      }
      setNama('')
      setEmail('')
      setPassword('')
      setRole('')
      navigate('/')
    }catch(err){
      console.error(err)
    }
  }
  
    return(
      <div className="register-container">
        <div className="register-card">
          <h2>Create Account</h2>
      
          <input className="input" placeholder="Nama" onChange={e => setNama(e.target.value)} value={nama}/>
          <input className="input" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email}/>
          <input className="input" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password}/>
      
          <select className="input" onChange={e => setRole(e.target.value)} value={role}>
            <option value="">Pilih Role</option>
            <option value="mahasiswa">Mahasiswa</option>
            <option value="dosen">Dosen</option>
          </select>
      
          <button className="register-btn" onClick={handleInput}>Sign Up</button>
      
          <p className="switch-auth">
            Sudah punya akun? <Link to="/">Login</Link>
          </p>
        </div>
      </div>   
    )
}

export default Register;