 // Smooth scroll behavior
        let isScrolling = false;

        // Debounced scroll handler for better performance
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

        // Navbar scroll effect
        const handleScroll = debounce(() => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 10);

        window.addEventListener('scroll', handleScroll);

        // Hero slider
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const totalSlides = slides.length;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        // Auto advance slides
        setInterval(nextSlide, 4000);

        // Improved scroll animations with better intersection observer
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -10% 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Enhanced smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            });
        });

        // Optimized parallax effect for hero section (disabled on mobile for performance)
        if (window.innerWidth > 768) {
            const parallaxHandler = debounce(() => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                if (hero && scrolled < window.innerHeight) {
                    hero.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0)`;
                }
            }, 16);

            window.addEventListener('scroll', parallaxHandler);
        }

        // Enhanced pricing card interaction
        const pricingCard = document.querySelector('.pricing-card');
        if (pricingCard) {
            pricingCard.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            });
            pricingCard.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        }

        // Lazy loading for better performance
        if ('IntersectionObserver' in window) {
            const lazyElements = document.querySelectorAll('[data-src]');
            const lazyObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        element.src = element.dataset.src;
                        element.removeAttribute('data-src');
                        lazyObserver.unobserve(element);
                    }
                });
            });

            lazyElements.forEach(el => lazyObserver.observe(el));
        }

        // Improve button interactions
        document.querySelectorAll('.btn-primary-custom, .btn-secondary-custom').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Performance monitoring
        window.addEventListener('load', function() {
            // Remove will-change after animations complete
            setTimeout(() => {
                document.querySelectorAll('[style*="will-change"]').forEach(el => {
                    el.style.willChange = 'auto';
                });
            }, 3000);
        });