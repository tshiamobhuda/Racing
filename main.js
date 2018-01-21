var mainState = {
    preload: function () {
        game.load.image('player', 'assets/Player.png');
        game.load.image('enemy', 'assets/Player.png');
        game.load.image('bg', 'assets/Bg.png');

        game.load.audio('explosion', 'assets/Explosion3.wav');
        game.load.audio('explosion', 'assets/Explosion3.wav');
        game.load.audio('score', 'assets/Score.wav');
    },

    create: function () {
        game.stage.backgroundColor = '#6d785c';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;

        this.bgSprite = game.add.tileSprite(0, 0, 200, 400, 'bg');
        this.bgSprite.autoScroll(0,100);

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

        this.explosionSound = game.add.audio('explosion');
        this.scoreSound = game.add.audio('score');

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

        // @todo refactor code... it always skips count for 1st dead enemy
        if (this.enemies.countDead() > 0) {
            this.score += 1;
            this.lblScore.text = this.score.toString();
            this.scoreSound.play();
        }

    },

    hitEnemy: function () {
        // @todo explode player, play explosion fx, decrease lives
        this.explosionSound.play();
        game.state.start('main');
    }
};

var game = new Phaser.Game(300, 400, Phaser.CANVAS);
game.state.add('main', mainState);
game.state.start('main');
