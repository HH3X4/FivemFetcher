const React = window.React;

const ServerInfo = ({ info, onRefresh }) => {
  const parseColorCodes = (text) => {
    const colorMap = {
      '^0': 'white', '^1': 'red', '^2': 'green', '^3': 'yellow',
      '^4': 'blue', '^5': 'cyan', '^6': 'purple', '^7': 'white',
      '^8': 'orange', '^9': 'grey'
    };

    const parts = text.split(/(\^[0-9])/g);
    return parts.map((part, index) => {
      if (part.startsWith('^') && colorMap[part]) {
        return <span key={index} style={{ color: colorMap[part] }}>{parts[index + 1]}</span>;
      }
      return part.startsWith('^') ? null : part;
    });
  };

  return (
    <div className="server-info">
      <h2>{parseColorCodes(info.hostname)}</h2>
      <div className="server-status">
        <div className={`status-indicator ${info.status === 'online' ? 'status-online' : 'status-offline'}`}></div>
        <span>{info.status === 'online' ? 'Online' : 'Offline'}</span>
      </div>
      <div className="server-details">
        <div className="server-detail">
          <span className="detail-label">IP:</span> {info.ip}:{info.port}
        </div>
        <div className="server-detail">
          <span className="detail-label">Players:</span> {info.players.length} / {info.maxPlayers}
        </div>
        <div className="server-detail">
          <span className="detail-label">OneSync:</span> {info.vars && info.vars.onesync_enabled ? 'Enabled' : 'Disabled'}
        </div>
      </div>
      <button onClick={onRefresh} className="refresh-button">Refresh</button>
    </div>
  );
};

window.ServerInfo = ServerInfo;
