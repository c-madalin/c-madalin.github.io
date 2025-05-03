/**
 * Main JavaScript file for Madalin Cazan's portfolio
 * Author: Madalin Cazan
 * Modified: 2025
 * Website: https://c-madalin.github.io
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const mainContent = document.querySelector('.main-content');
    const menuOverlay = document.querySelector('.menu-overlay');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const headerNav = document.querySelector('.header-nav');
    const headerLinks = document.querySelectorAll('.header-nav a');
    const sections = document.querySelectorAll('section');
    const expItems = document.querySelectorAll('.exp-item');
    
    // Function to animate timeline items when they are visible
    function showTimelineItems() {
        expItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.classList.add('visible');
            }
        });
    }
    
    // Toggle mobile navigation
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            headerNav.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            
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
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (headerNav.classList.contains('active') && 
            !headerNav.contains(e.target) && 
            !mobileNavToggle.contains(e.target)) {
            headerNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            
            // Reset icon
            const icon = mobileNavToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Close mobile menu when clicking on overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            headerNav.classList.remove('active');
            this.classList.remove('active');
            
            // Reset icon
            const icon = mobileNavToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
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
                if (headerNav.classList.contains('active')) {
                    headerNav.classList.remove('active');
                    menuOverlay.classList.remove('active');
                    
                    const icon = mobileNavToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
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
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight && sectionId) {
                currentSection = sectionId;
            }
        });
        
        if (currentSection) {
            // Update header links
            headerLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href && href === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Call once on page load
    setActiveLinks();
    showTimelineItems();
    
    // Listen for scroll events
    window.addEventListener('scroll', function() {
        setActiveLinks();
        showTimelineItems();
        
        // Show/hide header on scroll
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('.main-header');
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Resize handler
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Reset header nav for desktop
            headerNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            
            const icon = mobileNavToggle.querySelector('i');
            if (icon && icon.classList.contains('fa-times')) {
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
});