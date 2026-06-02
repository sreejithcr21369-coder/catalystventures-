document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Sticky Header
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed header
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Google Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.disabled = true;

            const nameValue = document.getElementById('name').value;
            const emailValue = document.getElementById('email').value;
            const serviceValue = document.getElementById('service').value;
            const messageValue = document.getElementById('message').value;

            // Combine service into the message field since Google form has 3 fields
            let finalMessage = messageValue;
            if (serviceValue) {
                // Formatting the service nicely
                const serviceLabel = document.querySelector(`#service option[value="${serviceValue}"]`).textContent;
                finalMessage = `Service Requested: ${serviceLabel}\n\nMessage:\n${messageValue}`;
            }

            const formData = new FormData();
            formData.append('entry.1395290130', nameValue); // Name
            formData.append('entry.1840331055', emailValue); // Email
            formData.append('entry.1727571199', finalMessage); // Message

            const formUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeeiZyq3YNv6DKDGrjbkqw8S8YSb-2u9iJ2DKGL0Wd5uhYXdg/formResponse';

            fetch(formUrl, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            }).then(() => {
                alert('Thank you for contacting Catalyst Ventures. We will get back to you shortly!');
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }).catch((error) => {
                console.error('Error submitting form:', error);
                alert('There was a problem submitting your message. Please try again.');
                btn.textContent = originalText;
                btn.disabled = false;
            });
        });
    }
});
