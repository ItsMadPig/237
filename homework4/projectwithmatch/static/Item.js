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

    self.adjustBounds = function(tank){
        var leftPlayer = tank.pos.x;
        var topPlayer = (tank.pos.y - tank.height);
        var rightPlayer = (tank.pos.x + tank.width);
        var botPlayer = tank.pos.y;
        var leftItem = self.x;
        var topItem = self.y;
        var rightItem = self.x + self.width;
        var botItem = self.y + self.height;

        var midX = (tank.pos.x + tank.pos.x + tank.width)/2;
        if ((tank.movement.type === WALKING) || 
            (tank.movement.type === STANDING ||
             tank.movement.type === CHARGING)){
            
            if (leftPlayer < leftItem && rightPlayer >= leftItem &&
                ((topPlayer <= topItem && (botPlayer - gravityStrength) > topItem) || 
                 (topPlayer < botItem && botPlayer >= botItem) || 
                 (topPlayer >= topItem && botPlayer <= botItem))){
                tank.pos.x = leftItem - tank.width;
                //tank.pos.x -= rightPlayer - leftItem;
            }

            else if (leftPlayer < rightItem && rightPlayer > rightItem &&
                ((topPlayer <= topItem && (botPlayer - gravityStrength) > topItem)||
                 (topPlayer < botItem && botPlayer >= botItem)||
                  topPlayer >=  topItem && botPlayer <= botItem)){
                //right border
                tank.pos.x = rightItem;
            }

            else if (topPlayer < topItem && botPlayer > topItem){
                //top border
                tank.pos.y = topItem;
            }
        }



        //if player is aiming up
        else if (tank.movement.type === AIMUP){

            if (leftPlayer >= leftItem && rightPlayer <= rightItem &&
                    topPlayer < topItem && botPlayer > topItem){
                //in top middle
                tank.pos.y = topItem;
            }

            else if (leftPlayer < leftItem && rightPlayer > leftItem){
                //left border
                if  (botPlayer > (topItem + 2 * gravityStrength)){
                    //if closer to left
                    tank.pos.x = leftItem - tank.width;
                }
                else{
                    //if close to top
                    tank.pos.y = topItem;
                }
            }

            else if (leftPlayer < rightItem && rightPlayer > rightItem){
                //right border
                if (botPlayer <= topItem + 2 * gravityStrength){
                    tank.pos.y = topItem;
                }
                else{
                    tank.pos.x = rightItem;
                }
            }

            else if (topPlayer <= botItem && botPlayer > botItem){
                //in bot middle
                tank.pos.y = botItem + tank.height;
                tank.stop();
            }

        }

        //if player is ducking
        else if (tank.movement.type === AIMDOWN){
            if (leftPlayer < leftItem && rightPlayer > leftItem &&
                botPlayer > (topItem + gravityStrength)){
                tank.pos.x = leftItem - tank.width;
            }
            else if (leftPlayer < rightItem && rightPlayer > rightItem &&
                     botPlayer > (topItem + gravityStrength)){
                tank.pos.x = rightItem;
            }
            else if (topPlayer < topItem && botPlayer > topItem){
                //top border
                tank.pos.y -= botPlayer - topItem;
            }
        }
        //if player is hit
        else if (tank.movement.type === HIT || tank.movement.type === DYING){

            if (leftPlayer < leftItem && rightPlayer > leftItem && 
                botPlayer > topItem){
                //left border
                tank.pos.x = leftItem - tank.width; //rightPlayer - leftItem;
            }
            else if (leftPlayer < rightItem && rightPlayer > rightItem &&
                     botPlayer < topItem){
                //right border
                tank.pos.x = rightItem;
            }
            else if (botPlayer > topItem && topPlayer < topItem){
                //top border
                tank.pos.y = topItem;
            }
            else if (leftPlayer <= leftItem && rightPlayer >= rightItem){
                //including item
                tank.pos.x = rightItem;
            }
            else if (leftPlayer > leftItem && rightPlayer < rightItem){
                //in item
                tank.pos.x = leftItem - tank.width;
            }
        }
    };

    // run a trivial reject test to determine if this item has
    // collided with the player
    self.hasCollided = function(tank) {
        var leftPlayer = tank.pos.x;
        var topPlayer = (tank.pos.y - tank.height);
        var rightPlayer = (tank.pos.x + tank.width);
        var botPlayer = tank.pos.y;
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

    self.fixCollisions = function(tank) {
        if (self.hasCollided(tank)) {
            self.adjustBounds(tank);
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
