$(document).ready(function () {
    $("#full-overlay").css("height", $("#player").height() - 45);
});



function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

// Prevent right - click on the whole document
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// Prevent common keyboard shortcuts
document.addEventListener('keydown', function (e) {
    if (e.keyCode == 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) || // Ctrl+Shift+J
        (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) // Ctrl+U
    ) {
        e.preventDefault();
    }
});




function onPlayerReady(event) {


    // Set the video quality to a desired level
    // Available quality levels: 'small', 'medium', 'large', 'hd720', 'hd1080', 'highres'
    event.target.setPlaybackQuality('hd720');

}
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        isPlaying = true;
    } else {
        isPlaying = false;
    }

    if (event.data == YT.PlayerState.BUFFERING) {
        event.target.setPlaybackQuality('hd720');
    }
}
function toggleVideo() {
    if (isPlaying) {
        player.pauseVideo();
        isPlaying = false;
    } else {
        player.playVideo();
        isPlaying = true;
    }
}

function changeVolume(volume) {
    if (player) {
        player.setVolume(volume);
    }
}

function seekTo(volume) {
    if (player) {
        player.seekTo((player.getDuration() / 100) * volume)
    }
}

function toggleMute() {
    player.setSphericalProperties()
    if (player.isMuted()) {
        player.unMute();
    } else {
        player.mute();
    }
}

function changeQuality(quality) {
    if (player && player.setPlaybackQuality) {
        player.setPlaybackQualityRange(quality);
        displayCurrentQuality();
    }
}

function displayCurrentQuality() {
    if (player && player.getPlaybackQuality) {
        var quality = player.getPlaybackQuality();
        console.log('Current Playback Quality:', quality);
        // Example: Display quality in a DOM element
        document.getElementById('currentQuality').textContent = 'Current Quality: ' + quality;
    }
}

function skipForward() {
    var currentTime = player.getCurrentTime();
    player.seekTo(currentTime + 10); // Skip forward 10 seconds
    showAnimation('skip-right-overlay');
}

// Function to skip backward
function skipBackward() {
    var currentTime = player.getCurrentTime();
    player.seekTo(Math.max(currentTime - 10, 0)); // Skip backward 10 seconds, but not below 0
    showAnimation('skip-left-overlay');
}

function showAnimation(elementId) {
    var element = document.getElementById(elementId);
    element.style.opacity = 1
    element.classList.add('fade');
    setTimeout(function () {
        element.style.opacity = 0
        element.classList.remove('fade');
    }, 1000); // The duration of the fade animation
}