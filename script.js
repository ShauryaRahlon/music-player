const artistname = document.querySelector(".artist-name");
const songname = document.querySelector(".song-name");
const fillBar = document.querySelector(".fill-bar");
const time = document.querySelector(".time");
const cover = document.querySelector(".cover");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const prog = document.querySelector(".progress-bar");
const rotDisk = document.querySelector(".disk");
const songs = [
    {
        name: "Guli Mata",
        artist: "Shreya Ghoshal",
        src: "assets/GuliMata.mp3",
        cover: "assets/gulimata.jpg"
    },
    {
        name: "Maan Meri Jaan",
        artist: "King",
        src: "assets/MaanMeriJaan.mp3",
        cover: "assets/maanmeri.jpg"
    },
    {
        name: "O maahi",
        artist: "Arjit Singh",
        src: "assets/OMahi.mp3",
        cover: "assets/omahi.jpg"
    },
    {
        name: "Aaogey Tum Kabhi",
        artist: "The local Train",
        src: "assets/AaogeTumKabhi.mp3",
        cover: "assets/aaoge.jpg"
    }
];
let song = new Audio();
let currentSong = 0;
let playing = false;
document.addEventListener("DOMContentLoaded", () => {
    loadSong(currentSong);
    song.addEventListener("timeupdate", updateProgress);
    song.addEventListener("ended", nextSong);
    prevBtn.addEventListener("click", prevSong);

    nextBtn.addEventListener("click", nextSong);
    playBtn.addEventListener("click", togglePlay);
    prog.addEventListener("click", seek);
});

function loadSong(index) {
    const { name, artist, src, cover: thumbnail } = songs[index];
    artistname.innerText = artist;
    songname.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumbnail})`;
}
function updateProgress() {
    if (song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;
        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime}-${duration}`;
    }
}
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
function togglePlay() {
    if (playing) {
        song.pause();
    }
    else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing)
}
function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    playMusic();
}
function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    playMusic();
}
function playMusic() {
    loadSong(currentSong);
    rotateDisk(songs[index]);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}
function seek(e) {
    const pos = (e.offSetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}