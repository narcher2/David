indSheep = function (game, player) {  
    var x = game.world.randomX;
    var y = game.world.randomY;

    this.lamb.turnTimer = 0;
    this.game = game;  
    this.player = player;
    this.sheepStatus = 0;
    this.lamb = game.add.sprite(x, y, 'sheep');
    game.physics.enable(this.lamb, Phaser.Physics.ARCADE);
    this.lamb.body.immovable = false;
    this.lamb.angle = game.rnd.angle();
    this.lamb.body.collideWorldBounds = true;
    this.lamb.body.bounce.setTo(1, 1);
    game.physics.arcade.velocityFromRotation(this.lamb.rotation, 50, this.lamb.body.velocity);
    this.animations.add('move', [0, 1, 2, 3, 4, 5], 20, true);
    this.play('move');
};
    
indSheep.prototype.update = function() {
    if (game.time.now > this.lamb.turnTimer && game.time.now > 500)
    {
        this.lamb.turnTimer = game.time.now + 500;
        this.lamb.angle = game.rnd.integerInRange(0, 360);
        game.physics.arcade.velocityFromRotation(this.lamb.rotation, game.rnd.integerInRange(0, 50), this.lamb.body.velocity);

    }
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('phaser', 'assets/sprites/phaser-dude.png');
    game.load.spritesheet('veggies', 'assets/sprites/fruitnveg32wh37.png', 32, 32);
    game.load.spritesheet('sheep', 'examples/assets/sprites/sheep.png', 64, 64);

}

var sprite;
var group;
var cursors;
var q;
var turnTimer = 0;
var sheepSet;

function create() {

    game.world.setBounds(0, 0, 800, 3000);
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#2d2d2d';

    sprite = game.add.sprite(400, 2900, 'phaser');

    // game.physics.arcade.sortDirection = Phaser.Physics.Arcade.TOP_BOTTOM;
    game.physics.arcade.sortDirection = Phaser.Physics.Arcade.BOTTOM_TOP;

    game.physics.arcade.enable(sprite);
    
    //group = game.add.physicsGroup(Phaser.Physics.ARCADE);
    sheeples = game.add.group();
    sheeples.enableBody = true;
    sheeples.physicsBodyType = Phaser.Physics.ARCADE;
    //game.physics.arcade.enable(sheeples); //maybe?
    sheeples.setAll('anchor.x', 0.5);
    sheeples.setAll('anchor.y', 1);
    sheeples.setAll('outOfBoundsKill', true);
    sheeples.setAll('checkWorldBounds', true);
    

    /*for (var i = 0; i < 500; i++)
    {
        var c = group.create(game.rnd.integerInRange(64, 800-64), game.rnd.integerInRange(100, 2900), 'veggies', game.rnd.integerInRange(0, 35));
        c.name = 'veg' + i;
        c.body.immovable = true;
    }*/
    
    sheepSet = [];

    for (var i = 0; i < 20; i++)
    {
        sheepSet.push(new indSheep(game, sprite));
    }
        //  Here we'll create some chillis which the player can pick-up. They are still part of the same Group.
        //var c = sheeples.create(game.rnd.integerInRange(64, 800-64), game.rnd.integerInRange(0, 2900), 'sheep', 1);
        //c.body.immovable = false;
        //c.animations.add('move', [0, 1, 2, 3, 4, 5], 20, true);
        //c.play('move');
        //c.body.moves = true;
        //c.body.velocity.set(game.rnd.integerInRange(-50, 50), game.rnd.integerInRange(-50, 50));
        //c.rotation = game.rnd.integerInRange(0, 360);
        //game.physics.arcade.velocityFromRotation(c.rotation, game.rnd.integerInRange(0, 50), c.body.velocity);
    }

    game.camera.follow(sprite);

    cursors = game.input.keyboard.createCursorKeys();

}

function moveSheep()
    {   
    self.rotation = game.rnd.integerInRange(0, 360);
    }

function update() {

    game.physics.arcade.collide(sprite, group, collisionHandler, null, this);

    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;
    
    //moveSheep(c);
    
    if (cursors.left.isDown)
    {
        sprite.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.velocity.x = 200;
    }

    if (cursors.up.isDown)
    {
        sprite.body.velocity.y = -200;
    }
    else if (cursors.down.isDown)
    {
        sprite.body.velocity.y = 200;
    }
    
    if (game.time.now > turnTimer && game.time.now > 500)
    {
        turnTimer = game.time.now + 500;
        //sheeples.rotation = game.rnd.integerInRange(0, 360);

    }

}

function collisionHandler (player, veg) {

    //  If the player collides with the chillis then they get eaten :)
    //  The chilli frame ID is 17

    if (veg.frame === 17)
    {
        veg.kill();
    }

}

