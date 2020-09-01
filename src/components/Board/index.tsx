import React, { useState, useEffect } from 'react';

import List, { IList } from '../List';

import api from '../../services/api';

import BoardContext from './contex';

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

  function move(from: number, to: number) {
    console.log(from, to);
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list) => (
          <List key={list.title} data={list} />
        ))}
      </Container>
    </BoardContext.Provider>
  );
};

export default Board;
