import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";

export default function FaceExpression({ onClick = () => {} }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("Detecting...");

    useEffect(() => {
        init({ landmarkerRef, videoRef, streamRef });

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick() {
        const expression = detect({
            landmarkerRef,
            videoRef,
            setExpression,
        });

        console.log(expression);
        onClick(expression);
    }

    return (
        <div className="min-h-screen w-full bg-gray-950 px-4 py-8 flex items-center justify-center">
            <div className="w-full max-w-2xl rounded-2xl bg-gray-900 p-4 sm:p-6 md:p-8 shadow-2xl">

                {/* Heading */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                        Face Expression Detector
                    </h1>

                    <p className="mt-2 text-sm sm:text-base text-gray-400">
                        Show your expression and click the button to detect it.
                    </p>
                </div>

                {/* Camera */}
                <div className="relative w-full overflow-hidden rounded-xl bg-black aspect-video">
                    <video
                        ref={videoRef}
                        className="absolute inset-0 h-full w-full object-cover"
                        playsInline
                    />
                </div>

                {/* Expression */}
                <div className="mt-6 text-center">
                    <p className="text-sm font-medium text-gray-400">
                        Current Expression
                    </p>

                    <h2 className="mt-2 text-2xl sm:text-3xl font-bold capitalize text-white">
                        {expression}
                    </h2>
                </div>

                {/* Button */}
                <button
                    onClick={handleClick}
                    className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm sm:text-base font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    Detect Expression
                </button>

            </div>
        </div>
    );
}