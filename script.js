document.addEventListener("DOMContentLoaded", function() {
    // Example questions with custom answers
    addQuestion("Hello my love", {x: 280, y: 200}, [
        {text: "HIIIIIII", response: "HIHIHIHIHI ➡️"},
        {text: "bye.", response: "FUCK YOUU GRAHHHH"}
    ]);
    addQuestion("You know that I love you right?", {x: 2000, y: 2000}, [
        {text: "I LOVE YOU TOOO", response: "YYAYAYAYAYAYAY MWAH MWAH ➡️"},
        {text: "I dont love you 😠", response: "😞"}
    ]);
    addQuestion("I hope your day has been good <3", {x: 2000, y: 200}, [
        {text: "It has!", response: "I cant wait for you to tell me about it :3 ⬇️"},
        {text: "It hasnt ", response: "Im sorry, lets talk about it sometime <3 ⬇️ "}
    ]);
    addQuestion("Well there has been something on my mindddddd", {x: 4000, y: 2000}, [
        {text: "What is it?", response: "IDKKKKKK ➡️"},
        {text: "hmmmm?", response: " uhhhmmmmmm ➡️ "}
    ]);
    addQuestion("I just want to ask youuu", {x: 6000, y: 2000}, [
        {text: "WHATTT JUST TELL MEE", response: "HAVE PATIENCE ⬇️"},
        {text: "Im waitinggg", response: "only a little longer ⬇️ "}
    ]);
    addQuestion("Will you be my girlfriend?", {x: 6000, y: 4000}, [
        {text: "YES YES YES", response: "I LOVE YOU I LOVE YOU MWAH MWAH MWAH MWAH"},
        {text: "YES YES YES", response: "I LOVE YOU I LOVE YOU MWAH WMAH MWAH WMHA"}
    ]);
});

function addQuestion(text, position, answers) {
    let questionDiv = document.createElement('div');
    questionDiv.className = 'content';
    questionDiv.style.transform = `translate(${position.x}px, ${position.y}px)`;
    let uniqueId = Date.now(); // Use timestamp to generate unique IDs
    let buttonsHtml = answers.map(answer => {
        return `<button onclick="response(this, '${answer.response}')">${answer.text}</button>`;
    }).join('');
    questionDiv.innerHTML = `
        <h1>${text}</h1>
        <div class="button-container">
            ${buttonsHtml}
        </div>
        <p id="responseText${uniqueId}"></p>
    `;
    document.getElementById('world').appendChild(questionDiv);
}

function response(button, textResponse) {
    const textElement = button.parentNode.nextElementSibling;
    textElement.innerHTML = textResponse;
    event.preventDefault();
    return false;
}

// Movement functions remain the same as your provided code


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
    const world = document.getElementById('world');
    let x = parseInt(world.dataset.x || 0, 10);
    let y = parseInt(world.dataset.y || 0, 10);

    switch (direction) {
        case 'left': x += 30; break;
        case 'right': x -= 30; break;
        case 'up': y += 30; break;
        case 'down': y -= 30; break;
    }

    world.style.transform = `translate(${x}px, ${y}px)`;
    world.dataset.x = x;
    world.dataset.y = y;
}

document.querySelectorAll('.navigation button').forEach(button => {
    button.addEventListener('mousedown', function() {
        const direction = this.getAttribute('data-direction');
        startMoving(direction);
    });

    button.addEventListener('mouseup', stopMoving);
    button.addEventListener('mouseleave', stopMoving); // Stop moving if the mouse leaves the button
});

window.addEventListener('blur', stopMoving);
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowLeft':
            startMoving('left');
            break;
        case 'ArrowRight':
            startMoving('right');
            break;
        case 'ArrowUp':
            startMoving('up');
            break;
        case 'ArrowDown':
            startMoving('down');
            break;
    }
});

document.addEventListener('keyup', stopMoving);


document.addEventListener('keyup', function(event) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        stopMoving();
    }
});
