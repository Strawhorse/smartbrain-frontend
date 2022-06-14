import React from 'react';
import Tilty from 'react-tilty'
import 'tachyons';
import './Logo.css';
import brain_logo from './brain_logo.png';


const Logo = () => {
    return (
       <div className='ma4 mt0 '>
        <Tilty className="Tilt br2 shadow-3" options={{ max : 25 }}
        style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner pa3">
                <img style={{paddingTop: '5px'}} src = {brain_logo} alt=''/>
            </div>
        </Tilty>
       </div>
    )
}

export default Logo;