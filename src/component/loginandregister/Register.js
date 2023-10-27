import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading'
function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmassword] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()



    const handlesubmit = (e) => {
        e.preventDefault();
        const avatar = 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp'

        const letters = /^([a-zA-Z0-9@.])+$/;
        if (!name.match(letters)) {
            const Nameinput = document.getElementById('name')
            Nameinput.classList.toggle("error");
            document.getElementById("NameError").innerHTML = "Please enter a-z 0-9 characters only";

        } else if (!email.match(letters)) {
            const Nameinput = document.getElementById('name')
            Nameinput.classList.toggle("error");
            document.getElementById("EmailError").innerHTML = "Please enter a-z 0-9 characters only";

        } else if ((!email.includes('@gmail.com')) && (!email.includes('@hotmail.com')) && (!email.includes('@Outlook.com'))) {
            const Nameinput = document.getElementById('email')
            Nameinput.classList.toggle("error");
            document.getElementById("EmailError").innerHTML = "Please enter @gmail.com or @hotmail.com or @Outlook.com";
        } else if (!password.match(letters) || password.length < 4) {
            const Nameinput = document.getElementById('password')
            Nameinput.classList.toggle("error");
            document.getElementById("PasswordError").innerHTML = "Please enter Password a-z 0-9 characters more 5 characters";

        } else if (confirmpassword !== password) {
            const Nameinput = document.getElementById('password2')
            Nameinput.classList.toggle("error");
            document.getElementById("PasswordError2").innerHTML = "Password is not math";

        } else {
            setLoading(false)

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "name": name,
                "email": email,
                "password": password,
                "avatar": avatar
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://api.escuelajs.co/api/v1/users/", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log('create successfully', result)

                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    var raw = JSON.stringify({
                        "email": email,
                        "password": confirmpassword
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
                            console.log('access_token', result)
                            const token = result.access_token
                            localStorage.setItem('token', token)
                            navigate('/home')
                            alert('successfully')
                        })
                        .catch(error => {
                            console.log('error', error)

                        });

                })
                .catch(error => console.log('error', error));
            console.log(name);
            console.log(email);
            console.log(password);

        }

    }
    return (
        <div className='container'>
            {
                (!loading) ? (
                    <Loading />
                ) : (
                    <div className='Login'>
                        <form onSubmit={handlesubmit} className='Loginform'>
                            <h1 className='register'>REGISTER</h1>
                            <div className='input-container' id='name'>
                                <label>Name :
                                    <input type='text' placeholder='Name...'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} />
                                    <small id='NameError'> </small>
                                </label>
                            </div>
                            <div className='input-container' id='email'>
                                <label>Email :
                                    <input type='text' placeholder='Email...'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                    <small id='EmailError'></small>
                                </label>
                            </div>
                            <div className='input-container' id='password'>
                                <label>Password :
                                    <input type='password' placeholder='password... '
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                    <small id='PasswordError'></small>
                                </label>
                            </div>
                            <div className='input-container' id='password2'>
                                <label>Confirm Password :
                                    <input type='password' placeholder='password... '
                                        value={confirmpassword}
                                        onChange={(e) => setConfirmassword(e.target.value)} />
                                    <small id='PasswordError2'></small>
                                </label>
                            </div>
                            <div className='button'>
                                <button type='submit' onClick={handlesubmit} >Register</button>
                            </div>
                            <h3>
                                <Link to='/login'>
                                    Login Now
                                </Link>
                            </h3>
                        </form>
                    </div>
                )
            }
        </div>
    )
}

export default Register