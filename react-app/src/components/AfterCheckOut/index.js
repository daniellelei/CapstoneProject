import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import afterCheckOutImg from './assets/afterCheckOutImg.jpg';

const AfterCheckOut = () => {
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(loading) {
            setTimeout(()=>{
                setLoading(false)
            }, 2000)
        }
    }, [loading])

    if(loading) return (<div className='loadingPage'>
        <img className="loadingImg" src="https://cdn.dribbble.com/users/2520294/screenshots/7209485/media/cf226d98a06282e9cabf5c2f8f6d547f.gif"/>
    </div>)
    return (
        
        <div style={{margin:"10% 15% 10% 15%", display:"flex", flexDirection:"row",justifyContent:"space-between", alignItems:"center"}}>
            <div>
                <h1>Your drinks will be ready in 3 to 5 minutes!</h1>
                <h3>Thanks for your order!</h3>
            </div>
            <img src={afterCheckOutImg} alt="img"
            style = {{width:"400px", height:"400px", objectFit:"cover", borderRadius:"50%"}}
            ></img>
        </div>
    )
}

export default AfterCheckOut;