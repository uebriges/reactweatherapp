/** @jsxImportSource @emotion/react */
import http from 'http';
import { useEffect, useState } from 'react';
import CurrentRequests from './CurrentRequests';
import LatestRequests from './LatestRequests';
import MultipleCitiesList from './MultipleCitiesList';
import { appStyle, sidebarStyle, singleCityStyle } from './Styles';

export default function Sidebar() {
  const [singleCityRequest, setSingleCityRequest] = useState('');
  const [multipleCitiesRequest, setMultipleCitiesRequest] = useState('');
  const [listOfCities, setListOfCities] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  let multipleCitiesArray = JSON.parse(localStorage.getItem('multipleCities'));
  multipleCitiesArray = !multipleCitiesArray ? [] : multipleCitiesArray;

  // Renders the list at refresh of the page
  useEffect(() => {
    setListOfCities(JSON.stringify(multipleCitiesArray));
  }, [listOfCities]);

  function fetchWeatherData(citiesArray) {
    // Browser integrates fetch! -> Try that!
    // Alternative: Got -> extra package
    const promisesArray = [];
    citiesArray.map((element, index) => {
      let promise = new Promise((resolve, reject) => {
        http.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${element}&appid=${process.env.REACT_APP_OPEN_WEATHERMAP_KEY}`,
          (resp) => {
            let data = '';
            resp
              .on('data', (chunk) => {
                data += chunk;
              })
              .on('end', () => {
                resolve(JSON.parse(data));
              })
              .on('error', (err) => {
                console.log('Error: ' + err.message);
              });
          },
        );
      });
      promisesArray.push(promise);
    });
    console.log('PromiseArray: ', promisesArray);
    return promisesArray;
  }

  function handleRequestedCity() {
    multipleCitiesArray = [];
    if (singleCityRequest) {
      Promise.all(fetchWeatherData([singleCityRequest])).then((result) => {
        console.log('Result: ', result);
        multipleCitiesArray = multipleCitiesArray.concat(result);
        setMultipleCitiesRequest(JSON.stringify(multipleCitiesArray));
      });
    }
  }

  function handleRequestedCities() {
    // multipleCitiesArray = [];
    // if (localStorage.getItem('')) {
    //   Promise.all(fetchWeatherData([singleCityRequest])).then((result) => {
    //     console.log('Result: ', result);
    //     multipleCitiesArray = multipleCitiesArray.concat(result);
    //     setMultipleCitiesRequest(JSON.stringify(multipleCitiesArray));
    //   });
    // }
  }

  async function checkIfCityExists(city) {
    const result = (await fetchWeatherData([city])[0]).cod;
    if (result === '404') {
      console.log("Doesn't exist");
      return false;
    } else {
      console.log('Exists');
      return true;
    }
  }

  async function addEntry() {
    console.log('--> addEntry');
    const newCityString = singleCityRequest;

    if (multipleCitiesArray.length === 0) {
      // add it but check city validity
      if (newCityString === '') {
        setErrorMessage('Please enter a city.');
      } else if (await checkIfCityExists(newCityString)) {
        console.log('first entry and city exists');
        multipleCitiesArray.push(newCityString);
        localStorage.setItem(
          'multipleCities',
          JSON.stringify(multipleCitiesArray),
        );
        setListOfCities(JSON.stringify(multipleCitiesArray));
        setErrorMessage('');
      } else {
        setErrorMessage('City not found.');
      }
    } else if (
      !JSON.parse(localStorage.getItem('multipleCities')).includes(
        newCityString,
      )
    ) {
      if (newCityString === '') {
        setErrorMessage('Please enter a city.');
      } else if (!(await checkIfCityExists(newCityString))) {
        console.log('in !checkIfCityExists');
        setErrorMessage('City not found.');
      } else {
        multipleCitiesArray.push(newCityString);
        localStorage.setItem(
          'multipleCities',
          JSON.stringify(multipleCitiesArray),
        );
        setListOfCities(JSON.stringify(multipleCitiesArray));
        setErrorMessage('');
      }
    } else {
      setErrorMessage('Entry already in the list.');
    }
    console.log('<-- addEntry');
  }

  function removeEntry() {
    localStorage.clear();
    setListOfCities(JSON.stringify([]));
  }

  return (
    <div className="app" css={appStyle}>
      <div className="sidebar" css={sidebarStyle}>
        <section className="section-header">
          <h1>Weather App</h1>
          <h2>(supported by openweathermap.org)</h2>
        </section>
        <section className="singleCity" css={singleCityStyle} id="cityName">
          <input
            type="text"
            onChange={(e) => setSingleCityRequest(e.target.value)}
          />
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
            onChange={(e) => setSingleCityRequest(e.target.value)}
            id="multipleCitiesInput"
          />
          <br />
          <input type="button" value="Add city" onClick={addEntry} />
          <input type="button" value="Clear list" onClick={removeEntry} />
          <MultipleCitiesList listOfCities={listOfCities} />
          <input
            type="button"
            value="Check the weather"
            onClick={handleRequestedCities}
          />
          <p>{errorMessage}</p>
        </section>
      </div>
      <LatestRequests />
      <CurrentRequests multipleCities={multipleCitiesRequest} />
    </div>
  );
}
