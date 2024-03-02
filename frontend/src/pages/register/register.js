import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import './register.css'
import Swal from 'sweetalert2';

export default function Register() {

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      window.location.href = '/'
    }
  }, [])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [loading, setLoading] = useState(false)


  const navigate = useNavigate()


  function handleregister(e) {
    e.preventDefault()
    setLoading(true)
    if (password !== cpassword) {
      alert("passwords not matched")
    }
    else {
      console.log(name)
      axios.post(`${process.env.REACT_APP_BACKEND_URL}user/Register/UserRegister`, { name, email, password })
        .then((result) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully Registered",
            showConfirmButton: false,
            timer: 2000
          });
          navigate('/Login')
          setLoading(false)
        })
        .catch(err => { Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Couldn't Registered",
          showConfirmButton: false,
          timer: 3000
        });
        setLoading(false) })
    }
  }

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleregister} >
          <input required type="text" placeholder='name' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
          <input required type="email" placeholder='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input required type="password" placeholder='password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
          <input required type="password" placeholder='confirm password' className='form-control' value={cpassword} onChange={(e) => setCpassword(e.target.value)} /><br/>
          <button className='btn btn-standard' disabled={loading} >
            {loading && <i className='fa fa-refresh fa-spin'></i>}
            {loading && <span>loading..</span>}
            {!loading && <span>Register</span>}

          </button>
          <p>Have an Account? <Link to='/Login'>Login</Link></p>
        </form>
      </div>
    </div>
  )
}
