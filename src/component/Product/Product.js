import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import './Product.css'
import Prod from './Prod'
function Product() {
    const [prodseleted, setProdseleted] = useState(null)
    const [data, setData] = useState(null)
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    let { id } = useParams();
    let proditem = null
    const docBody = document.body;
    if (!!prodseleted) {
        docBody.classList.add('hide')
        proditem = <Prod prodseleted={prodseleted} closeitem={closeitem} />
    }else{
        
        docBody.classList.remove('hide')
    }


    function closeitem(){
        setProdseleted(null)
    }
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
                setData(result)
                console.log('fetch user successfully', result)
                var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };

                fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${id}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        setProduct(result)
                        console.log('fetch product successfully', result)
                        setLoading(false)
                    })
                    .catch(error => console.log('error', error));

            })
            .catch(error => console.log('error', error));
    }, [id])


    return (
        <div>
            {
                (loading) ? (
                    <Loading />
                ) : (
                    <div className='containerprod'>
                        <div className='prod'>
                            {proditem}
                        </div>
                        <div className='nav'>
                            <img src={data.avatar} alt={data.name} width={100} height={100} />
                            <p>
                                Wellcome {data.name}
                            </p>
                            <div>
                                <button className='button-81' onClick={() => {
                                    navigate('/home')
                                }}>Home</button>
                                <button className='button-81' onClick={() => {
                                    localStorage.removeItem('token')
                                    navigate('/login')
                                }}>Logout</button>
                            </div>

                        </div>
                        <div className='header'>
                        
                            <h1>
                                Product {product[0].category.name}
                            </h1>
                        </div>

                        <div className='containercard'>
                        
                            {
                                product.map(prod => (

                                    <div key={prod.id} className='cardprod' onClick={() =>{
                                        setProdseleted(prod)
                                        
                                    } } >
                                        <img src={prod.images[0]} width={200} alt={prod.images[0]} />
                                        <p>
                                            {prod.title}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Product