/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const globalStyles = css`
  html,
  body {
    font-family: system-ui;
    color: darkblue;
  }

  html {
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
      ),
      url('cloudBackground.webp');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100vw;
  }

  html:before {
    position: relative;
    background: #ffffff;
    overflow: hidden;
  }
`;

export const sidebarStyle = css`
  display: flex;
  flex-direction: column;
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  padding: 10px;
  margin: 10px;
`;

export const singleCityStyle = css``;

export const appStyle = css`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr 1fr;
  width: 80vw;
  height: 80vh;
  margin: auto;
`;

export const latestRequestsStyle = css`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  padding: 10px;
  margin: 10px;
  display: flex;
`;

export const currentRequestsStyle = css`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  padding: 10px;
  margin: 10px;
  display: flex;

  span {
    padding-top: 50px;
    font-size: 35px;
    max-width: 400px;
  }
`;

export const multipleCitiesListStyle = css`
  list-style-type: none;
  background-color: gray;
  list-style-type: none;
`;

export const cityWeatherInfoStyle = css`
  justify-content: flex-start;
  margin: 10px;
  border: 1px solid grey;
  padding: 15px;
  border-radius: 15px;
  background-color: lavender;
  box-shadow: 3px 2px 6px 1px;
  width: 200px;
`;
