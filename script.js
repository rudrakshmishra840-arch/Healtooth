// HEALTOOTH DENTAL CLINIC - Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.service-card, .hero-content, img, section');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.transition = 'all 0.8s ease-out';
                
                // Trigger stats counter if this is the stats container
                if (el.classList.contains('stats-container') && !el.dataset.counted) {
                    animateStats();
                    el.dataset.counted = "true";
                }
            }
        });
    };

    // Stat Animation
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const speed = 200;
            const updateCount = () => {
                const count = +stat.innerText;
                const inc = target / speed;
                if (count < target) {
                    stat.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    stat.innerText = target + (stat.dataset.plus ? '+' : '');
                }
            };
            updateCount();
        });
    };

    // Initial styles for revealed elements
    reveals.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // 3. Treatment Body Map Logic
    window.showTreatment = (type) => {
        const title = document.getElementById('t-title');
        const desc = document.getElementById('t-desc');
        const infoBox = document.getElementById('treatment-info');

        const data = {
            cavity: {
                title: 'Cavities & Decay',
                desc: 'Tooth decay doesn\'t just cause pain—it affects your ability to eat and speak. We use advanced tooth-colored fillings and laser dentistry to restore your tooth with minimal discomfort.'
            },
            gum: {
                title: 'Gum Disease',
                desc: 'Healthy gums are the foundation of a beautiful smile. We offer deep cleaning and gum contouring treatments to prevent bone loss and keep your gums pink and healthy.'
            },
            sensitivity: {
                title: 'Tooth Sensitivity',
                desc: 'Sharp pain while eating cold or hot food? We offer specialized desensitizing treatments and protective coatings to let you enjoy your favorite foods again.'
            },
            loss: {
                title: 'Tooth Loss',
                desc: 'Regain full function with our state-of-the-art dental implants and crowns. Dr. Sonia specializes in natural-looking restorations that last a lifetime.'
            }
        };

        if (data[type]) {
            infoBox.style.opacity = '0';
            setTimeout(() => {
                title.innerText = data[type].title;
                desc.innerText = data[type].desc;
                infoBox.style.opacity = '1';
                infoBox.style.transition = 'opacity 0.3s ease';
            }, 300);
        }
    };

    // 4. FAQ Accordion Logic
    window.toggleFAQ = (element) => {
        const p = element.querySelector('p');
        const icon = element.querySelector('i');
        const isOpen = p.style.display === 'block';
        
        // Close all other FAQs
        document.querySelectorAll('#faq .service-card p').forEach(item => item.style.display = 'none');
        document.querySelectorAll('#faq .service-card i').forEach(item => item.className = 'fas fa-chevron-down');

        if (!isOpen) {
            p.style.display = 'block';
            icon.className = 'fas fa-chevron-up';
        }
    };

    // 5. Booking Form Submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Processing...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Thank you! Your appointment request has been sent. We will confirm it within 2 hours.');
                btn.innerText = originalText;
                btn.disabled = false;
                bookingForm.reset();
            }, 1500);
        });
    }

    // 6. Mobile Menu Toggle (Premium)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
});
