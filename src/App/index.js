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

import React, { useRef, useState, useEffect } from "react";

// access to webcam
import Webcam from "react-webcam";

// for running object detection
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";

// drawings x, y points on canvas
import { drawMesh } from "../utils";

export default function App() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const prevWidthRef = useRef();
  const prevHeightRef = useRef();
  const prevWidth = prevWidthRef.current;
  const prevHeight = prevHeightRef.current;


  useEffect(() => {
    console.log("useEffect!");
    console.log('%c prevWH useEffect', 'background: #222; color: #bada55', {prevWidth, prevHeight, width, height});

    prevWidthRef.current = width;
    prevHeightRef.current = height;
  });

  // Load facemesh model
  const runFacemesh = async () => {
    //
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    setInterval(() => {
      detect(net);
    }, 10);
  };

  // Detect function
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" && 
      webcamRef.current !== null && 
      webcamRef.current.video.readyState === 4 
    ) {
      // Get Video properties
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set Video Width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set Canvas Width
      if (prevWidth !== videoWidth && 
          prevHeight !== videoHeight) {
            setWidth(videoWidth);
            setHeight(videoHeight);

            console.log('%c detect prevWH useRef', 'background: #00FFFF; color: #0000ff', {prevWidth, prevHeight});

            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;
            
            console.log({prevWidth, prevHeight, width, height, videoWidth, videoHeight});
            console.log("canvasRef setWidthHeight!");
      }

      // Make Detections
      const face = await net.estimateFaces({input:video});
      console.log(face);

      // Get canvas context for drawing
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(()=>{drawMesh(face, ctx)});
    }
  }

  useEffect(()=>{runFacemesh()}, []);

  return (  
    <div className="App">
      <h1>Tensorflow.js Face Recognition</h1>
      <header>
        {/* where one intakes data for tfjs  */}
        <Webcam ref={webcamRef} className="react-webcam" />

        {/* where one draws the segmentation layer */}
        <canvas ref={canvasRef} className="react-canvas" />
      </header>
    </div>
  )
}
