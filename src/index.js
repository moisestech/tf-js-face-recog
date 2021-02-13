// Install dependencies
// Import dependencies
// Setup webcam and canvas
// Define references to those
// Load facemesh
// Detect function
// Drawing utilities
// Load triangulation
// Setup triangle path
// Setup point drawing
// Add drawMesh to detect function

import React, { useRef, useEffect } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
// OLD MODEL
//import * as facemesh from "@tensorflow-models/facemesh";

// NEW MODEL
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities";

// https://github.com/nicknochnack/FacialLandmarkDetection

let project_name = "Tensorflow.js Face Recognition";

console.log({project_name});
