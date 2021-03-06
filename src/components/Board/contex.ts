import { createContext } from 'react';

import { IList } from '../List';

export interface IBoardContext {
  lists: IList[];
  move: (fromList: number, toList: number, from: number, to: number) => void;
}

export default createContext<IBoardContext>({} as IBoardContext);
