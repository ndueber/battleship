import React from 'react';
// import BattleBoard from '../../components/BattleBoard/BattleBoard.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { togglePlayer, shotFired } from '../../redux/modules/battleData.js';// import action creators

const baseClass = 'BattleSquare';
const { func } = React.PropTypes;


class BattleshipHome extends React.Component {

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

  asdf() {
    shotFired('fuck');
  }

  render() {
    return (
      <div className={`${baseClass}`}>
        <div className={'button'}>
          <div onClick={this.handleClick}>
            what
          </div>
        </div>
      </div>
    );
  }
}


export default connect(
  (state) => ({ activePlayer: state.activePlayer }),
  (dispatch) => bindActionCreators({ togglePlayer, shotFired }, dispatch)
)(BattleshipHome);
