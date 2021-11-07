import {PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import cube from './assets/cube';

const AnimationController = function (element) {
  let width = element.clientWidth;
  let height = element.clientHeight;
  let frameId;
  let assets = [];

  const config = {
    width,
    height,
    fov: 75,
    aspect: width/height,
    near: 0.1,
    far: 100,
  }

  // Hadle Scene, Light  and Camera
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    config.fov,
    config.aspect,
    config.near,
    config.far
  );
  camera.position.z = 4;

  // Create renderer
  const renderer = new WebGLRenderer({antialias: true})
  renderer.setSize(width, height);

  const renderScene = () => {
    renderer.render(scene, camera);
  };

  const handleResize = () => {
    width = element.clientWidth
    height = element.clientHeight
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderScene();
  };

  const animate = () => {
    assets.forEach(({animate})=> animate && animate())

    renderScene();
    frameId = requestAnimationFrame(animate);
  };

  const destroy = () => {
    window.removeEventListener("resize", handleResize);
    element.removeChild(renderer.domElement);
    assets.forEach(({destroy})=> destroy && destroy())
  };

  const addAsset = (item) => {
    assets.push(item);
    scene.add(item.mesh);
  }

  // append render element
  element.appendChild(renderer.domElement);
  window.addEventListener("resize", handleResize);
  requestAnimationFrame(animate);;

  return {
    destroy,
    addAsset,
    scene,
  }
};

export default AnimationController;
