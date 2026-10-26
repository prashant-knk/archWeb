// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(61, 40, 23, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(61, 40, 23, 0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section, .service-card, .feature-card, .portfolio-item, .process-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Portfolio item click handler (can be extended for lightbox)
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', function() {
        // Add lightbox functionality here if needed
        console.log('Portfolio item clicked');
    });
});

// Form validation (if contact form is added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading state
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Initialize EmailJS
(function() {
    emailjs.init("wlNmTdBaCqgUoZs7D"); // Replace with your EmailJS public key
})();

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value,
            project_type: (document.getElementById('project_type') || {}).value || '',
            city: ((document.getElementById('city') || {}).value || '').trim()
        };

        // Disable submit button
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            // Send email using EmailJS
            // Replace these with your EmailJS service ID, template ID, and public key
            await emailjs.send(
                'service_kq3aj8n',      // Replace with your EmailJS service ID
                'template_82xfjuy',     // Replace with your EmailJS template ID
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone || 'Not provided',
                    message: formData.message,
                    project_type: formData.project_type || 'Not specified',
                    city: formData.city || 'Not specified'
                }
            );

            // Analytics: count the lead (no-op until a GA4 ID is set in analytics.js)
            trackEvent('generate_lead', {
                form_id: 'contact-form',
                project_type: formData.project_type || 'Not specified',
                city: formData.city || 'Not specified'
            });

            // Show success message
            formMessage.style.display = '';
            formMessage.textContent = '✓ Thank you' + (formData.name ? ', ' + formData.name.split(' ')[0] : '') +
                '! Your enquiry has been sent to the Kala & Kriti team. We will get back to you soon at ' + formData.email +
                '. For a faster reply, call +91 7892083540 or WhatsApp us.';
            formMessage.className = 'form-message success';
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 10 seconds
            clearTimeout(formMessage._hideTimer);
            formMessage._hideTimer = setTimeout(() => {
                formMessage.style.display = 'none';
            }, 10000);

        } catch (error) {
            console.error('Error sending email:', error);
            
            // Show error message
            clearTimeout(formMessage._hideTimer);
            formMessage.style.display = '';
            formMessage.textContent = 'Sorry, there was an error sending your message. Please try again or contact us directly at sales@kalankriti.in';
            formMessage.className = 'form-message error';
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}


// Footer year (always current)
(function () {
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// Analytics helper: only sends when GA4 is enabled (see KK_GA4_MEASUREMENT_ID in analytics.js)
function trackEvent(name, params) {
    try {
        if (window.KK_GA4_ENABLED && typeof window.gtag === 'function') {
            window.gtag('event', name, params || {});
        }
    } catch (err) {
        // Never let analytics break the page
    }
}

// Track clicks on phone, email and WhatsApp links
document.addEventListener('click', (e) => {
    const link = e.target.closest ? e.target.closest('a[href]') : null;
    if (!link) return;
    const href = link.getAttribute('href') || '';
    const linkLocation = link.classList.contains('whatsapp-float') ? 'floating_button' :
        (link.closest('#contact') ? 'contact_section' : 'page');
    if (href.startsWith('tel:')) {
        trackEvent('click_phone', { link_url: href, link_location: linkLocation });
    } else if (href.startsWith('mailto:')) {
        trackEvent('click_email', { link_url: href, link_location: linkLocation });
    } else if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) {
        trackEvent('click_whatsapp', { link_url: href, link_location: linkLocation });
    }
});
