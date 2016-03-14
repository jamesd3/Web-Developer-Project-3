// Enemies our player must avoid
var Enemy = function(x, y, direction, sprite) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // Assign x and y coordinates to Enemy
    // Direction true = right false = left
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.sprite = direction?'images/enemy-bug.png':'images/reverse-bug.png';
    // Assign a random speed between 100-300 rounded down to
    // the nearest whole number.
    this.speed = (direction?1:-1)*Math.floor((Math.random() * 200) + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the delta time parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //Enemies move until they go off screen otherwise they go
    // to their start point and begin again.
    if(this.x <= (canvas.width + 50) && this.x >= -100){
        this.x += dt * this.speed;
    }else{
        this.x = this.direction?-10:canvas.width;
    }

// Player resets to original position if they get to close to enemy.
    if(player.x >= this.x - 30 && player.x <= this.x + 30){
        if(player.y >= this.y - 35 && player.y <= this.y + 35){
            player.reset();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create player class
var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    // Player begins in the middle of the canvas near the bottom of the screen
    this.x = (canvas.width/2 - 50);
    this.y = (canvas.height - 250);
};

// console.log(canvas.width);
// console.log(canvas.height);

// Update player based on move commands
Player.prototype.update = function() {
    // Directional key release dictates incremental movement
    // for given direction provided Player is not on the edge
    // or off canvas.
    if(this.heroMove === 'left' && this.x > 50) {
        this.x -= 50;
    }else if(this.heroMove === 'down' && this.y <= (canvas.height - 300)) {
        this.y += 50;
    }else if(this.heroMove === 'right' && this.x <= (canvas.width - 150)) {
        this.x += 50;
    }else if(this.heroMove === 'up' && this.y > 50) {
        this.y -= 50;
    }
    this.heroMove = null;

    // When player reaches the 'safe zone', alert user of success
    // Upon pressing 'Ok', reset to original position
    if(this.y < 50){
        alert('Congratulations! You made it to the safe zone! Click ok to restart');
        player.reset();
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player handle input
Player.prototype.handleInput = function(e) {
    this.heroMove = e;
};

// Define player reset
Player.prototype.reset = function() {
    this.x = (canvas.width/2 - 50);
    this.y = (canvas.height - 250);
};

// create enemy objects
var enemy1 = new Enemy(-15, 387, false, 'images/enemy-bug.png');
var enemy2 = new Enemy(-15, 302, true, 'images/reverse-bug.png');
var enemy3 = new Enemy(-15, 217, false, 'images/enemy-bug.png');
var enemy4 = new Enemy(-15, 131, true, 'images/reverse-bug.png');
var enemy5 = new Enemy(-15, 472, true, 'images/enemy-bug.png');

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

// Place the player object in a variable called player
var player = new Player();

// Moved from document.addEventListener because this object
// only needs to be called once.
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    player.handleInput(allowedKeys[e.keyCode]);
});
