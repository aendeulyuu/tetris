import { useEffect, useState } from 'react';

import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = newStage =>
      newStage.reduce((accumulator, row) => {
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          setRowsCleared(previousState => previousState + 1);
          accumulator.unshift(new Array(newStage[0].length).fill([0, 'clear']));
          return accumulator;
        }

        accumulator.push(row);
        return accumulator;
      }, []);

    const updateStage = previousStage => {
      // 1. Flush the stage
      const newStage = previousStage.map(row =>
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      // 2. Draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.position.y][x + player.position.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });

      // Check tetrimino for collision
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage(previousStage => updateStage(previousStage));
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};
