import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './SearchProd.css'
import Loading from '../Loading/Loading'
import { FcSearch } from "react-icons/fc";


function SearchProd() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const [search, setSearch] = useState([])
  const [searchtext, setSearchtext] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

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

        fetch("https://api.escuelajs.co/api/v1/products/?title=" + id, requestOptions)
          .then(response => response.json())
          .then(result => {
            setLoading(false)
            setSearch(result)
            console.log('productsearch', result)
          })
          .catch(error => console.log('error', error));
      })
      .catch(error => console.log('error', error));
  }, [])

  function searchprods(e) {

    if (searchtext === '') {
      alert('plese input')
      e.preventDefault();
    } else {
      navigate(`/productsearch/${searchtext}`);
    }

  }
  if (window.screen.width > 1440 && search.length < 16) {
    const bg = document.body
    bg.classList.add('pages')
  }else if(window.screen.width > 736 && search.length < 6){
    const bg = document.body
    bg.classList.add('pages')
  }
  return (
    <div className='containersearch' >
      {
        (loading) ? (
          <Loading />
        ) : (
          <div className='pagesearch' id='test' >
            <div className='navuser' >
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
              <form className='search' onSubmit={searchprods} >
                <input type='text' placeholder='search product...' onChange={(e) => setSearchtext(e.target.value)} />
                <button onSubmit={searchprods}>
                  <FcSearch className='iconsearch' />
                </button>
              </form>
            </div>
            {
              (search.length === 0) ? (
                <h1>
                  undifine result search {id}
                </h1>
              ) : (
                <div className='allitem'>
                  {
                    search.map((prod) => (
                      <div key={prod.id} className='cards'>
                        <img src={prod.images} alt={prod.images} height={100} />
                        <h5>{prod.title}</h5>
                        <p>Price {prod.price} $</p>
                      </div>
                    ))
                  }
                </div>
              )
            }

          </div>
        )
      }
    </div>
  )
}

export default SearchProd