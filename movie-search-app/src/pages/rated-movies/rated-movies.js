import { Button, Center, Flex } from '@mantine/core';
import React from 'react';
import norated from '../../assets/svg/loading.svg';
import { useNavigate } from 'react-router-dom';

export default function RatedMovies() {
  const navigate = useNavigate();

  return (
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
  );
  // <div>RatedMovies</div>;
}
