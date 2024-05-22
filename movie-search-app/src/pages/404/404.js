import { Button, Center, Flex, Space, Text } from '@mantine/core';
import React from 'react';
import notfound from '../../assets/png/404.png';
import { NavLink } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Center h="100vh">
      <Flex gap="16" direction="column" align="center">
        <img src={notfound} alt="404" />
        <Space h="32" />
        <Text size="xl" fw="600">
          We can’t find the page you are looking for
        </Text>
        <NavLink to="/movies" className="nav-item">
          <Button variant="filled" color="#9854f6">
            Go home
          </Button>
        </NavLink>
      </Flex>
    </Center>
  );
}
