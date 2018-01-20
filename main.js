var mainState = {
    preload: function () {
        console.log('preload has fired!');
    },

    create: function () {
        console.log('create has also fired!');
        game.stage.backgroundColor = '#568a62';
    },

    update: function () {
        console.log('-- update firing --');
    },
}

var game = new Phaser.Game(200, 400, Phaser.CANVAS);
game.state.add('main', mainState);
game.state.start('main');
