export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 'clear'])
  );

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[y].length; x++) {
      // 1. Check that we're on an actual tetromino cell
      if (player.tetromino[y][x] !== 0) {
        if (
          // 2. Check the move if it is inside the game area's height (y)
          // It should not go to through the bottom of the play area.
          !stage[y + player.position.y + moveY] ||
          // 3. Check the move if it is inside the game area's width (x)
          !stage[y + player.position.y + moveY][
            x + player.position.x + moveX
          ] ||
          // 4. Check the cell that we are moving to is not set to 'clear'
          stage[y + player.position.y + moveY][
            x + player.position.x + moveX
          ][1] !== 'clear'
        ) {
          return true;
        }
      }
    }
  }
};
