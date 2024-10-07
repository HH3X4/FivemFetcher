const ServerPerformance = ({ performance }) => {
    if (!performance || (!performance.cpuUsage && !performance.memoryUsage)) {
        return null;
    }

    const getColorForValue = (value) => {
      if (value < 50) return 'green';
      if (value < 80) return 'orange';
      return 'red';
    };
  
    return (
      <div className="server-performance">
        <h3>Server Performance</h3>
        {performance.cpuUsage !== undefined && (
          <div className="performance-item">
            <span>CPU Usage:</span>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${performance.cpuUsage}%`,
                  backgroundColor: getColorForValue(performance.cpuUsage),
                }}
              ></div>
            </div>
            <span>{performance.cpuUsage}%</span>
          </div>
        )}
        {performance.memoryUsage !== undefined && (
          <div className="performance-item">
            <span>Memory Usage:</span>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${performance.memoryUsage}%`,
                  backgroundColor: getColorForValue(performance.memoryUsage),
                }}
              ></div>
            </div>
            <span>{performance.memoryUsage}%</span>
          </div>
        )}
      </div>
    );
  };
  
  window.ServerPerformance = ServerPerformance;
