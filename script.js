const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

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
loadSong(songs[songIndex]);

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);