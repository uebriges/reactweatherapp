/** @jsxImportSource @emotion/react */
import { Global } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './Sidebar';
import { globalStyles } from './Styles';

ReactDOM.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <Sidebar />
  </React.StrictMode>,
  document.getElementById('root'),
);
