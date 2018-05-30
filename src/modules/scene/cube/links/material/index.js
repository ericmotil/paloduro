import images from './images';

let materials = [];
let textureLoader = new THREE.TextureLoader();

for (let i = 0; i < images.length; i++) {
  let texture = textureLoader.load(images[i]);
  texture.offset.set(-0.5, -0.5);
  texture.repeat.set(2, 2);
  let face = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
  });
  face.map.needsUpdate = true;
  materials.push(face);
}

const material = new THREE.MultiMaterial(materials);

export default material;
