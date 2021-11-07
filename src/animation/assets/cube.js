import {BoxGeometry, Mesh, MeshBasicMaterial} from 'three';

const Cube = function(scene) {
  // Create a example cube
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({ color: 0xff00ff });
  const cube = new Mesh(geometry, material);
  scene.add(cube);

  const animate = () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }

  const destroy = () => {
    console.log("entra aqui");
    scene.remove(cube);
    geometry.dispose();
    material.dispose();
  }

  return {
    mesh: cube,
    animate,
    destroy,
  }
}

export default Cube;
