import camera from '../camera';
import screen from './screen-resize';

let x = 0;
let y = 0;

const init = () => {
  document.addEventListener('mousemove', handleMouseMove, false);
};

const handleMouseMove = (e) => {
  e.preventDefault();
  x = (e.clientX - screen.w()/2) * 0.05;
  y = (e.clientY - screen.h()/2) * 0.05;
};

const update = () => {
  camera.position.x += (x - camera.position.x) * 0.015;
  camera.position.y += (-y - camera.position.y) * 0.015;
};

export default {
  init,
  update,
};
