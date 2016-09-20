import React from 'react';

const { bool, number, func } = React.PropTypes;
const baseClass = 'BattleSquare';

export default class BattleSquare extends React.Component {

  static propTypes = {
    x_coord: number.isRequired,
    y_coord: number.isRequired,
    is_hit: bool,
    is_miss: bool,
    is_boat_here: bool,
    handleClick: func,
  }

  handleClick() {
    console.log('handleClick BattleSquare');
    this.props.handleClick(this.props.x_coord, this.props.y_coord);
  }

  render() {
    return (
      <div className={`${baseClass}`} onClick={this.handleClick}>
      </div>
    );
  }
}
