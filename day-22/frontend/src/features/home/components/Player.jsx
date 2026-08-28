import React, { useEffect, useRef, useState } from "react";
import { useSong } from "../hooks/useSong";

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${secs}`;
};

const Player = () => {
  const { song } = useSong();

  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [showSpeed, setShowSpeed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!audioRef.current || !song?.url) return;

    audioRef.current.load();

    setIsPlaying(false);
    setCurrentTime(0);
  }, [song?.url]);

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const skip = (seconds) => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = Math.min(
      Math.max(audio.currentTime + seconds, 0),
      duration
    );
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;

    setDuration(audioRef.current.duration);
  };

  const handleProgressClick = (e) => {
    if (!progressRef.current || !audioRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();

    const ratio = (e.clientX - rect.left) / rect.width;

    const newTime = ratio * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);

    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }

    setShowSpeed(false);
  };

  const handleVolume = (e) => {
    const value = parseFloat(e.target.value);

    setVolume(value);
    setIsMuted(value === 0);

    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isMuted) {
      audio.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const handleSongEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const progress = duration
    ? (currentTime / duration) * 100
    : 0;

  if (!song) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-zinc-800/80 bg-[#111113]/95 px-3 py-3 shadow-2xl backdrop-blur-xl sm:px-5 sm:py-4">
      
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3">

        {/* Top / Song Information */}
        <div className="flex items-center gap-3">

          {/* Poster */}
          <img
            src={song.posterUrl}
            alt={song.title}
            className="h-11 w-11 shrink-0 rounded-lg border border-zinc-800 object-cover sm:h-12 sm:w-12"
          />

          {/* Song Info */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              {song.title}
            </p>

            <p className="mt-0.5 text-xs capitalize text-violet-400">
              {song.mood}
            </p>
          </div>

          {/* Speed */}
          <div className="relative">

            <button
              onClick={() => setShowSpeed(!showSpeed)}
              className="
                rounded-lg
                border border-zinc-800
                bg-[#09090b]
                px-2.5 py-1.5
                text-xs font-medium
                text-zinc-400
                transition
                hover:border-violet-400/40
                hover:text-white
              "
            >
              {speed}×
            </button>

            {showSpeed && (
              <div
                className="
                  absolute
                  bottom-10
                  right-0
                  flex
                  min-w-20
                  flex-col
                  overflow-hidden
                  rounded-xl
                  border border-zinc-800
                  bg-[#111113]
                  p-1
                  shadow-2xl
                "
              >
                {SPEED_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSpeedChange(option)}
                    className={`
                      rounded-lg
                      px-3 py-2
                      text-xs
                      transition
                      ${
                        option === speed
                          ? "bg-violet-500 text-white"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      }
                    `}
                  >
                    {option}×
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2">

          <span className="w-8 text-right text-[10px] text-zinc-600 sm:w-10 sm:text-xs">
            {formatTime(currentTime)}
          </span>

          <div
            ref={progressRef}
            onClick={handleProgressClick}
            className="
              relative
              h-1.5
              flex-1
              cursor-pointer
              rounded-full
              bg-zinc-800
            "
          >
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-violet-500"
              style={{ width: `${progress}%` }}
            />

            <div
              className="
                absolute
                top-1/2
                h-3
                w-3
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-violet-400
                shadow-lg
                shadow-violet-500/40
              "
              style={{ left: `${progress}%` }}
            />
          </div>

          <span className="w-8 text-[10px] text-zinc-600 sm:w-10 sm:text-xs">
            {formatTime(duration)}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2 sm:gap-4">

          {/* Back */}
          <button
            onClick={() => skip(-5)}
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-full
              text-zinc-500
              transition
              hover:bg-zinc-800
              hover:text-white
              sm:h-10 sm:w-10
            "
            title="Back 5 seconds"
          >
            ↶
            <span className="ml-0.5 text-[9px]">5</span>
          </button>

          {/* Play */}
          <button
            onClick={togglePlay}
            className="
              flex
              h-11 w-11
              items-center justify-center
              rounded-full
              bg-violet-500
              text-white
              shadow-lg
              shadow-violet-500/20
              transition
              hover:bg-violet-400
              active:scale-95
              sm:h-12 sm:w-12
            "
          >
            {isPlaying ? (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
              >
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="22"
                height="22"
              >
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            )}
          </button>

          {/* Forward */}
          <button
            onClick={() => skip(5)}
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-full
              text-zinc-500
              transition
              hover:bg-zinc-800
              hover:text-white
              sm:h-10 sm:w-10
            "
            title="Forward 5 seconds"
          >
            <span className="text-[9px]">5</span>
            ↷
          </button>

          {/* Volume */}
          <div className="ml-1 hidden items-center gap-2 sm:flex">

            <button
              onClick={toggleMute}
              className="
                text-zinc-500
                transition
                hover:text-white
              "
            >
              {isMuted || volume === 0 ? "🔇" : "🔊"}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolume}
              className="w-20 accent-violet-500"
            />
          </div>
        </div>

      </div>

      <audio
        ref={audioRef}
        src={song.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnd}
      />
    </div>
  );
};

export default Player; 