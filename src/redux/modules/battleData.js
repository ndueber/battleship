
const SHOT_FIRED = 'SHOT_FIRED';
const TOGGLE_PLAYER = 'TOGGLE_PLAYER';

const initialState = {
  board1: null,
  board2: null,
  activePlayer: 1,
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
