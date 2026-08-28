import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";


// ===============================
// INITIALIZE FACE LANDMARKER
// ===============================

export const init = async ({
  landmarkerRef,
  videoRef,
  streamRef,
}) => {
  try {
    // Load MediaPipe vision files
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    // Create FaceLandmarker
    landmarkerRef.current = await FaceLandmarker.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
        },

        outputFaceBlendshapes: true,

        runningMode: "VIDEO",

        numFaces: 1,
      }
    );

    // Start camera
    streamRef.current = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    // Attach camera stream to video
    if (videoRef.current) {
      videoRef.current.srcObject = streamRef.current;

      await videoRef.current.play();
    }

    return true;
  } catch (error) {
    console.error("Face detection initialization failed:", error);

    // If something failed after camera started,
    // stop camera tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());

      streamRef.current = null;
    }

    // Close MediaPipe if it was created
    if (landmarkerRef.current) {
      landmarkerRef.current.close();

      landmarkerRef.current = null;
    }

    throw error;
  }
};


// ===============================
// DETECT EXPRESSION
// ===============================

export const detect = ({
  landmarkerRef,
  videoRef,
  setExpression,
}) => {
  // MediaPipe or video isn't ready yet
  if (!landmarkerRef.current || !videoRef.current) {
    return;
  }

  // Detect face
  const results = landmarkerRef.current.detectForVideo(
    videoRef.current,
    performance.now()
  );

  // No face detected
  if (!results.faceBlendshapes?.length) {
    setExpression("No face detected");
    return;
  }

  // Get blendshape categories
  const blendshapes =
    results.faceBlendshapes[0].categories;


  // ===============================
  // HELPER
  // ===============================

  const getScore = (name) =>
    blendshapes.find(
      (blendshape) =>
        blendshape.categoryName === name
    )?.score || 0;


  // ===============================
  // FACE SCORES
  // ===============================

  const smileLeft = getScore("mouthSmileLeft");
  const smileRight = getScore("mouthSmileRight");

  const jawOpen = getScore("jawOpen");

  const browUp = getScore("browInnerUp");

  const frownLeft = getScore("mouthFrownLeft");
  const frownRight = getScore("mouthFrownRight");


  // ===============================
  // DEBUG
  // ===============================

  console.log({
    smileLeft,
    smileRight,
    jawOpen,
    browUp,
    frownLeft,
    frownRight,
  });


  // ===============================
  // EXPRESSION LOGIC
  // ===============================

  let currentExpression = "neutral";


  // HAPPY
  if (
    smileLeft > 0.5 &&
    smileRight > 0.5
  ) {
    currentExpression = "happy";
  }

  // SURPRISED
  else if (
    jawOpen > 0.2 &&
    browUp > 0.2
  ) {
    currentExpression = "surprised";
  }

  // SAD
  else if (
    frownLeft > 0.0001 &&
    frownRight > 0.0001
  ) {
    currentExpression = "sad";
  }


  // Update UI
  setExpression(currentExpression);


  // Return detected expression
  return currentExpression;
};

