import React from 'react';

import { Container, Label } from './styles';

const Card: React.FC = () => {
  return (
    <Container>
      <header>
        <Label color="#7159c1" />
      </header>
      <p>Fazer migração completa de servidor</p>
      <img src="https://github.com/diogojhony.png" alt=""/>
    </Container>
  );
};

export default Card;
