import material from './material';

const geometry = new THREE.CubeGeometry(31, 31, 31);
const rendered = new THREE.Mesh(geometry, material);

rendered.position.set(0, 0, 0);
rendered.doubleSided = true;

export default {
  geometry,
  material,
  rendered,
};
