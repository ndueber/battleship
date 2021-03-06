// actions type constants
const SHOT_FIRED = 'SHOT_FIRED';
const TOGGLE_PLAYER = 'TOGGLE_PLAYER';
const SELECT_TO_PLAY_PLAYER = 'SELECT_TO_PLAY_PLAYER';
const RANDOMIZE_BOARD = 'RANDOMIZE_BOARD';
const SELECT_SQUARE = 'SELECT_SQUARE';

// function variable constants
const BOARD_SIZE = 10;
const LEFT = 'left';
const RIGHT = 'right';
const UP = 'up';
const DOWN = 'down';
const DIRECTIONS_TO_PLACE_BOATS = [LEFT, RIGHT, UP, DOWN];
const ships = {
  0: {
    id: 0,
    name: 'Carrier',
    size: 5,
    coordinates: [],
    hitsRemaining: 5,
    isSunk: false
  },
  1: {
    id: 1,
    name: 'Battleship',
    size: 4,
    coordinates: [],
    hitsRemaining: 4,
    isSunk: false
  },
  2: {
    id: 2,
    name: 'Cruiser',
    size: 3,
    coordinates: [],
    hitsRemaining: 3,
    isSunk: false
  },
  3: {
    id: 3,
    name: 'Submarine',
    size: 3,
    coordinates: [],
    hitsRemaining: 3,
    isSunk: false
  },
  4: {
    id: 4,
    name: 'Destroyer',
    size: 2,
    coordinates: [],
    hitsRemaining: 2,
    isSunk: false
  }
};

const initialState = {
  board1: null,
  board2: null,
  activePlayer: 1,
  isPlayerVsPlayer: true,
  isPlayer1BoardSet: false,
  isPlayer2BoardSet: false,
  player1Ships: null,
  player2Ships: null,
  selectedXCoord: null,
  selectedYCoord: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOT_FIRED:
      if (action.playerId === 1) {
        if (state.board2[action.xCoord][action.yCoord].isShipOn) {
          state.board2[action.xCoord][action.yCoord].isHit = true;
          const board2 = state.board2;
          state.player2Ships[state.board2[action.xCoord][action.yCoord].shipId].hitsRemaining --;
          const player2Ships = state.player2Ships;
          return {
            ...state,
            board2,
            player2Ships
          };
        }
        else {
          state.board2[action.xCoord][action.yCoord].isMiss = true;
          const board2 = state.board2;
          return {
            ...state,
            board2
          };
        }
      }

      if (action.playerId === 2) {
        if (state.board1[action.xCoord][action.yCoord].isShipOn) {
          state.board1[action.xCoord][action.yCoord].isHit = true;
          const board1 = state.board1;
          state.player1Ships[state.board1[action.xCoord][action.yCoord].shipId].hitsRemaining --;
          const player1Ships = state.player1Ships;
          return {
            ...state,
            board1,
            player1Ships
          };
        }
        else {
          state.board1[action.xCoord][action.yCoord].isMiss = true;
          const board1 = state.board1;
          return {
            ...state,
            board1
          };
        }
      }
      return {
        ...state,
        action
      };
    case TOGGLE_PLAYER:
      return {
        ...state,
        activePlayer: action.activePlayerId
      };
    case SELECT_TO_PLAY_PLAYER:
      return {
        ...state,
        isPlayerVsPlayer: action.isPlayerVsPlayer
      };
    case RANDOMIZE_BOARD:
      if (action.playerId === 1) {
        return {
          ...state,
          board1: action.board,
          isPlayer1BoardSet: true,
          player1Ships: action.ships,
          activePlayer: 2
        };
      }
      return {
        ...state,
        board2: action.board,
        isPlayer2BoardSet: true,
        player2Ships: action.ships,
        activePlayer: 1,
      };
    case SELECT_SQUARE:
      return {
        ...state,
        selectedXCoord: action.xCoord,
        selectedYCoord: action.yCoord,
      };
    default:
      return state;
  }
}


/* *********** Helper Functions ************/

function moveCoordByDirection(xCoord, yCoord, direction, positionsOver) {
  switch (direction) {
    case LEFT:
      return [xCoord - positionsOver, yCoord];
    case RIGHT:
      return [xCoord + positionsOver, yCoord];
    case UP:
      return [xCoord, yCoord - positionsOver];
    case DOWN:
      return [xCoord, yCoord + positionsOver];
    default:
      return [xCoord, yCoord];
  }
}

