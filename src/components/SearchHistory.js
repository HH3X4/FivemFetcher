const SearchHistory = ({ history, onSelect }) => {
  return (
    <div className="search-history">
      <h3>Recent Searches</h3>
      <ul>
        {history.map((link, index) => (
          <li key={index} onClick={() => onSelect(link)}>{link}</li>
        ))}
      </ul>
    </div>
  );
};

window.SearchHistory = SearchHistory;
