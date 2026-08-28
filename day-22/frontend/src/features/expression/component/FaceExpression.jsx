import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    let cancelled = false;

    const startCamera = async () => {
      try {
        await init({
          landmarkerRef,
          videoRef,
          streamRef,
        });

        if (cancelled) {
          if (landmarkerRef.current) {
            landmarkerRef.current.close();
            landmarkerRef.current = null;
          }

          if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
          }

          return;
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Face detection initialization failed:", error);
        }
      }
    };

    startCamera();

    return () => {
      cancelled = true;

      // Close MediaPipe
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
        landmarkerRef.current = null;
      }

      // Stop camera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      // Video source remove
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  const handleClick = () => {
    const detectedExpression = detect({
      landmarkerRef,
      videoRef,
      setExpression,
    });

    onClick(detectedExpression);
  };

  return (
    <section className="w-full h-[50%] px-3 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-6xl">

        {/* Camera Card */}
        <div className="relative">

          {/* Violet Glow */}
          <div className="pointer-events-none absolute -inset-2 rounded-full bg-violet-500/5 blur-3xl sm:-inset-4" />

          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border border-zinc-800/80
              bg-[#111113]
              p-3
              shadow-2xl
              sm:rounded-3xl
              sm:p-5
              lg:p-6
            "
          >

            {/* Camera */}
            <div
              className="
                relative
                aspect-[4/3]
                w-full
                overflow-hidden
                rounded-xl
                bg-[#09090b]
                sm:aspect-video
                sm:rounded-2xl
              "
            >
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                playsInline
              />

              {/* Camera Status */}
              <div
                className="
                  absolute
                  left-3
                  top-3
                  flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-zinc-700/60
                  bg-black/40
                  px-2.5
                  py-1.5
                  backdrop-blur-md
                  sm:left-4
                  sm:top-4
                  sm:gap-2
                  sm:px-3
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-lg shadow-violet-400/50 sm:h-2 sm:w-2" />

                <span className="text-[11px] text-zinc-300 sm:text-xs">
                  Camera active
                </span>
              </div>
            </div>

            {/* Bottom Section */}
            <div
              className="
                mt-4
                flex
                flex-col
                gap-4
                sm:mt-6
                sm:gap-5
                md:flex-row
                md:items-center
                md:justify-between
              "
            >

              {/* Expression */}
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-600 sm:text-xs">
                  Detected mood
                </p>

                <h2
                  className="
                    mt-1
                    truncate
                    text-xl
                    font-semibold
                    capitalize
                    tracking-tight
                    text-white
                    sm:text-2xl
                  "
                >
                  {expression}
                </h2>
              </div>

              {/* Detect Button */}
              <button
                onClick={handleClick}
                className="
                  h-11
                  w-full
                  shrink-0
                  rounded-xl
                  bg-violet-500
                  px-6
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-violet-500/10
                  transition-all
                  duration-200
                  hover:bg-violet-400
                  active:scale-[0.98]
                  sm:h-12
                  sm:px-7
                  md:w-auto
                "
              >
                Detect my mood
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
