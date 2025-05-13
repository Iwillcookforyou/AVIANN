// Remove custom cursor code
// const cursor = document.querySelector('.cursor');
// const cursorFollower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, input, textarea');

// document.addEventListener('mousemove', (e) => {
//     cursor.style.left = e.clientX + 'px';
//     cursor.style.top = e.clientY + 'px';
    
//     setTimeout(() => {
//         cursorFollower.style.left = e.clientX + 'px';
//         cursorFollower.style.top = e.clientY + 'px';
//     }, 100);
// });

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        // cursor.style.transform = 'scale(1.5)';
        // cursorFollower.style.transform = 'scale(0.5)';
        link.style.transform = 'scale(1.05)';
    });
    
    link.addEventListener('mouseleave', () => {
        // cursor.style.transform = 'scale(1)';
        // cursorFollower.style.transform = 'scale(1)';
        link.style.transform = 'scale(1)';
    });
});

// Floating elements animation
const floatingElements = document.querySelectorAll('.floating-element');

floatingElements.forEach(element => {
    const speed = parseFloat(element.getAttribute('data-speed'));
    const randomX = Math.random() * 100 - 50;
    const randomY = Math.random() * 100 - 50;
    
    element.style.animation = `float-random ${10 + speed * 10}s ease-in-out infinite`;
    element.style.transform = `translate(${randomX}px, ${randomY}px)`;
});

// Typing effect
const typingText = document.querySelector('.typing-text');
const messages = [
    "Welcome to Avian Analytics Research Lab",
    "Studying bird behavior and migration patterns",
    "Advancing avian science through data analysis",
    "Protecting bird habitats worldwide"
];
let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentMessage = messages[messageIndex];
    
    if (isDeleting) {
        typingText.textContent = currentMessage.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentMessage.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentMessage.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause at the end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        messageIndex = (messageIndex + 1) % messages.length;
        typingSpeed = 500; // Pause before typing next message
    }
    
    setTimeout(type, typingSpeed);
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(type, 1000);
});

// Form handling with glitch effect
const form = document.getElementById('contact-form');
const submitButton = form.querySelector('.glitch-button');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    submitButton.style.animation = 'glitch 0.3s infinite';
    submitButton.querySelector('.glitch-text').textContent = 'SENDING...';
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        submitButton.style.animation = '';
        submitButton.style.backgroundColor = '#00ff00';
        submitButton.querySelector('.glitch-text').textContent = 'SENT!';
        
        form.reset();
        
        setTimeout(() => {
            submitButton.style.backgroundColor = '';
            submitButton.querySelector('.glitch-text').textContent = 'SEND MESSAGE';
        }, 3000);
        
    } catch (error) {
        submitButton.style.animation = '';
        submitButton.style.backgroundColor = '#ff0000';
        submitButton.querySelector('.glitch-text').textContent = 'ERROR!';
        
        setTimeout(() => {
            submitButton.style.backgroundColor = '';
            submitButton.querySelector('.glitch-text').textContent = 'SEND MESSAGE';
        }, 3000);
    }
});

// Loader animation
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    
    // Hide loader after page loads
    window.addEventListener('load', () => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Mobile burger menu
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle navigation
    nav.classList.toggle('active');
    
    // Animate links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger animation
    burger.classList.toggle('toggle');
});

// Bird Animation
const bird = document.querySelector('.bird');
const birdBody = document.querySelector('.bird-body');
const birdWings = document.querySelectorAll('.bird-wing');
const birdTail = document.querySelector('.bird-tail');

// Add hover effect to bird
bird.addEventListener('mouseover', () => {
    birdBody.style.transform = 'translate(-50%, -50%) scale(1.1)';
    birdWings.forEach(wing => {
        wing.style.animationDuration = '0.5s';
    });
    birdTail.style.animationDuration = '0.5s';
});

bird.addEventListener('mouseout', () => {
    birdBody.style.transform = 'translate(-50%, -50%) scale(1)';
    birdWings.forEach(wing => {
        wing.style.animationDuration = '1s';
    });
    birdTail.style.animationDuration = '1s';
});

// Social Links Animation
const socialLinks = document.querySelectorAll('.social-link');

socialLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.transform = 'translateY(-5px) scale(1.1)';
    });

    link.addEventListener('mouseout', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.gallery-card, .fact-card, .section-header').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
            }
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    
    if (hero) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// Dynamic theme colors based on time of day
