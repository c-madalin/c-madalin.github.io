/**
 * Main JavaScript file for Madalin Cazan's portfolio
 * Author: Madalin Cazan
 * Website: https://c-madalin.github.io
 */

// Wait for DOM to be fully loaded

// JavaScript pentru animația timeline-ului simplificat
document.addEventListener('DOMContentLoaded', function() {
    // Funcție pentru a anima elementele din timeline când sunt vizibile
    function showTimelineItems() {
        const expItems = document.querySelectorAll('.exp-item');
        
        expItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.classList.add('visible');
            }
        });
    }
    
    // Apelează funcția o dată la încărcarea paginii
    showTimelineItems();
    
    // Adaugă event listener pentru scroll
    window.addEventListener('scroll', showTimelineItems);
});
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const headerNav = document.querySelector('.header-nav');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const headerLinks = document.querySelectorAll('.header-nav a');
    const sections = document.querySelectorAll('section');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const contactForm = document.getElementById('contactForm');
    
    // Toggle mobile navigation
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            headerNav.classList.toggle('active');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Toggle sidebar on mobile
    document.addEventListener('click', function(e) {
        // Close sidebar if clicking outside
        if (window.innerWidth <= 991 && sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && !mobileNavToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        }
        
        // Close header navigation if clicking outside
        if (window.innerWidth <= 768 && headerNav.classList.contains('active') && 
            !headerNav.contains(e.target) && !mobileNavToggle.contains(e.target)) {
            headerNav.classList.remove('active');
            // Reset icon
            const icon = mobileNavToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Toggle sidebar for mobile
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            if (window.innerWidth <= 991) {
                sidebar.classList.toggle('active');
                sidebarOverlay.classList.toggle('active');
            }
        });
    }
    
    // Close sidebar when clicking on overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            this.classList.remove('active');
        });
    }
    
    // Smooth scrolling for sidebar navigation
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile sidebar if open
                if (window.innerWidth <= 991) {
                    sidebar.classList.remove('active');
                    sidebarOverlay.classList.remove('active');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Update active link
                sidebarLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for header navigation
    headerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip for links to other pages
            if (this.getAttribute('href').includes('html')) return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (window.innerWidth <= 768 && headerNav.classList.contains('active')) {
                    headerNav.classList.remove('active');
                    const icon = mobileNavToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Update active link
                headerLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Handle active navigation links based on scroll position
    function setActiveLinks() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        if (currentSection) {
            // Update sidebar links
            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
            
            // Update header links
            headerLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Call once on page load
    setActiveLinks();
    
    // Listen for scroll events
    window.addEventListener('scroll', setActiveLinks);
    
    // Timeline animation on scroll
    function showTimelineItems() {
        timelineItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.classList.add('visible');
            }
        });
    }
    
    // Call once on page load
    showTimelineItems();
    
    // Listen for scroll events
    window.addEventListener('scroll', showTimelineItems);
    
    // Form submission handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Te rugăm să completezi toate câmpurile.');
                return;
            }
            
            // Here you would normally send the form data to a server
            // For GitHub Pages, you might use a service like Formspree
            
            // For now, just show a success message
            alert(`Mulțumesc pentru mesaj, ${name}! Te voi contacta în curând.`);
            contactForm.reset();
        });
    }
    
    // Typing effect for hero section
    const heroText = document.querySelector('.hero p');
    
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start the animation
        setTimeout(typeWriter, 1000);
    }
    
    // Project filtering (if on projects page)
    const projectFilters = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectFilters.length > 0) {
        projectFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                projectFilters.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                const category = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (category === 'all') {
                        card.style.display = 'block';
                    } else {
                        const cardCategories = card.getAttribute('data-categories');
                        if (cardCategories && cardCategories.includes(category)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Resize handler
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            // Reset sidebar for desktop
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        }
        
        if (window.innerWidth > 768) {
            // Reset header nav for desktop
            headerNav.classList.remove('active');
            const icon = mobileNavToggle.querySelector('i');
            if (icon.classList.contains('fa-times')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Set current year in footer copyright
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});