function areCoordsOnBoard(xCoord, yCoord) {
  if (xCoord < 0 || yCoord < 0 || xCoord >= BOARD_SIZE || yCoord >= BOARD_SIZE) {
    return false;
  }
  return true;
}

function checkIfShipFits(board, xCoord, yCoord, boatSize, direction) {
  for (let positionsOver = 0; positionsOver < boatSize; positionsOver++) {
    const coordArr = moveCoordByDirection(xCoord, yCoord, direction, positionsOver);
    const xCoordOnBoard = coordArr[0];
    const yCoordOnBoard = coordArr[1];
    // coordinate off board or ship already there
    if (!areCoordsOnBoard(xCoordOnBoard, yCoordOnBoard) ||
      board[xCoordOnBoard][yCoordOnBoard].isShipOn) {
      return false;
    }
  }
  return true;
}

function placeShipOnBoard(board, xCoord, yCoord, boatSize, direction, shipId) {
  for (let positionsOver = 0; positionsOver < boatSize; positionsOver++) {
    let coordArr = moveCoordByDirection(xCoord, yCoord, direction, positionsOver);
    const xCoordOnBoard = coordArr[0];
    const yCoordOnBoard = coordArr[1];
    board[xCoordOnBoard][yCoordOnBoard].isShipOn = true;
    board[xCoordOnBoard][yCoordOnBoard].shipId = shipId;
    coordArr = '';
  }
  return board;
}

function getShipCoords(xCoord, yCoord, boatSize, direction) {
  let shipCoords = [];
  for (let positionsOver = 0; positionsOver < boatSize; positionsOver++) {
    let coordArr = moveCoordByDirection(xCoord, yCoord, direction, positionsOver);
    let xCoordOnBoard = coordArr[0];
    let yCoordOnBoard = coordArr[1];
    shipCoords.push([xCoordOnBoard, yCoordOnBoard]);
  }
  return shipCoords;
}

/**
 * Shuffles array in place.
 * http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
  let j;
  let x;
  let i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
  return a;
}

/* *********** Action creators ************/

/**
 * Called on input change
 */
export function togglePlayer(activePlayerId) {
  return {
    type: TOGGLE_PLAYER,
    activePlayerId: activePlayerId
  };
}

export function selectToPlayPlayer(isPlayerVsPlayer) {
  return {
    type: SELECT_TO_PLAY_PLAYER,
    isPlayerVsPlayer: isPlayerVsPlayer
  };
}

export function randomizeBoard(playerId) {
  let board = [];
  let shipsOnBoard = JSON.parse(JSON.stringify(ships));
  // create empty board
  for (let y = 0; y < BOARD_SIZE; y++) {
    board.push(new Array(BOARD_SIZE));
    for (let x = 0; x < BOARD_SIZE; x++) {
      const square = {};
      square.isShipOn = false;
      square.isMiss = false;
      square.isHit = false;
      square.x_coord = x;
      square.y_coord = y;
      board[y][x] = square;
    }
  }

  // find spot on board for each ship
  for (let shipId = 0; shipId < 5; shipId++) {
    let shipPlaced = false;
    const ship = shipsOnBoard[shipId];
    const boatSize = ship.size;
    // continue trying to place ship until we find a spot
    while (!shipPlaced) {
      const randXCoord = Math.floor(Math.random() * 10);
      const randYCoord = Math.floor(Math.random() * 10);
      // try placing in all directions. try each direction once in random order
      shuffle(DIRECTIONS_TO_PLACE_BOATS).forEach((direction) => {
        // does ship fit?
        if (!shipPlaced && checkIfShipFits(board, randXCoord, randYCoord, boatSize, direction)) {
          board = placeShipOnBoard(board, randXCoord, randYCoord, boatSize, direction, shipId);
          ship.coordinates = getShipCoords(randXCoord, randYCoord, boatSize, direction);
          shipPlaced = true;
        }
      });
    }
    shipPlaced = false;
  }
  return {
    type: RANDOMIZE_BOARD,
    playerId: playerId,
    board: board,
    ships: shipsOnBoard,
  };
}

// coordinates have been selected, used when shot is fired.
export function selectSquare(xCoord, yCoord) {
  return {
    type: SELECT_SQUARE,
    xCoord,
    yCoord
  };
}

/**
 * This is the only action creator exported (not including changeUsername).
 * It's using a sugar syntax enabled by the clientMiddleware (see explanation in ../middleware/clientMiddleware.js)
 */
export function shotFired(playerId, xCoord, yCoord) {
  return {
    type: SHOT_FIRED,
    playerId,
    xCoord,
    yCoord
  };
}
