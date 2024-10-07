const { useState, useEffect } = React;

function App() {
  const [serverData, setServerData] = useState(null);
  const [error, setError] = useState(null);
  const [cfxLink, setCfxLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [serverHistory, setServerHistory] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [serverRules, setServerRules] = useState([]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    const savedHistory = localStorage.getItem('serverHistory');
    if (savedHistory) {
      setServerHistory(JSON.parse(savedHistory));
    }
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setServerData(null);
    try {
      const data = await fetchServerData(cfxLink);
      if (data.playerDataError) {
        setError(data.playerDataError);
      } else {
        setServerData(data);
        updateServerHistory(cfxLink);
        updateHistoricalData(data);
      }
    } catch (err) {
      setError('Failed to fetch server data. Please check the CFX link and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateServerHistory = (link) => {
    const updatedHistory = [link, ...serverHistory.filter(item => item !== link)].slice(0, 5);
    setServerHistory(updatedHistory);
    localStorage.setItem('serverHistory', JSON.stringify(updatedHistory));
  };

  const updateHistoricalData = (data) => {
    setHistoricalData(prevData => [...prevData, { timestamp: new Date(), playerCount: data.players.length }].slice(-24));
  };

  const handleRefresh = async () => {
    if (serverData) {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchServerData(cfxLink);
        setServerData(data);
        updateHistoricalData(data);
      } catch (err) {
        setError('Failed to refresh server data. The server might be offline or not responding.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <h1>Hexa - FiveM Server Fetcher</h1>
      <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-toggle">
        {darkMode ? '☀️' : '🌙'}
      </button>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={cfxLink}
          onChange={(e) => setCfxLink(e.target.value)}
          placeholder="Enter cfx.re link or IP address"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Fetch'}
        </button>
      </form>
      <SearchHistory history={serverHistory} onSelect={setCfxLink} />
      {isLoading && <LoadingSpinner />}
      {error && <div className="error">{error}</div>}
      {serverData && (
        <div className="server-data">
          <ServerInfo info={serverData} onRefresh={handleRefresh} />
          <ServerRules rules={serverData.vars && serverData.vars.sv_projectDesc ? serverData.vars.sv_projectDesc.split('\n').filter(rule => rule.trim() !== '') : []} />
          <ServerPerformance performance={{}} />
          {serverData.playerDataError && (
            <div className="warning">{serverData.playerDataError}</div>
          )}
          <PlayerList 
            players={serverData.players} 
            dataSource={serverData.playerDataSource} 
          />
          <PlayerChart historicalData={historicalData} />
        </div>
      )}
    </div>
  );
}

window.App = App;
