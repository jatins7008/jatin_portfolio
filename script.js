document.addEventListener('DOMContentLoaded', function() {
    // 1. Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    }

    // 2. Initialize AOS Animation
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50
    });

    // 3. Typed.js Initialization
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        new Typed('.typing-text', {
            strings: ['Web Developer', 'PHP Developer', 'Frontend Designer'],
            typeSpeed: 70,
            backSpeed: 50,
            backDelay: 1500,
            loop: true,
            showCursor: false // using custom cursor in html if needed, else true
        });
    }

    // 4. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 5. Active Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add offset for fixed navbar
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });

    // Close mobile menu on link click
    const navItemLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    navItemLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                // Bootstrap 5 way to hide collapse
                let bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });

    // 6. Theme Toggle (Dark/Light Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (htmlElement.getAttribute('data-bs-theme') === 'dark') {
                htmlElement.setAttribute('data-bs-theme', 'light');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                htmlElement.setAttribute('data-bs-theme', 'dark');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        });
    }

    // 7. Scroll To Top Button
    const scrollTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 8. Animated Counters
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const countUp = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 40;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(countUp, 50);
            } else {
                counter.innerText = target;
            }
        });
    }

    const counterSection = document.querySelector('.about-img-wrapper');
    if (counterSection) {
        window.addEventListener('scroll', () => {
            if (hasCounted) return;
            const sectionPos = counterSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight;
            if (sectionPos < screenPos - 50) {
                countUp();
                hasCounted = true;
            }
        });
    }

    // 9. Progress Bars & Circular Skills Animation on Scroll
    const progressBars = document.querySelectorAll('.progress-bar');
    const circles = document.querySelectorAll('.circle');
    let skillsAnimated = false;

    const skillsSection = document.getElementById('skills');
    
    if (skillsSection) {
        window.addEventListener('scroll', () => {
            if (skillsAnimated) return;
            
            const sectionPos = skillsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight;
            
            if (sectionPos < screenPos - 100) {
                // Animate progress bars
                progressBars.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-width');
                });
                
                // Animate circular skills
                circles.forEach(circle => {
                    const percent = circle.getAttribute('data-percent');
                    // Get root colors for the gradient
                    const computedStyle = getComputedStyle(document.body);
                    const primaryColor = computedStyle.getPropertyValue('--primary-color').trim() || '#eab308';
                    const bgMain = computedStyle.getPropertyValue('--bg-main').trim() || '#0a192f';
                    
                    circle.style.background = `conic-gradient(${primaryColor} ${percent}%, ${bgMain} 0%)`;
                });
                
                skillsAnimated = true;
            }
        });
    }

    // 10. Form Submission (WhatsApp Redirect)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Construct WhatsApp Message
            const whatsappNumber = "917307054629";
            const whatsappMessage = `Hello Jatin, I am *${name}*.\n\n*Email:* ${email}\n*Subject:* ${subject}\n\n*Message:*\n${message}`;
            
            // Create WhatsApp API URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Show loading state temporarily
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Redirecting to WhatsApp... <i class="fab fa-whatsapp ms-2"></i>';
            
            // Try adding btn-success if not already present
            if (btn.classList.contains('btn-primary')) {
                btn.classList.replace('btn-primary', 'btn-success');
            } else {
                btn.style.backgroundColor = '#25D366'; // WhatsApp Green
            }
            
            // Redirect after a short delay
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                
                // Reset button
                btn.innerHTML = originalText;
                if (btn.classList.contains('btn-success')) {
                    btn.classList.replace('btn-success', 'btn-primary');
                }
                btn.style.backgroundColor = '';
                
                contactForm.reset();
            }, 1000);
        });
    }
});
