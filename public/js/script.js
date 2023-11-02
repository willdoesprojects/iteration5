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

function retrieveServer() {
    fetch("/getSong")
    .then((response) => response.json())
    .then((data) => {
    const { song, index } = data;
    index_val = index;
    loadSong(song);
    
  });
}

retrieveServer();

function loadSong(song) {
    audio.src = `${song["songLoco"]}`;
    cover.src = `${song["imageLoco"]}`;
    

}

function playSong() {
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    isPlaying = true;
    const duration = audio.duration;
    const minute = Math.floor(duration / 60);
    const seconds = Math.round(duration % 60);
    if (seconds < 10) {
        totalDurr.innerText = minute.toString() + ":" + "0" + seconds.toString();
    }

    else {
        totalDurr.innerText = minute.toString() + ":" + seconds.toString();
    }
    audio.play();
}

function pauseSong() {
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    isPlaying = false;
    audio.pause();
}

function prevSong() {
    fetch("/songDone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index: (index_val - 1) }),
    });

    retrieveServer();
    location.reload();
    playSong();
}

prevBtn.addEventListener('click', prevSong);

function nextSong() {
    fetch("/songDone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index: (index_val + 1) }),
    });

    retrieveServer();
    location.reload();
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
    fetch("/songDone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index: (index_val + 1) }),
    });
    retrieveServer();
    location.reload();
    playSong();
  });
  
  





