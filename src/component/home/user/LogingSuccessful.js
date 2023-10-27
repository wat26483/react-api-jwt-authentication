import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../../Loading/Loading'
import { FcSearch } from "react-icons/fc";

function LogingSuccessful({ data }) {
    const [loading, setLoading] = useState(true)
    const [prod, setProd] = useState([])
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
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

    function searchprods(e) {
        e.preventDefault();
        if(search==''){
            alert('plese input')
        }else{
            navigate('/productsearch/' + search)
        }
        
    }
    return (
        <div className='containerprod'>
            {
                (loading) ? (
                    <Loading />
                ) : (
                    <div >
                        <div className='navlogin'>
                            <img src={data.avatar} alt={data.name} width={100} height={100} />
                            <p>
                                Wellcome {data.name}
                            </p>
                            <div>
                                <button className='button-81' onClick={() => {
                                    localStorage.removeItem('token')
                                    navigate('/login')
                                }}>Logout</button>
                            </div>
                        </div>
                        <form className='search' onSubmit={searchprods}>
                            <input type='text' placeholder='search product...' onChange={(e) => setSearch(e.target.value)} />
                            <button onClick={searchprods}>
                                <FcSearch className='iconsearch' />
                            </button>
                        </form>
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
                                            <Link to={'/product/' + Prod.id}>
                                                <button className='button-40' >Product More </button>
                                            </Link>
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

export default LogingSuccessful