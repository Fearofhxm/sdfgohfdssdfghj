
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.spritesheet('dude', 'asset/sonicsprites.png', 48, 48);
    game.load.spritesheet('coin','asset/coin.png',41,40)
    game.load.image('background','asset/background3.png');

}

var player;
var coin;
var facing = 'marche';
var jumpTimer = 0;
var cursors;
var jumpButton;
var bg;
var score=0;
var scoreText;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE); // Lancement des loi de la physique

    bg = game.add.tileSprite(0, 0, 800, 600, 'background'); // Affiche le fond

    scoreText = game.add.text(10, 10, 'Pièces : 0', {fontSize : '22px', fill: '#fff'}); // Affiche texte score

    game.physics.arcade.gravity.y = 300; // Gravité du jeu

    player = game.add.sprite(32, 320, 'dude'); // Spawn personnage
    player.anchor.setTo (0.5,0.5);
    coin = game.add.sprite(800,600, 'coin'); // Spawn pièce
    coin.anchor.setTo (0.5,0.5);

    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.collideWorldBounds = true;                          ////////////////////
    player.body.gravity.y = 1000;                                   //                //
    player.body.maxVelocity.y = 500;                                //                //
    player.body.setSize(20, 32, 5, 16);                             //  Déplacement   //
    player.body.immovable = true;                                   //  du            //
    player.animations.add('marche',[0,01,02,03,04,05,06],20,false); //  personnage    //
    player.animations.add('saut',[48],10,false);                    //                //
    player.animations.add('accroupi',[16],10,false);                ////////////////////
    player.frame=6;

    game.physics.enable(coin, Phaser.Physics.ARCADE); // Loi de la physique pour la pièce

    coin.body.collideWorldBounds = true; //
    coin.body.gravity.y = 1000;          // Déplacement
    coin.body.velocity.x=300;            // de la pièce
    coin.body.bounce.setTo(1,1);         //

     // var walk = coin.animations.add('walk');   // Faire tourner la pièce
    // coin.animations.play('walk', 20, true);

    

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP); // Configuration du saut

}

function anim(){

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){          // Animation marche vers la gauche
        player.scale.x=-1;
        player.play('marche');

        }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){    // Animation marche vers la droite
        player.scale.x=1;
        player.play('marche');

    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){            // Animation du saut vers la droite
        player.scale.y=1;
        player.play('saut');
        }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){       // Animation du saut vers la gauche
        player.scale.y=-1;
        player.play('saut');
        }
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){          // Animation accroupi vers la droite
        player.scale.y=1;
        player.play('accroupi');
        }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){     // Animation accroupi vers la gauche
        player.scale.y=-1;
        player.play('accroupi');
        }
 }

function update(){
    anim();

    game.physics.arcade.collide(player, coin, points); // Physique entres tout les sprites créer

    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)==true){   // Déplacement du personnage vers la droite
        player.x=player.x+5;

    }

    if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)==true){     // Déplacement du personnage vers la gauche
        player.x=player.x-5;
    }

    if(game.input.keyboard.isDown(Phaser.Keyboard.UP)==true){       // Déplacement du personnage vers le haut
        player.y=player.y-2;
    }

    if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)==true){     // Déplacement du personnage vers le bas
        player.y=player.y+2;
    }

    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)==true){ // Recommencer une partie

    game.state.restart();

 }
   
    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer) // Configuration
    {                                                                            // du saut
        player.body.velocity.y = -500;                                           // Partie
        jumpTimer = game.time.now + 750;                                         // 2
    }

}

function render () {

     game.debug.text(game.time.suggestedFps, 750, 32); // Voir ses fps en haut a droite
     
    // game.debug.text(game.time.physicsElapsed, 32, 32);
    // game.debug.body(player);
    // game.debug.bodyInfo(player, 16, 24);

}

function points(player, coin){
    score += 1;                                     // Configuration
    scoreText.setText("Pièces : " + score);     // score

}
