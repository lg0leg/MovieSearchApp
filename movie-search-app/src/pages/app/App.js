import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import './app.scss';
import logo from '../../assets/svg/logo.svg';
import NotFoundPage from '../404/404';
import RatedMovies from '../rated-movies/rated-movies';
import Movies from '../movies/movies';

const theme = createTheme({
  // colors: {
  //   white: ['#ffffff', '#e7e7e7', '#cdcdcd', '#b2b2b2', '#9a9a9a', '#8b8b8b', '#848484', '#717171', '#656565', '#575757'],
  //   purple1: ['#f4effb', '#e5d5fa', '#d1b4f8', '#bd93f7', '#9854f6', '#541f9d', '#7a3fc5', '#6832ae', '#5c2c9b', '#4f2489'],
  //   yellow: ['#fab005', '#fff0cd', '#fde09d', '#fccf67', '#fbc13b', '#fab720', '#fab30e', '#df9d00', '#c78b00', '#ac7700'],
  //   gray: ['#f5f5f6', '#eaebed', '#d5d6dc', '#acadb9', '#7b7c88', '#868689', '#7f7f83', '#6d6d70', '#5f5f66', '#52525b'],
  // },
});

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <div className="app">
        <div className="sidebar">
          <div className="logo">
            <img src={logo} alt="logo"></img>
            <p className="title">ArrowFlicks</p>
          </div>

          <div className="app-nav">
            <NavLink to="/movies" className="nav-item">
              Movies
            </NavLink>
            <NavLink to="/rated-movies" className="nav-item">
              Rated movies
            </NavLink>
          </div>
        </div>
        <Routes>
          <Route path="movies" element={<Movies />} />
          <Route path="rated-movies" element={<RatedMovies />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </MantineProvider>
  );
}

export default App;
