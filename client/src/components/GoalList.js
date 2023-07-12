function GoalList({ goals }) {
    return (
      <ul>
        {goals.map((goal, index) => (
          <li key={index}>
            <h3>{goal.title}</h3>
            <p>{goal.description}</p>
            <p>Fecha límite: {goal.deadline}</p>
          </li>
        ))}
      </ul>
    );
  }

  
export default GoalList