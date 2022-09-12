import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Card = () => {
  const [data, setData] = useState({})
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
    function success(pos) {
      const crd = pos.coords;

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=419ff9fcdfbe2fff3f5824a29ecef92f`)
        .then(res => setData(res.data))
    }
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
  }, [])

  let celsiusdec =(data.main?.temp) - 273
let celsius = celsiusdec.toFixed(2)
let farenth = (celsius*(9/5))+32

console.log(farenth,celsius)
  console.log(data)
  return (
    <div className="container">
      <h1 className="title" >wheather App</h1>
      <h2 className="title">{data.name}-{data.sys?.country}</h2>
        <img src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}.png`} alt="#"></img>
      <div className="center">
        <li href="#"><h2>{data.weather?.[0].description}</h2></li>
        <li href="#">clouds: {data.clouds?.all}%</li>
        <li href="#">Wind speed: {data.wind?.speed} m/s</li>
        <li href="#">Humidity: {data.main?.humidity}%</li>
        <li href="#">Pressure:{data.main?.pressure} mb</li>
        </div>
     
      <div className="buto">
      {isVisible?(
          <h2>{celsius}°C</h2>
        ):(<h2>{farenth}°F</h2>)}
        </div>
        
        <button className="buto" onClick={() => setIsVisible(!isVisible)}>degrees °F/°C</button>
      
    
      
    </div>
  );
};

export default Card;