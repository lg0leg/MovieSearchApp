import { NavLink, Route, Routes } from 'react-router-dom';
import './app.scss';
import logo from '../../assets/svg/logo.svg';
import NotFoundPage from '../404/404';
import RatedMovies from '../rated-movies/rated-movies';
import Movies from '../movies/movies';

function App() {
  return (
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
  );
}

export default App;
