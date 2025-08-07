// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

// Observe all elements with scroll-animate class
document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'linear-gradient(135deg, #1e3c72, #2a5298)';
            navLinks.style.flexDirection = 'column';
            navLinks.style.padding = '1rem';
            navLinks.style.gap = '1rem';
            navLinks.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        }
    });
}

// Skill bar animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0%';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 500);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Portfolio button interactions
document.querySelectorAll('.portfolio-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const btnTitle = this.querySelector('h3').textContent;
        
        // สำหรับการทำงานจริง สามารถเปลี่ยนเป็น redirect ไปหน้าต่างๆ
        switch(btnTitle) {
            case 'Tech Company':
                alert('Portfolio สำหรับ Tech Company จะเปิดเร็วๆ นี้!\n\nจะเน้นแสดงทักษะ:\n- การเขียนโปรแกรม\n- การพัฒนาเว็บไซต์\n- ฐานข้อมูล\n- เทคโนโลยีใหม่ๆ');
