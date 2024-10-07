async function getServerInfoFromCfx(cfxLink) {
  const cfxId = cfxLink.split('/').pop();
  try {
    const response = await fetch(`https://servers-frontend.fivem.net/api/servers/single/${cfxId}`);
    const data = await response.json();
    if (data && data.Data) {
      const serverData = data.Data;
      return {
        ip: serverData.connectEndPoints[0].split(':')[0],
        port: serverData.connectEndPoints[0].split(':')[1],
        hostname: serverData.hostname,
        maxPlayers: serverData.svMaxClients,
        resources: serverData.resources || [],
        vars: serverData.vars || {},
        status: 'online',
        players: serverData.players || [],
      };
    }
    throw new Error('Invalid server data');
  } catch (error) {
    console.error('Error fetching server info from cfx.re:', error);
    throw error;
  }
}

async function fetchServerData(cfxLink) {
  try {
    const serverInfo = await getServerInfoFromCfx(cfxLink);
    return {
      ...serverInfo,
      info: serverInfo.vars || {},
      dynamic: {},
      playerDataSource: 'cfx'
    };
  } catch (error) {
    console.error('Error fetching server data:', error);
    return {
      hostname: 'Unknown Server',
      ip: 'N/A',
      port: 'N/A',
      players: [],
      maxPlayers: 0,
      resources: [],
      vars: {},
      status: 'offline',
      playerDataError: 'Unable to fetch server data. The server might be offline or not responding.'
    };
  }
}

window.fetchServerData = fetchServerData;
