import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;

    console.log(title.value, description.value);

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  };

  const fetchNotes = () => {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.note);
    });
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  const noteDelete = (id) => {
    axios.delete("http://localhost:3000/api/notes/" + id).then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  };

  const editNote=(id)=>{
    
     
    axios.patch('http://localhost:3000/api/notes/'+id)
     
  }

  return (
    <div onSubmit={submitHandler} className="h-screen w-screen bg-black p-2 ">
      <form className="flex gap-3 mb-4">
        <input
          name="title"
          className="p-2"
          type="text"
          placeholder="Enter Title"
        />
        <input
          name="description"
          className="p-2"
          type="text"
          placeholder="Enter Description"
        />
        <button
          className="active:scale-95 p-2 bg-blue-400 rounded"
          type="submit"
        >
          Add Notes
        </button>
      </form>
      <div className="flex flex-wrap">
        {notes.map((el, idx) => {
          return (
            <div key={idx} className="p-1 ">
              <div className="bg-gray-500 w-fit p-2 flex flex-col gap-1">
                <h1 className="text-2xl">{el.title}</h1>
                <p>{el.description}</p>
                <button
                  onClick={() => {
                    noteDelete(el._id);
                  }}
                  className="w-full p-0.5 bg-red-400"
                >
                  Delete
                </button>
                <button onClick={()=>{
                  editNote(el._id)
                }} className="w-full p-0.5 bg-green-400">Edit</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
