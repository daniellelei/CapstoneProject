import React from 'react';
import {Link, useHistory} from 'react-router-dom'
import "./LandingPage.css"

function LandingPage () {


    return (
        <div className='landingPage'>
            <img className = "landing" src="https://cdn.dribbble.com/users/676114/screenshots/15435517/media/e1c09133b33b1eee8c6aeebf211126c4.gif"/>
            <img className = "landing" src="https://i0.wp.com/www.holar.com.tw/wp-content/uploads/Holar-Blog-Coffee-vs.-Tea-7-Factors-to-Consider-Before-Drinking.png?fit=1024%2C512&ssl=1"/>
            <img className = "landing" src="https://imageio.forbes.com/specials-images/imageserve/6393aebacd1e996dc7b13be0/0x0.jpg?format=jpg&crop=1325,993,x81,y0,safe&width=1200"/>
        </div>
    )
}

export default LandingPage;