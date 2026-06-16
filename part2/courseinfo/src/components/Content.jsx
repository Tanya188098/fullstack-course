import Part from "./Part";

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part, id) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

export default Content;
