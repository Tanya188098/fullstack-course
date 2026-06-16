const Total = (props) => {
  const totalExercises = props.parts.reduce(
    (sum, part) => sum + part.exercises,
    0,
  );

  return (
    <p style={{ fontWeight: "bold" }}>
      Total Number of Exercises: {totalExercises}
    </p>
  );
};

export default Total;
