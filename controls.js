// Event-Listener für Tastaturtasten, die gedrückt werden.
let pressedKeys = {
    'ArrowLeft': false,
    'ArrowRight': false,
    ' ': false,
    'Shift': false
};
let musicStarted = false;
let lastArrowKeyPressed ="";

// Check pressed Keys. If key is pressed, set value to true, else false
onkeydown = onkeyup = function(e){
    if(!musicStarted){
        startMusic();
        musicStarted = true;
    }
    e.preventDefault(); // Prevent default behavior of keys
    // In the pressedKeys object, set the value of the pressed key to true or false
    pressedKeys[e.key] = e.type == 'keydown';
    if(e.key == "ArrowLeft" || e.key == "ArrowRight"){
        lastArrowKeyPressed = e.key;
    }

};

function handleControls() {
        // Player run with Shift

    // Player movement left
    if (pressedKeys['ArrowLeft'] && !pressedKeys['ArrowRight']) {
        moveLeft();
        if (pressedKeys['Shift']) {
            run();
        } else {
            walk();
        }
        // Player movement right
    }else if (pressedKeys['ArrowRight'] && !pressedKeys['ArrowLeft']) {
        moveRight();
        if (pressedKeys['Shift']) {
            run();
        } else {
            walk();
        }
    } else if(pressedKeys['ArrowRight'] && pressedKeys['ArrowLeft']) {
        if(lastArrowKeyPressed == "ArrowLeft"){
            moveLeft();
        } else {
            moveRight();
        }
        if (pressedKeys['Shift']) {
            run();
        } else {
            walk();
        }

    } else {
        idle();
        player.isWalking = false;
    }
    // Player jump with spacebar
    if (pressedKeys[' '] && !player.isJumping && !hasJumped) {
        jump();
        // set flag to jump only once
        hasJumped = true;
    }
    if (pressedKeys[' '] == false) {
        // reset flag
        hasJumped = false;
    }
};