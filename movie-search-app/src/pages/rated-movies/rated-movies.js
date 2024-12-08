import { Button, Center, Container, Flex, Space, TextInput, Title } from '@mantine/core';
import React, { useContext, useState } from 'react';
import norated from '../../assets/svg/loading.svg';
import search from '../../assets/png/search.png';
import { useNavigate } from 'react-router-dom';
import { FavContext } from '../../state/state';
import MovieCard from '../../components/movie-card/movie-card';
import './rated-movies.scss';

export default function RatedMovies() {
  const favContext = useContext(FavContext);
  const navigate = useNavigate();

  const genresLS = JSON.parse(localStorage.getItem('genresList'));

  const [searchQuery, setSearchQuery] = useState('');

  const searchHandler = (event) => {
    setSearchQuery(event.currentTarget.value);
  };

  const searchFilter = (item) => item.original_title.toLowerCase().includes(searchQuery.toLowerCase());

  return favContext.favState.favoritesId.length === 0 ? (
    <Center h="100vh">
      <Flex gap="16" justify="center" align="center" direction="column">
        <img src={norated} alt="You haven't rated any films yet" />
        <h2>You haven't rated any films yet</h2>
        <Button
          variant="filled"
          color="#9854f6"
          size="md"
          radius="md"
          onClick={() => {
            navigate('/movies');
          }}
        >
          Find movies
        </Button>
      </Flex>
    </Center>
  ) : (
    <Container fluid style={{ width: 1160, paddingLeft: 90, paddingRight: 90, paddingTop: 40, margin: 0 }}>
      <Flex justify={'space-between'} align={'center'}>
        <Title order={1}>Rated movies</Title>
        <TextInput
          className="search-input"
          leftSectionPointerEvents="none"
          leftSection={<img src={search} alt="search icon" />}
          value={searchQuery}
          onChange={searchHandler}
          placeholder="Search movie title"
          size="lg"
          radius="md"
        />
      </Flex>
      <Space h="40" />
      <div className="favorites-container">
        {searchQuery === ''
          ? favContext.favState.favoritesInfo.map((item) => <MovieCard key={item.id} info={item} genres={genresLS}></MovieCard>)
          : favContext.favState.favoritesInfo.filter(searchFilter).map((item) => <MovieCard key={item.id} info={item} genres={genresLS}></MovieCard>)}
      </div>
    </Container>
  );
}
