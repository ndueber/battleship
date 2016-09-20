import React from 'react';
// import BattleBoard from '../../components/BattleBoard/BattleBoard.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { togglePlayer, shotFired } from '../../redux/modules/battleData.js';// import action creators

const { func } = React.PropTypes;
const baseClass = 'BattleshipSetup';

// function mapDispatchToProps(dispatch) {
//   return {
//     categoryActions: bindActionCreators(categoryActions, dispatch),
//     favoritesActions: bindActionCreators(favoritesActions, dispatch),
//   };
// }

function mapStateToProps(state) {
  const { battleData } = state;

  return {
    activePlayer: battleData.activePlayer,
    isPlayerVsPlayer: battleData.isPlayerVsPlayer,
    isPlayer1BoardSet: battleData.isPlayer1BoardSet,
    isPlayer2BoardSet: battleData.isPlayer2BoardSet
  };
}

class BattleshipSetup extends React.Component {

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

  renderSetUpBoardDirective() {
    return (
      <div className={`${baseClass}__directive`}>
        Player {this.props.activePlayer} Set Up Your Board
      </div>
    );
  }

  renderPlayer() {
    console.log('this.props.activePlayer' + this.props.activePlayer);
    return (
      <div className={`${baseClass}__player`}>
        Player {this.props.activePlayer}
      </div>
    );
  }

  renderRandomizeBoardButton() {
    // stay on this page but randomize board
    if (this.props.activePlayer === 1 && this.props.isPlayerVsPlayer === true) {
      return (
        <a className={`btn`} onClick={this.handleRandomize}>
          randomize
        </a>
      );
    }
    return (
      <a className={`btn`} onClick={this.handleRandomize} href={'/#/battleship_setup'}>
        randomize
      </a>
    );
  }

  render() {
    console.log('dueber');
    console.log(this.props.activePlayer);
    return (
      <div>
        {this.renderSetUpBoardDirective()}
        <div className={`${baseClass}__buttons`}>
          {this.renderRandomizeBoardButton()}

        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps,
  (dispatch) => bindActionCreators({ togglePlayer, shotFired }, dispatch)
)(BattleshipSetup);
