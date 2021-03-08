/** @jsxImportSource @emotion/react */
import http from 'http';
import { useEffect, useState } from 'react';
import CurrentRequests from './CurrentRequests';
import LatestRequests from './LatestRequests';
import MultipleCitiesList from './MultipleCitiesList';
import { appStyle, sidebarStyle } from './Styles';

export default function Sidebar() {
  const [singleCityRequest, setSingleCityRequest] = useState('');
  const [multipleCitiesRequest, setMultipleCitiesRequest] = useState('');
  const [listOfCities, setListOfCities] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [
    citiesToMoveToLatestRequests,
    setCitiesToMoveToLatestRequests,
  ] = useState('');

  let multipleCitiesArray = JSON.parse(localStorage.getItem('multipleCities'));
  multipleCitiesArray = !multipleCitiesArray ? [] : multipleCitiesArray;

  // Renders the list at refresh of the page
  useEffect(() => {
    setListOfCities(JSON.stringify(multipleCitiesArray));
  }, [listOfCities, multipleCitiesArray]);

  // Empties the citiesToMove at the beginning.
  useEffect(() => {
    localStorage.setItem('citiesToMove', '[]');
  }, []);

  function fetchWeatherData(citiesArray) {
    // Browser integrates fetch! -> Try that!
    // Alternative: Got -> extra package
    const promiseArray = citiesArray.map((element) => {
      return new Promise((resolve, reject) => {
        http.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${element}&appid=${process.env.REACT_APP_OPEN_WEATHERMAP_KEY}`,
          (resp) => {
            let data = '';
            resp
              .on('data', (chunk) => {
                data += chunk;
              })
              .on('end', () => {
                resolve(JSON.parse(data));
                return JSON.parse(data);
              })
              .on('error', (err) => {
                reject('Error: ', err.message);
                console.log('Error: ' + err.message);
              });
          },
        );
      });
    });
    return promiseArray;
  }

  function handleRequestedCity() {
    multipleCitiesArray = [];
    if (singleCityRequest) {
      Promise.all(fetchWeatherData([singleCityRequest])).then((result) => {
        multipleCitiesArray = multipleCitiesArray.concat(result);
        if (multipleCitiesArray[0].cod !== '404') {
          setMultipleCitiesRequest(JSON.stringify(multipleCitiesArray));
          if (localStorage.getItem('citiesToMove')) {
            setCitiesToMoveToLatestRequests(
              JSON.parse(localStorage.getItem('citiesToMove')),
            );
          }
          localStorage.setItem(
            'citiesToMove',
            JSON.stringify(multipleCitiesArray),
          );
        } else {
          setErrorMessage('Location not found.');
        }
      });
    }
  }

  function handleRequestedCities() {
    multipleCitiesArray = [];
    multipleCitiesArray = JSON.parse(localStorage.getItem('multipleCities'));
    console.log(multipleCitiesArray);
    if (multipleCitiesArray && multipleCitiesArray.length > 0) {
      Promise.all(fetchWeatherData(multipleCitiesArray)).then((result) => {
        console.log('result: ', result);
        multipleCitiesArray = result;
        if (multipleCitiesArray[0].cod !== '404') {
          console.log('not 404');
          setMultipleCitiesRequest(JSON.stringify(multipleCitiesArray));
          if (localStorage.getItem('citiesToMove')) {
            setCitiesToMoveToLatestRequests(
              JSON.parse(localStorage.getItem('citiesToMove')),
            );
          }
          console.log('multipleCitiesArray: ', multipleCitiesArray);
          localStorage.setItem(
            'citiesToMove',
            JSON.stringify(multipleCitiesArray),
          );
        } else {
          setErrorMessage('Location not found.');
        }
      });
    } else {
      setErrorMessage('Please enter a city.');
    }
  }

  async function checkIfCityExists(city) {
    const result = (await fetchWeatherData([city])[0]).cod;
    if (result === '404') {
      return false;
    } else {
      return true;
    }
  }

  async function addEntry() {
    const newCityString = singleCityRequest;

    if (multipleCitiesArray.length === 0) {
      // add it but check city validity
      if (newCityString === '') {
        setErrorMessage('Please enter a city.');
      } else if (await checkIfCityExists(newCityString)) {
        multipleCitiesArray.push(newCityString);
        localStorage.setItem(
          'multipleCities',
          JSON.stringify(multipleCitiesArray),
        );
        setListOfCities(JSON.stringify(multipleCitiesArray));
        setErrorMessage('');
      } else {
        setErrorMessage('Location not found.');
      }
    } else if (
      !JSON.parse(localStorage.getItem('multipleCities')).includes(
        newCityString,
      )
    ) {
      if (newCityString === '') {
        setErrorMessage('Please enter a city.');
      } else if (!(await checkIfCityExists(newCityString))) {
        setErrorMessage('Location not found.');
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
  }

  function removeEntry() {
    localStorage.setItem('multipleCities', '[]');
    setListOfCities(JSON.stringify([]));
  }

  return (
    <div className="app" css={appStyle}>
      <div className="sidebar" css={sidebarStyle}>
        <section className="section-header">
          <h1>Weather App</h1>
          <h2>(supported by openweathermap.org)</h2>
        </section>
        <section className="singleCity" id="cityName">
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
      <LatestRequests
        citiesToMoveToLatestRequests={citiesToMoveToLatestRequests}
      />
      <CurrentRequests multipleCities={multipleCitiesRequest} />
    </div>
  );
}
