import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const sumScore = good * 1 + neutral * 0 + bad * -1;

  const averageScore = total === 0 ? 0 : sumScore / total;
  const positivePercentage = total === 0 ? 0 : (good / total) * 100;

  if (total === 0) {
    return (
      <tr>
        <td>No feedback given</td>
      </tr>
    );
  }

  return (
    <>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="Total" value={total} />
      <StatisticLine text="Average Score" value={averageScore} />
      <StatisticLine
        text="Positive Percentage"
        value={`${positivePercentage}%`}
      />
    </>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div style={{ maxWidth: "500px" }}>
      <h1>Unicafe</h1>
      <hr />
      <div>
        <h2>Give feedback</h2>
        <Button onClick={handleGoodClick} text="good" />
        <Button onClick={handleNeutralClick} text="neutral" />
        <Button onClick={handleBadClick} text="bad" />
      </div>

      <div>
        <h2>Statistics</h2>

        <table>
          <tbody>
            <Statistics good={good} neutral={neutral} bad={bad} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
