
 
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
        tank.pos.y = topItem;
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
