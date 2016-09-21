import React from 'react';
// import BattleBoard from '../../components/BattleBoard/BattleBoard.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { togglePlayer, shotFired, selectToPlayPlayer } from '../../redux/modules/battleData.js';// import action creators

const baseClass = 'BattleshipHome';
const { func } = React.PropTypes;


class BattleshipHome extends React.Component {

  static propTypes = {
    shotFired: func.isRequired,
    togglePlayer: func.isRequired,
    selectToPlayPlayer: func.isRequired,
  }


  constructor(props) {
    super(props);
    this.handleVsPlayerClick = this.handleVsPlayerClick.bind(this);
    this.handleVsCompClick = this.handleVsCompClick.bind(this);
  }

  // select to play vs second player
  handleVsPlayerClick() {
    console.log('handle Player vs player Click');
    // const { togglePlayer } = this.props;
    this.props.selectToPlayPlayer(true);
  }

  // select to play computer
  handleVsCompClick() {
    console.log('handle Player vs Comp Click');
    // const { togglePlayer } = this.props;
    // this.props.togglePlayer(2);
    this.props.selectToPlayPlayer(false);
  }

  render() {
    return (
      <div className={`${baseClass}`}>
        <div className={`${baseClass}__title`}>
          Battleship
        </div>
        <div className={`${baseClass}__buttons`}>
          <a className={`btn`} onClick={this.handleVsPlayerClick} href={'/#/battleship_setup'}>
            Player VS. Player
          </a>
          <a className={`btn`} onClick={this.handleVsCompClick} href={'/#/battleship_setup'}>
            Player VS. Computer
          </a>
        </div>
      </div>
    );
  }
}


export default connect(
  (state) => ({ activePlayer: state.activePlayer, isPlayerVsPlayer: state.isPlayerVsPlayer }),
  (dispatch) => bindActionCreators({ togglePlayer, shotFired, selectToPlayPlayer }, dispatch)
)(BattleshipHome);
