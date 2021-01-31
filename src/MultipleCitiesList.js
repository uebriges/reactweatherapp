export default function MultipleCitiesList(props) {
  const multipleCitiesArray = !props.multipleCities ? [] : props.multipleCities;

  return (
    <ul>
      {multipleCitiesArray.map((element, index) => {
        return <li key={index}>{element}</li>;
      })}
    </ul>
  );
}
