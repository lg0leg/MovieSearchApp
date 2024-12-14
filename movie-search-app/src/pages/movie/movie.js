import React, { useEffect, useState } from 'react';
import './movie.scss';
import { useLocation, useParams } from 'react-router-dom';
import { AspectRatio, Container, Flex, Grid, Group, Image, SimpleGrid, Space, Stack, Text, Title } from '@mantine/core';
import star from '../../assets/svg/star.svg';
import noPoster from '../../assets/png/noPoster.png';
import { headers } from '../../utils/api';

export default function Movie() {
  const params = useParams();
  const location = useLocation();

  const [movieInfo, setMovieInfo] = useState({
    runtime: '',
    budget: '',
    revenue: '',
    genres: [],
  });

  const fetchOptions = {
    method: 'GET',
    headers: headers,
  };

  const getMovieInfo = async () => {
    const baseURL = `https://api.themoviedb.org/3/movie/${params.id.slice(1)}?language=en-US`;
    try {
      let resp = await fetch(baseURL, fetchOptions);
      let data = await resp.json();
      setMovieInfo(data);
    } catch (error) {
      console.log('Невозможно получить информацию о фильме!\n' + error);
      console.log('Проверьте доступ к tmdb');
    }
  };

  useEffect(() => {
    getMovieInfo();
  }, []);

  // useEffect(() => {
  //   console.log(movieInfo);
  // }, [movieInfo]);

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const date = new Date(location.state.release_date);
  const premiereDate = date.toLocaleString('en-US', dateOptions);
  const duration = `${Math.floor(movieInfo.runtime / 60)}h  ${movieInfo.runtime % 60}m`;
  const budget = `$${movieInfo.budget.toLocaleString()}`;
  const revenue = `$${movieInfo.revenue.toLocaleString()}`;
  const genres = movieInfo.genres.map((item) => item.name).join(', ');

  return (
    <Container fluid style={{ width: 1160, paddingLeft: 90, paddingRight: 90, paddingTop: 40, margin: 0 }}>
      <Group className="movie-info-card" align="flex-start">
        <AspectRatio ratio={250 / 352} w={250}>
          <Image src={`https://image.tmdb.org/t/p/original/${location.state.poster_path}`} alt={`${location.state.original_title} poster`} />
          {/* <Image src={noPoster}></Image> */}
        </AspectRatio>
        <Stack justify="space-between" h={352} maw={442}>
          <Flex direction="column">
            <Title order={2} c={'#9854f6'}>
              {location.state.original_title}
            </Title>
            <Text mt={8} mb={8} c={'#7b7c88'}>
              {location.state.release_date.slice(0, 4)}
            </Text>
            <Flex gap={7}>
              <img src={star} alt="star" width={22} />
              <Text fw={600}>{location.state.vote_average.toFixed(1)}</Text>
              <Text c={'#7b7c88'}>({location.state.vote_count})</Text>
            </Flex>
          </Flex>
          <SimpleGrid cols={2}>
            <Text c={'#7b7c88'}>Duration</Text>
            <Text>{duration}</Text>
            <Text c={'#7b7c88'}>Premiere</Text>
            <Text>{premiereDate}</Text>
            <Text c={'#7b7c88'}>Budget</Text>
            <Text>{budget}</Text>
            <Text c={'#7b7c88'}>Gross worldwide</Text>
            <Text>{revenue}</Text>
            <Text c={'#7b7c88'}>Genres</Text>
            <Text>{genres}</Text>
          </SimpleGrid>
          {/* <Grid cols={2}>
            <Grid.Col span="content">
              <Text c={'#7b7c88'}>Duration</Text>
              <Text c={'#7b7c88'}>Premiere</Text>
              <Text c={'#7b7c88'}>Budget</Text>
              <Text c={'#7b7c88'}>Gross worldwide</Text>
              <Text c={'#7b7c88'}>Genres</Text>
            </Grid.Col>
            <Grid.Col span={8}>
              <Text>{duration}</Text>
              <Text>{premiereDate}</Text>
              <Text>{budget}</Text>
              <Text>{revenue}</Text>
              <Text>{genres}</Text>
            </Grid.Col>
          </Grid> */}
        </Stack>
      </Group>
      <Space h={20} />
      <Flex className="movie-info-card">
        <Title order={3}>Trailer</Title>
      </Flex>
    </Container>
  );
}
