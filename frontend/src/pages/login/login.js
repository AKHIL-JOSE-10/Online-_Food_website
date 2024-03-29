import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import './login.css'
import Swal from 'sweetalert2'

export default function Login() {
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      window.location.href = '/'
    }
  }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const [_, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate()

  function handlelogin(e) {
    e.preventDefault()
    setLoading(true)
 
    axios.post(`${process.env.REACT_APP_BACKEND_URL}Login/LoginUser`, {email})
    .then((result) => {
        const userLogin = result.data;
        console.log(userLogin)
        if (userLogin.message !== "Login Failed") {
          console.log("Login successful");
          setCookies("access_token", userLogin.token)
          window.localStorage.setItem("userInfo", JSON.stringify(userLogin.user))
          navigate('/');
          window.location.reload()
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Invalid Credentials",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch((err) => {
       alert("Server Error" , err)
       console.log(err)
      }).finally(
        setLoading(false)
      );
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handlelogin}>
          <input required type="email" placeholder='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input required type="password" placeholder='password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className='btn btn-standard' disabled={loading} >
            {loading && <i className='fa fa-refresh fa-spin'></i>}
            {loading && <span>loading..</span>}
            {!loading && <span>Login</span>}
          </button>
          <p>Don't have an Account? <Link to='/Register'>Register</Link></p>
        </form>
      </div>
    </div>
  )
}
