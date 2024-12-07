import { NavLink, Route, Routes } from 'react-router-dom';
import './app.scss';
import logo from '../../assets/svg/logo.svg';
import NotFoundPage from '../404/404';
import RatedMovies from '../rated-movies/rated-movies';
import Movies from '../movies/movies';
import { AppShell, Flex, Space, Title } from '@mantine/core';
import { useEffect, useReducer } from 'react';
import { favReducer, initialFavState, FavContext } from '../../state/state';

function App() {
  const [favState, favDispatch] = useReducer(favReducer, initialFavState);

  useEffect(() => {
    localStorage.setItem('favoritesId', JSON.stringify(favState.favoritesId));
    localStorage.setItem('favoritesInfo', JSON.stringify(favState.favoritesInfo));
    localStorage.setItem('favoritesRating', JSON.stringify(favState.favoritesRating));
  }, [favState]);

  return (
    <AppShell navbar={{ width: 280 }} main={{ width: 1160 }} withBorder={false}>
      <AppShell.Navbar style={{ padding: '24px', backgroundColor: '#f2ecfa' }}>
        <NavLink to="/movies" style={{ textDecoration: 'none' }}>
          <Flex gap={12}>
            <img src={logo} alt="logo"></img>
            <Title order={2} className="title">
              ArrowFlicks
            </Title>
          </Flex>
        </NavLink>
        <Space h="80" />
        <Flex gap={16} direction="column">
          <NavLink to="/movies" className="nav-item">
            Movies
          </NavLink>
          <NavLink to="/rated-movies" className="nav-item">
            Rated movies
          </NavLink>
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main style={{ backgroundColor: '#f5f5f6' }}>
        <FavContext.Provider value={{ favDispatch, favState }}>
          <Routes>
            <Route path="movies" element={<Movies />} />
            <Route path="rated-movies" element={<RatedMovies />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </FavContext.Provider>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
