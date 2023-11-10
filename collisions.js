function handleCollisions() {
    platforms.forEach(box => {
        if (player.x < box.x + box.width && // Wenn der Spieler auf der x Achse von links auf höhe der Box ist
            player.x + player.width > box.x && // Wenn der Spieler auf der x Achse von rechts auf höhe der Box ist
            player.y + player.height > box.y &&
            player.y < box.y && player.velocity >= 0) {
            {
                console.log(player.isFalling);
                if(!player.hasLanded){
                sounds.landing.play();
                }
                player.hasLanded = true;
                // Der Spieler ist nicht mehr am Springen.
                player.isJumping = false;
                // Wenn der Spieler auf einer Kiste gelandet ist, wird seine Y-Position angepasst,
                // so dass er auf der Kiste steht.
                player.y = box.y - player.height;
                // Die Y-Geschwindigkeit wird zurückgesetzt, da der Spieler nicht mehr fällt.
                player.velocity = 0;
                // Die Variable wird auf 'true' gesetzt, um anzuzeigen, dass der Spieler gelandet ist.
                player.isGrounded = true;
            }
        }
        if (box.jumpThrough === false) {
            // Wenn der Spieler von unten gegen die Box springt, wird seine Y-Geschwindigkeit auf 5 gesetzt.
            if (player.y + player.height > box.y + box.height && 
                player.y + player.height < box.y + box.height + player.height &&
                player.x < box.x + box.width &&
                player.x + player.width > box.x &&
                player.isFalling == false
            ) {
                if(player.y + player.height > box.y + box.height){
                    player.y = box.y + box.height;
                }
                player.velocity = 5;
                sounds.hitCeiling.play();
                return;
            }
            // wenn die Spieler*in von links gegen die Box springt wird die die X-Position auf die Box minus der Spielerbreite gesetzt
            if( player.y + player.height > box.y &&
                player.y < box.y + box.height &&
                player.x  + player.width < box.x + box.width &&
                player.x + player.width > box.x)
                {
                player.x = box.x - player.width;
                player.facesWall = true;
                return;
                }
            // wenn die Spieler*in von rechts gegen die Box springt wird die die X-Position auf die Box plus die Breite der Box gesetzt
            if( player.y + player.height > box.y &&
                player.y < box.y + box.height &&
                player.x < box.x + box.width  &&
                player.x  > box.x + box.width - player.width)
                {
                player.x = box.x + box.width;
                player.facesWall = true;
                return;
                }
        }
    });

    fruits.forEach(fruit => {
            if(player.x < fruit.x + fruit.width &&
                player.x + player.width > fruit.x &&
                player.y + player.height > fruit.y &&
                player.y < fruit.y + fruit.height){
                    fruit.isCollected = true;
                    sounds.pickup.play();
                    fruits = fruits.filter(fruit => fruit.isCollected == false)
                }
            
    });

}

