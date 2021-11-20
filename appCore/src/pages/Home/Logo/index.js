import React from 'react';

import { Container, ImgRotate } from './styles';

import reactLogo from '../../../static/react-logo.png';

function Logo() {
  return (
    <Container>
      <ImgRotate src={reactLogo} />
    </Container>
  );
}

export default Logo;
