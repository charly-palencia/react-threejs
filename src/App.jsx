import {useEffect, useRef} from 'react'
import {BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import 'reset-css';
import './App.scss'

function App() {
  const mount = useRef(null)


  useEffect(() => {
    let width = mount.current.clientWidth
    let height = mount.current.clientHeight
    const scene = new Scene();
    const fov = 75; // Grados
    const aspect = width/height; // Relación de aspecto
    const near = 0.1; // Si el objeto está más cerca que esta distancia no se renderiza
    const far = 100; // Si el objeto está más lejos que esta distancia no se renderiza

    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 4;

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0xff00ff });
    const cube = new Mesh(geometry, material);

    scene.add(cube);

    const renderer = new WebGLRenderer({antialias: true})
    renderer.setSize(width, height);
    // renderer.render(scene, camera);
    mount.current.appendChild(renderer.domElement);

    const renderScene = () => {
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      width = mount.current.clientWidth
      height = mount.current.clientHeight
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderScene();
    };

    let frameId;
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderScene();
      frameId = requestAnimationFrame(animate);
    };


    window.addEventListener("resize", handleResize);
    requestAnimationFrame(animate);;

    return () => {
      window.removeEventListener("resize", handleResize);
      mount.current.removeChild(renderer.domElement);

      scene.remove(cube);
      geometry.dispose();
      material.dispose();
    };
  }, [])

  return (
    <div className="App" >

      <div id="canvas-container" ref={mount}></div>
      <div className="info-panel">
        <h5>
          Example
        </h5>
      </div>
    </div>
  )
}

export default App
