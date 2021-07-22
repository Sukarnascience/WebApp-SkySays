import React from 'react';
import {FaSatellite} from 'react-icons/fa';
import './loadingStyle.css';

function Loading(){
    return(
        <div>
            <h1 className="loadingText">WELCOME</h1>
            <div className="author">
                <FaSatellite className="loader" color="rgb(0,0,0)" size="35"/>
                <p>
                    Data provided by: <b><a href="https://openweathermap.org/">OpenWeatherMap</a></b>
                    <br/>
                    background by <b><a href="https://www.svgbackgrounds.com/">SVGBackgrounds.com</a></b>
                    <br/>
                    Created By: Sukarna Jana
                </p>
            </div>
        </div>
    )
}

export default Loading;