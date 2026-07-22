/* -------------------------------------------------------------
   Vasundhara D P - Portfolio JavaScript Interactivity
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigation Menu Toggle (Mobile)
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Toggle hamburger icon between bars and close X
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = navToggle.querySelector('i');
                icon.className = 'fa-solid fa-bars';
            });
        });
    }

    // 2. Sticky Header scroll styling
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Typing Effect in Hero Section
    const typingText = document.getElementById('typing-text');
    const professions = [
        'AI/ML Applications',
        'Computer Vision Solutions',
        'Scalable Backend Services',
        'Open-Source Code'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!typingText) return;
        const currentWord = professions[wordIndex];
        
        if (isDeleting) {
            // Remove character
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add character
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Determine typing speed
        let typeSpeed = isDeleting ? 40 : 85;

        // If word is finished typing
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % professions.length; // Next word
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }
    
    // Start typing loop
    setTimeout(type, 1000);

    // 4. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealOnScroll.observe(el));

    // 5. ScrollSpy - Active Nav Links mapping to Section scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // offset for fixed header
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 6. Project Filter Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to current button
            e.target.classList.add('active');

            const categoryFilter = e.target.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // Add scale down animation / hiding class
                if (categoryFilter === 'all' || cardCategory === categoryFilter) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 7. Contact Form Simulation (Validation & Success transition)
    const contactForm = document.getElementById('portfolio-contact-form');
    const successMessage = document.getElementById('form-success');
    const resetBtn = document.querySelector('.btn-reset');

    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Perform basic validation checks
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name && email && subject && message) {
                // Change submit button state to simulating loading
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalBtnContent = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;

                // Send actual email via FormSubmit AJAX endpoint
                fetch("https://formsubmit.co/ajax/dpvasundhara@gmail.com", {
                    method: "POST",
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        subject: subject,
                        message: message
                    })
                })
                .then(response => response.json())
                .then(data => {
                    // Hide Form, Show Success Card
                    contactForm.classList.add('hidden');
                    successMessage.classList.remove('hidden');
                    
                    // Reset button states
                    submitBtn.innerHTML = originalBtnContent;
                    submitBtn.disabled = false;
                    contactForm.reset();
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    // Fallback visual feedback on error
                    submitBtn.innerHTML = '<span>Error! Try Again</span>';
                    submitBtn.disabled = false;
                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnContent;
                    }, 3000);
                });
            }
        });

        // Reset and send another message button
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                successMessage.classList.add('hidden');
                contactForm.classList.remove('hidden');
            });
        }
    }

    // 8. Image load listener & fallback logic
    const profilePic = document.getElementById('profile-pic');
    const codeFallback = document.getElementById('code-fallback');
    const visualBlob = document.querySelector('.visual-blob');

    if (profilePic && codeFallback && visualBlob) {
        const handleImageLoad = () => {
            codeFallback.style.display = 'none';
            visualBlob.style.display = 'none';
            profilePic.style.opacity = '1';
        };

        if (profilePic.complete && profilePic.naturalWidth > 0) {
            handleImageLoad();
        } else {
            profilePic.addEventListener('load', handleImageLoad);
            profilePic.addEventListener('error', () => {
                profilePic.style.display = 'none';
                codeFallback.style.display = 'block';
                visualBlob.style.display = 'block';
            });
        }
    }
});
