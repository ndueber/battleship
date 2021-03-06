import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { togglePlayer, shotFired, randomizeBoard } from '../../redux/modules/battleData.js';// import action creators

const { func } = React.PropTypes;
const baseClass = 'BattleshipSetup';

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
    togglePlayer: func.isRequired,
    randomizeBoard: func.isRequired
  }

  constructor(props) {
    super(props);
  }

  handleRandomize() {
    this.props.randomizeBoard(this.props.activePlayer);
    // randomize computer's board
    if (!this.props.isPlayerVsPlayer) {
      this.props.randomizeBoard(2);
    }

  }

  renderPlayer() {
    return (
      <div className={`${baseClass}__player`}>
        Player {this.props.activePlayer}
      </div>
    );
  }

  renderSetUpBoardDirective() {
    if (this.props.isPlayer1BoardSet && this.props.isPlayer2BoardSet) {
      return (
        <div className={`${baseClass}__directive`}>
          Begin Game When Ready!
          <a className={`btn`} href={'/#/battleship'}>
            Let Us Play!
          </a>
        </div>
      );
    }
    return (
      <div className={`${baseClass}__directive`}>
        Player {this.props.activePlayer} Set Up Your Board
      </div>
    );
  }

  renderRandomizeBoardButton() {
    // hack for redirect problem
    if (this.props.isPlayer1BoardSet && this.props.isPlayer2BoardSet) {
      return null;
    }
    // stay on this page but randomize board
    if (this.props.activePlayer === 1 && this.props.isPlayerVsPlayer === true) {
      return (
        <div className={`btn`} onClick={this.handleRandomize.bind(this)}>
          randomize
        </div>
      );
    }
    return (
      <a className={`btn`} onClick={this.handleRandomize.bind(this)} href={'/#/battleship'}>
        randomize
      </a>
    );
  }

  render() {
    return (
      <div className={`${baseClass}`}>
        {this.renderSetUpBoardDirective()}
        <div className={`${baseClass}__buttons`}>
          {this.renderRandomizeBoardButton()}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,
  (dispatch) => bindActionCreators({ togglePlayer, shotFired, randomizeBoard }, dispatch)
)(BattleshipSetup);
