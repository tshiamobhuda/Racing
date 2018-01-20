var mainState = {
    preload: function () {
        game.load.image('player', 'assets/player.png');
        game.load.image('enemy', 'assets/enemy.png');
    },

    create: function () {
        game.stage.backgroundColor = '#568a62';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;

        this.player = game.add.sprite(40, game.world.height - 80, 'player');

        this.cursor = game.input.keyboard.createCursorKeys();

        this.speed = 100;

        this.enemies = game.add.group();
        this.timer = game.time.events.loop(2000, this.addEnemies, this);
    },

    update: function () {
        if (this.cursor.right.isDown)
            this.player.body.x = 100;
        else if (this.cursor.left.isDown)
            this.player.body.x = 40;
    },

    addOneEmemy: function (x, y) {
        var enemy = game.add.sprite(x, y, 'enemy');
        this.enemies.add(enemy);

        enemy.body.velocity.y = this.speed;
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
    },
    
    addEnemies: function () {
        this.addOneEmemy(Phaser.Utils.randomChoice(40,100), 0);
    }
};

var game = new Phaser.Game(200, 400, Phaser.CANVAS);
game.state.add('main', mainState);
game.state.start('main');
