Battleship
===============
###Implementation 
Boilerplate application for this was taken from [react-es6-redux](https://github.com/topheman/react-es6-redux)

Routing is done in battleship/src/routes.js
Styling is done in battleship/src/style/
Actions/Reduceing the heavy lifting of the project is done in battleship/src/redux/modules/battleData.js
containers for each page found in battleship/src/containers/Battleship/
components found in battleship/src/components/Battleship/

Each player has a board that is kept in the store, when we randomize the board we create a board that is an 2D array that maintains an object which stores booleans indicating if a boat is there, it has been shot at and produced a miss or hit, and if a boat is there, which boat is there. 

Each player also maintains a dictionary which cooresponds to their boats. each with their name, size, and an array of coordinates where they are placed. When a hit is made on the board, the board looks to see if a boat is there. if there is a boat there, the board has the id of the boat and then updates this dictionary of ships that it has been hit.

Randomizing the board, the algorithm takes the ships in largest descending order and tries to place them on the board. It finds a place on the board and then takes a list of directions (in random order) and then tries to place the ship in those directions. 

###Future Features 
Right now there is an option on the home page to play the computer, yet, it isn't implemented yet. This will be done by creating an algorithm to examine the playing board and going to a depth of 5 where it will try to eliminate the largest open spaces that could fit as many boats as possible (i.e. it will check to see how far left, right, up, down the spaces are max of the largest boat still floating and min of the smallest boat not sunk.). It will 'fire a shot' on that board at that position and on each depth it will assume the shot was a miss and then look for the next largest opening. When there is a shot on the board that doesn't coorespond to a sunk ship it will shot around that area until it sinks the cooresponding ship.

When you play two player it imdeiately toggles between the two players. to make this fair, it should have a screen or popup in between to shield the opponents ship placement to prevent cheating. 

Currently the only option for ship placement is random. In the future you will have to option to place your own ships. 

Currently there is no validation for shots fired. It should check to make sure that the player hasn't shot at the new position. 


###License

This software is distributed under an MIT licence.
