import {useEffect, useRef} from 'react'
import 'reset-css';
import './App.scss'
import AnimationController from "./animation/animation-controller"
import Cube from './animation/assets/cube';

function App() {
  const mount = useRef(null)
  useEffect(() => {
    const {destroy, addAsset, scene} = new AnimationController(mount.current);
    addAsset(new Cube(scene));

    return () => {
      destroy()
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
