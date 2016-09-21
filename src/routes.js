import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {
  App,
  Battleship,
  BattleshipHome,
  BattleshipSetup,
} from './containers/index';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={BattleshipHome}/>
    <Route path="battleship" component={Battleship}/>
    <Route path="battleship_home" component={BattleshipHome}/>
    <Route path="battleship_setup" component={BattleshipSetup}/>
  </Route>
);
