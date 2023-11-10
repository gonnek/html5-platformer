let playerSprites = {
    idle: spriteSheet,
    running: runningSpriteSheet,
    jumping: jumpSprite,
    falling: fallSprite,
    walking: runningSpriteSheet
};


// Spielerobjekt
let player = {
    spawnpoint: {x: 64, y: 448},
    x: 50,  // Horizontale Startposition
    y: 450, // Vertikale Startposition (y-Wert vom oberen Rand des Canvas)
    width: 32,  // Breite des Spielers
    height: 32, // Höhe des Spielers
    speed: 5,   // Bewegungsgeschwindigkeit des Spielers
    stepInterval: 300,
    runStepMultiplier: 0.9,
    runSpeed: 10,
    acceleration: 0.2,
    walkSpeed: 5,
    jumpStrength:13,// Sprungstärke des Spielers
    hasLanded: true,
    jumpMultiplier: 1,
    jumpMultiplierMax: 1.1,
    isJumping: false, // Status, ob der Spieler springt oder nicht
    isWalking: false, // Status, ob der Spieler springt oder nicht 
    isRunning: false, // Status, ob der Spieler springt oder nicht
    isFalling: false, // Status, ob der Spieler springt oder nicht
    isGrounded: false, // Status, ob der Spieler springt oder nicht
    facesWall: false, // Status, ob der Spieler springt oder nicht
    velocity: 0, // Vertikale Geschwindigkeit des Spielers
    sprite: playerSprites.idle, // Bild für das Sprite
    // Koordinaten für das Sprite-Bild (für Animationen)
    spriteX: 0,
    spriteY: 0,
    spriteWidth: 32,  // Breite eines Sprite-Bildes
    spriteHeight: 32, // Höhe eines Sprite-Bildes
    currentFrame: 0,  // Aktuelles Frame der Animation
    facing: "right",  // Blickrichtung des Spielers
    running: false    // Status, ob der Spieler rennt oder nicht
};

function animatePlayer() {
    if(player.isRunning){
        if(playerFrameTime > 20) { 
            player.currentFrame = (player.currentFrame + 1) % 11;    
            playerFrameTime = 0;
        }
    } else {
        if(playerFrameTime > 40) {
            player.currentFrame = (player.currentFrame + 1) % 11;    
            playerFrameTime = 0;
        }  
    }
    
};

function animateFruits() {
    for(var i = 0; i < fruits.length; i++){
        fruits[i].currentFrame = (fruits[i].currentFrame + 1) % 11;
    }
};