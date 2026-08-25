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
app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

// get information
// get information
app.get("/info", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.send(`
        <div>
          <p>Phonebook has info for ${persons.length} people</p>
          <p>${new Date()}</p>
        </div>
      `);
    })
    .catch((error) => next(error));
});

// get person by id
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// add new person entity
app.post("/api/persons", (request, response, next) => {
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

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

//update contact number by id
app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  Person.findById(request.params.id).then((person) => {
    if (!person) {
      return response.status(404).end();
    }

    if (person.name === name) {
      person.number = number;
      person
        .save()
        .then((updatedPerson) => {
          response.json(updatedPerson);
        })
        .catch((error) => next(error));
    }
  });
});

// delete person by id
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// error middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
