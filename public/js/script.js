const { json } = require("express");

const musicContainer = document.getElementById('current-song');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const currentDurr = document.getElementById('current-duration');
const totalDurr = document.getElementById('total-duration');

let isPlaying = false;
let index_val = 0;

songQueue = [];


async function fetchQueue() {
    const response = await fetch("/getsongqueue");
    const data = await response.json();
    return data;
}

fetchQueue().then((data) => {    
    songQueue = data;
    loadSong();
    
})


function loadSong() {
    
    if (songQueue == null) {
        playBtn.disabled = true;
        prevBtn.disabled = true;
        nextBtn.disabled = true;
    }

    else {
        playBtn.disabled = false;
        prevBtn.disabled = false;
        nextBtn.disabled = false;
        song = songQueue[index_val];
        audio.src = `${song["songLoco"]}`;
        cover.src = `${song["imageLoco"]}`;

        audio.addEventListener('loadedmetadata', () => {
            const duration = audio.duration;
            const minute = Math.floor(duration / 60);
            const seconds = Math.round(duration % 60);
            if (seconds < 10) {
                totalDurr.innerText = minute.toString() + ":" + "0" + seconds.toString();
            }

            else {
                totalDurr.innerText = minute.toString() + ":" + seconds.toString();
            }
        });
    }
}



function playSong() {

    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    isPlaying = true;
    

    audio.play();
}

function pauseSong() {
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    isPlaying = false;
    audio.pause();
}

function prevSong() {
    index_val -= 1;

    if (index_val < 0) {
        index_val = 0;
    }
    loadSong();
    playSong();
}

prevBtn.addEventListener('click', prevSong);

function nextSong() {;

    index_val += 1;

    if (index_val == songQueue.length) {
        index_val = songQueue.length - 1;
    }

    async function nextSong() {
        await fetch('/incrindex', {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },

            body: JSON.stringify({ index: index_val})
        }) 
    }

    nextSong();

    loadSong();
    playSong();
    
}

nextBtn.addEventListener('click', nextSong);

function updateProgress(e) {
    let {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    currentTime = Math.round(currentTime)
    const minute = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    if (seconds < 10) {
        currentDurr.innerText = minute.toString() + ":" + "0" + seconds.toString();
    }

    else {
        currentDurr.innerText = minute.toString() + ":" + seconds.toString();
    }
    
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong()
    }

    else {
        playSong()
    }
})

audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', () => {
    nextSong();
  });
  
  





