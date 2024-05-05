// musicPlayer.js

// Function to store playback state in session storage
function storePlaybackState(trackId, playbackPosition, volumeLevel) {
    sessionStorage.setItem('trackId', trackId);
    sessionStorage.setItem('playbackPosition', playbackPosition);
    sessionStorage.setItem('volumeLevel', volumeLevel);
}

// Function to retrieve playback state from session storage
function retrievePlaybackState() {
    const trackId = sessionStorage.getItem('trackId');
    const playbackPosition = parseFloat(sessionStorage.getItem('playbackPosition'));
    const volumeLevel = parseFloat(sessionStorage.getItem('volumeLevel'));
    return { trackId, playbackPosition, volumeLevel };
}

// Function to check if playback state exists in session storage
function hasPlaybackState() {
    return sessionStorage.getItem('trackId') !== null;
}

// Example usage:

// Assuming this function is called when starting playback
function startPlayback(trackId, initialPosition, initialVolume) {
    // Start playback logic...
    // For example, play the track with ID trackId, set initial position, and volume level

    // Store playback state in session storage
    storePlaybackState(trackId, initialPosition, initialVolume);
}

// Assuming this function is called when loading a new page
function loadNewPage() {
    // If there's stored playback state, retrieve it and resume playback
    if (hasPlaybackState()) {
        const playbackState = retrievePlaybackState();
        
        // Resume playback logic...
        // For example, play the track with ID playbackState.trackId,
        // seek to playbackState.playbackPosition, and set volume to playbackState.volumeLevel
    }
}

// Call loadNewPage when the page loads to resume playback
document.addEventListener('DOMContentLoaded', function() {
    loadNewPage();
});
