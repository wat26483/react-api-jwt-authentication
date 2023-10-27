import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../../Loading/Loading'

function NotLogin() {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [prod, setProd] = useState([])
    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://api.escuelajs.co/api/v1/categories", requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoading(false)
                setProd(result)
                console.log('fetch Product successfully', result)
            })
            .catch(error => console.log('error', error));
    }, [])

    return (
        <div className='containerprod'>
            {
                (loading) ? (
                    <Loading />
                ) : (
                    <div>
                        <div className='nav navNotLogin'>
                            <h1 className='wellcom'>Wellcome to My Web</h1>
                            <button className='button-81' onClick={() => navigate('/login')}>  login </button>
                        </div>
                        <h1>
                            Categories Product
                        </h1>
                        <div className='containercard'>
                            {
                                prod.map(Prod => (
                                    <div key={Prod.id} className='card'>
                                        <img src={Prod.image} alt={Prod.name} />
                                        <div className='containertitle'>
                                            <h4><b>{Prod.name}</b></h4>
                                            <button className='button-40'onClick={()=>{
                                                alert('Plese Login ')
                                                navigate('/login')
                                            }} >Product More</button>
                                        </div>
                                    </div>
                                )
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default NotLogin