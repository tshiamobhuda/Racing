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
        this.score = 0;
        this.level = 0;

        var txtStyle = {font:'15px Arial', fill:'#333333'};
        var dgtStyle = {font:'20px Arial', fill:'#333333'};

        game.add.text(220, 20, 'score',txtStyle);
        this.lblScore = game.add.text(220, 40, '0', dgtStyle);

        game.add.text(220, 180, 'speed',txtStyle);
        this.lblSpeed = game.add.text(220, 200, '0', dgtStyle);

        game.add.text(220, 260, 'level',txtStyle);
        this.lblLevel = game.add.text(220, 280, '0', dgtStyle);

        this.enemies = game.add.group();
        this.timer = game.time.events.loop(2000, this.addEnemies, this);
    },

    update: function () {
        if (this.cursor.right.isDown)
            this.player.body.x = 100;
        else if (this.cursor.left.isDown)
            this.player.body.x = 40;

        game.physics.arcade.overlap(this.player, this.enemies, this.hitEnemy, null, this);
    },

    addOneEnemy: function (x, y) {
        var enemy = game.add.sprite(x, y, 'enemy');
        this.enemies.add(enemy);

        enemy.body.velocity.y = this.speed;
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
    },
    
    addEnemies: function () {
        this.addOneEnemy(Phaser.Utils.randomChoice(40,100), 0);

        if (this.enemies.countDead() > 0) {
            this.score += 1;
            this.lblScore.text = this.score.toString();
        }

    },

    hitEnemy: function () {
        // @todo explode player, play explosion fx, decrease lives
        game.state.start('main');
    }
};

var game = new Phaser.Game(300, 400, Phaser.CANVAS);
game.state.add('main', mainState);
game.state.start('main');
