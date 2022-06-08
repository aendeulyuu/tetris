import React from 'react';
import { StyledControl } from './styles/StyledControl';

const Control = ({ Icon, onClick }) => {
  return <StyledControl onClick={onClick}>{Icon}</StyledControl>;
};

export default Control;
