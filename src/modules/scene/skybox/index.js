import images from './images';

// skybox with refraction mapping
const texture = new THREE.CubeTextureLoader().load(images);
texture.format = THREE.RGBFormat;
texture.mapping = THREE.CubeRefractionMapping;

const geometry = new THREE.BoxGeometry(1024, 1024, 1024);

const shader = THREE.ShaderLib['cube'];

const material = new THREE.ShaderMaterial( {
  fragmentShader: shader.fragmentShader,
  vertexShader: shader.vertexShader,
  uniforms: shader.uniforms,
  depthWrite: false,
  side: THREE.BackSide,
});
material.uniforms['tCube'].value = texture;

const rendered = new THREE.Mesh(geometry, material);

export default {
  geometry,
  material,
  texture,
  rendered,
  shader,
};