function updateThemeColors() {
    const hour = new Date().getHours();
    const root = document.documentElement;
    
    if (hour >= 6 && hour < 18) {
        // Day theme
        root.style.setProperty('--primary-color', '#ffffff');
        root.style.setProperty('--secondary-color', '#e0e0e0');
        root.style.setProperty('--accent-color', '#c0c0c0');
    } else {
        // Night theme
        root.style.setProperty('--primary-color', '#ffffff');
        root.style.setProperty('--secondary-color', '#d0d0d0');
        root.style.setProperty('--accent-color', '#b0b0b0');
    }
}

// Update theme colors on load and every hour
updateThemeColors();
setInterval(updateThemeColors, 3600000);

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes flap {
        0% {
            transform: rotate(-30deg) scaleY(1);
        }
        50% {
            transform: rotate(-30deg) scaleY(0.7);
        }
        100% {
            transform: rotate(-30deg) scaleY(1);
        }
    }
    
    @keyframes tail-wag {
        0% {
            transform: rotate(-30deg);
        }
        50% {
            transform: rotate(-10deg);
        }
        100% {
            transform: rotate(-30deg);
        }
    }
    
    .gallery-card, .fact-card, .section-header {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .gallery-card.animate, .fact-card.animate, .section-header.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .burger.toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .burger.toggle .line2 {
        opacity: 0;
    }
    
    .burger.toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @keyframes float-random {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(50px, 30px) rotate(15deg); }
        50% { transform: translate(-20px, -50px) rotate(-10deg); }
        75% { transform: translate(-40px, 20px) rotate(5deg); }
    }
    
    @keyframes glitch {
        0% { text-shadow: 0.05em 0 0 var(--primary-color), -0.05em -0.025em 0 var(--secondary-color); }
        25% { text-shadow: 0.05em 0 0 var(--secondary-color), -0.05em -0.025em 0 var(--primary-color); }
        50% { text-shadow: -0.05em -0.025em 0 var(--primary-color), 0.05em 0 0 var(--secondary-color); }
        75% { text-shadow: -0.05em -0.025em 0 var(--secondary-color), 0.05em 0 0 var(--primary-color); }
        100% { text-shadow: 0.05em 0 0 var(--primary-color), -0.05em -0.025em 0 var(--secondary-color); }
    }
    
    @keyframes message-float {
        0%, 100% { transform: translateY(0) rotateX(0); }
        50% { transform: translateY(-10px) rotateX(5deg); }
    }
`;

document.head.appendChild(style);

// Tab Switching Functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

function switchTab(tabId) {
    // Remove active class from all buttons and panes
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('active');
            // Add glitch effect to the active tab
            btn.style.animation = 'glitch 0.3s ease';
            setTimeout(() => {
                btn.style.animation = '';
            }, 300);
        }
    });

    tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === tabId) {
            pane.classList.add('active');
            // Add fade-in animation to the content
            pane.style.animation = 'fadeIn 0.5s ease';
        }
    });

    // Add explanatory text based on the selected tab
    const explanation = document.querySelector('.tab-explanation');
    if (explanation) {
        switch(tabId) {
            case 'home':
                explanation.textContent = 'Welcome to Avian Analytics - Your gateway to bird intelligence and research.';
                break;
            case 'mission':
                explanation.textContent = 'Discover our mission to advance avian research and conservation through data-driven insights.';
                break;
            case 'testing':
                explanation.textContent = 'Explore our comprehensive testing and analysis capabilities for avian research.';
                break;
            case 'services':
                explanation.textContent = 'Learn about our research services and how we contribute to avian science.';
                break;
            case 'contact':
                explanation.textContent = 'Get in touch with our team of avian research experts.';
                break;
        }
    }
}

// Add click event listeners to tab buttons
tabButtons.forEach(btn => {
    if (btn.getAttribute('data-tab')) { // Only for buttons with data-tab attribute
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId);
        });
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .tab-explanation {
        text-align: center;
        margin: 1rem 0;
        color: var(--text-color);
        font-size: 1.1rem;
        opacity: 0.9;
    }
`;
document.head.appendChild(style);

// Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="glitch-text">SENDING...</span>';
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.innerHTML = '<span class="glitch-text">MESSAGE SENT!</span>';
            submitBtn.style.backgroundColor = '#ffffff';
            submitBtn.style.color = '#1a1a1a';
            submitBtn.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.5)';
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.color = '';
                submitBtn.style.boxShadow = '';
            }, 2000);
        }, 1500);
    });
}

// Glitch Effect
const glitchElements = document.querySelectorAll('.glitch');
glitchElements.forEach(element => {
    const text = element.getAttribute('data-text');
    element.setAttribute('data-text', text);
    
    // Random glitch effect
    setInterval(() => {
        if (Math.random() > 0.95) {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = 'glitch 0.3s ease';
            }, 10);
        }
    }, 1000);
}); 