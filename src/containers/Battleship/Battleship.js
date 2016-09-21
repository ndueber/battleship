import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { togglePlayer, shotFired, selectSquare } from '../../redux/modules/battleData.js';// import action creators
import BattleSquare from '../../components/Battleship/BattleSquare.js';

const { func } = React.PropTypes;
const baseClass = 'Battleship';
const BOARD_SIZE = 10;


function mapStateToProps(state) {
  const { battleData } = state;
  return {
    activePlayer: battleData.activePlayer,
    board1: battleData.board1,
    board2: battleData.board2,
    isPlayerVsPlayer: battleData.isPlayerVsPlayer,
    isPlayer1BoardSet: battleData.isPlayer1BoardSet,
    isPlayer2BoardSet: battleData.isPlayer2BoardSet,
    selectedXCoord: battleData.selectedXCoord,
    selectedYCoord: battleData.selectedYCoord,
  };
}

class Battleship extends React.Component {

  static propTypes = {
    shotFired: func.isRequired,
    togglePlayer: func.isRequired,
    selectSquare: func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {isSquareSelected: false};
    this.xCoordToFire = null;
    this.yCoordToFire = null;
  }

  handleSquareSelectedClick(xCoord, yCoord) {
    this.props.selectSquare(xCoord, yCoord);
    this.xCoordToFire = xCoord;
    this.yCoordToFire = yCoord;
  }

  handleShotFired() {
    this.props.shotFired(
      this.props.activePlayer,
      this.xCoordToFire,
      this.yCoordToFire);

    if (this.props.activePlayer === 1) {
      this.props.togglePlayer(2);
    }

    if (this.props.activePlayer === 2) {
      this.props.togglePlayer(1);
    }
  }

  renderPlayerTitleDirective() {
    return (
      <div className={`${baseClass}__directive`}>
        Player {this.props.activePlayer} Choose A Square To Shoot At
      </div>
    );
  }

  renderFireShotButton() {
    // stay on this page but randomize board
    return (
      <a className={`${baseClass}__btn btn`} onClick={this.handleShotFired.bind(this)}>
        Fire Shot
      </a>
    );
  }

  renderOwnBoard() {
    let ownBoard = this.props.board1;
    if (this.props.activePlayer === 2) {
      ownBoard = this.props.board2;
    }
    let board = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        board.push(
          <BattleSquare
            xCoord={x}
            yCoord={y}
            handleClick={this.handleSquareSelectedClick.bind(this)}
            isShipOn={ownBoard[x][y].isShipOn}
            isMiss={ownBoard[x][y].isMiss}
            isHit={ownBoard[x][y].isHit}
          />
        );
      }
    }
    return (
      <div className={`${baseClass}__board`}>
        <div className={`${baseClass}__board--title`}>
          Your own board
        </div>
        <div className={`${baseClass}__board--board`}>
          {board}
        </div>
      </div>
    );
  }

  renderOpponentsBoard() {
    let oppBoard = this.props.board2;
    if (this.props.activePlayer === 2) {
      oppBoard = this.props.board1;
    }

    let board = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        let isSelected = false;
        if (x === this.props.selectedXCoord && y === this.props.selectedYCoord) {
          isSelected = true;
        }
        board.push(
          <BattleSquare
            xCoord={x}
            yCoord={y}
            handleClick={this.handleSquareSelectedClick.bind(this)}
            isMiss={oppBoard[x][y].isMiss}
            isHit={oppBoard[x][y].isHit}
            isSelected={isSelected}
          />
        );
      }
    }
    return (
      <div className={`${baseClass}__board`}>
        <div className={`${baseClass}__board--title`}>
          opponents board
        </div>
        <div className={`${baseClass}__board--board`}>
          {board}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={`${baseClass}`}>
        {this.renderPlayerTitleDirective()}
        <div className={`${baseClass}__boards`}>
          {this.renderOpponentsBoard()}
          {this.renderOwnBoard()}
        </div>
        <div className={`${baseClass}__buttons`}>
          {this.renderFireShotButton()}
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps,
  (dispatch) => bindActionCreators({ togglePlayer, shotFired, selectSquare }, dispatch)
)(Battleship);
