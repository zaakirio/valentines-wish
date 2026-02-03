// Valentine's Card for Savya - Interactive Script

document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements
    const envelope = document.getElementById('envelope');
    const openingScreen = document.getElementById('openingScreen');
    const cardScreen = document.getElementById('cardScreen');
    const cardContainer = document.querySelector('.card-container');
    const pages = document.querySelectorAll('.card-page');
    const dots = document.querySelectorAll('.dot');
    const replayBtn = document.getElementById('replayBtn');
    
    let currentPage = 0;

    // Create floating hearts background
    createFloatingHearts();
    createSparkles();

    // Envelope click handler
    envelope.addEventListener('click', () => {
        envelope.classList.add('open');
        
        setTimeout(() => {
            openingScreen.classList.remove('active');
            cardScreen.classList.add('active');
            
            // Show first page
            setTimeout(() => {
                pages[0].classList.add('visible');
                updateDots(0);
            }, 300);
        }, 800);
    });

    // Scroll handling for card pages
    cardContainer.addEventListener('scroll', () => {
        const scrollPosition = cardContainer.scrollTop;
        const pageHeight = window.innerHeight;
        const newPage = Math.round(scrollPosition / pageHeight);
        
        if (newPage !== currentPage && newPage >= 0 && newPage < pages.length) {
            currentPage = newPage;
            updateDots(currentPage);
            animatePage(currentPage);
        }
    });

    // Navigation dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentPage = index;
            cardContainer.scrollTo({
                top: index * window.innerHeight,
                behavior: 'smooth'
            });
            updateDots(index);
        });
    });

    // Update active dot
    function updateDots(activeIndex) {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }

    // Animate page content
    function animatePage(pageIndex) {
        const page = pages[pageIndex];
        page.classList.add('visible');

        // Page-specific animations
        if (pageIndex === 1) {
            // Letter page - animate lines
            const lines = page.querySelectorAll('.letter-line');
            lines.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.add('visible');
                }, index * 400);
            });
        }
        
        if (pageIndex === 3) {
            // Promise page - animate promises
            const promises = page.querySelectorAll('.promise');
            promises.forEach((promise, index) => {
                setTimeout(() => {
                    promise.classList.add('visible');
                }, index * 500);
            });
        }
    }

    // Interactive hearts (Page 3)
    const reasonHearts = document.querySelectorAll('.reason-heart');
    reasonHearts.forEach(heart => {
        heart.addEventListener('click', () => {
            if (!heart.classList.contains('revealed')) {
                heart.classList.add('revealed');
                const reason = heart.dataset.reason;
                const textEl = heart.querySelector('.reason-text');
                textEl.textContent = reason;
                
                // Create burst effect
                createHeartBurst(heart);
            }
        });
    });

    // Create heart burst effect
    function createHeartBurst(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.className = 'burst-heart';
            heart.style.left = centerX + 'px';
            heart.style.top = centerY + 'px';
            heart.style.fontSize = Math.random() * 15 + 10 + 'px';
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 100 + Math.random() * 50;
            heart.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
            heart.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
            
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 1000);
        }
    }

    // Replay button
    replayBtn.addEventListener('click', () => {
        // Reset everything
        cardScreen.classList.remove('active');
        openingScreen.classList.add('active');
        envelope.classList.remove('open');
        
        // Reset all pages
        pages.forEach(page => {
            page.classList.remove('visible');
        });
        
        // Reset letter lines
        document.querySelectorAll('.letter-line').forEach(line => {
            line.classList.remove('visible');
        });
        
        // Reset promises
        document.querySelectorAll('.promise').forEach(promise => {
            promise.classList.remove('visible');
        });
        
        // Reset hearts
        reasonHearts.forEach(heart => {
            heart.classList.remove('revealed');
            heart.querySelector('.reason-text').textContent = '';
        });
        
        // Reset scroll
        cardContainer.scrollTop = 0;
        currentPage = 0;
        updateDots(0);
    });

    // Create floating hearts
    function createFloatingHearts() {
        const container = document.getElementById('heartsContainer');
        const heartSymbols = ['❤️', '💕', '💗', '💖', '💝', '💘'];
        
        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            heart.style.animationDuration = Math.random() * 5 + 8 + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';
            
            container.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => heart.remove(), 15000);
        }
        
        // Initial hearts
        for (let i = 0; i < 15; i++) {
            setTimeout(createHeart, i * 200);
        }
        
        // Continuous hearts
        setInterval(createHeart, 1500);
    }

    // Create sparkles
    function createSparkles() {
        const container = document.getElementById('sparklesContainer');
        
        function createSparkle() {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = Math.random() * 100 + 'vh';
            sparkle.style.animationDelay = Math.random() * 2 + 's';
            
            container.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 4000);
        }
        
        // Initial sparkles
        for (let i = 0; i < 20; i++) {
            setTimeout(createSparkle, i * 100);
        }
        
        // Continuous sparkles
        setInterval(createSparkle, 500);
    }

    // Click anywhere for hearts effect
    document.addEventListener('click', (e) => {
        // Don't create hearts when clicking interactive elements
        if (e.target.closest('.reason-heart, .dot, .replay-btn, .music-toggle, .envelope')) {
            return;
        }
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '❤️';
                heart.className = 'burst-heart';
                heart.style.left = e.clientX + 'px';
                heart.style.top = e.clientY + 'px';
                heart.style.fontSize = Math.random() * 15 + 10 + 'px';
                
                const angle = Math.random() * Math.PI * 2;
                const distance = 50 + Math.random() * 50;
                heart.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
                heart.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
                
                document.body.appendChild(heart);
                
                setTimeout(() => heart.remove(), 1000);
            }, i * 50);
        }
    });

    // Intersection Observer for page visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const pageIndex = Array.from(pages).indexOf(entry.target);
                if (pageIndex !== -1) {
                    animatePage(pageIndex);
                }
            }
        });
    }, { threshold: 0.5 });

    pages.forEach(page => observer.observe(page));
});
