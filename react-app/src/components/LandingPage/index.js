import React from 'react';
import {Link, useHistory} from 'react-router-dom'
import "./LandingPage.css"
import mothersday from './assets/mothersday.jpg'
import mint from './assets/mint.jpg'
import sweetest from './assets/sweetest.jpg'
import macadamia from './assets/macadamia.jpg'
function LandingPage () {


    return (
        <div className='landingPage'>
            <img className = "landing" src="https://cdn.dribbble.com/users/676114/screenshots/15435517/media/e1c09133b33b1eee8c6aeebf211126c4.gif"/>
            <div className='eachBlock'>
                <div className='ads'>
                    <h1 className='ad_title'></h1>
                    <h4 className='ad_content'></h4>
                    <button className='ad_button'></button>
                </div>
                <img src={mothersday} />
            </div>
            <div className='eachBlock'>
                <div className='ads'>
                    <h1 className='ad_title'></h1>
                    <h4 className='ad_content'></h4>
                    <button className='ad_button'></button>
                </div>
                <img src={mothersday} />
            </div>
            <div className='eachBlock'>
                <div className='ads'>
                    <h1 className='ad_title'></h1>
                    <h4 className='ad_content'></h4>
                    <button className='ad_button'></button>
                </div>
                <img src={mothersday} />
            </div>
            
        </div>
    )
}

export default LandingPage;