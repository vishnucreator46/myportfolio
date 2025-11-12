// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Hero section entrance animation
const heroTimeline = gsap.timeline();
heroTimeline
    .from("#hero-image-container", {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out"
    })
    .from("h1", {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out"
    }, "-=0.5")
    .from("h2", {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out"
    }, "-=0.7")
    .from("#hero-front p", {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out"
    }, "-=0.7")
    .from(".btn-primary, .btn-secondary", {
        duration: 1,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out"
    }, "-=0.5");

// Scroll animations for sections
gsap.utils.toArray("section").forEach(section => {
    if (section.id !== "home") {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor jump
        let target = this.getAttribute('href');
        gsap.to(window, { duration: 1, scrollTo: { y: target, offsetY: 80 }, ease: "power2.inOut" });
    })
});

// ID Card Flip Logic
const heroCard = document.getElementById('hero-card');
const profilePhoto = document.getElementById('profile-photo');
const heroBack = document.getElementById('hero-back');
const heroFront = document.getElementById('hero-front');
const flipper = document.getElementById('flipper');

const setCardHeight = () => {
    // Ensure elements exist before trying to access them
    if (!heroCard || !heroFront || !heroBack) return;
    
    if (heroCard.classList.contains('is-flipped')) {
        heroCard.style.height = heroBack.offsetHeight + 'px';
    } else {
        heroCard.style.height = heroFront.offsetHeight + 'px';
    }
};

const toggleFlip = () => {
    if (!heroCard || !flipper) return;
    heroCard.classList.toggle('is-flipped');
    // The rotation is now handled by CSS classes, so no JS transform is needed here.
    setCardHeight();
};

// Ensure the photo element exists before adding a listener
if (profilePhoto) {
    profilePhoto.addEventListener('click', toggleFlip);
}
if (heroBack) {
    heroBack.addEventListener('click', toggleFlip);
}

// Set initial height and add resize listener
setCardHeight();
window.addEventListener('resize', setCardHeight);
