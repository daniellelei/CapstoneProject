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
            {/* <img className = "landing" src="https://cdn.dribbble.com/users/676114/screenshots/15435517/media/e1c09133b33b1eee8c6aeebf211126c4.gif"/> */}
            <div className='eachBlock'>
                <div className='ads mothersday'>
                    <div className='ad_titles'>
                        <h1 className='ad_title'>For the bestest</h1>
                        <h1 className='ad_title'>Mom ever</h1>
                    </div>
                    <div className='ad_contents'>
                        <h4 className='ad_content'>Let her know how much she’s loved. Surprise</h4>
                        <h4 className='ad_content'>her with a Starbucks eGift this Mother’s Day.</h4>
                    </div>
                    <button className='ad_button mothersday' >Send an eGift</button>
                </div>
                <img className='adImg'
                alt="img"
                src={mothersday} />
            </div>
            <div className='eachBlock'>
                <img className='adImg'
                alt="img"
                src={mint} />
                <div className='ads mint'>
                    <div className='ad_titles'>
                        <h1 className='ad_title'>For your enjoy-</h1>
                        <h1 className='ad_title'>mint</h1>
                    </div>
                    <div className='ad_contents'>
                        <h4 className='ad_content'>Hooray for our newest cooler-than-cool</h4>
                        <h4 className='ad_content'>Chocolate Java Mint Frappuccino® blended</h4>
                        <h4 className='ad_content'>beverage.</h4>
                    </div>
                    <button className='ad_button mint'>Order now</button>
                </div>
            </div>
            <div className='eachBlock'>
                <div className='ads macadamia'>
                    <div className='ad_titles'>
                        <h1 className='ad_title'>Macadamia just</h1>
                        <h1 className='ad_title'>dropped</h1>
                    </div>
                    <div className='ad_contents'>
                        <h4 className='ad_content'>Introducing the White Chocolate Macadamia</h4>
                        <h4 className='ad_content'>Cream Cold Brew with toasted cookie</h4>
                        <h4 className='ad_content'>crumbles.</h4>
                    </div>
                    <button className='ad_button macadamia'>Order now</button>
                </div>
                <img className='adImg'
                src={macadamia} />
            </div>
            <div className='eachBlock'>
                <img className='adImg'
                src={sweetest} />
                <div className='ads sweetest'>
                   <div className='ad_titles'>
                        <h1 className='ad_title'>Sweetest of the</h1>
                        <h1 className='ad_title'>hive</h1>
                    </div>
                    <div className='ad_contents'>
                        <h4 className='ad_content'>Buzzing into the café, an adorable new</h4>
                        <h4 className='ad_content'>Bumblebee Cake Pop dipped in chocolaty</h4>
                        <h4 className='ad_content'>icing.</h4>
                    </div>
                    <button className='ad_button sweetest'>Order now</button>
                </div>
            </div>
            
        </div>
    )
}

export default LandingPage;