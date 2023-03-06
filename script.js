const toggle = document.querySelector(".expandPlayer");
const playerBottom = document.querySelector(".playerBottom");

let playlist = document.querySelector(".list");

let trackArt = document.querySelector(".playing-art");
let trackTitle = document.querySelector(".playing-title");
let trackArtist = document.querySelector(".playing-artist");

let currentTime = document.querySelector(".currentTime");
let seekSlider = document.querySelector(".seek");
let duration = document.querySelector(".duration");

const incVol = document.querySelector(".inc");
let volSlider = document.querySelector(".vol");
const decVol = document.querySelector(".dec");

const shuffle = document.querySelector(".shuffle");
const prev = document.querySelector(".back");
const play = document.querySelector(".play");
const next = document.querySelector(".next");
const repeat = document.querySelector(".repeatAll");

let currentTrack = document.createElement("audio");

let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

// Playlist Section

let list = [
  {
    img: "assets/images/art.jpg",
    title: "Darkness",
    artist: "Kakashi",
    music: "assets/audio/Darkness.mp3",
  },
  {
    img: "assets/images/art.jpg",
    title: "Evil",
    artist: "Kakashi",
    music: "assets/audio/Evil.mp3",
  },
  {
    img: "assets/images/art.jpg",
    title: "Illusion",
    artist: "Kakashi",
    music: "assets/audio/Illusion.mp3",
  },
  {
    img: "assets/images/art2.jpg",
    title: "Bang",
    artist: "Kakashi",
    music: "assets/audio/Bang.mp3",
  },
];

list.map((item) => {
  playlist.innerHTML += `
  <li class="item">
  <span class="albumArt"
    ><img
      style="font-size: 0.5rem; border-radius: 50%;object-fit:cover;"
      width="50"
      height="50"
      src="${item.img}"
      alt="poster"
      class="poster"
  /></span>
  <span class="text">${item.title}</span>
  <div class="edit">
    <img
      style="border-radius: 50%"
      width="30"
      height="30"
      src="./assets/more.svg"
      alt=""
    />
  </div>
</li>
  `;
});

// Player-Bottom-Toggle (expand)

toggle.addEventListener("click", (e) => {
  toggle.classList.toggle("expand");
  playerBottom.classList.toggle("expand");
});

// MusicPlayer (Functions)

//    // Track Loading

const loadTrack = (index) => {
  clearInterval(updateTimer);
  reset();
  currentTrack.src = list[index].music;
  currentTrack.load();
  trackArt.src = list[index].img;
  trackTitle.innerHTML = list[index].title;
  trackArtist.innerHTML = list[index].artist;

  updateTimer = setInterval(setUpdate, 1000);

  currentTrack.addEventListener("ended", nextTrack);
};
const reset = () => {
  currentTime.innerHTML = `00:00`;
  duration.innerHTML = `00:00`;
  seekSlider.value = 0;
};

//    // Shuffle

const randomTrack = () => {
  isRandom ? shuffleFalse() : shuffleTrue();
};
const shuffleTrue = () => {
  isRandom = true;
  shuffle.classList.add("active");
};
const shuffleFalse = () => {
  isRandom = false;
  shuffle.classList.remove("active");
};

//    // Repeat Track

const repeatTrack = () => {
  let currentIndex = trackIndex;
  loadTrack(currentIndex);
  playTrack();
};
const repeatTrue = () => {};
const repeatFalse = () => {};

//    // Play/Pause

const playPause = () => {
  isPlaying ? pauseTrack() : playTrack();
};
const playTrack = () => {
  currentTrack.play();
  isPlaying = true;
  trackArt.classList.add("playing");
  play.querySelector(".icon").src = `assets/pause.svg`;
};
const pauseTrack = () => {
  currentTrack.pause();
  isPlaying = false;
  trackArt.classList.remove("playing");
  play.querySelector(".icon").src = `assets/play.svg`;
};

//    // Prev/Next Track

const nextTrack = () => {
  if (trackIndex < list.length - 1 && isRandom === false) {
    trackIndex += 1;
  } else if (trackIndex < list.length - 1 && isRandom === true) {
    let randomNum = Number.parseInt(Math.random() * list.length);
    trackIndex = randomNum;
  } else {
    trackIndex = 0;
  }
  loadTrack(trackIndex);
  playTrack();
};
const prevTrack = () => {
  if (trackIndex > 0 && isRandom === false) {
    trackIndex -= 1;
  } else if (trackIndex > 0 && isRandom === true) {
    let randomNum = Number.parseInt(Math.random() * list.length);
    trackIndex = randomNum;
  } else {
    trackIndex = list.length - 1;
  }
  loadTrack(trackIndex);
  playTrack();
};

//    // Seek Slider

const seekTo = () => {
  let seekto = currentTrack.duration * (seekSlider.value / 100);
  currentTrack.currentTime = seekto;
};

//    // Volume Slider

const setVol = () => {
  currentTrack.volume = volSlider.value / 100;
};

//    // Seek Value Update

const setUpdate = () => {
  let seekPosition = 0;
  if (!isNaN(currentTrack.duration)) {
    seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
    seekSlider.value = seekPosition;

    let currentMins = Math.floor(currentTrack.currentTime / 60);
    let currentSecs = Math.floor(currentTrack.currentTime - currentMins * 60);
    let durationMins = Math.floor(currentTrack.duration / 60);
    let durationSecs = Math.floor(currentTrack.duration - durationMins * 60);

    if (currentSecs < 10) {
      currentSecs = "0" + currentSecs;
    }
    if (currentMins < 10) {
      currentMins = "0" + currentMins;
    }
    if (durationSecs < 10) {
      durationSecs = "0" + durationSecs;
    }
    if (durationMins < 10) {
      durationMins = "0" + durationMins;
    }
    currentTime.innerHTML = `${currentMins}:${currentSecs}`;
    duration.innerHTML = `${durationMins}:${durationSecs}`;
  }
};

//    // Playlist(item) --> Play On Click

loadTrack(trackIndex);
let items = document.querySelectorAll(".item");
items.forEach((item, i) => {
  item.addEventListener("click", () => {
    loadTrack(i);
    playTrack();
  });
});
