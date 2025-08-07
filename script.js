// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Main initialization function
function initializePortfolio() {
    // Initialize all components
    initializeMobileMenu();
    initializeSmoothScroll();
    initializeScrollEffects();
    initializePortfolioButtons();
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            toggleMobileMenu(navLinks, mobileMenu);
        });
    }
}

function toggleMobileMenu(navLinks, mobileMenu) {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Add animation to hamburger lines
    const spans = mobileMenu.querySelectorAll('span');
    spans.forEach((span, index) => {
        span.style.transform = navLinks.classList.contains('active') 
            ? getHamburgerTransform(index) 
            : 'none';
    });
}

function getHamburgerTransform(index) {
    const transforms = [
        'rotate(-45deg) translate(-5px, 6px)',
        'opacity: 0',
        'rotate(45deg) translate(-5px, -6px)'
    ];
    return transforms[index] || 'none';
}

// Smooth scroll functionality
function initializeSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                smoothScrollTo(targetElement);
            }
        });
    });
}

function smoothScrollTo(element) {
    const offsetTop = element.offsetTop - 80; // Account for fixed header
    
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

// Scroll effects
function initializeScrollEffects() {
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set proper state
    handleScroll();
}

function handleScroll() {
    const scrollY = window.scrollY;
    
    // Header background opacity effect
    updateHeaderOpacity(scrollY);
    
    // Parallax effect for hero section
    updateParallaxEffect(scrollY);
    
    // Show/hide scroll to top button (if exists)
    updateScrollToTopButton(scrollY);
}

function updateHeaderOpacity(scrollY) {
    const header = document.querySelector('header');
    if (header) {
        const opacity = scrollY > 100 ? 0.98 : 0.95;
        header.style.background = `rgba(255, 255, 255, ${opacity})`;
    }
}

function updateParallaxEffect(scrollY) {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const speed = 0.5;
        heroSection.style.transform = `translateY(${scrollY * speed}px)`;
    }
}

function updateScrollToTopButton(scrollY) {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (scrollButton) {
        scrollButton.style.display = scrollY > 300 ? 'block' : 'none';
    }
}

// Portfolio buttons functionality
function initializePortfolioButtons() {
    const portfolioButtons = document.querySelectorAll('.portfolio-btn');
    
    portfolioButtons.forEach(button => {
        // Add click analytics (placeholder)
        button.addEventListener('click', function(e) {
            const buttonType = this.querySelector('.btn-title').textContent;
            trackPortfolioClick(buttonType);
        });
        
        // Add hover effects
        addHoverEffects(button);
    });
}

function trackPortfolioClick(buttonType) {
    // Analytics tracking placeholder
    console.log(`Portfolio button clicked: ${buttonType}`);
    
    // You can add Google Analytics or other tracking here
    // gtag('event', 'click', {
    //     'event_category': 'Portfolio',
    //     'event_label': buttonType
    // });
}

function addHoverEffects(button) {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(handleScroll, 10);
window.addEventListener('scroll', optimizedScrollHandler);

// Loading animation
function showLoadingAnimation() {
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            hero.style.transition = 'all 1s ease-out';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Initialize loading animation when page loads
window.addEventListener('load', showLoadingAnimation);

// Contact form handling (if needed)
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactSubmission(this);
        });
    }
}

function handleContactSubmission(form) {
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    showFormLoading(form);
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showFormSuccess(form);
        form.reset();
    }, 2000);
}

function showFormLoading(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.textContent = 'กำลังส่ง...';
        submitButton.disabled = true;
    }
}

function showFormSuccess(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.textContent = 'ส่งสำเร็จ!';
        setTimeout(() => {
            submitButton.textContent = 'ส่งข้อความ';
            submitButton.disabled = false;
        }, 3000);
    }
}

// Theme switcher (bonus feature)
function initializeThemeSwitcher() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        
        // Load saved theme
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
        }
    }
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
}

// Intersection Observer for animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.portfolio-btn, .footer-section');
    animateElements.forEach(el => observer.observe(el));
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeScrollAnimations);

// Error handling
window.addEventListener('error', function(e) {
    console.error('Portfolio error:', e.error);
    // You can add error tracking here
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Portfolio loaded in ${loadTime}ms`);
            
            // Track Core Web Vitals
            trackWebVitals();
        }, 0);
    });
}

function trackWebVitals() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
    
    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
            console.log('FID:', entry.processingStart - entry.startTime);
        });
    }).observe({ entryTypes: ['first-input'] });
    
    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
            if (!entry.hadRecentInput) {
                clsValue += entry.value;
            }
        });
        console.log('CLS:', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
}

// Social sharing functionality
function initializeSocialSharing() {
    const socialButtons = document.querySelectorAll('.social-share');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            shareToSocial(platform, url, title);
        });
    });
}

function shareToSocial(platform, url, title) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        line: `https://line.me/R/msg/text/?${title}%20${url}`
    };
    
    const shareUrl = shareUrls[platform];
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Keyboard navigation support
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            const navLinks = document.querySelector('.nav-links');
            const mobileMenu = document.querySelector('.mobile-menu');
            
            if (navLinks && navLinks.classList.contains('active')) {
                toggleMobileMenu(navLinks, mobileMenu);
            }
        }
        
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
}

// Print styles handler
function initializePrintHandler() {
    window.addEventListener('beforeprint', function() {
        // Hide non-essential elements when printing
        const hideOnPrint = document.querySelectorAll('.no-print');
        hideOnPrint.forEach(el => el.style.display = 'none');
    });
    
    window.addEventListener('afterprint', function() {
        // Restore hidden elements after printing
        const hideOnPrint = document.querySelectorAll('.no-print');
        hideOnPrint.forEach(el => el.style.display = '');
    });
}

// Copy to clipboard functionality
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('คัดลอกแล้ว!', 'success');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('คัดลอกแล้ว!', 'success');
    }
}

// Toast notification system
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Style the toast
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '8px',
        color: 'white',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    // Set background color based on type
    const colors = {
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
        info: '#2196F3'
    };
    toast.style.background = colors[type] || colors.info;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after duration
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, duration);
}

// Portfolio data management
const portfolioData = {
    projects: [],
    skills: [],
    experiences: []
};

function loadPortfolioData() {
    // This would typically load from an API or JSON file
    // For now, using static data
    portfolioData.skills = [
        'JavaScript', 'React', 'Node.js', 'Python',
        'PHP', 'MySQL', 'MongoDB', 'Docker',
        'AWS', 'Git', 'Figma', 'Photoshop'
    ];
    
    portfolioData.experiences = [
        {
            company: 'Tech Startup',
            position: 'Full Stack Developer',
            period: '2021-2023',
            description: 'พัฒนาแอปพลิเคชันเว็บด้วย React และ Node.js'
        },
        {
            company: 'Design Agency',
            position: 'Frontend Developer',
            period: '2019-2021',
            description: 'สร้างเว็บไซต์และ UI/UX Design'
        }
    ];
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality
    initializePortfolio();
    
    // Additional features
    initializeSocialSharing();
    initializeLazyLoading();
    initializeKeyboardNavigation();
    initializePrintHandler();
    initializeContactForm();
    initializeThemeSwitcher();
    
    // Load data
    loadPortfolioData();
    
    console.log('Portfolio website initialized successfully! 🚀');
});
