const React = window.React;
const { useState } = React;

const ResourceList = ({ resources }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayResources = isExpanded ? resources : resources.slice(0, 5);

  return (
    <div className="resource-list">
      <h3>Server Resources</h3>
      <ul>
        {displayResources.map((resource, index) => (
          <li key={index}>{resource}</li>
        ))}
      </ul>
      {resources.length > 5 && (
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Show Less' : `Show More (${resources.length - 5} more)`}
        </button>
      )}
    </div>
  );
};

window.ResourceList = ResourceList;
