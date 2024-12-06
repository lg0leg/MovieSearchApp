import { Button, Center, Container, Flex, Space, Title } from '@mantine/core';
import React, { useContext } from 'react';
import norated from '../../assets/svg/loading.svg';
import { useNavigate } from 'react-router-dom';
import { FavContext } from '../../state/state';

export default function RatedMovies() {
  const favContext = useContext(FavContext);
  const navigate = useNavigate();

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
      <Title order={1}>Rated movies</Title>
      <Space h="40" />
      <ul>
        {favContext.favState.favoritesId.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
    </Container>
  );
}
