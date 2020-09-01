import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

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
}

interface ICardProps {
  index: number;
  data: ICard;
}

const Card: React.FC<ICardProps> = ({ index, data }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item: IDragItem, monitor) {
      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex) {
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

      console.log('Test');
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
