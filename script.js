document.getElementById('startRecording').addEventListener('click', function() {
    const videoPreview = document.getElementById('videoPreview');
    const startButton = document.getElementById('startRecording');
    const stopButton = document.getElementById('stopRecording');
    const publishButton = document.getElementById('publishVideo');
    const videoDetails = document.querySelector('.video-details');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                videoPreview.srcObject = stream;
                videoPreview.play();
                startButton.disabled = true;
                stopButton.disabled = false;
                publishButton.disabled = true;
            })
            .catch(function(err) {
                console.error("Erreur lors de l'accès à la caméra: " + err);
            });
    } else {
        console.error("getUserMedia n'est pas supporté par votre navigateur.");
    }
});

document.getElementById('stopRecording').addEventListener('click', function() {
    const videoPreview = document.getElementById('videoPreview');
    const startButton = document.getElementById('startRecording');
    const stopButton = document.getElementById('stopRecording');
    const publishButton = document.getElementById('publishVideo');
    const videoDetails = document.querySelector('.video-details');

    const stream = videoPreview.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(track => track.stop());
    videoPreview.srcObject = null;
    startButton.disabled = false;
    stopButton.disabled = true;
    publishButton.disabled = false;
    videoDetails.style.display = 'block';
});

document.getElementById('publishVideo').addEventListener('click', function() {
    const videoDetails = document.querySelector('.video-details');
    videoDetails.style.display = 'block';
});

document.getElementById('submitDetails').addEventListener('click', function() {
    const videoTitle = document.getElementById('videoTitle').value;
    const videoDescription = document.getElementById('videoDescription').value;
    const videoThumbnail = document.getElementById('videoThumbnail').files[0];

    // Ici, vous pouvez ajouter le code pour envoyer les détails de la vidéo au serveur
    console.log('Titre:', videoTitle);
    console.log('Description:', videoDescription);
    console.log('Miniature:', videoThumbnail);

    alert('Vidéo publiée avec succès!');
});

document.getElementById('uploadVideo').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const videoURL = URL.createObjectURL(file);
        const videoElement = document.createElement('video');
        videoElement.src = videoURL;
        videoElement.controls = true;
        document.getElementById('videoContainer').innerHTML = ''; // Supprime l'ancienne vidéo
        document.getElementById('videoContainer').appendChild(videoElement);
    }
});

