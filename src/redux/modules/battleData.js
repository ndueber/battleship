
const SHOT_FIRED = 'SHOT_FIRED';
const TOGGLE_PLAYER = 'TOGGLE_PLAYER';
const SELECT_TO_PLAY_PLAYER = 'SELECT_TO_PLAY_PLAYER';

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
        activePlayer: action.activePlayerId
      };
    case SELECT_TO_PLAY_PLAYER:
      console.log('reduce SELECT_TO_PLAY_PLAYER');
      return {
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
