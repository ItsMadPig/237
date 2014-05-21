Aaron Hsu (ahsu1)
Jackson Lane(jlane)
Sri(srinivav)

-- To start the game, open main.html

Brief overview of the project:

Our project consists of a two player tank game. When the first player starts the game, it will show an empty canvas, waiting for the second player. As soon as the second player connects, their canvas will refresh and the game will start. There is a loop that continuosly updates the status of the game and redraws. As the game constantly redraws itself, whenever the player charges the power of the bullet fired and releases spacebar, it calls sendmove to the server, which then sends the gamestate to the other player.

***The game requires the user to use two different laptops, or one laptop and open the game in two different browsers in order for the game to work.
***The user can't refresh the page whenever he wants, or else it oversaturates the server. Thus ctrl +r is disabled.


On the side, there is a chatbox that allows the two players to communicate with each other. It simply gets the information from the server every few seconds.

The server side code can be found in app.js
The client side code can be found in client.js.
The main loop can be found in physicsEngine.js
The levels and items can be found in level.js
The collision detection and correction can be found in item.js
the player and player attributes can be found in player.js

This project demonstrates almost all the techniques learned in class, including

Javascript and Canvas
- various levels of scope
- all the built in types
- different loops
- multiple ways to work with canvas and context, including translating and rotating
- writing text onto context
- using keyboard events
- using spritesheets
- setting intervals and timers
- arrays and corresponding forEach function
- math methods
- extensive work with objects
- writing functions

HTML
-different use of tags
-use of href
-use of forms
-use of pictures
-use of buttons
-use of dropdowns

CSS
-use of css stylesheet
-use of margins,paddings
-use of position
-use of fonts
-use of alignment
-use of word-wrap
-use of border-radius
-use of inline and blocks
-use of multiple selectors
-use of cascading technique
-use of inheritance
-use of display
-use of reset

JQUERY
-use of getting dom element by id
-getting dom element by class
-changing html of a dom element
-creating and inserting dom nodes
-events   

AJAX
-use of put,get and post
-use of pseudo long polling



















