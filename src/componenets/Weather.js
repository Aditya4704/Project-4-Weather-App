import React, { useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'

function Weather() {
    const inputRef = useRef()
    const [weatherData , setWeatherData] = useState(false);
    const search = async (city)=>{
        if(city==="")
        {
            alert("Enter a City Name");
            return ;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
            const response = await fetch(url);
            const data = await response.json();
            if(!response.ok) throw data;
            console.log(data);
            setWeatherData({
                humidity : data.main.humidity,
                windSpeed : data.wind.speed,
                temprature : Math.round(data.main.temp),
                location : data.name,
                icon : data.weather[0].icon
            })
        }
        catch(error){
            setWeatherData(false);
            setTimeout(()=>alert(error.message) , 100);
        }        
    }
  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search' />
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
            <img className = "weather-icon" src={`https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`} alt='' />
            <p className="temprature">{weatherData.temprature}°c</p>
            <p className="location">{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{weatherData.windSpeed}km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </>:<>
            <img className = "weather-icon" src='' alt='' />
            <p className="temprature">--°c</p>
            <p className="location">--</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>--%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>--km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </>}
        
    </div>
  )
}

export default Weather