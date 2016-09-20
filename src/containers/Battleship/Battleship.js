import React, { PropTypes } from 'react';
// import BattleBoard from '../../components/BattleBoard/BattleBoard.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { togglePlayer, shotFired } from '../../redux/modules/battleData.js';// import action creators

class Battleship extends React.Component {

  static propTypes = {
    shotFired: PropTypes.func.isRequired,
    togglePlayer: PropTypes.func.isRequired
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
      <div>
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
  (state) => ({ activePlayer: state.activePlayer }),
  (dispatch) => bindActionCreators({ togglePlayer, shotFired }, dispatch)
)(Battleship);
