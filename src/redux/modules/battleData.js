
const SHOT_FIRED = 'SHOT_FIRED';
const TOGGLE_PLAYER = 'TOGGLE_PLAYER';
const SELECT_TO_PLAY_PLAYER = 'SELECT_TO_PLAY_PLAYER';
const RANDOMIZE_BOARD = 'RANDOMIZE_BOARD';

const BOARD_SIZE = 10;
const ships = {
  0: {
    id: 0,
    name: 'Carrier',
    size: 5,
    coordinates: [],
    hitsRemaining: 5
  },
  1: {
    id: 1,
    name: 'Battleship',
    size: 4,
    coordinates: [],
    hitsRemaining: 4
  },
  2: {
    id: 2,
    name: 'Cruiser',
    size: 3,
    coordinates: [],
    hitsRemaining: 3
  },
  3: {
    id: 3,
    name: 'Submarine',
    size: 3,
    coordinates: [],
    hitsRemaining: 3
  },
  4: {
    id: 4,
    name: 'Destroyer',
    size: 2,
    coordinates: [],
    hitsRemaining: 2
  }
};

const initialState = {
  board1: null,
  board2: null,
  activePlayer: 1,
  isPlayerVsPlayer: false,
  isPlayer1BoardSet: false,
  isPlayer2BoardSet: false,
  player1Ships: null,
  player2Ships: null,
};

export default function reducer(state = initialState, action = {}) {
  console.log('in battledata reducer');
  switch (action.type) {
    case SHOT_FIRED:
      console.log('reduce shot fired');
      return {
        ...state,
        action
      };
    case TOGGLE_PLAYER:
      console.log('reduce TOGGLE_PLAYER');
      return {
        ...state,
        activePlayer: action.activePlayerId
      };
    case SELECT_TO_PLAY_PLAYER:
      console.log('reduce SELECT_TO_PLAY_PLAYER');
      return {
        ...state,
        isPlayerVsPlayer: action.isPlayerVsPlayer
      };
    case RANDOMIZE_BOARD:
      console.log('reduce SELECT_TO_PLAY_PLAYER');
      return {
        ...state,
        isPlayerVsPlayer: action.isPlayerVsPlayer
      };
    default:
      return state;
  }
}

/* *********** Action creators ************/

/**
 * Called on input change
 */
export function togglePlayer(activePlayerId) {
  console.log('action togglePlayer');
  return {
    type: TOGGLE_PLAYER,
    activePlayerId: activePlayerId
  };
}

export function selectToPlayPlayer(isPlayerVsPlayer) {
  console.log('action togglePlayer');
  return {
    type: SELECT_TO_PLAY_PLAYER,
    isPlayerVsPlayer: isPlayerVsPlayer
  };
}

export function randomizeBoard(playerId) {
  let board = [];
  let shipsOnBoard = JSON.parse(JSON.stringify(ships));
  console.log('action randomizeBoard');
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      let square = {};
      square.isShipOn = false;
      square.isShotAt = false;
      square.isHit = false;
      board[y][x] = square;
    }
  }

  return {
    type: RANDOMIZE_BOARD,
    playerId: playerId,
    board: board,
    ships: ships,
  };
}

/**
 * This is the only action creator exported (not including changeUsername).
 * It's using a sugar syntax enabled by the clientMiddleware (see explanation in ../middleware/clientMiddleware.js)
 */
export function shotFired(playerId, coordinates) {
  console.log('action shotFired');
  return {
    type: SHOT_FIRED,
    playerId,
    coordinates,
  };

}
