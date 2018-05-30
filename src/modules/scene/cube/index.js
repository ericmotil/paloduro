import links from './links';
import refraction from './refraction';

const cube = new THREE.Object3D();

cube.add(links.rendered);
cube.add(refraction.rendered);

export default cube;
