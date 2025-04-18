const App = () => {
    const [activeTab, setActiveTab] = React.useState('home');
    
    const tabs = [
        { id: 'home', label: 'Home' },
        { id: 'mission', label: 'Our Mission' },
        { id: 'testing', label: 'Testing' },
        { id: 'services', label: 'Research' },
        { id: 'contact', label: 'Contact' }
    ];

    return (
        <div className="container">
            <div className="noise-overlay"></div>
            
            <div className="floating-elements">
                {['🧪', '🔬', '🧫', '🧪', '🔬', '🧫', '🧪', '🔬'].map((emoji, index) => (
                    <div 
                        key={index}
                        className="floating-element"
                        data-speed={0.1 + (index % 5) * 0.1}
                    >
                        {emoji}
                    </div>
                ))}
            </div>
            
            <div className="content-wrapper">
                <div className="glitch-container">
                    <h1 className="glitch" data-text="AVIAN ANALYTICS">AVIAN ANALYTICS</h1>
                </div>
                
                <div className="tabs-container">
                    <div className="tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    
                    <div className="tab-content">
                        <div className={`tab-pane ${activeTab === 'home' ? 'active' : ''}`}>
                            <h2>Welcome to Avian Analytics</h2>
                            <p>We are dedicated to advancing the understanding of avian species through data-driven research and analysis.</p>
                        </div>
                        
                        <div className={`tab-pane ${activeTab === 'mission' ? 'active' : ''}`}>
                            <h2>Our Mission</h2>
                            <p>Our mission is to advance avian research and conservation through data-driven insights.</p>
                        </div>
                        
                        <div className={`tab-pane ${activeTab === 'testing' ? 'active' : ''}`}>
                            <h2>Testing Center</h2>
                            <div className="testing-grid">
                                <div className="test-card">
                                    <h3>Performance Testing</h3>
                                    <p>System analysis and monitoring.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className={`tab-pane ${activeTab === 'services' ? 'active' : ''}`}>
                            <h2>Research Services</h2>
                            <p>Cutting-edge avian research and analysis.</p>
                        </div>
                        
                        <div className={`tab-pane ${activeTab === 'contact' ? 'active' : ''}`}>
                            <h2>Contact Us</h2>
                            <form className="contact-form">
                                <input type="text" placeholder="Name" />
                                <input type="email" placeholder="Email" />
                                <textarea placeholder="Message"></textarea>
                                <button type="submit">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root')); 