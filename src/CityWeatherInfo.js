import { CityWeatherInfoStyle } from './Styles';

export default function CityWeatherInfo(props) {
  console.log(props.city);
  console.log(props.city.sys.sunrise);
  console.log(props.city.sys.sunset);

  return (
    <div css={CityWeatherInfoStyle}>
      <p>City: {props.city.name}</p>
      <p>Condition: {props.city.weather[0].description}</p>
      <p>
        Temp/Humidity: {props.city.main.temp + '/' + props.city.main.humidity}
      </p>
      <p>Sunrise: {new Date(props.city.sys.sunrise * 1000).toUTCString()}</p>
      <p>Sunset: {new Date(props.city.sys.sunset * 1000).toUTCString()}</p>
    </div>
  );
}
