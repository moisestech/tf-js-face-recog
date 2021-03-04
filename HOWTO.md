# HOW-TO

## **1.** Install dependencies

- Install Tensorflow Model [Face Landmarks Detection](https://www.npmjs.com/package/@tensorflow-models/face-landmarks-detection).
- Full list of dependencies and devDependencies in [package.json]().

## **2.** Import dependencies

- App/index.js
  - **`import * as facemesh`** and **`import * as tf`**.
  - **`import {useRef} from 'react'`**. [useRef link](https://reactjs.org/docs/hooks-reference.html#useref)
    - help us reference our onscreen in DOM elements that keep state during the component lifecycle.

## **3.** Setup webcam and canvas

- App/index.js in `<header />` DOM element **`Webcam`** and **`Canvas`** components are initialized.

```javascript
<Webcam className="react-webcam"/>
<Canvas className="react-canvas" />
```

## **4.** Define references to those

- App/index.js in `App()` component body.
  - connect canvas and webcam components with `useRef`.

```javascript
const webcamRef = useRef(null);
const camvasRef = useRef(null);
```

## **5.** Load facemesh

- async function **`runFacemesh`** will perform face detections from our webcam.
- **`facemesh.load`** that takes an object with parameters **`inputResolution: {width, height, scale}`**
- scaling the size of the resolution so it performs a bit faster.

```javascript
// after useRef initializations in App () comp
const runFacemesh = async () => {
  const net = await facemesh.load({
    inputResolution: {width: 640, height: 480}, scale: 0.8
  });
}
```

## **6.** Detect function

  **i.** async function **`detect`** runs when the app starts, goes ahead and detects our model and our webcam.

  **ii.** **`if`** statement will check the **`webcamRef`** is defined with a **`readState`** of 4.

  **iii.** Once **`webcamRef`** is ready, the const **`video`**, **`videoWidth`**, and **`videoHeight`** are defined from **`webcamRef.current.video`**.

  **iv.** Width const **`video, videoWidth, videoHeight`** the width and height of the **`webcamRef`** and **`canvasRef`** are set.

  **v.** async **`net.estimateFaces(video)`** is stored in **`face`** const which returns an **array** of **objects**.

  The returned objects include a **`scaledMesh`** for the face that returns an **`x, y, z`** coordinate for **3D Detection**.

  ```javascript
  // after runFacemesh async function
  const detect = async (net) => {
    // checking data is streaming
    if (
      typeof webcamRef.current !== "undefined" && 
      webcamRef.current !== null && 
      webcamRef.current.video.readyState === 4 
    ) {
      // Get Video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      
      // Set Video Width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set Canvas Width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const face = await net.estimateFaces(video);
      console.log(face);

      // Get Canvas context for drawing
    }
  }
  ```

## **8.** Setup Drawing Utility: Triangulation Data

  i. Create a new file utilities JS **`utils/index.js`** and store the array of points from the mesh that create triangles.

  ```javascript
  export const TRIANGULATION = [...];
  ```

## **9.** Setup Drawing Utility: **drawMesh()**

  i. Arrow function **`drawMesh`** with parameters **`predictions, ctx`** will loop through the **model prediction** and draw them on the canvas.

  ii. The **`predictions.scaledMesh`** keypoints are stored and used to draw in the canvas using **`ctx.arc`**.

  ```javascript
  export const drawMesh = (predictions, ctx) => {
    if (predictions.length > 0) {

      // Draw Points
      predictions.forEach(prediction => {
        const keypoints = prediction.scaledMesh;
        for (let i = 0; i < keypoints.length; i++) {
          const x = keypoints[i][0];
          const y = keypoints[i][1];

          ctx.beginPath();
          ctx.arc(x, y, 1, 0, 3 * Math.PI);
          ctx.fillStyle = "aqua";
          ctx.fill();
        }
      })
    }
  }
  ```

## **10.** Import Utility drawMesh to App

  i. In **`src/App/index.js`** import the function **`drawMesh`** from **`utilities/index.js`**.

  ```javascript
  // after import facemesh model

  // drawings x, y points on canvas
  import { drawMesh } from "../utils";
  ```

## **11.** Connect drawMesh function to model detect function

  ii. Inside the detect function **`canvasRef`** is stored in const **`ctx`** and utils function **`drawMesh`** is invoked with **`face`** estimateFaces **object** and **`ctx`**.

  ```javascript
  // inside detect function make detections

  // Get canvas context for drawing
  const ctx = canvasRef.current.getContext("2d");
  drawMesh(face, ctx);
  ```

## **12.** Setup Drawing Utility: **drawPath()**

  i. In **utilities/index.js** the new function **`drawPath`** with parameters **`cts, points, closePath`**.

  ii. The function initiates a new path, draws the points and then closes the path forming a entire triangle. After, **`strokeStyle`** is set and **`region`** is passed to **`ctx.stroke(region)`**.

  ```javascript
  const drawPath = (ctx, points, closePath) => {
    const region = new Path2D();
    region.moveTo(points[0][1]);
    for (let i=1; i < points.length; i++) {
      const point = points[i];
      region.lineTo(point[0], point[1]);
    }
    if (closePath) {
      region.closePath();
    }
    ctx.strokeStyle="cyan";
    ctx.stoke(region);
  }
  ```

## **13.** Upgrade **drawMesh()** Utility with Draw Triangles

  i. Passing through the TRIANGULATION metric dividing it by three and mapping it to specific points.

  ii. After, function **drawPath()** is invoked which requires the parameters **`ctx, points, true`**. The last param is require to show wether or not to show the path.

```javascript
// inside the drawPath function

// Draw triangles
for (let i=0; i < TRIANGULATION.length/3; i++) {
  const points = [
    TRIANGULATION[i * 3],
    TRIANGULATION[i * 3 + 1],
    TRIANGULATION[i * 3 + 2],
  ].map((index) => keypoints[index]);

  drawPath(ctx, points, true);
}
```

---

## NPM

1. **Run App** `npm start`
2. Webpack Hot Reloading and ./dist directory bundling.

### npm start

- **scripts**: `npm start` runs scripts: `{ "start": "webpack serve"}`,
  - store your webpack commmands in package.json#scripts
  - alternatively run `npx webpack` or `node_modules/./bin/webpack`

## Package.JSON

### Packaging App

- **scripts**: `npm start` runs scripts: { "start": "webpack serve"},
- **main**: `webpack.config.js` is where webpack starts bundling from.

---

## WEBPACK HOW-TO

- **Webpack**: Module bundler.
- **webpack-cli**: is the interface we use to communicate with webpack.
- **webpack-dev-server**: info coming soon.

### Plugins

- **CopyWebpackPlugin**: info coming soon.
- **HtmlWebpackPlugin**: info coming soon.
- **CleanWebpackPlugin**: info coming soon.
- **UglifyPlugin**: info coming soon.

---

## BABEL HOW-TO

### Babel Loader

### Babel Presets

- **@babel/preset-env**: info coming soon.
- **@babel/preset-react**: info coming soon.

### Babel Plugins

- **@babel/plugin-transform-runtime**: info coming soon.
- **@babel/plugin-proposal-pipeline-operator**: info coming soon.
- **@babel/plugin-syntax-dynamic-import**: info coming soon.

---

## TREE

- Install Tree with Homebrew using `brew install tree`
- To create dir structure `tree -I 'node_modules|package-lock.json|dist'`
