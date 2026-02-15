// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered', reg))
            .catch(err => console.log('Service Worker registration failed', err));
    });
}

// Cart Functionality
let cartCount = 0;
const cartCountElement = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

if (cartCountElement) {
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartCount++;
            cartCountElement.textContent = cartCount;

            const originalText = button.textContent;
            button.textContent = 'Added!';
            button.style.backgroundColor = '#27ae60';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '#2ecc71';
            }, 1000);
        });
    });
}

// Intersection Observer for Fade-In Sections
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Update Side Navigation active state
            const id = entry.target.getAttribute('id');
            if (id) {
                document.querySelectorAll('.scroll-nav a').forEach(navLink => {
                    navLink.classList.remove('active');
                    if (navLink.getAttribute('href') === `#${id}`) {
                        navLink.classList.add('active');
                    }
                });
            }
        }
    });
}, observerOptions);

// Observe all sections with fade-in class
document.querySelectorAll('.fade-in, .hero-full').forEach(section => {
    observer.observe(section);
});

// Smooth Scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
