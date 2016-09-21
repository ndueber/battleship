import React from 'react';

const { bool, number, func } = React.PropTypes;
const baseClass = 'BattleSquare';

export default class BattleSquare extends React.Component {

  static propTypes = {
    xCoord: number.isRequired,
    yCoord: number.isRequired,
    isHit: bool.isRequired,
    isMiss: bool.isRequired,
    isShipOn: bool.isRequired,
    isSelected: bool.isRequired,
    handleClick: func.isRequired,
  }

  static defaultProps = {
    isHit: false,
    isMiss: false,
    isShipOn: false,
    isSelected: false,
  };

  constructor(props) {
    super(props);
    this.state = {isSquareSelected: false};
  }

  handleClick() {
    this.props.handleClick(this.props.xCoord, this.props.yCoord);
  }

  render() {
    const { isHit, isMiss, isShipOn, isSelected } = this.props;
    let additionalClass = '';
    additionalClass = '';
    if (isShipOn && !isHit) {
      additionalClass = additionalClass + ' isShipOn';
    }
    if (isHit) {
      additionalClass = additionalClass + ' isHit';
    }
    if (isMiss) {
      additionalClass = additionalClass + ' isMiss';
    }
    if (isSelected) {
      additionalClass = additionalClass + ' isSelected';
    }
    return (
      <div className={`${baseClass} ${additionalClass}`} onClick={this.handleClick.bind(this)}>
      </div>
    );
  }
}
