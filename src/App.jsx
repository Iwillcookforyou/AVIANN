import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  height: 80vh;
  margin: 2rem auto;
  position: relative;
`;

const StyledTerminal = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  overflow: hidden;

  &::before {
    content: 'AVIAN TESTING INTERFACE v2.1.0';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    padding: 0 0 0 5.5rem;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
  }

  &::after {
    content: '⬤ ⬤ ⬤';
    position: absolute;
    top: 8px;
    left: 15px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.3);
    letter-spacing: 2px;
  }

  .terminal-content {
    height: calc(100% - 30px);
    margin-top: 30px;
    padding: 2rem;
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
    overflow: hidden;
  }
`;

const StyledSidebar = styled.div`
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .status-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1rem;

    &::before {
      content: '';
      width: 8px;
      height: 8px;
      background: #ffffff;
      border-radius: 50%;
      animation: blink 2s infinite;
    }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`;

const StyledNavButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 0.8rem 1rem;
  color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'};
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  text-align: left;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  width: 100%;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &::before {
    content: '>';
    margin-right: 0.5rem;
    color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.3)'};
  }

  ${props => props.active && `
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.3);
  `}
`;

const StyledMainContent = styled.div`
  overflow-y: auto;
  padding-right: 1rem;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.03);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 5px;
  }

  .data-section {
    margin-bottom: 2rem;
    
    h2 {
      font-size: 1.5rem;
      color: #ffffff;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      &::before {
        content: '>';
        color: #ffffff;
      }
    }
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
`;

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background: #000000;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      linear-gradient(0deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
  }

  .orb {
    position: absolute;
    width: 150vh;
    height: 150vh;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.03;
    animation: orbFloat 25s infinite alternate;
    pointer-events: none;
  }

  .orb1 {
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    top: -50%;
    left: -20%;
    animation-delay: -2s;
  }

  .orb2 {
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    bottom: -50%;
    right: -20%;
    animation-delay: -5s;
  }

  .orb3 {
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    bottom: -60%;
    left: 30%;
    animation-delay: -7s;
  }

  .stars {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(1px 1px at 20px 30px, rgba(255, 255, 255, 0.15), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 40px 70px, rgba(255, 255, 255, 0.15), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 50px 160px, rgba(255, 255, 255, 0.15), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.15), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 130px 80px, rgba(255, 255, 255, 0.15), rgba(0,0,0,0));
    background-repeat: repeat;
    background-size: 200px 200px;
    opacity: 0.1;
  }
`;

const TabContent = styled.div`
  background: var(--terminal-bg);
  border: 1px solid var(--primary-color);
  padding: 2rem;
  margin-top: 2rem;
  border-radius: 4px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(90deg, var(--grid-color) 1px, transparent 1px) 0 0 / 20px 20px,
      linear-gradient(0deg, var(--grid-color) 1px, transparent 1px) 0 0 / 20px 20px;
    pointer-events: none;
    opacity: 0.5;
  }
`;

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    
    }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`;

const MonitorButton = styled.button`
  background: var(--secondary-color);
  color: var(--bg-color);
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: #00cc3d;
    transform: translateY(-1px);
  }
