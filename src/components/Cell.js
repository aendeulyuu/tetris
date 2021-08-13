import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from '../tetrominos';
import { memo } from 'react';

const Cell = ({ type }) => {
  return <StyledCell type={type} color={TETROMINOS[type].color} />;
};

export default memo(Cell);
