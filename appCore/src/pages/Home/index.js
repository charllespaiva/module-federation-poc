import React from 'react';

import Container from './styles';
import Logo from './Logo';

import Awesome from 'app2/Awesome'

export default function Application() {

  return (
    <Container>
      <h1>
        React Boilerplate
        <Awesome />
      </h1>
      <Logo />
    </Container>
  );
}
