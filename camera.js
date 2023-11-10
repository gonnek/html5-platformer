// Define a camera object with a position and the desired smooth factor
const camera = {
    x: 0,
    y: 0,
    smoothFactor: 0.1 // Determines the smoothness of the camera movement
};

let xOffset = 0;
let yOffset = -50; 


// Update the camera position using a lerp algorithm
function updateCamera() {
    // Calculate the desired camera position based on the player's position
    // Assuming the camera should be centered on the player on the x-axis and fixed on the y-axis
    const desiredX = ( player.x + player.width / 2 - canvas.width / 2  / scalingFactor ) + xOffset;
    const desiredY = ( player.y + player.width / 2 - canvas.height / 2  / scalingFactor ) + yOffset;    ; // For a side-scroller, the camera's y position is usually fixed
    // Lerp the camera position towards the desired position
    camera.x += (desiredX - camera.x) * camera.smoothFactor;
    camera.y += (desiredY - camera.y) * camera.smoothFactor;
}