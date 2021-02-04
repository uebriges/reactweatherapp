/** @jsxImportSource @emotion/react */
import CityWeatherInfo from './CityWeatherInfo';
import { currentRequestsStyle } from './Styles';

export default function CurrentRequests(props) {
  let multipleCities = !props.multipleCities ? [] : props.multipleCities;

  if (multipleCities.length > 0) {
    multipleCities = JSON.parse(multipleCities);
    // console.log('in currentreq after parsing: ', typeof multipleCities);
  }

  return (
    <div css={currentRequestsStyle}>
      {multipleCities.length > 0 ? (
        multipleCities.map((element, index) => {
          if (element.cod !== '404') {
            return <CityWeatherInfo key={index} city={element} />;
          } else {
            return <p>City not found. Please try again</p>;
          }
        })
      ) : (
        <section>Request a single or multiple cities in one request.</section>
      )}
    </div>
  );
}
