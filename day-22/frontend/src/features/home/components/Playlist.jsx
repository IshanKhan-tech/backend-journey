import React from "react";

const Playlist = ({songs, handleSelectSong}) => {

  return (
    <aside
      className="
        flex
        h-full
        min-h-[420px]
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-zinc-800/70
        bg-[#111113]
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/60 px-4 py-4 sm:px-5">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-600">
            Your mood
          </p>

          <h2 className="mt-1 text-base font-semibold tracking-tight text-white sm:text-lg">
            Happy playlist
          </h2>
        </div>

        <span
          className="
            rounded-full
            border
            border-violet-400/20
            bg-violet-500/10
            px-2.5
            py-1
            text-[10px]
            font-medium
            text-violet-300
          "
        >
          5 songs
        </span>
      </div>

      {/* Playlist */}
      <div className="min-h-0 flex-1 overflow-y-auto p-2.5 sm:p-3">
        <div className="space-y-1">
          {songs.map((song, index) => (
            <button
            onClick={()=>{
              handleSelectSong(song)
            }}
              key={song._id}
              type="button"
              className="
                group
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-2.5
                py-2.5
                text-left
                transition
                duration-200
                hover:bg-[#17171a]
              "
            >
              {/* Number */}
              <span className="w-4 shrink-0 text-center text-[10px] text-zinc-700 group-hover:text-violet-400">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Poster */}
              <img
                src={song.posterUrl}
                alt={song.title}
                className="
                  h-10
                  w-10
                  shrink-0
                  rounded-lg
                  object-cover
                  ring-1
                  ring-zinc-800/80
                "
              />

              {/* Song Info */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-zinc-200 transition group-hover:text-white sm:text-sm">
                  {song.title}
                </p>

                <p className="mt-0.5 truncate text-[10px] text-zinc-600 sm:text-[11px]">
                  {song.artist}
                </p>
              </div>

              {/* Duration */}
              <span className="shrink-0 text-[10px] text-zinc-700">
                {song.duration}
              </span>

              {/* Play */}
              <span
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-zinc-600
                  opacity-0
                  transition-all
                  group-hover:bg-violet-500
                  group-hover:text-white
                  group-hover:opacity-100
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-3.5 w-3.5"
                >
                  <path d="M8 5.14v13.72c0 .76.82 1.24 1.47.83l10.58-6.86a.98.98 0 0 0 0-1.66L9.47 4.31A.98.98 0 0 0 8 5.14Z" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-800/60 px-4 py-3 sm:px-5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-zinc-600">
            Based on your detected mood
          </span>

          <button
            type="button"
            className="
              text-[10px]
              font-medium
              text-violet-400
              transition
              hover:text-violet-300
            "
          >
            View all
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Playlist;