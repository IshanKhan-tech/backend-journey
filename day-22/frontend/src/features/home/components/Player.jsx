import React, { useEffect, useRef, useState } from "react";
import { useSong } from "../hooks/useSong";

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

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

  // =========================
  // NEW SONG
  // =========================

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !song?.url) {
      return;
    }

    let cancelled = false;

    const loadAndPlay = async () => {
      try {
        // Stop old song
        audio.pause();

        // Reset player state
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);

        // Apply current settings
        audio.playbackRate = speed;
        audio.volume = isMuted ? 0 : volume;

        // Load new source
        audio.src = song.url;
        audio.load();

        // Wait until browser can play the new source
        const handleCanPlay = async () => {
          if (cancelled) return;

          try {
            await audio.play();

            if (!cancelled) {
              setIsPlaying(true);
            }
          } catch (error) {
            if (!cancelled) {
              console.error("Audio play failed:", error);
              setIsPlaying(false);
            }
          }
        };

        audio.addEventListener("canplay", handleCanPlay, {
          once: true,
        });
      } catch (error) {
        if (!cancelled) {
          console.error("Audio load failed:", error);
        }
      }
    };

    loadAndPlay();

    return () => {
      cancelled = true;

      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    };

    // Only when song changes
  }, [song?.url]);

  // =========================
  // PLAY / PAUSE
  // =========================

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio || !song?.url) return;

    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Audio play failed:", error);
      setIsPlaying(false);
    }
  };

  // =========================
  // SKIP
  // =========================

  const skip = (seconds) => {
    const audio = audioRef.current;

    if (!audio || !Number.isFinite(audio.duration)) {
      return;
    }

    const newTime = Math.min(
      Math.max(audio.currentTime + seconds, 0),
      audio.duration
    );

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // =========================
  // AUDIO EVENTS
  // =========================

  const handleTimeUpdate = () => {
    const audio = audioRef.current;

    if (!audio) return;

    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (Number.isFinite(audio.duration)) {
      setDuration(audio.duration);
    }
  };

  const handleDurationChange = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (Number.isFinite(audio.duration)) {
      setDuration(audio.duration);
    }
  };

  const handleSongEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // =========================
  // PROGRESS BAR
  // =========================

  const handleProgressClick = (e) => {
  const audio = audioRef.current;

  if (!audio || !Number.isFinite(audio.duration)) return;

  const rect = e.currentTarget.getBoundingClientRect();

  const ratio = Math.min(
    Math.max((e.clientX - rect.left) / rect.width, 0),
    1
  );

  audio.currentTime = ratio * audio.duration;
};

  // =========================
  // SPEED
  // =========================

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);

    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }

    setShowSpeed(false);
  };

  // =========================
  // VOLUME
  // =========================

  const handleVolume = (e) => {
    const value = Number(e.target.value);

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
      const newVolume = volume || 0.5;

      audio.volume = newVolume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const progress =
    duration > 0
      ? Math.min((currentTime / duration) * 100, 100)
      : 0;

  if (!song) {
    return null;
  }

  return (
    <div
      className="
        fixed
        bottom-0
        left-0
        z-50
        w-full
        border-t
        border-zinc-800/80
        bg-[#111113]/95
        px-3
        py-2
        shadow-2xl
        backdrop-blur-xl
        sm:px-5
        sm:py-2.5
      "
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Poster */}
          <img
            src={song.posterUrl}
            alt={song.title}
            className="
              h-10
              w-10
              shrink-0
              rounded-lg
              border
              border-zinc-800
              object-cover
              sm:h-11
              sm:w-11
            "
          />

          {/* Song Info */}
          <div
            className="
              min-w-0
              w-[120px]
              sm:w-[180px]
              lg:w-[220px]
            "
          >
            <p className="truncate text-xs font-semibold text-white sm:text-sm">
              {song.title}
            </p>

            <p className="truncate text-[10px] capitalize text-violet-400 sm:text-xs">
              {song.mood}
            </p>
          </div>

          {/* Desktop Progress */}
          <div className="hidden min-w-0 flex-1 items-center gap-2 md:flex">

            <span className="w-8 text-right text-[10px] text-zinc-600">
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
                className="
                  absolute
                  left-0
                  top-0
                  h-full
                  rounded-full
                  bg-violet-500
                "
                style={{
                  width: `${progress}%`,
                }}
              />

              <div
                className="
                  absolute
                  top-1/2
                  h-2.5
                  w-2.5
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-violet-400
                "
                style={{
                  left: `${progress}%`,
                }}
              />
            </div>

            <span className="w-8 text-[10px] text-zinc-600">
              {formatTime(duration)}
            </span>
          </div>

          {/* Controls */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">

            {/* Back 5 */}
            <button
              onClick={() => skip(-5)}
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                text-zinc-500
                transition
                hover:bg-zinc-800
                hover:text-white
                sm:h-9
                sm:w-9
              "
              title="Back 5 seconds"
            >
              <span className="text-[10px]">
                ↶5
              </span>
            </button>

            {/* Play */}
            <button
              onClick={togglePlay}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-violet-500
                text-white
                shadow-lg
                shadow-violet-500/20
                transition
                hover:bg-violet-400
                active:scale-95
                sm:h-10
                sm:w-10
              "
            >
              {isPlaying ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="16"
                  height="16"
                >
                  <rect
                    x="6"
                    y="4"
                    width="4"
                    height="16"
                    rx="1"
                  />
                  <rect
                    x="14"
                    y="4"
                    width="4"
                    height="16"
                    rx="1"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="18"
                  height="18"
                >
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              )}
            </button>

            {/* Forward 5 */}
            <button
              onClick={() => skip(5)}
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                text-zinc-500
                transition
                hover:bg-zinc-800
                hover:text-white
                sm:h-9
                sm:w-9
              "
              title="Forward 5 seconds"
            >
              <span className="text-[10px]">
                5↷
              </span>
            </button>
          </div>

          {/* Speed */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setShowSpeed((prev) => !prev)}
              className="
                rounded-lg
                border
                border-zinc-800
                bg-[#09090b]
                px-2.5
                py-1.5
                text-[10px]
                font-medium
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
                  min-w-[70px]
                  flex-col
                  overflow-hidden
                  rounded-xl
                  border
                  border-zinc-800
                  bg-[#111113]
                  p-1
                  shadow-2xl
                "
              >
                {SPEED_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() =>
                      handleSpeedChange(option)
                    }
                    className={`
                      rounded-lg
                      px-2.5
                      py-1.5
                      text-[10px]
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

          {/* Volume */}
          <div className="hidden items-center gap-2 lg:flex">
            <button
              onClick={toggleMute}
              className="
                text-sm
                text-zinc-500
                transition
                hover:text-white
              "
            >
              {isMuted || volume === 0
                ? "🔇"
                : "🔊"}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolume}
              className="w-16 accent-violet-500"
            />
          </div>
        </div>

        {/* Mobile Progress */}
        <div className="mt-1.5 flex items-center gap-2 md:hidden">

          <span className="w-7 text-right text-[9px] text-zinc-600">
            {formatTime(currentTime)}
          </span>

          <div
            ref={progressRef}
            onClick={handleProgressClick}
            className="
              relative
              h-1
              flex-1
              cursor-pointer
              rounded-full
              bg-zinc-800
            "
          >
            <div
              className="
                absolute
                left-0
                top-0
                h-full
                rounded-full
                bg-violet-500
              "
              style={{
                width: `${progress}%`,
              }}
            />

            <div
              className="
                absolute
                top-1/2
                h-2
                w-2
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-violet-400
              "
              style={{
                left: `${progress}%`,
              }}
            />
          </div>

          <span className="w-7 text-[9px] text-zinc-600">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onDurationChange={handleDurationChange}
        onEnded={handleSongEnd}
      />
    </div>
  );
};

export default Player;