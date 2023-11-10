const ctx = canvas.getContext('2d');
// Zuweisung des Canvas-HTML-Elements an die Variable 'canvas'
let start, previousTimeStamp;
//keep track of time
const zero = performance.now();
// Festlegen der Canvas-Breite auf die Fensterinnenbreite des Browsers
canvas.width = window.innerWidth;
// Festlegen der Canvas-Höhe auf die Fensterinnenhöhe des Browsers
canvas.height = window.innerHeight;
let boxes;
let playerFrameTime = 0;
let lastTime;
let playerSpriteX = 0;
// Erstellen eines 2D-Zeichenkontexts aus dem Canvas, um darauf zu zeichnen
frameTime = 0; 
scalingFactor = 3;
// Konstante für die Schwerkraft, beeinflusst die Fallgeschwindigkeit des Spielers
const GRAVITY = 0.6;

let facingBefore = "right";
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.scale(scalingFactor,scalingFactor);
 });
let platforms;



ctx.scale(scalingFactor,scalingFactor);

// Array von Hindernissen (Boxen), die im Spiel platziert werden


// Array von Sammelobjekten (Früchte) im Spiel
let fruits = [
    // Position und Größe jeder Frucht, inklusive Sprite-Koordinaten
    {id: 1, isCollected: false, x:10 * 32, y: 13 * 32, width: 32, height: 32, spriteX: 0, currentFrame: 0, spriteY: 0, sprite: spriteSheetApple },
    {id: 2, isCollected: false, x:14 * 32, y: 12 * 32, width: 32, height: 32, spriteX: 0, currentFrame: 0, spriteY: 0, sprite: spriteSheetOrange },
    // Weitere Früchte können hinzugefügt werden
];

// Funktion zum Zeichnen der Früchte auf dem Canvas
function drawFruits() {
    fruits.forEach(fruit => {
        // Entscheidet, welches Fruchtbild verwendet werden soll
        let fruitImage = fruit.sprite;
        // Zeichnet das Fruchtbild auf dem Canvas
        ctx.drawImage(
            fruitImage,
            fruit.currentFrame * fruit.width,
            fruit.spriteY,
            fruit.width,
            fruit.height,
            fruit.x,
            fruit.y,
            fruit.width,
            fruit.height
        );
    });
}

// Funktion zum Zeichnen der Boxen auf dem Canvas
function drawPlatforms() {
    platforms.forEach(box => {
        // Zeichnet das Box-Bild auf dem Canvas
        ctx.fillStyle = box.fillStyle;
        ctx.fillRect(box.x, box.y, box.width, box.height);
    });
}

// Hauptfunktion des Spiel-Loops, wird kontinuierlich aufgerufen
function gameLoop(timestamp) {
    
    if (lastTime === undefined) {
        lastTime = timestamp;
    }
    if (!frameTime) {
        frameTime = 0;
    }
    if (!playerFrameTime) {
        playerFrameTime = 0;
    }
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    frameTime += deltaTime;
    playerFrameTime += deltaTime;
    animatePlayer(playerFrameTime);
    // Convert deltaTime from milliseconds to seconds
    // Löscht den gesamten Canvas, um das nächste Bild zu zeichnen
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    if (frameTime > 40) {
        deltaTimeUpdate();
        frameTime = 0;
    }
    
    updateCamera();
    ctx.save();
    ctx.translate(-camera.x, -camera.y);
    drawPlatforms();  // Zeichnet die Boxen
    drawFruits(); // Zeichnet die Früchte
    // Zeichnet den Boden
    // Speichert den aktuellen Zeichenkontext
    
    // Wenn der Spieler nach links schaut, spiegelt das Bild horizontal
    if (player.facing === "left") {
        ctx.scale(-1, 1);
    }
    // Zeichnet das Spieler-Sprite auf dem Canvas
    if(player.isFalling || player.isJumping){
        playerSpriteX = 0;
    } else {
        playerSpriteX = player.spriteX + (player.currentFrame * player.spriteWidth)
    }



    ctx.drawImage(
        player.sprite,
        playerSpriteX,
        player.spriteY,
        player.spriteWidth,
        player.spriteHeight,
        player.facing === "left" ? -player.x - player.width : player.x,
        player.y,
        player.width,
        player.height
    );

    // Stellt den vorher gespeicherten Zeichenkontext wieder her
    ctx.restore();
    // Aktualisiert den Spielzustand

    updateGame(deltaTime);
  

    // Ruft die gameLoop-Funktion wieder auf, sobald der Browser bereit ist, das nächste Bild zu zeichnen
    requestAnimationFrame(gameLoop);
}

