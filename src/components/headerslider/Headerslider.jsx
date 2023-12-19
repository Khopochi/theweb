import React, { useEffect, useState } from 'react';
import './headerslider.scss'

export const Headerslider = () => {
    const [currentState, setCurrentState] = useState(0)
    // slider data
    const imageSlide = [
        {
            url:'https://amazcart.ischooll.com/public/uploads/images/04-01-2023/63b508b5b7c35.jpeg',
            title: 'Title basi',
            body: "Body basi"
        },
        {
            url:'https://amazcart.ischooll.com/public/uploads/images/05-01-2023/63b6990a4cd4d.jpeg',
            title: 'Title basi',
            body: "Body basi"
        },
        {
            url:'https://amazcart.ischooll.com/public/uploads/images/03-01-2023/63b43e3b21095.jpeg',
            title: 'Title basi',
            body: "Body basi"
        }
    
    ]

    //function to handle slider
    const goToNext = (x) => {
        setCurrentState(x)
    }

    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(currentState ===2){
                setCurrentState(0)
            }else{
                setCurrentState(currentState+1)
            }
        },5000)
        return () => clearTimeout(timer)
    },[currentState])




    

    const bgImageStyle = {
        backgroundImage: `url(${imageSlide[currentState].url})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100%'
    }
  return (
    <div className="headerslider">
        <div style={bgImageStyle}>
            <div className="transbkd"></div>
            <div className="sliderButtons">
                {
                    imageSlide.map((imageSlide, currentstate) =>(
                        <span className={currentstate === currentState ? 'spanActive' : 'span'} key={currentstate} onClick={()=> goToNext(currentstate)}></span>)
                    )
                }
            </div>

        </div>
    </div>
  )
}
