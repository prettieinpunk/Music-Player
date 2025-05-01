const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

const songs = ['hey', 'summer', 'ukulele'];
let songIndex = 2;

// Load song
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
  currentTimeDisplay.textContent = '00:00';
  durationDisplay.textContent = '00:00';
}

// Initial load
loadSong(songs[songIndex]);

// Play
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.replace('fa-play', 'fa-pause');
  audio.play();
}

// Pause
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.replace('fa-pause', 'fa-play');
  audio.pause();
}

// Toggle Play/Pause
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  isPlaying ? pauseSong() : playSong();
});

// Previous song
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// Next song
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Set progress bar on click
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

progressContainer.addEventListener('click', setProgress);

// Auto-play next song when current ends
audio.addEventListener('ended', nextSong);

// Format time (mm:ss)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = Math.floor(seconds % 60);
  return `${minutes < 10 ? '0' : ''}${minutes}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`;
}

// Unified timeupdate event: progress + time display
audio.addEventListener('timeupdate', () => {
  const { duration, currentTime } = audio;

  //progress bar
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;

  //current time
  currentTimeDisplay.textContent = formatTime(currentTime);

  //tracking duration 
  if (!isNaN(duration)) {
    durationDisplay.textContent = formatTime(duration);
  }
});

