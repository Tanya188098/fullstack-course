require("dotenv").config();

const express = require("express");
const app = express();
const Note = require("./models/note");

let notes = [];

app.use(express.json());
app.use(express.static("dist"));

// get notes from the database
app.get("/api/notes", (request, response) => {
  Note.find({})
    .then((notes) => {
      response.json(notes);
    })
    .catch((error) => {
      console.log("Error to fetch notes:", error.message);
      response.status(500).json({ error: "Database query failed" });
    });
});

// get a note by id from the database
app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

// add a new note to the database
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => {
      console.log("Error to save a note:", error.message);
      response.status(500).json({ error: "Failed to save note" });
    });
});

// delete a note by id from the database
app.delete("/api/notes/:id", (request, response) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      console.log("Error to delete note:", error.message);
      response.status(400).send({ error: "malformatted id" });
    });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
