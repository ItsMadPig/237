/*
 * Aaron Hsu (ahsu1)
 * ahsu1@andrew.cmu.edu
 */
 
var Item = function(x, y, width, height, image, frame) {
    var self = this;
    self.x = x;
    self.y = y;
    self.width = width;
    self.height = height;
    self.image = image;
    self.frame = frame;

    self.adjustBounds = function(){
        var leftPlayer = player.pos.x;
        var topPlayer = (player.pos.y - player.height);
        var rightPlayer = (player.pos.x + player.width);
        var botPlayer = player.pos.y;
        var leftItem = self.x;
        var topItem = self.y;
        var rightItem = self.x + self.width;
        var botItem = self.y + self.height;

        var midX = (player.pos.x + player.pos.x + player.width)/2;

if ((player.movement.type === WALKING) || (player.movement.type === STANDING)){
            
            if (leftPlayer < leftItem && rightPlayer >= leftItem &&
                ((topPlayer <= topItem && (botPlayer - gravityStrength) > topItem) || 
                 (topPlayer < botItem && botPlayer >= botItem) || 
                 (topPlayer >= topItem && botPlayer <= botItem))){
                player.pos.x = leftItem - player.width;
                //player.pos.x -= rightPlayer - leftItem;
            }

            else if (leftPlayer < rightItem && rightPlayer > rightItem &&
                ((topPlayer <= topItem && (botPlayer - gravityStrength) > topItem)||
                 (topPlayer < botItem && botPlayer >= botItem)||
                  topPlayer >=  topItem && botPlayer <= botItem)){
                //right border
                player.pos.x = rightItem;
            }

            else if (topPlayer < topItem && botPlayer > topItem){
                //top border
                player.pos.y = topItem;
            }
        }



        //if player is jumping
        else if (player.movement.type === JUMPING){

            if (leftPlayer >= leftItem && rightPlayer <= rightItem &&
                    topPlayer < topItem && botPlayer > topItem){
                //in top middle
                player.pos.y = topItem;
            }

            else if (leftPlayer < leftItem && rightPlayer > leftItem){
                //left border
                if  (botPlayer > (topItem + 2 * gravityStrength)){
                    //if closer to left
                    player.pos.x = leftItem - player.width;
                }
                else{
                    //if close to top
                    player.pos.y = topItem;
                }
            }

            else if (leftPlayer < rightItem && rightPlayer > rightItem){
                //right border
                if (botPlayer <= topItem + 2 * gravityStrength){
                    player.pos.y = topItem;
                }
                else{
                    player.pos.x = rightItem;
                }
            }

            else if (topPlayer <= botItem && botPlayer > botItem){
                //in bot middle
                player.pos.y = botItem + player.height;
                player.stop();
            }

        }

        //if player is ducking
        else if (player.movement.type === DUCKING){
            if (leftPlayer < leftItem && rightPlayer > leftItem &&
                botPlayer > (topItem + gravityStrength)){
                player.pos.x = leftItem - player.width;
            }
            else if (leftPlayer < rightItem && rightPlayer > rightItem &&
                     botPlayer > (topItem + gravityStrength)){
                player.pos.x = rightItem;
            }
            else if (topPlayer < topItem && botPlayer > topItem){
                //top border
                player.pos.y -= botPlayer - topItem;
            }
        }
        //if player is hit
        else if (player.movement.type === HIT){

            if (leftPlayer < leftItem && rightPlayer > leftItem && 
                botPlayer > topItem){
                //left border
                player.pos.x = leftItem - player.width; //rightPlayer - leftItem;
            }
            else if (leftPlayer < rightItem && rightPlayer > rightItem &&
                     botPlayer < topItem){
                //right border
                player.pos.x = rightItem;
            }
            else if (botPlayer > topItem && topPlayer < topItem){
                //top border
                player.pos.y = topItem;
            }
            else if (leftPlayer <= leftItem && rightPlayer >= rightItem){
                //including item
                player.pos.x = rightItem;
            }
            else if (leftPlayer > leftItem && rightPlayer < rightItem){
                //in item
                player.pos.x = leftItem - player.width;
            }
        }
    };

    // run a trivial reject test to determine if this item has
    // collided with the player
    self.hasCollided = function() {
        var leftPlayer = player.pos.x;
        var topPlayer = (player.pos.y - player.height);
        var rightPlayer = (player.pos.x + player.width);
        var botPlayer = player.pos.y;
        var leftItem = self.x;
        var topItem = self.y;
        var rightItem = self.x + self.width;
        var botItem = self.y + self.height;

        var bit1, bit2, bit3, bit4;
        var bit1 = ((topPlayer <= topItem) & (botPlayer <= topItem));
        var bit2 = ((topPlayer >= botItem) & (botPlayer >= botItem));
        var bit3 = ((leftPlayer <= leftItem) & (rightPlayer <= leftItem));
        var bit4 = ((leftPlayer >= rightItem) & (rightPlayer >= rightItem));

        // if 1 then not collided, if 0 then collided
        if ((bit1 | bit2 | bit3 | bit4) === 0) {
            return true;
        }
        else {
            return false;
        }
    };  

    self.fixCollisions = function() {
        if (self.hasCollided()) {
            self.adjustBounds();
        }
    };

    self.draw = function() {
        ctx.drawImage(
            self.image,
            self.frame.x, self.frame.y,
            self.frame.width, self.frame.height,
            self.x, self.y,
            self.width, self.height);
    };

    self.update = function() {};
};
