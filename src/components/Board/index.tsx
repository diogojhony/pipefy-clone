import React, { useState, useEffect } from 'react';

import List, { IList } from '../List';

import api from '../../services/api';

import { Container } from './styles';

const Board: React.FC = () => {
  const [lists, setLists] = useState<IList[]>([]);

  useEffect(() => {
    async function loadLists() {
      const response = await api.get('lists');

      console.log(response.data);

      setLists(response.data);
    }

    loadLists();
  }, []);

  return (
    <Container>
      {lists.map((list) => (
        <List key={list.title} data={list} />
      ))}
    </Container>
  );
};

export default Board;
