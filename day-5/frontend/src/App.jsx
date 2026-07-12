import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [note, setNote] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteID, setNoteID] = useState(null);

  const fetchNote = () => {
    axios.get("https://backend-journey-cmgc.onrender.com/api/notes").then((res) => {
      setNote(res.data.note);
    });
  };
  useEffect(() => {
    fetchNote();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    if (noteID) {
      axios
        .patch("https://backend-journey-cmgc.onrender.com/api/notes/" + noteID, {
          description: description,
        })
        .then(() => {
          fetchNote();
          setNoteID(null)
        });
    } else {
      if (title.trim() !== "" && description.trim() !== "") {
        axios
          .post("https://backend-journey-cmgc.onrender.com/api/notes", {
            title: title,
            description: description,
          })
          .then(() => {
            fetchNote();
          });
      } else {
        alert("Please write Something!");
      }
    }

    setTitle("");
    setDescription("");
  };

  const deleteNote = (noteId) => {
    axios.delete("https://backend-journey-cmgc.onrender.com/api/notes/" + noteId).then(() => {
      fetchNote();
    });
  };

  const editNote = (noteId, idx) => {
    setNoteID(noteId);
    setTitle(note[idx].title);
    setDescription(note[idx].description);
  };

  return (
    <div className="h-screen w-full bg-black text-amber-50">
      <form
        onSubmit={submitHandler}
        className="p-2 text-amber-50 flex gap-4 text-2xl mb-4"
      >
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type="text"
          placeholder="Enter Title"
        />
        <input
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          type="text"
          placeholder="Enter Description"
        />
        <button
          className="bg-blue-300 p-2 rounded text-black cursor-pointer"
          type="submit"
        >
          Add Note
        </button>
      </form>
      <div className="flex p-4 gap-2 ">
        {note.map((elem, idx) => {
          return (
            <div
              key={idx}
              className="p-2 px-4 bg-gray-700 items-center w-fit rounded"
            >
              <h1 className="text-2xl">{elem.title}</h1>
              <p>{elem.description}</p>
              <div className="flex justify-between gap-3">
                <button
                  onClick={() => {
                    editNote(elem._id, idx);
                    
                  }}
                  className="bg-blue-400 p-1 rounded-2xl"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    deleteNote(elem._id);
                  }}
                  className="bg-red-400 px-2 rounded-2xl"
                >
                  X
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
