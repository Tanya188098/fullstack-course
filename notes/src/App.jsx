import Note from "./components/Note";

const App = ({ notes }) => {
  console.log("1");

  setTimeout(() => {
    console.log("2");
  }, 100);

  setTimeout(() => {
    console.log("3");
  }, 0);

  console.log("4");

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};
export default App;
