import { useState, useEffect } from 'react';
import './style.css';

function Myposition() {
  const [loading,setLoading] = useState(null);
  const [coords, setCoords] = useState(null);
  const [current,setCurrent] = useState({
    temp_c:'',
    icon:'',
    feelslike_c:''
  });

  const [location,setLocation] = useState({
    name:'',
    country:'',
    region:'',
    localtime:''
  });

  const getLocation = () => {
    if(!navigator.geolocation) {
      alert('Geolocation yok');
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords(`${position.coords.latitude},${position.coords.longitude}`);
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    const apiURL = coords ? `https://api.weatherapi.com/v1/current.json?key=20b6ab3bc821401dbcc93127222402&q=${coords}&aqi=no ` 
    : `http://api.weatherapi.com/v1/forecast.json?key=20b6ab3bc821401dbcc93127222402&q=istanbul`;
    fetch(apiURL).then(res => res.json()).then((data) => {
      setCurrent({
        temp:data.current.temp_c,
        icon:data.current.condition.icon,
        feelslike_c:data.current.feelslike_c
      });
      setLocation({
        name:data.location.name,
        region:data.location.region,
        country:data.location.country,
        localtime:data.location.localtime
      });
      setLoading(false);
    })
  },[coords]);

  return (
    <div className="myposition">
     <button className="button" id="mypositionButton" onClick={getLocation}>Hava Durumu Getir</button>
     {!loading &&
      <div>
        <div className="myweather">
          <img src={current.icon} alt="Weather" />
          <div>
            Sıcaklık
            <span>{current.temp}</span>
          </div>
          
          <div>
            Hissedilen
            <span>{current.feelslike_c}</span>
          </div>
        </div>

        <div>
          <div className="location">
            <span>{location.name}</span>
              - 
            <span>{location.region}</span>
              -
            <span>{location.country}</span>
          </div>

          <div className="time">
            <span>{location.localtime}</span>
          </div>
        </div>
      </div>
     }
     {loading && 
       <div className="loading">
        <span>Yükleniyor...</span>
       </div>
     }
     
    </div>
  );
}

export default Myposition;
