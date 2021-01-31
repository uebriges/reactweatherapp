import http from 'http';
import { useState } from 'react';
import MultipleCitiesList from './MultipleCitiesList';
import { sidebarStyle, singleCityStyle } from './Styles';

export default function Sidebar() {
  const [singleCity, setSingleCity] = useState('');
  const [multipleCities, setMultipleCities] = useState([]);

  let multipleCitiesArray = JSON.parse(localStorage.getItem('multipleCities'));
  multipleCitiesArray = !multipleCitiesArray ? [] : multipleCitiesArray;

  function fetchWeatherData(citiesArray) {
    citiesArray.map((element, index) => {
      http.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${element}&appid=${process.env.REACT_APP_OPEN_WEATHERMAP_KEY}`,
        (resp) => {
          let data = '';
          resp
            .on('data', (chunk) => {
              data += chunk;
            })
            .on('end', () => {
              console.log(data);
            })
            .on('error', (err) => {
              console.log('Error: ' + err.message);
            });
        },
      );
    });
  }

  function removeEntry(id) {
    const element = document.getElementById(id);
    element.parentElement.remove();
  }

  function handleRequestedCity() {
    console.log(singleCity);
    fetchWeatherData([singleCity]);
  }

  function handleRequestedCities() {}

  function addEntry() {
    console.log('--> addEntry');
    const newCityString = document.getElementById('multipleCitiesInput').value;
    multipleCitiesArray.push(newCityString);
    localStorage.setItem('multipleCities', JSON.stringify(multipleCitiesArray));
    setMultipleCities(multipleCitiesArray);
    console.log('<-- addEntry');
  }

  function removeEntry() {
    localStorage.clear();
    setMultipleCities([]);
  }

  return (
    <div className="app">
      <div className="sidebar" css={sidebarStyle}>
        <section className="section-header">
          <h1>Weather App</h1>
          <h2>(supported by openweathermap.org)</h2>
        </section>
        <section className="singleCity" css={singleCityStyle} id="cityName">
          <input type="text" onChange={(e) => setSingleCity(e.target.value)} />
          <br />
          <input
            type="button"
            onClick={handleRequestedCity}
            value="Check the weather"
          />
        </section>
        <p>OR</p>
        <section className="multiple-cities">
          <input
            type="text"
            onChange={(e) => setSingleCity(e.target.value)}
            id="multipleCitiesInput"
          />
          <br />
          <input type="button" value="Add city" onClick={addEntry} />
          <input type="button" value="Clear list" onClick={removeEntry} />
          <MultipleCitiesList multipleCities={multipleCities} />
          <input
            type="button"
            value="Check the weather"
            onClick={handleRequestedCities}
          />
        </section>
      </div>
    </div>
  );
}
