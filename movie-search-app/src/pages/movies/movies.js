import { Container, Flex, Select, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_TMD_API_KEY}`,
  },
};

export default function Movies() {
  const [genresList, setGenresList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [year, setYear] = useState('');

  const getGenres = async () => {
    let resp = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
    let data = await resp.json();
    let genresList = data.genres.map((val) => val.name);
    setGenresList(genresList);
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <Container style={{ paddingLeft: 90, paddingRight: 90, paddingTop: 40, margin: 0 }}>
      <Title order={1}>Movies</Title>
      <Flex gap="16">
        <Select label="Genres" placeholder="Select genre" data={genresList} value={genres} onChange={setGenres} />
        <Select label="Release year" placeholder="Select release year" data={['raz', 'dva']} value={year} onChange={setYear} />
      </Flex>
    </Container>
  );
}
