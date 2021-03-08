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
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set Video Width
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    // Set Canvas Width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    // Make Detections
    const face = await net.estimateFaces({input:video});
    console.log(face);

    // Get canvas context for drawing
    const ctx = canvasRef.current.getContext("2d");
    requestAnimationFrame(()=>{drawMesh(face, ctx)});
  }
}