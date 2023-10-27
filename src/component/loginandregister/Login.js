import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
        const handlesubmit = (e) => {
        e.preventDefault();

        if (email === '') {
            alert('input email')
        } else if (password === '') {
            alert('input pasword')
        } else {

            setLoading(false)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "email": email,
                "password": password
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://api.escuelajs.co/api/v1/auth/login", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.message === "Unauthorized") {
                        alert('login fail')
                        window.location.reload(false)
                    } else {
                        const token = result.access_token
                        navigate('/home')
                        localStorage.setItem('token', token)
                        alert('login sucsess')
                        console.log(result)
                    }
                })
                .catch(error => console.log('error', error));
            console.log(email);
            console.log(password);
            setEmail('')
            setPassword('')
        }
    }
    return (
        <div className='container'>
            {
                (!loading)? (
                    <Loading/>
                ):(
                    <div className='Login'>
                <form className='Loginform' onSubmit={handlesubmit}>
                    <h1 className='headlogin' >LOGIN</h1>
                    <div className='input-container'>
                        <label>Email :
                            <input type='text' placeholder='Email..'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </label>
                    </div>
                    <div className='input-container'>
                        <label>Password :
                            <input type='password' placeholder='password.. '
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </div>
                    <div className='button'>
                        <button type='submit' >Login</button>
                    </div>
                    <h3 className='btnregister'>
                        <Link to='/'>
                            Register Now
                        </Link>
                    </h3>
                    <h3 className='btnhome'>
                        <Link to='/home'>
                            Enter Home
                        </Link>
                    </h3>
                </form>
                
            </div>
                )
            }
        </div>
    )
}

export default Login