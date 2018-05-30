import camera from '../camera';
import renderer from '../renderer';

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

const handleResize = () => {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;

  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();

  renderer.setSize(WIDTH, HEIGHT);
};

const init = () => {
  window.addEventListener('resize', handleResize, false);
};

const w = () => WIDTH;
const h = () => HEIGHT;

export default {
  init,
  h,
  w,
};
