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

const trackDetails = document.querySelector(".fullDetails");
const detailToggle = trackDetails.querySelector(".viewDetails");
const albumArt = trackDetails.querySelector(".albumArt");
const trackInfo = trackDetails.querySelector(".trackInfo");
// Playlist Section

let list = [
  {
    img: "assets/images/art.jpg",
    title: "Darkness",
    artist: "Kakashi",
    genre: "RnB",
    album: "Darkness",
    music: "assets/audio/Darkness.mp3",
    Year: "2019",
  },
  {
    img: "assets/images/art2.jpg",
    title: "Evil",
    artist: "Kakashi",
    genre: "Alternative Rock",
    album: "Darkness",
    music: "assets/audio/Evil.mp3",
    Year: "2019",
  },
  {
    img: "assets/images/art.jpg",
    title: "Illusion",
    artist: "Kakashi",
    genre: "House",
    album: "Darkness",
    music: "assets/audio/Illusion.mp3",
    Year: "2020",
  },
  {
    img: "assets/images/art2.jpg",
    title: "Bang",
    artist: "Kakashi",
    genre: "Dance",
    album: "Darkness",
    music: "assets/audio/Bang.mp3",
    Year: "2022",
  },
  {
    img: "assets/images/art.jpg",
    title: "Attack On Titans - Eye Water",
    artist: "N/A",
    genre: "N/A",
    album: "N/A",
    music: "assets/audio/Attack On Titan - Eye Water .m4a",
    Year: "2022",
  },
  {
    img: "assets/images/art2.jpg",
    title: "Rengoku Theme - Demon Slayer",
    artist: "Samuel Kin",
    genre: "Orchestral/Instrumental",
    album: "N/A",
    music: "assets/audio/Demon Slayer - Rengoku Theme.m4a",
    Year: "2022",
  },
  {
    img: "assets/images/art.jpg",
    title: "Dragon Ball Super - Ultimate Battle Theme",
    artist: "N/A",
    genre: "Orchestral/Instrumental",
    album: "N/A",
    music:
      "assets/audio/Dragon Ball Super - Ultimate Battle-Ultra instinct _ Instrumental Epic Rock.m4a",
    Year: "2019",
  },
  {
    img: "assets/images/art2.jpg",
    title: "Dragon Ball Super - Vegeta Royal Blue Theme",
    artist: "N/A",
    genre: "Orchestral/Instrumental",
    album: "N/A",
    music: "assets/audio/Vegeta Royal Blue Theme Song.m4a",
    Year: "2019",
  },
];

list.sort((a, b) => {
  if (a.title < b.title) {
    return -1;
  } else if (a.title > b.title) {
    return 1;
  } else {
    return 0;
  }
});

list.map((item) => {
  playlist.innerHTML += `
  <li class="item">
    <div class="itemDetail">
      <span class="albumArt"
        ><img
          style="font-size: 0.5rem; border-radius: 50%;object-fit:cover;"
          width="50"
          height="50"
          loading="lazy"
          src="${item.img}"
          alt="poster"
          class="poster"
      /></span>
      <span class="text">${item.title}</span>
    </div>
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

const edit = document.querySelectorAll(".edit");

edit.forEach((item, i) => {
  item.addEventListener("click", (e) => {
    trackDetails.classList.add("view");
    albumArt.src = list[i].img;
    trackInfo.innerHTML = `
    <p class="trackTitle">Title : ${list[i].title}</p>
    <p class="trackArtist">Artist : ${list[i].artist}</p>
    <p class="trackAlbum">Album : ${list[i].album}</p>
    <p class="trackgenre">Genre : ${list[i].genre}</p>
    <p class="releaseDate">Year : ${list[i].Year}</p>
    `;
  });
});

toggle.addEventListener("click", (e) => {
  toggle.classList.toggle("expand");
  playerBottom.classList.toggle("expand");
});
detailToggle.addEventListener("click", (e) => {
  trackDetails.classList.remove("view");
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
let items = document.querySelectorAll(".itemDetail");
items.forEach((item, i) => {
  item.addEventListener("click", () => {
    loadTrack(i);
    playTrack();
  });
});
