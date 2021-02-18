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
import { drawMesh } from "./utils";

export default function App() {
  let project_name = "Tensorflow.js Face Recognition";

  return (  
    {project_name}
  )
}

// video: https://www.youtube.com/watch?v=7lXYGDVHUNw
// code: https://github.com/nicknochnack/FacialLandmarkDetection
