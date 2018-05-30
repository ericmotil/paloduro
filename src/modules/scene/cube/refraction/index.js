import material from './material';

const geometry = new THREE.BoxGeometry(30, 30, 30);
const rendered = new THREE.Mesh(geometry, material);

rendered.position.set(0, 0, 0);

export default {
  geometry,
  material,
  rendered,
};
