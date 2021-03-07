/** @jsxImportSource @emotion/react */
import CityWeatherInfo from './CityWeatherInfo';
import { latestRequestsStyle } from './Styles';

export default function LatestRequests(props) {
  const multipleCities = !props.citiesToMoveToLatestRequests
    ? []
    : props.citiesToMoveToLatestRequests;

  // console.log('multipleCities in latest requests', multipleCities);
  // if (multipleCities.length > 0) {
  //   multipleCities = JSON.parse(multipleCities);
  //   console.log('in currentreq after parsing: ', typeof multipleCities);
  // }

  return (
    <div css={latestRequestsStyle}>
      {multipleCities.length > 0 ? (
        multipleCities.map((element, index) => {
          if (element.cod !== '404') {
            return <CityWeatherInfo key={index} city={element} />;
          } else {
            return <p>Location not found. Please try again</p>;
          }
        })
      ) : (
        <section />
      )}
    </div>
  );
}
