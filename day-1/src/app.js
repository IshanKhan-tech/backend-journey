const express = require("express");

const app = express();
app.use(express.json());
const notes = [];

app.post("/notes", (req, res) => {
  notes.push(req.body);
  console.log(notes);

  res.send("hello");
});

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.delete("/notes/:index", (req, res) => {
    delete notes[ req.params.index ]
    res.send("note deleted successfully")
})

app.patch('/notes/:index',(req,res)=>{
  notes[req.params.index].description = req.body.description
    res.send("note modified  successfully")

})

module.exports = app;
