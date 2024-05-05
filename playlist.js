let playlist = []; // Array to store playlist items
let currentIndex = 0; // Index of the currently playing video in the playlist

// Function to play the playlist
function playPlaylist() {
    if (playlist.length === 0) {
        console.log("Playlist is empty.");
        return;
    }
    console.log("Playing playlist...");
    console.log("Now Playing:", playlist[currentIndex]);
    // Logic to play the video at currentIndex
}

// Function to stop the playlist
function stopPlaylist() {
    console.log("Stopping playlist...");
    // Logic to stop the currently playing video
}

// Function to pause the currently playing video
function pauseVideo() {
    console.log("Pausing video...");
    // Logic to pause the currently playing video
}

// Function to play the next video in the playlist
function playNextVideo() {
    if (currentIndex < playlist.length - 1) {
        currentIndex++;
        console.log("Playing next video...");
        console.log("Now Playing:", playlist[currentIndex]);
        // Logic to play the next video in the playlist
    } else {
        console.log("End of playlist reached.");
    }
}

// Function to play the previous video in the playlist
function playPreviousVideo() {
    if (currentIndex > 0) {
        currentIndex--;
        console.log("Playing previous video...");
        console.log("Now Playing:", playlist[currentIndex]);
        // Logic to play the previous video in the playlist
    } else {
        console.log("Beginning of playlist reached.");
    }
}

// Event listeners for playlist control buttons
document.getElementById('play-btn').addEventListener('click', playPlaylist);
document.getElementById('pause-btn').addEventListener('click', pauseVideo);
document.getElementById('stop-btn').addEventListener('click', stopPlaylist);
document.getElementById('play-next-btn').addEventListener('click', playNextVideo);
document.getElementById('play-previous-btn').addEventListener('click', playPreviousVideo);
