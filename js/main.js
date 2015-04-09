indWolf = function (game, player) {  
    var x = game.world.randomX;
    var y = game.world.randomY;

    this.turnTimer = 0;
    this.game = game; 
    this.player = player;
    
    this.sheepStatus = 0;
    this.wolf = game.add.sprite(x, y, 'wolf');
    game.physics.enable(this.wolf, Phaser.Physics.ARCADE);
    this.wolf.body.immovable = false;
    this.wolf.angle = game.rnd.angle();
    this.wolf.body.collideWorldBounds = true;
    this.wolf.body.bounce.setTo(1, 1);
    this.wolf.anchor.set(0.5);
    game.physics.arcade.velocityFromRotation(this.wolf.rotation, 50, this.wolf.body.velocity);
    //this.animations.add('move', [0, 1, 2, 3, 4, 5], 20, true);
    this.wolf.animations.add('move', [0, 1, 2, 3, 4, 5], 20, false);
};

indWolf.prototype.update = function() {
    if (game.time.now > this.turnTimer && game.time.now > 500)
    {
        this.turnTimer = game.time.now + 3000;
        if (game.rnd.integerInRange(0, 4) > 3)
        {
        this.wolf.angle = game.rnd.integerInRange(0, 360);
        this.wolf.play('move');
        game.physics.arcade.velocityFromRotation(this.wolf.rotation, game.rnd.integerInRange(0, 50), this.wolf.body.velocity);
        }
        else
        {
        this.wolf.body.velocity.x = 0;
        this.wolf.body.velocity.y = 0;
        }

    }
    if (this.game.physics.arcade.distanceBetween(this.wolf, this.player) < 300)
    {
        this.wolf.rotation = this.game.physics.arcade.moveToObject(this.wolf, this.player, 125)
        this.wolf.play('move');
    }
};

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
    game.load.spritesheet('wolf', 'assets/sprites/wolf_strip4.png', 64, 64)
    game.load.image('background', 'assets/sprites/grassbackground.png');
    game.load.audio('sheepSong', 'assets/audio/sheeptheme.mp3');
    game.load.image('bullet', 'assets/sprites/rock.png');
    game.load.image('fence', 'assets/sprites/fence.png');
    game.load.audio('baa', 'assets/audio/sheep.wav');
    game.load.audio('bark', 'assets/audio/wolf.wav');
    game.load.audio('ding', 'assets/audio/ding.wav');
    game.load.audio('slinger', 'assets/audio/throw.wav');

}

var sprite;
var group;
var cursors;
var q;
var turnTimer = 0;
var sheepSet;
var wolfSet;

var rock;
var bullets;

var fireRate = 300;
var nextFire = 0;

var baa;
var ding;
var bark;
var slinger;


function create() {

    game.world.setBounds(0, 0, 3000, 3000);
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#008000';
    background = game.add.tileSprite(0, 0, 3000, 3000, 'background');
    
    music = game.add.audio('sheepSong');

    music.play();
    
    baa = game.add.audio('baa');
    ding = game.add.audio('ding');
    bark = game.add.audio('bark');
    slinger = game.add.audio('slinger');
    
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    sprite = game.add.sprite(1500, 1500, 'player');
    sprite.anchor.set(0.5);
    sprite.animations.add('sling', [0, 1, 2, 3, 4, 5, 6, 7, 8], 20, false);
    
    fence = game.add.sprite(1500, 1500, 'fence');
    fence.anchor.set(0.5);
    game.physics.arcade.enable(fence);

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
    
    wolfSet = [];
    
    for(var hue = 0; hue < 20; hue++)
    {
    wolfSet.push(new indWolf(game, sprite));
    }
    
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
    
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    cursors = game.input.keyboard.createCursorKeys();

}

function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;
        slinger.play();
        var bullet = bullets.getFirstDead();

        bullet.reset(sprite.x - 8, sprite.y - 8);

        game.physics.arcade.moveToPointer(bullet, 300);
    }

}

function update() {


    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;
    
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
        rotSum += 0;
        buttonCount++;
        //game.physics.arcade.velocityFromRotation(sprite.rotation, 200, sprite.body.velocity);
        sprite.body.rotation = rotSum/buttonCount;
        game.physics.arcade.velocityFromRotation(sprite.rotation, 200, sprite.body.velocity);
    }

    if (cursors.up.isDown)
    {
        //sprite.body.velocity.y = -200;
        rotSum += 270;

        if (cursors.right.isDown)
        {
        rotSum += 360;
        }
        else
        {
        rotSum += 0;
        }
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
    /*if(fireButton.isDown)
    {
        sprite.play('sling');
    }*/
    
    if (game.input.activePointer.isDown)
    {
        fire();
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
            game.physics.arcade.overlap(fence, sheepSet[i].lamb, sheepHitsFence, null, this);
            
    }
        for (var i = 0; i < wolfSet.length; i++)
    {
        for(var j = 0; j < sheepSet.length; j++)
        {
            wolfSet[i].update();
            game.physics.arcade.overlap(bullets, wolfSet[i].wolf, collisionHandler, null, this);
            game.physics.arcade.overlap(wolfSet[i].wolf, sheepSet[j].lamb, wolfEatsSheep, null, this);
        }
    }
        //game.physics.arcade.collide(bullets, wolf, collisionHandler, null, this);
        //game.physics.arcade.collide(lamb, fence, sheepHitsFence, null, this);
        //game.physics.arcade.collide(lamb, wolf, wolfEatsSheep, null, this);
        //game.physics.arcade.collide(sprite, group, collisionHandler, null, this);

}

function collisionHandler (bullet, wolf) {

        wolf.kill();
        bullet.kill();
        bark.play();

}

function sheepHitsFence (lamb, fence) {

        fence.kill();
        ding.play();

}

function wolfEatsSheep (lamb, wolf) {

        wolf.kill();
        baa.play();

}

