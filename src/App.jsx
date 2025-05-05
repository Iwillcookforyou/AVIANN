import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const glitch = keyframes`
  0% { transform: translate(0) skew(0deg); }
  20% { transform: translate(-5px, 5px) skew(5deg); }
  40% { transform: translate(5px, -5px) skew(-5deg); }
  60% { transform: translate(-5px, 5px) skew(5deg); }
  80% { transform: translate(5px, -5px) skew(-5deg); }
  100% { transform: translate(0) skew(0deg); }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const distort = keyframes`
  0% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
  25% { clip-path: polygon(10% 0, 90% 0, 100% 100%, 0 100%); }
  50% { clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%); }
  75% { clip-path: polygon(5% 0, 95% 0, 100% 100%, 0 100%); }
  100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
`;

const Logo = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  height: 40px;
  width: auto;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
`;

const XLogo = styled.a`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #ffffff;
  font-size: 32px;
  text-decoration: none;
  transition: all 0.3s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  height: 40px;
  transform: rotate(-5deg);

  &:hover {
    color: #1DA1F2;
    transform: rotate(5deg) scale(1.1);
  }
`;

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: #1a1a1a;
  color: #d4d4d4;
  font-family: 'Courier New', monospace;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
`;

const MainBox = styled.div`
  width: 90vw;
  height: 90vh;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  display: grid;
  grid-template-columns: 250px 1fr;
  overflow: hidden;
  position: relative;
  box-shadow: 2px 2px 0 #000;
`;

const LabelContainer = styled.div`
  background: #222;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-right: 1px solid #3a3a3a;
`;

const Label = styled.div`
  color: ${props => props.active ? '#fff' : '#666'};
  font-size: 16px;
  padding: 1rem;
  cursor: pointer;
  background: ${props => props.active ? '#333' : 'transparent'};
  display: flex;
  align-items: center;
  gap: 1rem;
  border-left: 2px solid ${props => props.active ? '#666' : 'transparent'};
  transition: all 0.2s ease;

  &:hover {
    background: #333;
    color: #fff;
  }
`;

const LiveIndicator = styled.div`
  width: 8px;
  height: 8px;
  background: #f00;
  border-radius: 50%;
  margin-right: 8px;
`;

const ContentArea = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
  overflow: hidden;
`;

const ContentTitle = styled.h2`
  font-size: 24px;
  color: #fff;
  margin-bottom: 2rem;
  font-weight: normal;
  position: relative;
  display: inline-block;
  padding-bottom: 5px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: #666;
  }
`;

const ControlGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 2rem;
  height: 100%;
`;

const ControlBox = styled.div`
  background: #222;
  padding: 1.5rem;
  border: 1px solid #3a3a3a;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background: #252525;
  }
`;

const ControlBoxTitle = styled.h3`
  font-size: 18px;
  color: #fff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: normal;
  padding-bottom: 5px;
  border-bottom: 1px solid #3a3a3a;
`;

const Metric = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #1a1a1a;
  border: 1px solid #3a3a3a;
  position: relative;
`;

const MetricLabel = styled.span`
  color: #666;
  font-size: 14px;
`;

const MetricValue = styled.span`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const LiveValue = styled.span`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  position: relative;
  display: inline-block;
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
        <div className="flex items-center">
            <img 
                src="/whitelogo.png" 
                alt="Aviatrax Logo" 
                className="h-8 w-auto mr-2"
            />
        </div>
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
