require("dotenv").config();

const express = require("express");
var morgan = require("morgan");
const app = express();
const Person = require("./models/person");

const persons = [];

app.use(express.json());
app.use(express.static("dist"));

// logger
morgan.token("body", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time :body"),
);

// get the list of people
app.get("/api/persons", (request, response) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => {
      console.log("Error to fetch persons: ", error.message);
      response.status(500).json({ error: "Failed to fetch persons" });
    });
});

// get information
app.get("/api/info", (request, response) => {
  // Create date and time during the request
  const currentDate = new Date();

  response.send(`
    <div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${currentDate}</p>
    </div>
  `);
});

// get person by id
app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

// add new person entity
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "Person name missing",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "Person number missing",
    });
  }

  const nameExists = persons.some((p) => p?.name === body.name);
  if (nameExists) {
    return response.status(400).json({
      error: "Name must be unique",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => {
      console.log("Error saving person: ", error.message);
      response.status(500).json({ error: "Failed to save person" });
    });
});

// delete person by id
app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      console.log("Error deleting person: ", error.message);
      response.status(500).json({ error: "Failed to delete person" });
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
