import {
  AiOutlineArrowDown,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from 'react-icons/ai';
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';
import { checkCollision, createStage } from '../gameHelpers';

import { BiArrowToBottom } from 'react-icons/bi';
import Control from './Control';
import Display from './Display';
import { FiRotateCcw } from 'react-icons/fi';
import Stage from './Stage';
import StartButton from './StartButton';
import { StyledScoreboard } from './styles/StyledScoreboard';
import { useGameStatus } from '../hooks/useGameStatus';
import useInterval from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useState } from 'react';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPosition, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

  console.log('re-render');

  const movePlayer = direction => {
    if (!checkCollision(player, stage, { x: direction, y: 0 })) {
      updatePlayerPosition({ x: direction, y: 0 });
    }
  };

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(previousState => previousState + 1);
      // Increase speed also
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPosition({ x: 0, y: 1, collided: false });
    } else {
      // Game Over
      if (player.position.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPosition({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const hardDrop = () => {
    let yPosition = 0;
    while (!checkCollision(player, stage, { x: 0, y: yPosition })) {
      yPosition += 1;
    }

    updatePlayerPosition({ x: 0, y: yPosition - 1, collided: true });
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      switch (keyCode) {
        // Spacebar key
        case 32:
          hardDrop();
          break;
        // Left arrow key
        case 37:
          movePlayer(-1);
          break;
        // Up arrow key
        case 38:
          playerRotate(stage, 1);
          break;
        // Right arrow key
        case 39:
          movePlayer(1);
          break;
        // Down arrow key
        case 40:
          dropPlayer();
          break;
        default:
          break;
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={event => move(event)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver && <Display gameOver={gameOver} text="Game Over" />}
          {!gameOver && (
            <StyledScoreboard>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </StyledScoreboard>
          )}
          <StartButton callback={startGame} />
        </aside>
        <div>
          <Control
            Icon={<AiOutlineArrowLeft onClick={() => movePlayer(-1)} />}
          />
          <Control Icon={<AiOutlineArrowDown onClick={() => dropPlayer()} />} />
          <Control
            Icon={<AiOutlineArrowRight onClick={() => movePlayer(1)} />}
          />
          <Control
            Icon={<FiRotateCcw onClick={() => playerRotate(stage, 1)} />}
          />
          <Control Icon={<BiArrowToBottom onClick={() => hardDrop()} />} />
        </div>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
