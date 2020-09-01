import React, { useState, useEffect } from 'react';
import produce from 'immer';

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

  function move(fromList: number, from: number, to: number) {
    console.log(fromList, from, to);

    setLists(
      produce(lists, (draft) => {
        const dragged = draft[fromList].cards[from];

        draft[fromList].cards.splice(from, 1);
        draft[fromList].cards.splice(to, 0, dragged);
      })
    );
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => (
          <List key={list.title} index={index} data={list} />
        ))}
      </Container>
    </BoardContext.Provider>
  );
};

export default Board;
