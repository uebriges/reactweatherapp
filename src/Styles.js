/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const sidebarStyle = css`
  display: flex;
  background-color: green;
  flex-direction: column;
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  padding: 10px;
  margin: 10px;
`;

export const singleCityStyle = css`
  background-color: red;
`;

export const appStyle = css`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr 1fr;
  width: 80vw;
  height: 80vh;
  margin: auto;
`;

export const latestRequestsStyle = css`
  background-color: yellow;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  padding: 10px;
  margin: 10px;
`;

export const currentRequestsStyle = css`
  background-color: gray;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  padding: 10px;
  margin: 10px;
  display: flex;
`;

export const multipleCitiesListStyle = css`
  list-style-type: none;
  background-color: gray;
  list-style-type: none;
`;

export const CityWeatherInfoStyle = css`
  justify-content: flex-start;
`;
