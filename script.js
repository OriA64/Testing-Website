function response(answer) {
    const textElement = document.getElementById('responseText');
    if (answer) {
        textElement.innerHTML = "Yay! I'm so happy! 😊";
    } else {
        textElement.innerHTML = "That's okay, I'm glad you let me know. 😌";
    }
    event.preventDefault();
    return false;
}

let moveInterval;

function startMoving(direction) {
    stopMoving(); // Stop any existing movement when a new button is pressed
    move(direction);
    moveInterval = setInterval(function() { move(direction); }, 50); // Adjust time as needed for smoother animation
}

function stopMoving() {
    clearInterval(moveInterval);
}

function move(direction) {
    const content = document.querySelector('.content');
    let x = parseInt(content.dataset.x || 0, 10);
    let y = parseInt(content.dataset.y || 0, 10);

    switch (direction) {
        case 'left':
            x += 30; break;
        case 'right':
            x -= 30; break;
        case 'up':
            y += 30; break;
        case 'down':
            y -= 30; break;
    }

    content.style.transform = `translate(${x}px, ${y}px)`;
    content.dataset.x = x;
    content.dataset.y = y;
}

// Setup the event listeners for all buttons
document.querySelectorAll('.navigation button').forEach(button => {
    button.addEventListener('mousedown', function() {
        const direction = this.getAttribute('data-direction');
        startMoving(direction);
    });

    button.addEventListener('mouseup', stopMoving);
    button.addEventListener('mouseleave', stopMoving); // Stop moving if the mouse leaves the button
});

// Stop moving when the window loses focus to prevent stuck movement
window.addEventListener('blur', stopMoving);
