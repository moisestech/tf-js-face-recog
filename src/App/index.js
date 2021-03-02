// 1. Install dependencies
// 2. Import dependencies
// 3. Setup webcam and canvas
// 4. Define references to those
// 5. Load facemesh
// 6. Detect function
// 7. Drawing utilities
// 8. Load triangulation
// 9. Setup triangle path
// 10. Setup point drawing
// 11. Add drawMesh to detect function

import React, { useRef, useEffect } from "react";

// access to webcam
import Webcam from "react-webcam";

// for running object detection
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";

// drawings x, y points on canvas
import { drawMesh } from "../utils";

export default function App({project_name = "Tensorflow.js Face Recognition"}) {

  const webCamRef = useRef(null);
  const canvasRef = useRef(null);

  // Load facemesh model
  const runFacemesh = async () => {
    const net = await facemesh.load({
      inputResolution: {width: 640, height: 480}, scale: 0.8
    })
  };

  // Detect function
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" && 
      webcamRef.current !== null && 
      webcamRef.current.video.readState === 4 
    ) {

    }
  }

  return (  
    <div clasName="App">
      <h1>{project_name}</h1>
      <header>
        {/* where one intakes data for tfjs  */}
        <Webcam ref={webcamRef} className="react-webcam" />

        {/* where one draws the segmentation layer */}
        <Canvas ref={canvasRef} className="react-canvas" />
      </header>
    </div>
  )
}

// video: https://www.youtube.com/watch?v=7lXYGDVHUNw
// code: https://github.com/nicknochnack/FacialLandmarkDetection
