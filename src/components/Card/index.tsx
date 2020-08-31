import React from 'react';

import { Container, Label } from './styles';

export interface ICard {
  id: number;
  content: string;
  labels: string[];
  user: string;
}

interface ICardProps {
  data: ICard;
}

const Card: React.FC<ICardProps> = ({ data }) => {
  return (
    <Container>
      <header>
        {data.labels.map((label) => (
          <Label key={label} color={label} />
        ))}
      </header>
      <p>{data.content}</p>
      {data.user && <img src={data.user} alt="" />}
    </Container>
  );
};

export default Card;
