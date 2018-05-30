import cube from '../cube';
import screen from './screen-resize';

const rotationSpeed = 2;
const moveReleaseTimeDelta = 50;

let actionOn = false;
let curQuaternion;
let deltaX = 0;
let deltaY = 0;
let lastMoveTimestamp = new Date();
let rotateStartPoint = new THREE.Vector3(0, 0, 1);
let rotateEndPoint = new THREE.Vector3(0, 0, 1);
let startPoint = {
  x: 0,
  y: 0,
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

  document.addEventListener('mousemove', handleActionMove, false);
  document.addEventListener('touchmove', handleActionMove, false);
  document.addEventListener('mouseup', handleActionEnd, false);
  document.addEventListener('touchend', handleActionEnd, false);

  actionOn = true;

  startPoint = {
    x: action.x,
    y: action.y,
  };

  rotateStartPoint = rotateEndPoint = projectOnTrackball(0, 0);
};

const handleActionMove = (e) => {
  let action = {
    x: 0,
    y: 0,
  };
  if (e.type === 'touchmove') {
    action.x = e.touches[0].clientX;
    action.y = e.touches[0].clientY;
  } else {
    e.preventDefault();
    action.x = e.clientX;
    action.y = e.clientY;
  }

  deltaX = action.x - startPoint.x;
  deltaY = action.y - startPoint.y;

  handleRotation();

  startPoint.x = action.x;
  startPoint.y = action.y;

  lastMoveTimestamp = new Date();
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

  if (new Date().getTime() - lastMoveTimestamp.getTime() > moveReleaseTimeDelta) {
    deltaX = action.x - startPoint.x;
    deltaY = action.y - startPoint.y;
  }

  actionOn = false;

  document.removeEventListener('mousemove', handleActionMove, false);
  document.removeEventListener('touchmove', handleActionMove, false);
  document.removeEventListener('mouseup', handleActionEnd, false);
  document.removeEventListener('touchend', handleActionEnd, false);
};

const projectOnTrackball = (touchX, touchY) => {
  const mouseOnBall = new THREE.Vector3();

  mouseOnBall.set(
    clamp(touchX / (screen.w()/2), -1, 1), clamp(-touchY / (screen.h()/2), -1, 1),
    0.0
  );

  const length = mouseOnBall.length();

  if (length > 1.0) {
    mouseOnBall.normalize();
  } else {
    mouseOnBall.z = Math.sqrt(1.0 - length * length);
  }

  return mouseOnBall;
};

const rotateMatrix = (rotateStart, rotateEnd) => {
  const axis = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();

  let angle = Math.acos(rotateStart.dot(rotateEnd) / rotateStart.length() / rotateEnd.length());

  if (angle) {
    axis.crossVectors(rotateStart, rotateEnd).normalize();
    angle *= rotationSpeed;
    quaternion.setFromAxisAngle(axis, angle);
  }
  return quaternion;
};

const handleRotation = () => {
  rotateEndPoint = projectOnTrackball(deltaX, deltaY);

  const rotateQuaternion = rotateMatrix(rotateStartPoint, rotateEndPoint);
  curQuaternion = cube.quaternion;
  curQuaternion.multiplyQuaternions(rotateQuaternion, curQuaternion);
  curQuaternion.normalize();
  cube.setRotationFromQuaternion(curQuaternion);

  rotateEndPoint = rotateStartPoint;
};

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

const update = () => {
  if (!actionOn) {
    const drag = 0.95;
    const minDelta = 0.05;

    if (deltaX < -minDelta || deltaX > minDelta) {
      deltaX *= drag;
    } else {
      deltaX = 0;
    }

    if (deltaY < -minDelta || deltaY > minDelta) {
      deltaY *= drag;
    } else {
      deltaY = 0;
    }

    handleRotation();
  }
};

const init = () => {
  document.addEventListener('mousedown', handleActionStart, false);
  document.addEventListener('touchstart', handleActionStart, false);
};

export default {
  init,
  update,
};
