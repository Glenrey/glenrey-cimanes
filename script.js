document.addEventListener("DOMContentLoaded", () => {
    
    /* 1. CUSTOM CURSOR
       - Creates a fluid, lagging cursor effect */
    const cursorDot = document.querySelector("[data-cursor-dot]");
    const cursorOutline = document.querySelector("[data-cursor-outline]");

    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot moves instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline moves with animation (done via CSS transition + JS coordinate update)
        // We use animate() for smoother high-performance movement
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    /* 2. SCROLL REVEAL ANIMATION
       - Elements fade up gently when they enter the viewport */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-text');
    revealElements.forEach(el => {
        // Add base styles via JS so non-JS users still see content
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s cubic-bezier(0.5, 0, 0, 1)";
        observer.observe(el);
    });
    
    // Add the 'active' class logic via CSS injection or inline styles
    // Here we handle the trigger logic:
    document.addEventListener('scroll', () => {
        revealElements.forEach(el => {
            if(el.classList.contains('active')) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }
        });
    });

    /* 3. MAGNETIC BUTTONS 
       - Buttons slightly pull toward the cursor */
    const buttons = document.querySelectorAll('.magnetic-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move the button slightly (divided by 5 for subtlety)
            btn.style.transform = `translate(${x/5}px, ${y/5}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
});