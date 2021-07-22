import React, { useState } from 'react';
import {ImSearch,ImLocation2} from 'react-icons/im';
import {AiOutlineReload} from 'react-icons/ai';
import {RiAlarmWarningLine} from 'react-icons/ri';
import axios from 'axios';
import './dataFetchStyle.css';

function DataFetching(){
    const [place,setPlace] = useState('');
    const [dataIN,setDataIN] = useState();
    const [fetchError,setFetchError] = useState(false);

    const APIKey = "061148ba192e7b43e1d51475a4de51ab";
    const fetchData = (e) =>{
        e.preventDefault(); 
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${APIKey}`)
        .then(responce=>{
            setDataIN(responce)
            console.log(responce)
        })
        .catch(error=>{
            console.log(error)
            setFetchError(true)
        })
        setPlace('')
    }
    const convertUTC = (UTC) =>{
        const fetchTime = new Date(UTC * 1000);
        const h = fetchTime.getHours();
        const m = fetchTime.getMinutes();
        return(h+":"+m)
    }
    if(!fetchError){
        return(
            <div className="ViewBox">
                <div className="SearchBox">
                    <form onSubmit={fetchData}>
                        <input
                            type="text"
                            value={place}
                            onChange={e=>{setPlace(e.target.value)}}
                            placeholder="Enter your place name..."/>
                        <button disabled={!place} type="submit"><ImSearch/></button>
                    </form>
                </div>
                { dataIN ?
                    <div className="GotData">
                        <div className="showDataA">
                            <div className="NamePlace">
                                <h1>{dataIN.data.name}</h1>
                                <h2>{dataIN.data.sys.country}</h2>
                            </div>
                            <p>Geolocation : lon:{(dataIN.data.coord.lon).toFixed(1)} lat:{(dataIN.data.coord.lat).toFixed(1)}</p>
                            <p className="IMGP"><img src={`http://openweathermap.org/img/wn/${dataIN.data.weather[0].icon}@2x.png`} alt="Icon"/></p>
                            <p className="mainTemp">{(dataIN.data.main.temp - 273.15).toFixed(1)}<span>&#8451;</span></p>
                            <p className="mainTempF">{((dataIN.data.main.temp - 273.15) * 9/5 + 32).toFixed(1)}<span>&#8457;</span></p>
                        </div>
                        <div className="showDataB">
                            <p>min temp: {(dataIN.data.main.temp_min - 273.15).toFixed(1)}<span>&#8451;</span></p>
                            <p>max temp: {(dataIN.data.main.temp_max - 273.15).toFixed(1)}<span>&#8451;</span></p>
                            <p>humidity : {dataIN.data.main.humidity} %</p>
                            <p>pressure : {dataIN.data.main.pressure} hPa</p>
                            <p>visibility : {dataIN.data.visibility}  metres</p>
                            <p>wind speed : {dataIN.data.wind.speed} m/s</p>
                        </div>
                        <div className="showDataC">
                            <h3>Other information</h3>
                            <hr/>
                            <p>sea level : {dataIN.data.main.sea_level} hPa</p>
                            <p>grnd level : {dataIN.data.main.grnd_level} hPa</p>
                            <p>wind deg : {dataIN.data.wind.deg}<span>&#176;</span></p>
                            <p>wind gust : {dataIN.data.wind.gust} m/s</p>
                            <p>sunrise : {convertUTC(dataIN.data.sys.sunrise)}</p>
                            <p>sunset : {convertUTC(dataIN.data.sys.sunset)}</p>
                        </div>
                    </div> : <p className="msgNA"><ImLocation2 color="rgba(255, 248, 220, 0.705)" size="50px"/></p>
                }
            </div> 
        )
    }
    else{
        return(
            <div className="OppsError">
                <p><RiAlarmWarningLine className="OppsErrorICON" size="35px"/></p>
                <p>
                Oops! , the place you have typed is not found <br/>
                so, please check your internet connection / the spelling or else we are sorry for your Inconvenience
                </p>
                <p><button onClick={()=>{setFetchError(!fetchError)}}><AiOutlineReload size="25px"/></button></p>
            </div>
        )
    }
}

export default DataFetching;
