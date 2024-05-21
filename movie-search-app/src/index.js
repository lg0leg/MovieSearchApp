import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import App from './pages/app/app';

const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  // primaryColor: 'cyan',
  // colors: {
  //   white: ['#ffffff', '#e7e7e7', '#cdcdcd', '#b2b2b2', '#9a9a9a', '#8b8b8b', '#848484', '#717171', '#656565', '#575757'],
  //   purple1: ['#f4effb', '#e5d5fa', '#d1b4f8', '#bd93f7', '#9854f6', '#541f9d', '#7a3fc5', '#6832ae', '#5c2c9b', '#4f2489'],
  //   yellow: ['#fab005', '#fff0cd', '#fde09d', '#fccf67', '#fbc13b', '#fab720', '#fab30e', '#df9d00', '#c78b00', '#ac7700'],
  //   gray: ['#f5f5f6', '#eaebed', '#d5d6dc', '#acadb9', '#7b7c88', '#868689', '#7f7f83', '#6d6d70', '#5f5f66', '#52525b'],
  // },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
