import { NavLink, Route, Routes } from 'react-router-dom';
import './app.scss';
import logo from '../../assets/svg/logo.svg';
import NotFoundPage from '../404/404';
import RatedMovies from '../rated-movies/rated-movies';
import Movies from '../movies/movies';
import Movie from '../movie/movie';
import { Alert, AppShell, Badge, Flex, Space, Title } from '@mantine/core';
import { createContext, useEffect, useReducer, useState } from 'react';
import { favReducer, initialFavState, FavContext } from '../../state/state';

export const APIContext = createContext();

function App() {
  const [apiKey, setApiKey] = useState(null);
  const [favState, favDispatch] = useReducer(favReducer, initialFavState);
  const [visibleAlert, setVisibleAlert] = useState(true);

  const callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const hideAlert = () => {
    localStorage.setItem('visibleAlertLS', 'hidden');
    setVisibleAlert(false);
  };

  useEffect(() => {
    callBackendAPI()
      .then((res) => setApiKey(res.key))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (localStorage.getItem('visibleAlertLS')) {
      setVisibleAlert(false);
    }
  }, []);

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
        <Alert
          className="no-access-alert"
          variant="light"
          color="blue"
          withCloseButton
          closeButtonLabel="Dismiss"
          title="Список фильмов пустой?"
          hidden={!visibleAlert}
          onClose={() => setVisibleAlert(false)}
        >
          Сервис TMDB может быть недоступен в некоторых регионах. Может быть, стоит попробовать открыть сайт по-другому?🤔
          <Space h="10" />
          <Badge className="pointer" variant="light" fullWidth size="sm" radius="sm" onClick={hideAlert}>
            Больше не показывать
          </Badge>
        </Alert>
      </AppShell.Navbar>
      <AppShell.Main style={{ backgroundColor: '#f5f5f6' }}>
        <APIContext.Provider value={apiKey}>
          <FavContext.Provider value={{ favDispatch, favState }}>
            <Routes>
              <Route path="movies" element={<Movies />} />
              <Route path="movies/:id" element={<Movie />} />
              <Route path="rated-movies" element={<RatedMovies />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </FavContext.Provider>
        </APIContext.Provider>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
