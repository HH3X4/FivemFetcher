const ServerRules = ({ rules }) => {
  if (!rules || rules.length === 0) {
    return null;
  }

  return (
    <div className="server-rules">
      <h3>Server Rules</h3>
      <ul>
        {rules.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>
    </div>
  );
};

window.ServerRules = ServerRules;
