import { multipleCitiesListStyle } from './Styles';

export default function MultipleCitiesList(props) {
  console.log(
    'multipleCitiesArray in MulitpleCitiesList: ',
    props.listOfCities,
  );
  const multipleCitiesArray = !props.listOfCities
    ? []
    : JSON.parse(props.listOfCities);

  return (
    <div css={multipleCitiesListStyle} className="multipleCitiesList">
      <ul>
        {multipleCitiesArray.map((element, index) => {
          return <li key={index}>{element}</li>;
        })}
      </ul>
    </div>
  );
}
