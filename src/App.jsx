import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Logo = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  height: 40px;
  width: auto;
`;

const XLogo = styled.a`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #ffffff;
  font-size: 24px;
  text-decoration: none;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    color: #1DA1F2;
    transform: scale(1.1);
  }
`;

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: #0a0a0a;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
`;

const MainBox = styled.div`
  width: 1200px;
  height: 800px;
  background: rgba(15, 15, 15, 0.8);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: grid;
  grid-template-columns: 200px 1fr;
  overflow: hidden;
`;

const LabelContainer = styled.div`
  background: rgba(20, 20, 20, 0.8);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
`;

const Label = styled.div`
  color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'};
  font-size: 14px;
  font-weight: 500;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
  }
`;

const LiveIndicator = styled.div`
  width: 8px;
  height: 8px;
  background: #ff4444;
  border-radius: 50%;
  margin-right: 8px;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const ContentArea = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
  overflow: hidden;
`;

const ContentTitle = styled.h2`
  font-size: 24px;
  color: #ffffff;
  margin-bottom: 1rem;
`;

const Metric = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const MetricLabel = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
`;

const MetricValue = styled.span`
        color: #ffffff;
  font-weight: 500;
`;

const ControlBox = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition: all 0.3s ease;
  height: 300px;
  overflow: hidden;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const ControlBoxTitle = styled.h3`
  font-size: 18px;
  color: #ffffff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const ControlGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1.5rem;
  margin: 2rem;
  height: 650px;
  align-items: center;
`;

const LiveValue = styled.span`
        color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;

