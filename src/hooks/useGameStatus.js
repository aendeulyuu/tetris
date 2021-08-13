import { useCallback, useEffect, useMemo, useState } from 'react';

export const useGameStatus = rowsCleared => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  let linePoints = useMemo(() => {}, []);
  linePoints = [40, 100, 300, 1200];

  const calculateScore = useCallback(() => {
    // Check if we have score
    if (rowsCleared > 0) {
      setScore(
        previousState =>
          previousState + linePoints[rowsCleared - 1] * (level + 1)
      );
      setRows(previousState => previousState + rowsCleared);
    }
  }, [level, linePoints, rowsCleared]);

  useEffect(() => {
    calculateScore();
  }, [calculateScore, rowsCleared, score]);

  return [score, setScore, rows, setRows, level, setLevel];
};
