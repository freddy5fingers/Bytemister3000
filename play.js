// Import the necessary functions from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZwl6qTmuo_-SWJCMDNnLJgm3vIbOtoqI",
  authDomain: "bytemister3000.firebaseapp.com",
  projectId: "bytemister3000",
  storageBucket: "bytemister3000.appspot.com",
  messagingSenderId: "723831448134",
  appId: "1:723831448134:web:849569587a74cd49be6047",
  measurementId: "G-GFLFFNV56K"
};

// Initialize Firebase and services
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

console.log('Fetch!');

//---------------------------------------- Fetch from Firestore --------------------------//

// Function to limit string output to desired characters
function limit(string = '', limit = 0) {
  return string.substring(0, limit);
}

let songs = [];

// Reference to Songs collection
const colRef = collection(db, 'songs');

// Fetch data from Firestore
getDocs(colRef)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderList(doc);
      songs.push({ ...doc.data(), id: doc.id });
    });

    // Update UI based on fetched songs
    updateUI();
  })
  .catch(err => {
    console.log(err)
  });

// Function to render song list
function renderList(docc) {
  let li = document.createElement('li');
  li.setAttribute('data-id', docc.id);

  const img = document.createElement('img');
  img.setAttribute('src', docc.data().ImageUrl);
  img.setAttribute("alt", 'cover art');

  const titleDiv = document.createElement('div');
  titleDiv.setAttribute('id', 'mysongTitle');
  titleDiv.textContent = docc.data().songName;

  const artistDiv = document.createElement('div');
  artistDiv.setAttribute('id', 'myartistTitle');
  if (docc.data().featured == "") {
    artistDiv.textContent = docc.data().artist;
  } else {
    artistDiv.textContent = docc.data().artist + ' ft. ' + limit(docc.data().featured, 40) + "...";
  }

  const masterPlay = document.createElement('i');
  masterPlay.setAttribute('id', 'playButton');
  masterPlay.setAttribute('class', 'bi playlistPlay bi-play-circle');
  masterPlay.setAttribute('style', 'right:50px');

  li.appendChild(img);
  li.appendChild(titleDiv);
  titleDiv.appendChild(artistDiv);
  li.appendChild(masterPlay);
  songList.appendChild(li);

  // Event listener for playing songs
  masterPlay.addEventListener("click", async (e) => {
    playSong(e);
  });
}

// Function to update UI based on fetched songs
function updateUI() {
  const contButton = document.getElementById("contButton");
  if (songs.length == 0) {
    document.getElementById("songTitle").innerHTML = "Upload your own music";
    document.getElementById("playBanner").innerHTML = "Upload";
    document.getElementById("playBanner").classList.remove("hidden");
    document.getElementById("uploadedMusic").innerHTML = "No Music uploaded yet";
    document.getElementById("uploadedMusic").setAttribute("style", 'height:50vh');
    document.getElementById("playBanner").addEventListener('click', () => {
      window.location.href = "upload.html";
    });
  } else {
    document.getElementById("playBanner").innerHTML = "PLAY";
    document.getElementById("playBanner").classList.remove("hidden");
    playRandomSong();
  }
}

// Function to play a random song
function playRandomSong() {
  var random = Math.floor(Math.random() * songs.length);
  playSongById(songs[random].id);
}

// Function to play a song by its ID
async function playSongById(id) {
  const docRef = doc(db, "songs", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    updateUIWithSong(data);
  } else {
    console.log("No such document!");
  }
}

// Function to update UI with song details
function updateUIWithSong(song) {
  let image = song.ImageUrl;
  let title = song.songName;
  let artist = song.artist;
  let music = song.songURL;
  let featured = limit(song.featured, 40);

  // Update top Banner
  document.getElementById("songTitle").innerHTML = title;
  document.getElementById("artistTitle").innerHTML = featured ? `${artist} ft. ${featured}` : artist;
  document.getElementById("coverArtBanner").src = image;

  // Setup masterPlay
  document.getElementById("masterPlayTitle").innerHTML = title;
  document.getElementById("masterPlayArtist").innerHTML = artist;
  document.getElementById("masterPlayArt").src = image;
  document.getElementById("currentMusic").src = music;
}

//play music from master player 
let music = document.getElementById("currentMusic");
let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click', () => {
  playMusic();
});

document.getElementById("playBanner").addEventListener('click', () => {
  playMusic();
});

//play music functionality 
const playMusic = function () {
  if (music.paused || music.currentTime <= 0) {
    music.play();
    masterPlay.classList.remove('bi-play-circle');
    masterPlay.classList.add('bi-pause-circle');
    wave.classList.add('active2');
    document.getElementById("playBanner").innerHTML = "PAUSE";
  } else {
    music.pause();
    masterPlay.classList.add('bi-play-circle');
    masterPlay.classList.remove('bi-pause-circle');
    wave.classList.remove('active2');
    document.getElementById("playBanner").innerHTML = "PLAY";
  }
}

