indSheep = function (game, player) {  
    var x = game.world.randomX;
    var y = game.world.randomY;

    this.turnTimer = 0;
    this.game = game; 
    this.player = player;
    
    this.sheepStatus = 0;
    this.lamb = game.add.sprite(x, y, 'sheep');
    game.physics.enable(this.lamb, Phaser.Physics.ARCADE);
    this.lamb.body.immovable = false;
    this.lamb.angle = game.rnd.angle();
    this.lamb.body.collideWorldBounds = true;
    this.lamb.body.bounce.setTo(1, 1);
    this.lamb.anchor.set(0.5);
    game.physics.arcade.velocityFromRotation(this.lamb.rotation, 50, this.lamb.body.velocity);
    //this.animations.add('move', [0, 1, 2, 3, 4, 5], 20, true);
    this.lamb.animations.add('move', [0, 1, 2, 3, 4, 5], 20, true);
    this.lamb.play('move');
};


indSheep.prototype.update = function() {
    if (game.time.now > this.turnTimer && game.time.now > 500)
    {
        this.turnTimer = game.time.now + 3000;
        if (game.rnd.integerInRange(0, 4) > 3)
        {
        this.lamb.angle = game.rnd.integerInRange(0, 360);
        game.physics.arcade.velocityFromRotation(this.lamb.rotation, game.rnd.integerInRange(0, 50), this.lamb.body.velocity);
        }
        else
        {
        this.lamb.body.velocity.x = 0;
        this.lamb.body.velocity.y = 0;
        }

    }
    if (this.game.physics.arcade.distanceBetween(this.lamb, this.player) < 150)
    {
        this.lamb.rotation = this.game.physics.arcade.moveToObject(this.lamb, this.player, -100)+135
    }
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('phaser', 'assets/sprites/phaser-dude.png');
    game.load.spritesheet('veggies', 'assets/sprites/fruitnveg32wh37.png', 32, 32);
    game.load.spritesheet('sheep', 'examples/assets/sprites/sheep.png', 64, 64);
    game.load.spritesheet('player', 'assets/sprites/david_strip9.png', 64, 64)

}

var sprite;
var group;
var cursors;
var q;
var turnTimer = 0;
var sheepSet;

function create() {

    game.world.setBounds(0, 0, 2000, 2000);
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#008000';

    sprite = game.add.sprite(400, 2900, 'player');
    sprite.anchor.set(0.5);
    sprite.animations.add('sling', [0, 1, 2, 3, 4, 5, 6, 7, 8], 20, true);

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
    var rotSum = 0;
    var buttonCount = 0;
    
    if (cursors.left.isDown)
    {
        rotSum += 180;
        buttonCount++;
        //game.physics.arcade.velocityFromRotation(sprite.rotation, 200, sprite.body.velocity);
        sprite.body.rotation = rotSum/buttonCount;
        game.physics.arcade.velocityFromRotation(sprite.rotation, 200, sprite.body.velocity);
    }
    else if (cursors.right.isDown)
    {
        //sprite.body.velocity.x = 200;
        rotSum += 360;
        buttonCount++;
        //game.physics.arcade.velocityFromRotation(sprite.rotation, 200, sprite.body.velocity);
        sprite.body.rotation = rotSum/buttonCount;
        game.physics.arcade.velocityFromRotation(sprite.rotation, 200, sprite.body.velocity);
    }

    if (cursors.up.isDown)
    {
        //sprite.body.velocity.y = -200;
        rotSum += 270;
        buttonCount++;
        //game.physics.arcade.velocityFromRotation(sprite.rotation, 200, sprite.body.velocity);
        sprite.body.rotation = rotSum/buttonCount;
        game.physics.arcade.velocityFromRotation(sprite.rotation, 200, sprite.body.velocity);
    }
    else if (cursors.down.isDown)
    {
        //sprite.body.velocity.y = 200;
        rotSum += 90;
        buttonCount++;
        //game.physics.arcade.velocityFromRotation(sprite.rotation, 200, sprite.body.velocity);
        sprite.body.rotation = rotSum/buttonCount;
        game.physics.arcade.velocityFromRotation(sprite.rotation, 200, sprite.body.velocity);
    }
    if (fireButton.isDown)
    {
            sprite.play('sling');
    }
    
    if (game.time.now > turnTimer && game.time.now > 500)
    {
        turnTimer = game.time.now + 500;
        //sheeples.rotation = game.rnd.integerInRange(0, 360);

    }
    for (var i = 0; i < sheepSet.length; i++)
    {
            sheepSet[i].update();
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

