import './styles/style.css';

import audioPlayer from './modules/audio-player';
import modal from './modules/modal';
import scene from './modules/scene';

const init = () => {
  audioPlayer.init();
  modal.init();
  scene.init();
  scene.animate();
};

window.addEventListener('load', init);
