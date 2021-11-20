import React from 'react';

import Container from './styles';
import Logo from './Logo';

import Awesome from '../../components/Awesome'

export default function Application() {
  return (
    <Container>
      <h1>
        React Boilerplate 2
        <Awesome />
      </h1>
      <Logo />
    </Container>
  );
}
