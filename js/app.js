// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.departure = -150;
    this.x = this.departure;
    this.y = 82 * this.randomArbitrary(1,4);
    this.width = 100;
    this.height = 150;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.randomArbitrary = function(min, max) {
      let randomArbitrary = Math.floor(Math.random() * (max - min) + min);
      if (randomArbitrary % 2 !== 0) {
        return randomArbitrary;
      };
      return this.randomArbitrary(min, max);
    };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.factor * dt;
    if (this.x > ctx.canvas.width) {
        this.x = this.departure;
        this.y = 82 * this.randomArbitrary(1,4);
        this.factor = 100 * this.randomArbitrary(3, 11);
    };
    if (this.factor === 900 && this.x > ctx.canvas.width) {
      this.factor = 100 * this.randomArbitrary(1, 7);
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function() {
    this.departureX = 202;
    this.departureY = 410;
    this.x = this.departureX;
    this.y = this.departureY;
    this.width = 100;
    this.height = 150;
    this.sprite = 'images/char-boy.png';
};

// Draws the player on the screen, required method for game.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};

Player.prototype.update = function() {
    if (this.y < 82) {
        this.x === this.departureX;
        this.y = this.departureY;
        star.x = 101 * star.randomArbitrary(0, 5);
        star.y = 82 * star.randomArbitrary(1, 4);
        star.width = 100;
        star.height = 150;
    };
};

// This function gets called by the event handler for keyup event
// and handles player repositioning along x and y axes
Player.prototype.handleInput = function (key) {
    if (key === 'left' && this.x > 0) {
        this.x -= 101;
    };
    if (key === 'right' && this.x <= 303) {
        this.x += 101;
    };
    if (key === 'up' && this.y > 0) {
        this.y -= 82;
    };
    if (key === 'down' && this.y < 390) {
        this.y += 82;
    };
};

// This is the constructor os star objects. Any instance of Star
// modify randomly its own properties for positioning in the canvas.
var Star = function() {
    this.randomArbitrary = function (min, max) {
        let randomArbitrary = Math.floor(
          Math.random() * (max - min) + min
        );
        return randomArbitrary;
    };
    this.x = 101 * this.randomArbitrary(0,5);
    this.y = 82 * this.randomArbitrary(1,4);
    this.width = 100;
    this.height = 150;
    this.sprite = 'images/Star.png';
};

// Draws the star on the screen.
Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const player = new Player();
const star = new Star();

enemy1.factor = 200;

enemy2.factor = 500;

enemy3.factor = 350;

const allEnemies = [];

allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

// Checks collisions by verifying if the x and y coordinates of
// Player and Enemy instances, when rounded to the nearest decimal,
// match, a condition for collision.
const checkCollisions = function(){
    allEnemies.forEach(function(enemy){
        if ((
            Math.round(Math.round(enemy.x) / 10) * 10 ===
            Math.round(Math.round(player.x - 82) / 10) * 10
        ) && enemy.y === player.y) {
            player.x = player.departureX;
            player.y = player.departureY;
        };
    });
};

// Checks collisions by verifying if the x and y coordinates of
// Player and Star instances match, a condition for a catch, an
// extra point.
const checkCatches = function () {
    if (player.y === star.y && star.x === player.x) {
        star.width = 0;
        star.height = 0;
    };
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
