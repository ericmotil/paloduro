import gone from '../audio/gone.mp3';

import imgPlay from '../images/play-button.png';
import imgPause from '../images/pause-button.png';

const audioPlayer = {
  init: () => {
    let audio = new Audio();
    audio.src = gone;
    audio.loop = true;
    audio.play();
    // Set object references
    let playbtn = document.getElementById('btn-playpause');
    // let mutebtn = document.getElementById('mutebtn');
    // Add Event Handling
    playbtn.addEventListener('click', playPause);
    // mutebtn.addEventListener("click", mute);
    // Functions
    function playPause() {
      if(audio.paused) {
          audio.play();
          playbtn.style.background = `url(${imgPause}) no-repeat`;
        } else {
          audio.pause();
          playbtn.style.background = `url(${imgPlay}) no-repeat`;
        }
    }
    // function mute(){
    //   if(audio.muted){
    //       audio.muted = false;
    //       mutebtn.style.background = "url(images/speaker.png) no-repeat";
    //     } else {
    //       audio.muted = true;
    //       mutebtn.style.background = "url(images/speaker_muted.png) no-repeat";
    //     }
    // }
  },
};

export default audioPlayer;
