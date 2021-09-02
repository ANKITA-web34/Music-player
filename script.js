const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressConatiner = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl= document.getElementById('duration');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
///////////////////////////////////////////////////

const songs = [
    {   name: 'jacinto-4',
        displayName: 'kun faya kun',
        artist: 'Mohit chouhan',
    },
    {   name: 'jacinto-1',
        displayName: 'Electic Chill Mechine',
        artist: 'Jacinto design',
    },
    {   name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto design',
    },
    {   name: 'jacinto-3',
        displayName: 'Good Night, Disco Queen',
        artist: 'Jacinto design',
    },
    {   name: 'jacinto-5',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto design',
    },
];

//check if playing
///////////////////////////////
let isPlaying = false;

//play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause')
    music.play();
}

//pasue
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play')
    music.pause();
}

playBtn.addEventListener('click', () => 
    (isPlaying ? pauseSong() : playSong())
);

//Update dom
///////////////////////////
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//current song
let songIndex = 0;

function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
   playSong();
}

//nextSong
function nextSong() {
    songIndex++;
    if(songIndex > songs.length -1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
   playSong();
}

//on load
/////////////////////////////////
loadSong(songs[songIndex]);

//ProgressBar
///////////////////////////////////
function upadteProgressBar(e) {
    if(isPlaying) {
        const { duration, currentTime} = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        //display the duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
       
        //avoid NaN in duration value!
        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        //dispaly currentTIme
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

function setProgressbar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    
    music.currentTime = (clickX / width)* duration;    
}

////////////////////////////////
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', upadteProgressBar);
progressConatiner.addEventListener('click', setProgressbar)