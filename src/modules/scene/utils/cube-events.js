import camera from '../camera';
import links from '../cube/links';
import renderer from '../renderer';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const getIntersects = (x, y) => {
  mouse.x = (x / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = - (y / renderer.domElement.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  return raycaster.intersectObject(links.rendered);
};

const handleActionStart = (e) => {
  let action = {
    x: 0,
    y: 0,
  };
  if (e.type === 'touchstart') {
    action.x = e.touches[0].clientX;
    action.y = e.touches[0].clientY;
  } else {
    e.preventDefault();
    action.x = e.clientX;
    action.y = e.clientY;
  }

  const intersects = getIntersects(action.x, action.y);

  if (intersects.length > 0) {
    bindSocial();
    setTimeout(unbindSocial, 1400);
  }
};

const handleActionEnd = (e) => {
  let action = {
    x: 0,
    y: 0,
  };
  if (e.type === 'touchend' && e.touches.length > 0) {
    action.x = e.touches[0].clientX;
    action.y = e.touches[0].clientY;
  } else if (e.type === 'touchend' && e.pageX) {
    action.x = e.pageX;
    action.y = e.pageY;
  } else {
    e.preventDefault();
    action.x = e.clientX;
    action.y = e.clientY;
  }

  const intersects = getIntersects(action.x, action.y);
  fireLink(intersects);
};

const fireLink = (intersects) => {
  if (intersects.length > 0) {
    const index = intersects[0].face.materialIndex;
    switch (index) {
       case 0:
          console.log('Twitter');
          window.open('http://twitter.com', '_blank', '', '');
          break;
       case 1:
          console.log('Facebook');
          window.open('http://facebook.com', '_blank', '', '');
          break;
       case 2:
          console.log('Instagram');
          window.open('http://instagram.com', '_blank', '', '');
          break;
       case 3:
          console.log('Tumblr');
          window.open('http://tumblr.com', '_blank', '', '');
          break;
       case 4:
          console.log('Music');
          window.open('http://music.com', '_blank', '', '');
          break;
       case 5:
          console.log('Ropa');
          window.open('http://shirts.com', '_blank', '', '');
          break;
        default:
          console.log('wtf am i clicking on?');
    }
  }
  unbindSocial();
};

const handleMouseMove = (e) => {
  e.preventDefault();
  const intersects = getIntersects(e.clientX, e.clientY);

  if (intersects.length > 0) {
    document.body.style.cursor = 'pointer';
  } else {
    document.body.style.cursor = 'move';
  }
};

const bindSocial = () => {
  document.addEventListener('mouseup', handleActionEnd, false);
  document.addEventListener('touchend', handleActionEnd, false);

  // possibly roll this into its own handleCancel function
  // to allow some mouseMove fudging... more than a certain delta
  // THEN unbind... otherwise... forgive the poor little guy
  // ****************************************************************
  document.addEventListener('mousemove', unbindSocial, false);
  document.addEventListener('touchmove', unbindSocial, false);
  // ****************************************************************
};

const unbindSocial = () => {
  document.removeEventListener('mouseup', handleActionEnd, false);
  document.removeEventListener('touchend', handleActionEnd, false);

  // ****************************************************************
  document.removeEventListener('mousemove', unbindSocial, false);
  // ****************************************************************
};

const init = () => {
  document.addEventListener('touchstart', handleActionStart, false);
  document.addEventListener('mousedown', handleActionStart, false);
  document.addEventListener('mousemove', handleMouseMove, false);
};

export default {
  init,
};