function deltaTimeUpdate() {

    animateFruits();
};

// Aktualisiert den Spielzustand in jedem Frame
function updateGame(deltaTime) {
    updatePlayerState();
    handleCollisions();
    if(player.isWalking){
    playWalkingSound(deltaTime);
    }
    if(player.isRunning){
    playWalkingSound(deltaTime * 2);
    }
}

function checkResourcesHaveLoaded() {
    setTimeout(() => {
        if (areResourcesLoaded()) {
            // Startet den Spiel-Loop
            platforms = [
                { 
                    jumpThrough: true,
                    fillStyle: pattern2,  // Bild für die Box
                    placement: {
                        x: 32,  // Horizontale Position der Box
                        y: 10,  // Vertikale Position der Box
                    },
                    size: {
                        width: 5,  // Breite der Box
                        height: 1,  // Höhe der Box
                    }
                },
                { 
                    jumpThrough: true,
                    fillStyle: pattern2,  // Bild für die Box
                    placement: {
                        x: 32,  // Horizontale Position der Box
                        y: 30,  // Vertikale Position der Box
                    },
                    size: {
                        width: 9,  // Breite der Box
                        height: 1,  // Höhe der Box
                    }
                },
                { 
                    jumpThrough: true,
                    fillStyle: pattern2,  // Bild für die Box
                    placement: {
                        x: 15,  // Horizontale Position der Box
                        y: 10,  // Vertikale Position der Box
                    },
                    size: {
                        width: 3,  // Breite der Box
                        height: 1,  // Höhe der Box
                    }
                },
                { 
                    jumpThrough: true,
                    fillStyle: pattern2,  // Bild für die Box
                    placement: {
                        x: 18,  // Horizontale Position der Box
                        y: 6,  // Vertikale Position der Box
                    },
                    size: {
                        width: 3,  // Breite der Box
                        height: 1,  // Höhe der Box
                    }
                },
            
                { 
                    jumpThrough: false,
                    fillStyle: pattern1,  // Bild für die Box
                    placement: {
                        x: 21,  // Horizontale Position der Box
                        y: 2,  // Vertikale Position der Box
                    },
                    size: {
                        width: 3,  // Breite der Box
                        height: 9,  // Höhe der Box
                    }
                },
                { 
                    jumpThrough: false,
                    fillStyle: pattern1,  // Bild für die Box
                    placement: {
                        x: 0,  // Horizontale Position der Box
                        y: 15,  // Vertikale Position der Box
                    },
                    size: {
                        width: 62,  // Breite der Box
                        height: 40,  // Höhe der Box
                    }
                },
                { 
                    jumpThrough: false,
                    fillStyle: pattern1,  // Bild für die Box
                    placement: {
                        x: 72,  // Horizontale Position der Box
                        y: 15,  // Vertikale Position der Box
                    },
                    size: {
                        width: 62,  // Breite der Box
                        height: 40,  // Höhe der Box
                    }
                },
                ];


            for (let i = 0; i < platforms.length; i++) {
                platforms[i].width = platforms[i].size.width * 32;
                platforms[i].height = platforms[i].size.height * 32;
                platforms[i].x = platforms[i].placement.x * 32;
                platforms[i].y = platforms[i].placement.y * 32;

            }
                // Weitere Boxen können hinzugefügt werden
            gameLoop();
        }  else {
            checkResourcesHaveLoaded();
        }
    }, 200);

};

checkResourcesHaveLoaded();


// Startet die Spielschleife.

