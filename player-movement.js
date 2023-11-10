// Aktualisiert den Zustand des Spielers, abhängig davon, welche Tasten gedrückt werden.
hasJumped = false;
function moveRight() {
    player.x += player.speed;
    player.facing = "right";
    if(!player.isJumping && !player.isFalling){
        player.sprite = playerSprites.running;
    }
}

function moveLeft() {
    player.x -= player.speed;
    player.facing = "left";
    if(!player.isJumping && !player.isFalling){
        player.sprite = playerSprites.running;
    }
}

function run() {        
    if(!player.isJumping && !player.isFalling){
    player.isWalking = false;
    player.isRunning = true;
    spriteSheet = playerSprites.running;
    if (player.speed < player.runSpeed - 0.1) {
        
        player.speed += player.acceleration;
        }

    }
}

function walk(){
    if(!player.isJumping && !player.isFalling){
    player.isRunning = false;
    player.isWalking = true;
    }
    if (player.speed > player.walkSpeed + 0.1) {
        player.speed -= player.acceleration;
    }
    
}

function jump() {
    if(!player.isJumping && !player.isFalling ){
    player.hasLanded = false;
    player.isWalking = false;
    player.isRunning = false;
    player.isJumping = true;
    player.velocity = -player.jumpStrength * player.jumpMultiplier;
    player.sprite = spriteSheet;
    sounds.jump.play();
    }
}

function idle() {
    player.sprite = playerSprites.idle;
    player.speed = player.walkSpeed;
    player.isWalking = false;
    player.isRunning = false;
}

// is called every animation frame.
function updatePlayerState() {

    xBefore= player.x; // Speichert die X-Position des Spielers vor der Bewegung
    facingBefore = player.facing;// Speichert die Blickrichtung des Spielers vor der Bewegung
    yBefore = player.y; // Speichert die Y-Position des Spielers vor der Bewegung       
    player.velocity += GRAVITY; // Addiert die Fallgeschwindigkeit auf die Y-Geschwindigkeit des Spielers
    handleControls();   // Führt die Steuerung des Spielers aus
    xAfter = player.x; // Speichert die X-Position des Spielers nach der Bewegung
    player.y += player.velocity; // Addiert die Y-Geschwindigkeit auf die Y-Position des Spielers
    yAfter = player.y; // Speichert die Y-Position des Spielers nach der Bewegung
    deltaX = xAfter - xBefore; // Berechnet die Distanz, die der Spieler auf der X Achse zurückgelegt hat
    deltaY = yAfter - yBefore;  // Berechnet die Distanz, die der Spieler auf der Y Achse zurückgelegt hat
    if(player.facing != facingBefore){ // Wenn die Blickrichtung sich geändert hat, wird die Spielergeschwindigkeit auf Gehgeschwindigkeit gesetzt
        player.speed = player.walkSpeed;
    }
    player.jumpMultiplier = Math.abs(deltaX) / 10 * player.jumpMultiplierMax; // Berechnet den Sprungmultiplikator anhand der Distanz, die der Spieler auf der X-Achse zurückgelegt hat
    if(player.jumpMultiplier < 1){ 
        player.jumpMultiplier = 1;
    }
    
    if(deltaY < 0){ // Der Spieler springt
        player.isFalling = false;
        player.isJumping = true;
        player.sprite = jumpSprite; // Setzt das Spritesheet auf das Spritesheet für den Sprung
    } else if(deltaY > 1){ // Der Spieler fällt
        player.hasLanded = false;
        player.isFalling = true;
        player.isWalking = false;
        player.isRunning = false;
        player.isJumping = false;
        player.sprite = fallSprite; // Setzt das Spritesheet auf das Spritesheet für den Fall
    }else {
        if(!player.isJumping){ // Der Spieler steht auf dem Boden
        player.isFalling = false;
        player.isJumping = false;
            if(deltaX == 0){
                player.sprite = playerSprites.idle; // Setzt das Spritesheet auf das Spritesheet für den Idle Zustand
            } else {
                player.sprite = playerSprites.running; // Setzt das Spritesheet auf das Spritesheet für den Laufzustand
            }
        }
    }
    player.facesWall = false; // Setzt die Variable auf false, da der Kollisions-Algo im nächsten Update checkt, ob der Spieler gegen eine Wand läuft
    if (player.y > 1000) { // Wenn der Spieler unter den unteren Rand des Canvas fällt, wird er an den Spawnpoint zurückgesetzt
        respawn();
    }
};

respawn = function(){ // Setzt den Spieler an den Spawnpoint zurück
    player.x = player.spawnpoint.x;
    player.y = player.spawnpoint.y;
    player.velocity = 0; // Setzt die Y-Geschwindigkeit auf 0
    player.isJumping = false;
    player.isfalling = false;
}