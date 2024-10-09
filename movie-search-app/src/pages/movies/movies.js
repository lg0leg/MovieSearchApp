import { Button, Container, Flex, Select, Space, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import './movies.scss';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_TMD_API_KEY}`,
  },
};

export default function Movies() {
  const [genresList, setGenresList] = useState([]);
  const [genres, setGenres] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [ratingFrom, setRatingFrom] = useState('');
  const [ratingTo, setRatingTo] = useState('');

  const [page, setPage] = useState('1');
  const [sort, setSort] = useState('popularity.desc');

  const [moviesInfo, setMoviesInfo] = useState([]);

  const getMovies = async () => {
    const baseURL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US';
    let year = releaseYear ? `&primary_release_year=${releaseYear}` : '';
    let rf = ratingFrom ? `&vote_average.gte=${ratingFrom}` : '';
    let rt = ratingTo ? `&vote_average.lte=${ratingTo}` : '';
    let gens = genres ? `&with_genres=${genresList.find((val) => val.name === genres).id}` : '';
    let query = `${baseURL}&page=${page}${year}&sort_by=${sort}${rf}${rt}${gens}`;
    let resp = await fetch(query, options);
    let data = await resp.json();
    setMoviesInfo(data.results);
  };

  const getGenres = async () => {
    let resp = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
    let data = await resp.json();
    setGenresList(data.genres);
  };

  useEffect(() => {
    getGenres();
  }, []);

  // useEffect(() => {
  //   console.log(sort);
  // }, [sort]);

  useEffect(() => {
    getMovies();
  }, [genres, releaseYear, ratingFrom, ratingTo, sort]);

  const years = Array.from({ length: 100 }, (_, index) => String(2024 - index));

  return (
    <Container fluid style={{ width: 1160, paddingLeft: 90, paddingRight: 90, paddingTop: 40, margin: 0 }}>
      <Title order={1}>Movies</Title>
      <Space h="40" />
      <Flex gap="16" wrap="wrap" align="flex-end">
        <Select className="filter-title" label="Genres" placeholder="Select genre" data={genresList.map((val) => val.name)} value={genres} onChange={setGenres} />
        <Select className="filter-title" label="Release year" placeholder="Select release year" data={years} value={releaseYear} onChange={setReleaseYear} />
        <Select
          className="filter-title filter-title-short"
          label="Ratings"
          placeholder="From"
          data={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
          value={ratingFrom}
          onChange={setRatingFrom}
        />
        <Select className="filter-title filter-title-short" label=" " placeholder="To" data={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} value={ratingTo} onChange={setRatingTo} />
        <Button pb={10} variant="transparent" color="rgb(123, 124, 136)">
          Reset filters
        </Button>
      </Flex>
      <Flex style={{ marginTop: 10 }}>
        <Select
          className="filter-title"
          label="Sort by"
          data={[
            { value: 'popularity.desc', label: 'Most popular' },
            { value: 'title.desc', label: 'Title' },
            { value: 'vote_average.desc', label: 'Rating' },
          ]}
          value={sort}
          onChange={(_value, option) => setSort(option.value)}
        />
      </Flex>
      <ul>
        {moviesInfo.map((item, idx) => (
          <li key={idx}>
            <p>{item.original_title}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
