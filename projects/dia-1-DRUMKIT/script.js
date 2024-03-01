'use strict';

const sounds = {
    'A': 'boom.wav',
    'S': 'clap.wav',
    'D': 'hihat.wav',
    'F': 'kick.wav',
    'G': 'openhat.wav',
    'H': 'ride.wav',
    'J': 'snare.wav',
    'K': 'tink.wav',
    'L': 'tom.wav',
}

const createDiv = (text) => {
    const div = document.createElement('div');
    div.classList.add('key');
    div.textContent = text;
    div.id = text;
    document.getElementById('container').appendChild(div);
}

const display = (sounds) => {
    Object.keys(sounds).forEach(createDiv);
}

const playSound = (letter) => {
    const audio = new Audio(`./sounds/${sounds[letter]}`)
    audio.play();
}

const addEffect = (letter) => {
    document.getElementById(letter).classList.add('active');
}

const removeEffect = (letter) => {
    const div = document.getElementById(letter);
    const removeActive = () => div.classList.remove('active');
    div.addEventListener('transitionend', removeActive);
}

const activateDiv = (event) => {
    let letter = '';
    if (event.type == 'click') {
        letter = event.target.id;
    } else {
        letter = event.key.toUpperCase();
    }

    // ou de maneira simplificada:
    //const letter = event.type == 'click' ? event.target.id : event.key.toUpperCase();

    const allowedLetter = sounds.hasOwnProperty(letter);
    if (allowedLetter) {
        addEffect(letter);
        playSound(letter);
        removeEffect(letter);
    }
}

display(sounds);

document.getElementById('container').addEventListener('click', activateDiv);

window.addEventListener('keydown', activateDiv);