import skybox from '../../../skybox';

const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: false,
  // map onto cube
  envMap: skybox.texture,
  // controls the amount of refraction of background
  // lower more distorted, high clearer
  refractionRatio: 0.9,
});

export default material;
