// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.departure = -150;
    this.x = this.departure;
    this.y = 41 * this.repositionRandomArbitrary(1,6);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.repositionRandomArbitrary = function(min, max) {
      let randomArbitrary = Math.floor(Math.random() * (max - min) + min);
      if (randomArbitrary % 2 !== 0) {
        return randomArbitrary;
      }
      return this.repositionRandomArbitrary(min, max);
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
        this.y = (41) * this.repositionRandomArbitrary(1,6);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function() {
    this.departure = 249 + 41;
    this.x = 202;
    this.y = this.departure;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
    if (this.y === -41.5) {
        this.y = this.departure;
    }
};

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
    if (key === 'down' && this.y <= 290.5) {
        this.y += 82;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const player = new Player();

enemy1.factor = 100;

enemy2.factor = 500;

enemy3.factor = 350;

const allEnemies = [];

allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

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
