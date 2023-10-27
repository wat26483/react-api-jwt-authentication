import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import NotLogin from './user/NotLogin'
import './Homepage.css'
import LogingSuccessful from './user/LogingSuccessful'

function Homepage() {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    useEffect(() => {
        var myHeaders = new Headers();
        const token = localStorage.getItem('token')
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://api.escuelajs.co/api/v1/auth/profile", requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoading(false)
                setData(result)
                console.log('fetch user successfully', result)
            })
            .catch(error => console.log('error', error));
        

    }, [])
    return (
        <div className='containerhome'>
            {
                (loading) ? (
                    <Loading/>
                ) : (
                    ((data === null || data.statusCode === 401) ? (
                        <NotLogin />
                    ) : (
                        <LogingSuccessful data={data}  />
                    ))
                )
            }
        </div>
    )
}

export default Homepage