`;

const StyledButton = styled.button`
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: button;
  background: linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.15));
  color: #fff;
  cursor: pointer;
  font-family: var(--font-main);
  font-size: 100%;
  font-weight: 900;
  line-height: 1.5;
  margin: 0;
  -webkit-mask-image: -webkit-radial-gradient(#000, #fff);
  padding: 0.8rem 3rem;
  text-transform: uppercase;
  border-radius: 10px;
  border: 2px solid rgba(255,255,255,0.1);
  box-shadow: 0 0 20px rgba(255,255,255,0.05);
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  background: ${props => props.active ? 
    'linear-gradient(45deg, rgba(255,255,255,0.15), rgba(255,255,255,0.25))' : 
    'linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.15))'};

  .text-container {
    display: block;
    mix-blend-mode: difference;
    overflow: hidden;
    position: relative;
  }

  .text {
    display: block;
    position: relative;
    color: #fff;
    font-family: var(--font-main);
    letter-spacing: 4px;
    text-shadow: 0 0 10px rgba(255,255,255,0.3);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 25px rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.3);
  }

  &:before,
  &:after {
    --skew: 0.2;
    background: #fff;
    content: "";
    display: block;
    height: 102%;
    left: calc(-50% - 50% * var(--skew));
    pointer-events: none;
    position: absolute;
    top: -104%;
    transform: skew(calc(150deg * var(--skew))) translateY(var(--progress, 0));
    transition: transform 0.2s ease;
    width: 100%;
  }

  &:after {
    --progress: 0%;
    left: calc(50% + 50% * var(--skew));
    top: 102%;
    z-index: -1;
  }

  &:hover:before {
    --progress: 100%;
  }

  &:hover:after {
    --progress: -102%;
  }
`;

const StyledTabs = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem auto 0;
  padding: 0;
  position: relative;
  z-index: 3;
  flex-direction: column;
  align-items: center;

  .top-row {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .bottom-row {
    display: flex;
    justify-content: center;
  }
`;

const StyledFeatureCard = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-family: 'Courier New', monospace;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(0deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
  }

  h3 {
    color: #ffffff;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 0.5rem;
  }

  p {
    margin: 0.5rem 0;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: space-between;
    
    &::after {
      content: '';
      flex-grow: 1;
      border-bottom: 1px dotted rgba(255, 255, 255, 0.2);
      margin: 0 0.5rem;
      transform: translateY(-0.5rem);
    }
  }
`;

const StyledTestCard = styled(StyledFeatureCard)`
  .capabilities-list {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin: 0.5rem 0;
      padding-left: 1.2rem;
      position: relative;
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.9rem;
      
      &::before {
        content: '>';
        position: absolute;
        left: 0;
        color: #ffffff;
      }
    }
  }
`;

const StyledServiceCard = styled(StyledTestCard)`
  .service-features {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin: 0.5rem 0;
      padding-left: 1.2rem;
      position: relative;
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.9rem;
      
      &::before {
        content: '>';
        position: absolute;
        left: 0;
        color: #ffffff;
      }
    }
  }
`;

const StyledInfoBox = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1.5rem;
  margin: 1rem auto;
  width: 100%;
  max-width: 800px;
  min-height: 80px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);

  .cycling-text {
    margin: 0;
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    text-align: center;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.5;
    max-width: 100%;
    padding: 0 1rem;
  }
`;

const SocialButton = styled.a`
  position: fixed;
  top: 20px;
  right: 20px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  z-index: 1000;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    color: white;
  }
`;

