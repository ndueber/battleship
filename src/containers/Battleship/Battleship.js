import React from 'react';
// import BattleBoard from '../../components/BattleBoard/BattleBoard.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { togglePlayer, shotFired } from '../../redux/modules/battleData.js';// import action creators

const { func } = React.PropTypes;
const baseClass = 'Battleship';

class Battleship extends React.Component {

  static propTypes = {
    shotFired: func.isRequired,
    togglePlayer: func.isRequired
  }


  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('handleClick');
    // const { togglePlayer } = this.props;
    this.props.togglePlayer(2);
  }

  renderSetUpBoard() {
    return (
      <div className={`${baseClass}__player`}>
        Player `${this.state.activePlayer}`
      </div>
    );
  }

  renderPlayer() {
    return (
      <div className={`${baseClass}__player`}>
        `Player ${this.state.activePlayer}`
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.renderPlayer()}
        {this.renderSetUpBoard()}
        <div>
          hello Battleship
          <div onClick={this.handleClick}>
            what
          </div>
        </div>
      </div>
    );
  }
}


export default connect(
  (state) => ({ activePlayer: state.activePlayer,
    isPlayerVsPlayer: state.isPlayerVsPlayer,
    isPlayer1BoardSet: state.isPlayer1BoardSet,
    isPlayer2BoardSet: state.isPlayer2BoardSet
  }),
  (dispatch) => bindActionCreators({ togglePlayer, shotFired }, dispatch)
)(Battleship);
