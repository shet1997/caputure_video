import React, { useState } from 'react';

function VideoRecord(props) {

    const [mediaRec, setMediaRec] = useState({});
    const constraintObject = {
        audio: false,
        video: true
    }
    const startRecording = () => {
        navigator.mediaDevices.getUserMedia(constraintObject)
        .then(function(mediaStreamObj) {
           let preview = document.getElementById("preview");
           preview.srcObject = mediaStreamObj;
           let mediaRecorder = new MediaRecorder(mediaStreamObj);
           mediaRecorder.start();
           setMediaRec(mediaRecorder);
           let chunks = [];
           mediaRecorder.ondataavailable = function(e) {
               chunks.push(e.data);
           }
           mediaRecorder.onstop = function(e) {
                var blob = new Blob(chunks, { 'type' : 'video/webm;' });
                chunks = [];
                var videoURL = window.URL.createObjectURL(blob);
                let recordings = document.getElementById("recordings");
                recordings.src = videoURL;
           }
        })
        .catch(function(err){
            console.log(err);
        })
    }

    const stopRecording = () => {
        mediaRec.stop();
    }

    return (
        <React.Fragment>
            <div className="d-flex">
                <button type="button" className="btn btn-success mr-3" onClick={() => startRecording()}>start</button>  
                <button type="button" className="btn btn-success" onClick={() => stopRecording()}>stop</button> 
            </div>
            <video id="preview" height="240px" width="340px" autoPlay muted></video>
            <video id="recordings" height="240px" width="340px" controls></video>
        </React.Fragment>
    );
}

export default VideoRecord;