// Initialize index to keep track of the current song
let index = 0;

// Event listener for the "Backward" button
document.getElementById("backward").addEventListener('click', () => {
  playPrevious();
});

// Event listener for the "Forward" button
document.getElementById("forward").addEventListener('click', () => {
  playNext();
});

// Function to play the previous song
function playPrevious() {
  index = (index - 1 + songs.length) % songs.length;
  playAtIndex(index);
}

// Function to play the next song
function playNext() {
  index = (index + 1) % songs.length;
  playAtIndex(index);
}

// Function to play the song at the specified index
function playAtIndex(index) {
  const song = songs[index];
  playSongById(song.id);
}

//progress bar
let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
  let curTime = music.currentTime;
  let songDuration = music.duration;

  let min = Math.floor(songDuration / 60);
  let sec = Math.floor(songDuration % 60);
  currentEnd.innerHTML = `${min}:${sec}`;

  let curMin = Math.floor(curTime / 60);
  let cuSec = Math.floor(curTime % 60);
  currentStart.innerText = `${curMin}:${cuSec}`;

  if (music.duration >= 0) {
    var progressbar = parseInt((music.currentTime / music.duration) * 100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
  } else {
    var progressbar = 0;
  }
});

seek.addEventListener('change', () => {
  music.currentTime = seek.value * music.duration / 100;
});

music.addEventListener('ended', () => {
  masterPlay.classList.add('bi-play-circle');
  masterPlay.classList.remove('bi-pause-circle');
  wave.classList.remove('active2');
});

//Volume functionality
let vol_icon = document.getElementById('vol_icon');
let volume = document.getElementById('volume');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

volume.addEventListener('change', () => {
  if (volume.value == 0) {
    vol_icon.classList.remove('bi-volume-down');
    vol_icon.classList.add('bi-volume-mute');
    vol_icon.classList.remove('bi-volume-up');
  }
  if (volume.value > 0) {
    vol_icon.classList.add('bi-volume-down');
    vol_icon.classList.remove('bi-volume-mute');
    vol_icon.classList.remove('bi-volume-up');
  }
  if (volume.value > 50) {
    vol_icon.classList.remove('bi-volume-down');
    vol_icon.classList.remove('bi-volume-mute');
    vol_icon.classList.add('bi-volume-up');
  }

  let vol_a = volume.value;
  vol_bar.style.width = `${vol_a}%`;
  vol_dot.style.left = `${vol_a}%`;
  music.volume = vol_a / 100;
});

//Next music
let next = document.getElementById('next');
let back = document.getElementById('back');

back.addEventListener('click', () => {
  playPrevious();
});

let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let hit = document.getElementById('hit');

left_scroll.addEventListener('click', () => {
  hit.scrollleft -= 330;
});

right_scroll.addEventListener('click', () => {
  hit.scrollleft += 330;
});

// Category selection
var category;
var discover = document.getElementById('discover');
var genreOption = document.getElementById('genreOption');
var genreOptions1 = document.getElementById('genreOptions1');
var genreOptions2 = document.getElementById('genreOptions2');

genreOption.addEventListener('click', () => {
  genreOptions1.classList.toggle('hidden');
  genreOptions2.classList.toggle('hidden');
});

// Event listeners for genre selection
document.querySelectorAll('.selectGenre').forEach(item => {
  item.addEventListener('click', () => {
    category = item.innerHTML;
    chooseCategory();
    genreOptions1.classList.add('hidden');
    genreOptions2.classList.add('hidden');
    discover.innerHTML = "Discover " + category;
  });
});

// Function to choose songs based on category
const chooseCategory = function () {
  console.log(category);
  const fetched = [];
  const reset = document.getElementById('songList');
  reset.innerHTML = '';
  const songRef = query(collection(db, 'songs'), where("genre", "==", category));
  console.log(songRef);

  getDocs(songRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        renderList(doc);
        fetched.push({ ...doc.data(), id: doc.id });
      });
      if (fetched.length == 0) {
        let li = document.createElement('li');
        li.innerHTML = 'Category has no music yet';
        songList.appendChild(li);
      }
    })
    .catch(err => {
      console.log(err)
    })
}

//comment section
const comments = document.getElementById('comments');
const commentSection = document.getElementById('commentSection');
const closeComments = document.getElementById('closeComments');
comments.addEventListener('click', () => {
  commentSection.classList.remove('hidden')
});
closeComments.addEventListener('click', () => {
  commentSection.classList.add('hidden')
});