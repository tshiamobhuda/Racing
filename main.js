var mainState = {
    preload: function () {
        game.load.image('player', 'assets/player.png');
    },

    create: function () {
        game.stage.backgroundColor = '#568a62';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;

        this.player = game.add.sprite(40, game.world.height - 80, 'player');

        this.cursor = game.input.keyboard.createCursorKeys();
    },

    update: function () {
        if (this.cursor.right.isDown)
            this.player.body.velocity.x = 200;
        else if (this.cursor.left.isDown)
            this.player.body.velocity.x = -200;
    },
};

var game = new Phaser.Game(200, 400, Phaser.CANVAS);
game.state.add('main', mainState);
game.state.start('main');
