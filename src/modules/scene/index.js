import camera from './camera';
import cameraPosition from './utils/camera-position';
import cube from './cube';
import cubeEvents from './utils/cube-events';
import cubeRotation from './utils/cube-rotation';
import light from './light';
import renderer from './renderer';
import screen from './utils/screen-resize';
import skybox from './skybox';

// create scene
const scene = new THREE.Scene();

function init() {
  // get mounting point
  const container = document.getElementById('lemab');

  // add elements to scene
  scene.add(camera);
  scene.add(light);
  scene.add(skybox.rendered);
  scene.add(cube);

  // set renderer size
  renderer.setSize(screen.w(), screen.h());

  // mount
  container.appendChild(renderer.domElement);

  // start utils
  cameraPosition.init();
  cubeEvents.init();
  cubeRotation.init();
  screen.init();
}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);

  cameraPosition.update();
  cubeRotation.update();
}

export default {
  init,
  animate,
};
