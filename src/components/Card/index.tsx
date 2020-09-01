import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import BoardContext from '../Board/contex';

import { Container, Label } from './styles';

export interface ICard {
  id: number;
  content: string;
  labels: string[];
  user: string;
}

interface IDragItem {
  type: string;
  index: number;
  listIndex: number;
}

interface ICardProps {
  data: ICard;
  index: number;
  listIndex: number;
}

const Card: React.FC<ICardProps> = ({ data, index, listIndex }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { move } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item: IDragItem, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (
        draggedIndex === targetIndex &&
        draggedListIndex === targetListIndex
      ) {
        return;
      }

      const targetSize = ref.current?.getBoundingClientRect();

      const targetCenter =
        ((targetSize?.bottom ?? 0) - (targetSize?.top ?? 0)) / 2;

      const draggedOffSet = monitor.getClientOffset();
      const draggedTop = (draggedOffSet?.y ?? 0) - (targetSize?.top ?? 0);

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    },
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
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
