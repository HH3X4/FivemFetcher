const React = window.React;
const { useState, useMemo } = React;

const PlayerList = ({ players, dataSource }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredAndSortedPlayers = useMemo(() => {
    return players
      .filter(player => 
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'id') {
          return a.id - b.id;
        }
        return 0;
      });
  }, [players, searchTerm, sortBy]);

  const getIdentifierLink = (identifier) => {
    const [type, id] = identifier.split(':');
    switch (type) {
      case 'steam':
        return `https://steamcommunity.com/profiles/${BigInt(`0x${id}`).toString()}`;
      case 'discord':
        return `https://discordapp.com/users/${id}`;
      case 'xbl':
        return `https://account.xbox.com/en-us/profile?gamertag=${id}`;
      case 'live':
        return `https://account.xbox.com/en-us/profile?gamertag=${id}`;
      default:
        return null;
    }
  };

  return (
    <div className="player-list">
      <h3>Players ({players.length})</h3>
      <input
        type="text"
        placeholder="Search players..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="player-search"
      />
      <div className="sort-buttons">
        <button onClick={() => setSortBy('name')} className={sortBy === 'name' ? 'active' : ''}>Sort by Name</button>
        <button onClick={() => setSortBy('id')} className={sortBy === 'id' ? 'active' : ''}>Sort by ID</button>
      </div>
      <ul className="player-grid">
        {filteredAndSortedPlayers.map((player, index) => (
          <li key={index} className="player-card">
            <h4 className="player-name">{player.name}</h4>
            <div className="player-id">ID: {player.id}</div>
            <div className="player-identifiers">
              <strong>Identifiers:</strong>
              <ul>
                {player.identifiers.map((identifier, idx) => {
                  const link = getIdentifierLink(identifier);
                  return (
                    <li key={idx}>
                      {link ? (
                        <a href={link} target="_blank" rel="noopener noreferrer">{identifier}</a>
                      ) : (
                        identifier
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

window.PlayerList = PlayerList;
