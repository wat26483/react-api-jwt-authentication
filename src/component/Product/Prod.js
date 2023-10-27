import React, { useRef} from 'react'
import './Product.css'
import { GrFormNext,GrFormPrevious } from "react-icons/gr";



function Prod({ prodseleted, closeitem }) {
    let imgref = useRef(null)

    const prev = () =>{
        let widthscreen = window.screen.width

        if(widthscreen<330){
            imgref.current.scrollLeft -= 180
        }else if(widthscreen<430){
            imgref.current.scrollLeft -= 280
        }else if(widthscreen<520){
            imgref.current.scrollLeft -= 380
        }else{
            imgref.current.scrollLeft -= 500
        }
        
    } 
    const next = () => {
        let widthscreen = window.screen.width

        if(widthscreen<330){
            imgref.current.scrollLeft += 180
        }else if(widthscreen<430){
            imgref.current.scrollLeft += 280
        }else if(widthscreen<520){
            imgref.current.scrollLeft += 380
        }else{
            imgref.current.scrollLeft += 500
        }
        
    }
    return (
        <div className='item'>
            <div className='containercarditem'  >
                <div className='carditem'>
                    <div className='containerimg' ref={imgref} >
                        {
                            prodseleted.images.map(imgages => <img src={imgages} alt={imgages} />)
                        }
                    </div>
                    <div className='btn'>
                        <span className='prev' ><GrFormPrevious onClick={prev} /></span>
                        <span className='next'><GrFormNext onClick={next} /></span>
                    </div>
                    <h2>{prodseleted.title}</h2>
                    <h4>Price {prodseleted.price} $</h4>
                    <p>{prodseleted.description}</p>
                    <div className='close' onClick={closeitem} >
                        <img src='https://cdn0.iconfinder.com/data/icons/pixel-perfect-at-24px-volume-3/24/5003-512.png' alt='close' width={40} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Prod