/* -------------------------------------------------------------
   Vasundhara D P - Portfolio JavaScript Interactivity
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Preloader Handler
    const preloader = document.getElementById('preloader');
    const preloaderFill = document.getElementById('preloader-fill');
    if (preloader) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 20;
            if (preloaderFill) preloaderFill.style.width = `${Math.min(progress, 100)}%`;
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.classList.add('loaded');
                }, 200);
            }
        }, 40);
    }

    // 2. Navigation Menu Toggle (Mobile)
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 3. Header Scroll Styling & Scroll Progress
    const header = document.querySelector('.main-header');
    const scrollProgressFill = document.getElementById('scroll-progress-fill');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0 && scrollProgressFill) {
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgressFill.style.width = `${scrollPercent}%`;
        }
    });

    // 4. Typing Effect in Hero Section
    const typingText = document.getElementById('typing-text');
    const professions = [
        'AI/ML Applications',
        'Multi-Agent AI Mesh Systems',
        'Computer Vision Solutions',
        'Scalable Backend Services'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!typingText) return;
        const currentWord = professions[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % professions.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }
    setTimeout(type, 800);

    // 5. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });
    revealElements.forEach(el => revealOnScroll.observe(el));

    // 6. Metric Counter Animation
    const metricValues = document.querySelectorAll('.metric-value');
    const metricObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.getAttribute('data-count'));
                const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
                const suffix = el.getAttribute('data-suffix') || '';
                const duration = 1400;
                const startTime = performance.now();

                function updateCount(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const current = target * progress;
                    el.textContent = `${current.toFixed(decimals)}${suffix}`;
                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    }
                }
                requestAnimationFrame(updateCount);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    metricValues.forEach(el => metricObserver.observe(el));

    // 7. 3D Project Card Flip Handler
    const flipButtons = document.querySelectorAll('.flip-btn');
    flipButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.project-card');
            if (card) {
                card.classList.toggle('flipped');
            }
        });
    });

    // 8. Project Filter Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            e.target.classList.add('active');
            e.target.setAttribute('aria-pressed', 'true');

            const categoryFilter = e.target.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (categoryFilter === 'all' || (cardCategory && cardCategory.includes(categoryFilter))) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 9. Interactive 3D Skill Tag Sphere Physics
    const tagSphere = document.getElementById('tag-sphere');
    if (tagSphere) {
        const tags = tagSphere.querySelectorAll('.tag');
        const count = tags.length;
        const radius = 110;
        const points = [];

        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i + 1) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;
            points.push({
                x: radius * Math.cos(theta) * Math.sin(phi),
                y: radius * Math.sin(theta) * Math.sin(phi),
                z: radius * Math.cos(phi)
            });
        }

        let rx = 0.003, ry = 0.005;

        function renderSphere() {
            for (let i = 0; i < count; i++) {
                const p = points[i];
                const cosX = Math.cos(rx), sinX = Math.sin(rx);
                const cosY = Math.cos(ry), sinY = Math.sin(ry);

                const y1 = p.y * cosX - p.z * sinX;
                const z1 = p.z * cosX + p.y * sinX;

                const x2 = p.x * cosY + z1 * sinY;
                const z2 = z1 * cosY - p.x * sinY;

                p.x = x2; p.y = y1; p.z = z2;

                const scale = (z2 + 220) / 320;
                const alpha = Math.max(0.2, (z2 + radius) / (2 * radius));

                tags[i].style.transform = `translate(-50%, -50%) translate3d(${p.x}px, ${p.y}px, ${p.z}px) scale(${scale})`;
                tags[i].style.opacity = alpha;
            }
            requestAnimationFrame(renderSphere);
        }
        renderSphere();
    }

    // 10. Particle Canvas Background Animation
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = Array.from({ length: 45 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 2 + 1,
            alpha: Math.random() * 0.4 + 0.1
        }));

        function drawParticles() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 242, 254, ${p.alpha})`;
                ctx.fill();
            });
            requestAnimationFrame(drawParticles);
        }
        drawParticles();
    }

    // 11. Theme Toggle (Light/Dark Mode)
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = newTheme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            }
        });
    }

    // 12. Back to Top Button
    const toTopBtn = document.getElementById('to-top');
    if (toTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                toTopBtn.classList.add('visible');
            } else {
                toTopBtn.classList.remove('visible');
            }
        });
        toTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 13. Contact Form Submission
    const contactForm = document.getElementById('portfolio-contact-form');
    const successMessage = document.getElementById('form-success');
    const resetBtn = document.querySelector('.btn-reset');

    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name && email && subject && message) {
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalBtnContent = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;

                fetch("https://formsubmit.co/ajax/dpvasundhara@gmail.com", {
                    method: "POST",
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ name, email, subject, message })
                })
                .then(response => response.json())
                .then(() => {
                    contactForm.classList.add('hidden');
                    successMessage.classList.remove('hidden');
                    submitBtn.innerHTML = originalBtnContent;
                    submitBtn.disabled = false;
                    contactForm.reset();
                })
                .catch(error => {
                    console.error('Form submission error:', error);
                    submitBtn.innerHTML = '<span>Error! Try Again</span>';
                    submitBtn.disabled = false;
                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnContent;
                    }, 3000);
                });
            }
        });

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                successMessage.classList.add('hidden');
                contactForm.classList.remove('hidden');
            });
        }
    }
});
