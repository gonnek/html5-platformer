const canvas = document.getElementById('gameCanvas');
let pattern1;
let pattern2;
// Lädt das Bild für das Spieler-Sprite, Pfad muss ggf. angepasst werden

let spriteSheet = new Image();
spriteSheet.src = './sprites/characters/mask-dude/idle.png';

// Lädt das Bild für das Lauf-Sprite des Spielers
let runningSpriteSheet = new Image();
runningSpriteSheet.src = './sprites/characters/mask-dude/run.png';

// Lädt das Bild für das Springsprite des Spielers
let jumpSprite = new Image();
jumpSprite.src = './sprites/characters/mask-dude/jump.png';

// Lädt das Bild für das Springsprite des Spielers
let fallSprite = new Image();
fallSprite.src = './sprites/characters/mask-dude/fall.png';

// Lädt das Bild für die Box-Sprites
let spriteSheetBoxes1 = new Image();
spriteSheetBoxes1.src = './sprites/background/blue.png';
spriteSheetBoxes1.onload = function() {
    pattern1 = canvas.getContext('2d').createPattern(spriteSheetBoxes1, 'repeat');
}

let spriteSheetBoxes2 = new Image();
spriteSheetBoxes2.src = './sprites/background/yellow.png';
spriteSheetBoxes2.onload = function() {
    pattern2 = canvas.getContext('2d').createPattern(spriteSheetBoxes2, 'repeat');
}

// Lädt das Bild für die Orangen-Sprites
let spriteSheetOrange = new Image();
spriteSheetOrange.src = './sprites/items/fruits/orange.png';

// Lädt das Bild für die Apfel-Sprites
let spriteSheetApple = new Image();
spriteSheetApple.src = './sprites/items/fruits/apple.png';

function areResourcesLoaded() {
    if (spriteSheet.complete && runningSpriteSheet.complete && jumpSprite.complete && fallSprite.complete && spriteSheetBoxes1.complete && spriteSheetBoxes2.complete && spriteSheetOrange.complete && spriteSheetApple.complete) {
        return true;
    }
    else {
        return false;
    }
}