const App = () => {
    const [activeTab, setActiveTab] = useState('control');
    const [displayedInfo, setDisplayedInfo] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [letterIndex, setLetterIndex] = useState(0);
    const contentRef = useRef(null);
    
    // New state variables for live metrics
    const [duration, setDuration] = useState(0);
    const [heartRate, setHeartRate] = useState(275);
    const [temperature, setTemperature] = useState(22);
    const [humidity, setHumidity] = useState(45);
    
    // Additional live monitoring metrics
    const [noiseLevel, setNoiseLevel] = useState(45);
    const [airFlow, setAirFlow] = useState(0.5);
    const [co2Level, setCo2Level] = useState(400);
    const [birdTemp, setBirdTemp] = useState(41.2);
    const [movementStatus, setMovementStatus] = useState('Active');
    const [vocalization, setVocalization] = useState('Frequent');
    const [breathingRate, setBreathingRate] = useState('Stable');

    // Timer for duration
    useEffect(() => {
        const timer = setInterval(() => {
            setDuration(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Heart rate variations for cockatoo (200-350 BPM)
    useEffect(() => {
        const heartRateTimer = setInterval(() => {
            setHeartRate(prev => {
                // More natural variations within cockatoo's range
                const variation = Math.random() * 30 - 15; // -15 to +15
                const newRate = Math.round(prev + variation);
                // Ensure rate stays within healthy cockatoo range
                if (newRate < 200) return 200;
                if (newRate > 350) return 350;
                return newRate;
            });
        }, 2000);
        return () => clearInterval(heartRateTimer);
    }, []);

    // Temperature and humidity variations
    useEffect(() => {
        const envTimer = setInterval(() => {
            setTemperature(prev => {
                // Small temperature fluctuations (±0.3°C)
                const variation = (Math.random() * 0.6 - 0.3);
                return Number((prev + variation).toFixed(1));
            });
            
            setHumidity(prev => {
                // Humidity variations (±2%)
                const variation = Math.random() * 4 - 2;
                return Math.round(prev + variation);
            });
        }, 5000);
        return () => clearInterval(envTimer);
    }, []);

    // Movement and vocalization variations
    useEffect(() => {
        const behaviorsTimer = setInterval(() => {
            // Randomly change movement status
            const movements = ['Active', 'Resting', 'Playing', 'Feeding'];
            const vocalizations = ['Frequent', 'Occasional', 'Quiet', 'Singing'];
            
            if (Math.random() < 0.3) { // 30% chance to change status
                setMovementStatus(movements[Math.floor(Math.random() * movements.length)]);
                setVocalization(vocalizations[Math.floor(Math.random() * vocalizations.length)]);
            }
        }, 10000); // Update every 10 seconds
        
        return () => clearInterval(behaviorsTimer);
    }, []);

    // Environmental variations
    useEffect(() => {
        const envMetricsTimer = setInterval(() => {
            // Noise level variations (40-50 dB)
            setNoiseLevel(prev => {
                const variation = Math.random() * 10 - 5;
                const newLevel = Math.round(prev + variation);
                return Math.min(Math.max(newLevel, 40), 50);
            });
            
            // Air flow variations (0.3-0.7 m/s)
            setAirFlow(prev => {
                const variation = (Math.random() * 0.2 - 0.1);
                return Number((Math.min(Math.max(prev + variation, 0.3), 0.7)).toFixed(1));
            });
            
            // CO2 level variations (380-420 ppm)
            setCo2Level(prev => {
                const variation = Math.random() * 20 - 10;
                return Math.round(Math.min(Math.max(prev + variation, 380), 420));
            });
            
            // Bird body temperature variations (41.0-41.4°C)
            setBirdTemp(prev => {
                const variation = (Math.random() * 0.2 - 0.1);
                return Number((Math.min(Math.max(prev + variation, 41.0), 41.4)).toFixed(1));
            });
            
            // Random breathing rate changes
            if (Math.random() < 0.2) { // 20% chance to change
                const rates = ['Stable', 'Elevated', 'Relaxed'];
                setBreathingRate(rates[Math.floor(Math.random() * rates.length)]);
            }
        }, 5000); // Update every 5 seconds
        
        return () => clearInterval(envMetricsTimer);
    }, []);

    // Format duration as MM:SS
    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const [emojiPositions] = useState(() => 
        Array(8).fill(null).map(() => ({
            left: Math.random() * 90 + 5, // 5-95%
            top: Math.random() * 90 + 5,  // 5-95%
            duration: Math.random() * 20 + 30, // 30-50s
            delay: -Math.random() * 30,    // Random start point
            scale: Math.random() * 0.5 + 0.8 // 0.8-1.3
        }))
    );
    
    const emojis = ['🦜', '🦅', '🔬', '🧬', '🧪', '📊', '🦢', '🦩'];
    
    const labInfo = [
        "System Ready - Avian Testing Protocol v2.1.0 Initialized",
        "Neural Pattern Recognition Systems: Active",
        "Environmental Controls: Optimal",
        "Behavioral Analysis Module: Running",
        "Data Collection Systems: Online",
        "Test Chambers: Ready for Operation",
        "Safety Protocols: Active",
        "Awaiting Test Parameters..."
    ];

    useEffect(() => {
        const typingSpeed = 50; // Speed for typing each letter
        const deletingSpeed = 30; // Speed for deleting each letter
        const pauseTime = 2000; // Time to pause when message is complete

        const typeWriter = () => {
            const currentText = labInfo[currentIndex];
            
            if (!isDeleting) {
                // Typing
                if (letterIndex < currentText.length) {
                    setDisplayedInfo(currentText.substring(0, letterIndex + 1));
                    setLetterIndex(letterIndex + 1);
                } else {
                    // Finished typing
                    setTimeout(() => setIsDeleting(true), pauseTime);
                }
            } else {
                // Deleting
                if (letterIndex > 0) {
                    setDisplayedInfo(currentText.substring(0, letterIndex - 1));
                    setLetterIndex(letterIndex - 1);
                } else {
                    // Finished deleting
                    setIsDeleting(false);
                    setCurrentIndex((currentIndex + 1) % labInfo.length);
                }
            }
        };

        const timer = setTimeout(
            typeWriter,
            isDeleting ? deletingSpeed : typingSpeed
        );

        return () => clearTimeout(timer);
    }, [currentIndex, letterIndex, isDeleting]);

    useEffect(() => {
        function updateScrollbar() {
            const content = contentRef.current;
            if (!content) return;
            
            const scrollPercentage = content.scrollTop / (content.scrollHeight - content.clientHeight);
            const thumbTop = scrollPercentage * (content.clientHeight - content.clientHeight * 0.2);
            
            content.style.setProperty('--scroll-thumb-top', `${thumbTop}px`);
            content.style.setProperty('--scroll-thumb-height', 
                `${(content.clientHeight / content.scrollHeight) * 100}%`);
        }
        
        const content = contentRef.current;
        if (content) {
            content.addEventListener('scroll', updateScrollbar);
            window.addEventListener('resize', updateScrollbar);
            updateScrollbar();
            
            return () => {
                content.removeEventListener('scroll', updateScrollbar);
                window.removeEventListener('resize', updateScrollbar);
            };
        }
    }, [activeTab]);

    const tabs = [
        { id: 'control', label: 'Control Panel' },
        { id: 'testing', label: 'Test Protocols' },
        { id: 'data', label: 'Data Analysis' },
        { id: 'monitoring', label: 'Live Monitoring' },
        { id: 'live', label: 'Archies Chamber' }
    ];

    return (
        <>
            <Container>
                <StatusBar>
                    <span>AVIAN ANALYTICS</span>
                    <span>DATA STREAM CONNECTED</span>
                    <span>
                        {`${new Date().toLocaleTimeString('de-DE', { timeZone: 'Europe/Berlin' })} ${
                            new Date().toLocaleTimeString('en-US', { 
                                timeZone: 'Europe/Berlin',
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric',
                                hour12: true 
                            }).split(' ')[1]
                        }`}
                    </span>
                </StatusBar>

                <StyledBackground>
                    <div className="orb orb1"></div>
                    <div className="orb orb2"></div>
                    <div className="orb orb3"></div>
                    <div className="stars"></div>
                </StyledBackground>
                <div className="noise-overlay"></div>
                
                <div className="floating-elements">
                    {emojis.map((emoji, index) => (
                        <div 
                            key={index}
                            className="floating-element"
                            style={{
                                left: `${emojiPositions[index].left}%`,
                                top: `${emojiPositions[index].top}%`,
                                animationDelay: `${emojiPositions[index].delay}s`,
                                animationDuration: `${emojiPositions[index].duration}s`,
                                transform: `scale(${emojiPositions[index].scale})`
                            }}
                        >
                            {emoji}
                        </div>
                    ))}
                </div>
                
                <StyledTerminal>
                    <div className="terminal-content">
                        <StyledSidebar>
                            <div className="status-indicator">SYSTEM ACTIVE</div>
                            {tabs.map((tab) => (
                                <StyledNavButton
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    active={activeTab === tab.id}
                                >
                                    {tab.label}
                                </StyledNavButton>
                            ))}
                        </StyledSidebar>

                        <StyledMainContent>
                            {activeTab === 'control' && (
                                <div className="data-section">
                                    <h2>SYSTEM CONTROL</h2>
                                    <div className="feature-grid">
                                        <StyledFeatureCard>
                                            <div className="content">
                                                <h3>Environmental Controls</h3>
                                                <p>Chamber Temperature: {temperature}°C</p>
                                                <p>Humidity: {humidity}%</p>
                                                <p>Light Level: 500 lux</p>
                                                <p>Air Quality: Optimal</p>
                                            </div>
                                        </StyledFeatureCard>
                                        <StyledFeatureCard>
                                            <div className="content">
                                                <h3>Test Chamber Status</h3>
                                                <p>Subject: Archie</p>
                                                <p>Status: Active</p>
                                                <p>Test Phase: Behavioral</p>
                                                <p>Duration: {formatDuration(duration)}</p>
                                            </div>
                                        </StyledFeatureCard>
                                        <StyledFeatureCard>
                                            <div className="content">
                                                <h3>Safety Systems</h3>
                                                <p>Emergency Protocols: Active</p>
                                                <p>Ventilation: Normal</p>
                                                <p>Backup Power: Standby</p>
                                                <p>Alert System: Online</p>
                                            </div>
                                        </StyledFeatureCard>
                                        <StyledFeatureCard>
                                            <div className="content">
                                                <h3>System Health</h3>
                                                <p>Heart Rate: {heartRate} BPM</p>
                                                <p>Activity Level: Normal</p>
                                                <p>Food Intake: 15g/day</p>
                                                <p>Rest Cycles: Regular</p>
                                            </div>
                                        </StyledFeatureCard>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'testing' && (
                                <div className="data-section">
                                    <h2>TEST PROTOCOLS</h2>
                                    <div className="feature-grid">
                                        <StyledTestCard>
                                            <div className="content">
                                                <h3>Cognitive Assessment</h3>
                                                <ul className="capabilities-list">
                                                    <li>Pattern Recognition Test</li>
                                                    <li>Memory Sequence Test</li>
                                                    <li>Problem-Solving Tasks</li>
                                                    <li>Response Time Analysis</li>
                                                </ul>
                                            </div>
                                        </StyledTestCard>
                                        <StyledTestCard>
                                            <div className="content">
                                                <h3>Behavioral Analysis</h3>
                                                <ul className="capabilities-list">
                                                    <li>Movement Tracking</li>
                                                    <li>Social Interaction Test</li>
                                                    <li>Stress Response Analysis</li>
                                                    <li>Feeding Pattern Study</li>
                                                </ul>
                                            </div>
                                        </StyledTestCard>
                                        <StyledTestCard>
                                            <div className="content">
                                                <h3>Physical Measurements</h3>
                                                <ul className="capabilities-list">
                                                    <li>Wing Span Analysis</li>
                                                    <li>Weight Monitoring</li>
                                                    <li>Flight Pattern Recording</li>
                                                    <li>Muscle Response Test</li>
                                                </ul>
                                            </div>
                                        </StyledTestCard>
                                        <StyledTestCard>
                                            <div className="content">
                                                <h3>Environmental Response</h3>
                                                <ul className="capabilities-list">
                                                    <li>Temperature Adaptation</li>
                                                    <li>Light Sensitivity Test</li>
                                                    <li>Sound Response Analysis</li>
                                                    <li>Pressure Change Study</li>
                                                </ul>
                                            </div>
                                        </StyledTestCard>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'data' && (
                                <div className="data-section">
                                    <h2>DATA ANALYSIS</h2>
                                    <div className="feature-grid">
                                        <StyledServiceCard>
                                            <div className="content">
                                                <h3>Real-time Analytics</h3>
                                                <ul className="service-features">
                                                    <li>Neural Response Patterns</li>
                                                    <li>Behavior Classification</li>
                                                    <li>Movement Tracking Data</li>
                                                    <li>Environmental Correlations</li>
                                                </ul>
                                            </div>
                                        </StyledServiceCard>
                                        <StyledServiceCard>
                                            <div className="content">
                                                <h3>Statistical Analysis</h3>
                                                <ul className="service-features">
                                                    <li>Response Time Distribution</li>
                                                    <li>Pattern Recognition Rates</li>
                                                    <li>Learning Curve Analysis</li>
                                                    <li>Error Rate Calculation</li>
                                                </ul>
                                            </div>
                                        </StyledServiceCard>
                                        <StyledServiceCard>
                                            <div className="content">
                                                <h3>Data Export</h3>
                                                <ul className="service-features">
                                                    <li>CSV Data Export</li>
                                                    <li>PDF Report Generation</li>
                                                    <li>Raw Data Access</li>
                                                    <li>Backup Creation</li>
                                                </ul>
                                            </div>
                                        </StyledServiceCard>
                                        <StyledServiceCard>
                                            <div className="content">
                                                <h3>Visualization Tools</h3>
                                                <ul className="service-features">
                                                    <li>3D Movement Mapping</li>
                                                    <li>Response Time Graphs</li>
                                                    <li>Pattern Analysis Charts</li>
                                                    <li>Comparative Studies</li>
                                                </ul>
                                            </div>
                                        </StyledServiceCard>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'monitoring' && (
                                <div className="data-section">
                                    <h2>LIVE MONITORING</h2>
                                    <div className="feature-grid">
                                        <StyledServiceCard>
                                            <div className="content">
                                                <h3>Chamber Monitor</h3>
                                                <p>Status: Active</p>
                                                <p>Subject: Archie</p>
                                                <p>Test Type: Behavioral</p>
                                                <p>Duration: {formatDuration(duration)}</p>
                                            </div>
                                        </StyledServiceCard>
                                        <StyledServiceCard>
                                            <div className="content">
                                                <h3>Behavioral Metrics</h3>
                                                <p>Movement: {movementStatus}</p>
                                                <p>Vocalization: {vocalization}</p>
                                                <p>Social Response: Positive</p>
                                                <p>Stress Level: Low</p>
                                            </div>
                                        </StyledServiceCard>
                                        <StyledServiceCard>
                                            <div className="content">
                                                <h3>Physical Status</h3>
                                                <p>Posture: Normal</p>
                                                <p>Wing Movement: Regular</p>
                                                <p>Breathing Rate: {breathingRate}</p>
                                                <p>Temperature: {birdTemp}°C</p>
                                            </div>
                                        </StyledServiceCard>
                                        <StyledServiceCard>
                                            <div className="content">
                                                <h3>Environmental Data</h3>
                                                <p>Noise Level: {noiseLevel}dB</p>
                                                <p>Air Flow: {airFlow} m/s</p>
                                                <p>CO2 Level: {co2Level}ppm</p>
                                                <p>Light Quality: Natural</p>
                                            </div>
                                        </StyledServiceCard>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'live' && (
                                <div className="data-section">
                                    <h2>ARCHIES CHAMBER</h2>
                                    <div style={{
                                        width: '100%',
                                        height: 'calc(100vh - 200px)',
                                        marginTop: '1rem',
                                        background: 'rgba(0, 0, 0, 0.3)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '8px',
                                        overflow: 'hidden'
                                    }}>
                                        <iframe
                                            src="https://player.kick.com/AvianAnalyticss"
                                            width="100%"
                                            height="100%"
                                            frameBorder="0"
                                            scrolling="no"
                                            allowFullScreen={true}
                                            style={{
                                                border: 'none'
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </StyledMainContent>
                    </div>
                </StyledTerminal>
            </Container>
            <SocialButton 
                href="https://x.com/AvianAnalyticss"
                target="_blank"
                rel="noopener noreferrer"
            >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
            </SocialButton>
        </>
    );
};

export default App; 
