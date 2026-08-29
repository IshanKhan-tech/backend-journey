import React, { useRef, useState } from "react";
import { useSong } from "../hooks/useSong";

const MOODS = [
  {
    value: "happy",
    label: "Happy",
    emoji: "😊",
  },
  {
    value: "sad",
    label: "Sad",
    emoji: "😔",
  },
  {
    value: "surprised",
    label: "Surprised",
    emoji: "😮",
  },
];

const UploadSong = () => {
  const fileInputRef = useRef(null);

  const [selectedMood, setSelectedMood] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
  };

  const {handlePostSong} = useSong()

  const handleUpload = () => {
    if (!selectedMood || !selectedFile) return;

    
    console.log({
      mood: selectedMood,
      song: selectedFile,
    });
    handlePostSong({
      mood: selectedMood,
      file: selectedFile
    })
  };

  return (
    <section
      className="
        mt-4
        rounded-2xl
        border border-zinc-800/70
        bg-[#111113]
        p-4
        sm:p-5
      "
    >
      {/* Header */}
      <div>
        <h2 className="text-sm font-semibold text-white sm:text-base">
          Add to library
        </h2>

        <p className="mt-1 text-[11px] text-zinc-600 sm:text-xs">
          Tag your song with a mood.
        </p>
      </div>

      {/* Mood */}
      <div className="mt-4">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-zinc-600">
          Mood
        </p>

        <div className="flex flex-wrap gap-2">
          {MOODS.map((mood) => {
            const selected = selectedMood === mood.value;

            return (
              <label
                key={mood.value}
                className={`
                  inline-flex
                  cursor-pointer
                  items-center
                  gap-1.5
                  rounded-lg
                  border
                  px-3
                  py-2
                  transition-all
                  duration-200

                  ${
                    selected
                      ? "border-violet-400/40 bg-violet-500/10 text-violet-300"
                      : "border-zinc-800 bg-[#09090b] text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                  }
                `}
              >
                <input
                  type="radio"
                  name="mood"
                  value={mood.value}
                  checked={selected}
                  onChange={(e) => setSelectedMood(e.target.value)}
                  className="sr-only"
                />

                {/* Tiny radio */}
                <span
                  className={`
                    flex
                    h-3
                    w-3
                    items-center
                    justify-center
                    rounded-full
                    border
                    transition
                    ${
                      selected
                        ? "border-violet-400"
                        : "border-zinc-700"
                    }
                  `}
                >
                  {selected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  )}
                </span>

                <span className="text-xs">
                  {mood.emoji}
                </span>

                <span className="text-[11px] font-medium">
                  {mood.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* File */}
      <div className="mt-4">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-zinc-600">
          Audio
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="
            flex
            w-full
            items-center
            justify-between
            gap-3
            rounded-xl
            border
            border-dashed
            border-zinc-800
            bg-[#09090b]
            px-3
            py-2.5
            text-left
            transition
            hover:border-violet-400/25
          "
        >
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-zinc-300">
              {selectedFile
                ? selectedFile.name
                : "Choose an audio file"}
            </p>

            {!selectedFile && (
              <p className="mt-0.5 text-[10px] text-zinc-600">
                MP3, WAV, OGG
              </p>
            )}
          </div>

          <span className="shrink-0 text-[11px] font-medium text-violet-400">
            Browse
          </span>
        </button>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          {selectedMood ? (
            <p className="text-[10px] text-zinc-600">
              Mood:{" "}
              <span className="capitalize text-zinc-400">
                {selectedMood}
              </span>
            </p>
          ) : (
            <p className="text-[10px] text-zinc-700">
              Select a mood
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleUpload}
          disabled={!selectedMood || !selectedFile}
          className="
            shrink-0
            rounded-lg
            bg-violet-500
            px-4
            py-2
            text-[11px]
            font-semibold
            text-white
            transition
            hover:bg-violet-400
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:bg-zinc-800
            disabled:text-zinc-600
          "
        >
          Upload
        </button>
      </div>
    </section>
  );
};

export default UploadSong;