const App = () => {
    const [activeTab, setActiveTab] = useState('control');
    const [controlStats, setControlStats] = useState({
        temperature: 22.5,
        humidity: 45,
        pressure: 1013,
        oxygen: 21,
        testStatus: 'Active',
        testProgress: 75,
        safetyStatus: 'Secure',
        fireSuppression: 'Ready',
        systemHealth: 98,
        cpuLoad: 42,
        memoryUsage: 65,
        cognitiveScore: 85,
        behavioralPattern: 'Stable',
        physicalMetrics: 92,
        envResponse: 'Optimal',
        realtimeData: 1250,
        statAccuracy: 99.8,
        exportStatus: 'Active',
        visualizationLoad: 45,
        chamberTemp: 24.5,
        behaviorScore: 88,
        physicalStatus: 'Normal',
        envMetrics: 95
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setControlStats(prev => ({
                ...prev,
                temperature: (22.5 + Math.random() * 0.5).toFixed(1),
                humidity: (45 + Math.random() * 2).toFixed(0),
                pressure: (1013 + Math.random() * 2).toFixed(0),
                oxygen: (21 + Math.random() * 0.1).toFixed(1),
                testProgress: (75 + Math.random() * 2).toFixed(0),
                systemHealth: (98 + Math.random() * 1).toFixed(0),
                cpuLoad: (42 + Math.random() * 3).toFixed(0),
                memoryUsage: (65 + Math.random() * 2).toFixed(0),
                cognitiveScore: (85 + Math.random() * 3).toFixed(0),
                physicalMetrics: (92 + Math.random() * 2).toFixed(0),
                realtimeData: (1250 + Math.random() * 50).toFixed(0),
                statAccuracy: (99.8 + Math.random() * 0.1).toFixed(1),
                visualizationLoad: (45 + Math.random() * 5).toFixed(0),
                chamberTemp: (24.5 + Math.random() * 0.3).toFixed(1),
                behaviorScore: (88 + Math.random() * 2).toFixed(0),
                physicalStatus: ['Normal', 'Stable', 'Optimal'][Math.floor(Math.random() * 3)],
                envMetrics: (95 + Math.random() * 2).toFixed(0)
            }));
        }, 2000);

        // Separate interval for behavioral pattern and environmental response
        const behaviorInterval = setInterval(() => {
            setControlStats(prev => ({
                ...prev,
                behavioralPattern: ['Stable', 'Analyzing', 'Processing'][Math.floor(Math.random() * 3)],
                envResponse: ['Optimal', 'Normal', 'Adjusting'][Math.floor(Math.random() * 3)]
            }));
        }, 5000); // Update every 5 seconds instead of 2

        return () => {
            clearInterval(interval);
            clearInterval(behaviorInterval);
        };
    }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'control':
        return (
          <>
            <ContentTitle>Control Panel</ContentTitle>
            <ControlGrid>
              <ControlBox>
                <ControlBoxTitle>Environmental Controls</ControlBoxTitle>
                <Metric>
                  <MetricLabel>Temperature</MetricLabel>
                  <LiveValue>{controlStats.temperature}°C</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Humidity</MetricLabel>
                  <LiveValue>{controlStats.humidity}%</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Pressure</MetricLabel>
                  <LiveValue>{controlStats.pressure}hPa</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Oxygen Level</MetricLabel>
                  <LiveValue>{controlStats.oxygen}%</LiveValue>
                </Metric>
              </ControlBox>

              <ControlBox>
                <ControlBoxTitle>Test Chamber Status</ControlBoxTitle>
                <Metric>
                  <MetricLabel>Current Status</MetricLabel>
                  <LiveValue>{controlStats.testStatus}</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Test Progress</MetricLabel>
                  <LiveValue>{controlStats.testProgress}%</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Chamber Pressure</MetricLabel>
                  <LiveValue>1.2 atm</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Test Phase</MetricLabel>
                  <LiveValue>Phase 3</LiveValue>
                </Metric>
              </ControlBox>

              <ControlBox>
                <ControlBoxTitle>Safety Systems</ControlBoxTitle>
                <Metric>
                  <MetricLabel>System Status</MetricLabel>
                  <LiveValue>{controlStats.safetyStatus}</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Fire Suppression</MetricLabel>
                  <LiveValue>{controlStats.fireSuppression}</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Emergency Power</MetricLabel>
                  <LiveValue>Standby</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Radiation Shield</MetricLabel>
                  <LiveValue>Active</LiveValue>
                </Metric>
              </ControlBox>

              <ControlBox>
                <ControlBoxTitle>System Health</ControlBoxTitle>
                <Metric>
                  <MetricLabel>Overall Health</MetricLabel>
                  <LiveValue>{controlStats.systemHealth}%</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>CPU Load</MetricLabel>
                  <LiveValue>{controlStats.cpuLoad}%</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Memory Usage</MetricLabel>
                  <LiveValue>{controlStats.memoryUsage}%</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Network Status</MetricLabel>
                  <LiveValue>Stable</LiveValue>
                </Metric>
              </ControlBox>
            </ControlGrid>
          </>
        );
      case 'test':
        return (
          <>
            <ContentTitle>Test Protocols</ContentTitle>
            <ControlGrid>
              <ControlBox>
                <ControlBoxTitle>Cognitive Assessment</ControlBoxTitle>
                <Metric>
                  <MetricLabel>Processing Score</MetricLabel>
                  <LiveValue>{controlStats.cognitiveScore}%</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Memory Retention</MetricLabel>
                  <LiveValue>92%</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Response Time</MetricLabel>
                  <LiveValue>0.8s</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Pattern Recognition</MetricLabel>
                  <LiveValue>88%</LiveValue>
                </Metric>
              </ControlBox>

              <ControlBox>
                <ControlBoxTitle>Behavioral Analysis</ControlBoxTitle>
                <Metric>
                  <MetricLabel>Current Pattern</MetricLabel>
                  <LiveValue>{controlStats.behavioralPattern}</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Adaptation Rate</MetricLabel>
                  <LiveValue>95%</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Learning Curve</MetricLabel>
                  <LiveValue>Steep</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Interaction Score</MetricLabel>
                  <LiveValue>89%</LiveValue>
                </Metric>
              </ControlBox>

              <ControlBox>
                <ControlBoxTitle>Physical Measurements</ControlBoxTitle>
                <Metric>
                  <MetricLabel>Overall Metrics</MetricLabel>
                  <LiveValue>{controlStats.physicalMetrics}%</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Motor Control</MetricLabel>
                  <LiveValue>94%</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Energy Output</MetricLabel>
                  <LiveValue>87%</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Stability Index</MetricLabel>
                  <LiveValue>91%</LiveValue>
                </Metric>
              </ControlBox>

              <ControlBox>
                <ControlBoxTitle>Environmental Response</ControlBoxTitle>
                <Metric>
                  <MetricLabel>Adaptation Level</MetricLabel>
                  <LiveValue>{controlStats.envResponse}</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Stress Response</MetricLabel>
                  <LiveValue>Low</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Recovery Rate</MetricLabel>
                  <LiveValue>96%</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Environmental Fit</MetricLabel>
                  <LiveValue>93%</LiveValue>
                </Metric>
              </ControlBox>
            </ControlGrid>
          </>
        );
      case 'analysis':
        return (
          <>
            <ContentTitle>Data Analysis</ContentTitle>
            <ControlGrid>
              <ControlBox>
                <ControlBoxTitle>Real-time Analytics</ControlBoxTitle>
                <Metric>
                  <MetricLabel>Data Points/s</MetricLabel>
                  <LiveValue>{controlStats.realtimeData}</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Processing Speed</MetricLabel>
                  <LiveValue>2.5ms</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Buffer Status</MetricLabel>
                  <LiveValue>Optimal</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Data Quality</MetricLabel>
                  <LiveValue>99.9%</LiveValue>
                </Metric>
              </ControlBox>

              <ControlBox>
                <ControlBoxTitle>Statistical Analysis</ControlBoxTitle>
                <Metric>
                  <MetricLabel>Accuracy</MetricLabel>
                  <LiveValue>{controlStats.statAccuracy}%</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Confidence Level</MetricLabel>
                  <LiveValue>99.5%</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Sample Size</MetricLabel>
                  <LiveValue>10,000+</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Analysis Mode</MetricLabel>
                  <LiveValue>Advanced</LiveValue>
                </Metric>
              </ControlBox>

              <ControlBox>
                <ControlBoxTitle>Data Export</ControlBoxTitle>
                <Metric>
                  <MetricLabel>Export Status</MetricLabel>
                  <LiveValue>{controlStats.exportStatus}</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Format</MetricLabel>
                  <LiveValue>CSV/JSON</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Compression</MetricLabel>
                  <LiveValue>Enabled</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Transfer Rate</MetricLabel>
                  <LiveValue>1.2 GB/s</LiveValue>
                </Metric>
              </ControlBox>

              <ControlBox>
                <ControlBoxTitle>Visualization Tools</ControlBoxTitle>
                <Metric>
                  <MetricLabel>System Load</MetricLabel>
                  <LiveValue>{controlStats.visualizationLoad}%</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Render Quality</MetricLabel>
                  <LiveValue>High</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Update Rate</MetricLabel>
                  <LiveValue>60 FPS</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Visual Mode</MetricLabel>
                  <LiveValue>3D</LiveValue>
                </Metric>
              </ControlBox>
            </ControlGrid>
          </>
        );
      case 'monitoring':
        return (
          <>
            <ContentTitle>Live Monitoring</ContentTitle>
            <ControlGrid>
              <ControlBox>
                <ControlBoxTitle>Chamber Monitor</ControlBoxTitle>
                <Metric>
                  <MetricLabel>Temperature</MetricLabel>
                  <LiveValue>{controlStats.chamberTemp}°C</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Pressure</MetricLabel>
                  <LiveValue>1.1 atm</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Humidity</MetricLabel>
                  <LiveValue>45%</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Oxygen Level</MetricLabel>
                  <LiveValue>21%</LiveValue>
                </Metric>
              </ControlBox>

              <ControlBox>
                <ControlBoxTitle>Behavioral Metrics</ControlBoxTitle>
                <Metric>
                  <MetricLabel>Current Score</MetricLabel>
                  <LiveValue>{controlStats.behaviorScore}%</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Pattern Match</MetricLabel>
                  <LiveValue>94%</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Response Time</MetricLabel>
                  <LiveValue>0.5s</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Adaptation Rate</MetricLabel>
                  <LiveValue>96%</LiveValue>
                </Metric>
              </ControlBox>

              <ControlBox>
                <ControlBoxTitle>Physical Status</ControlBoxTitle>
                <Metric>
                  <MetricLabel>System Status</MetricLabel>
                  <LiveValue>{controlStats.physicalStatus}</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Energy Level</MetricLabel>
                  <LiveValue>92%</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Motor Control</MetricLabel>
                  <LiveValue>95%</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Stability Index</MetricLabel>
                  <LiveValue>98%</LiveValue>
                </Metric>
              </ControlBox>

              <ControlBox>
                <ControlBoxTitle>Environmental Data</ControlBoxTitle>
                <Metric>
                  <MetricLabel>System Metrics</MetricLabel>
                  <LiveValue>{controlStats.envMetrics}%</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Air Quality</MetricLabel>
                  <LiveValue>Excellent</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Radiation Level</MetricLabel>
                  <LiveValue>Safe</LiveValue>
                </Metric>
                <Metric>
                  <MetricLabel>Containment</MetricLabel>
                  <LiveValue>100%</LiveValue>
                </Metric>
              </ControlBox>
            </ControlGrid>
          </>
        );
      case 'archive':
        return (
          <>
            <ContentTitle>Archie's Chamber</ContentTitle>
            <ControlGrid>
              <ControlBox style={{ gridColumn: '1 / -1', height: '600px', position: 'relative' }}>
                <ControlBoxTitle>Live Stream</ControlBoxTitle>
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '8px',
                  padding: '20px'
                }}>
                  <iframe
                    src="https://player.kick.com/aviatrax"
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      borderRadius: '8px'
                    }}
                    allowFullScreen
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px',
                    fontStyle: 'italic'
                  }}>
                    Stream may be offline - Check back later for live content
                  </div>
                </div>
              </ControlBox>
            </ControlGrid>
          </>
        );
      default:
        return null;
    }
  };

    return (
    <AppContainer>
        <Logo src="/whitelogo.png" alt="Aviatrax Logo" />
        <XLogo href="https://x.com/Aviatraxx" target="_blank" rel="noopener noreferrer">
            𝕏
        </XLogo>
        <MainBox>
            <LabelContainer>
                <Label
                    active={activeTab === 'control'}
                    onClick={() => setActiveTab('control')}
                >
                    Control Panel
                </Label>
                <Label
                    active={activeTab === 'test'}
                    onClick={() => setActiveTab('test')}
                >
                    Test Protocols
                </Label>
                <Label
                    active={activeTab === 'analysis'}
                    onClick={() => setActiveTab('analysis')}
                >
                    Data Analysis
                </Label>
                <Label
                    active={activeTab === 'monitoring'}
                    onClick={() => setActiveTab('monitoring')}
                >
                    Live Monitoring
                </Label>
                <Label
                    active={activeTab === 'archive'}
                    onClick={() => setActiveTab('archive')}
                >
                    <LiveIndicator />
                    Archie's Chamber
                </Label>
            </LabelContainer>
            <ContentArea>
                {renderContent()}
            </ContentArea>
        </MainBox>
    </AppContainer>
    );
};

export default App; 
