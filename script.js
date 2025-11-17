// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Subscribe modal functions
function openSubscribeModal() {
    const modal = document.getElementById('subscribe-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus on email input
    setTimeout(() => {
        const emailInput = modal.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.focus();
        }
    }, 100);
}

function closeSubscribeModal() {
    const modal = document.getElementById('subscribe-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset form
    const form = document.getElementById('subscribe-form');
    if (form) {
        form.reset();
    }
}

// Handle subscribe form submission
function handleSubscribe(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    const submitBtn = event.target.querySelector('.subscribe-submit');
    
    // Show loading state
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        const modalContent = document.querySelector('.modal-content');
        modalContent.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
                <h2>Successfully subscribed!</h2>
                <p>Welcome to the newsletter! Check your inbox for a confirmation email.</p>
                <button onclick="closeSubscribeModal()" style="margin-top: 1.5rem; background: var(--accent-color); color: white; border: none; padding: 0.8rem 2rem; border-radius: 4px; font-weight: 600; cursor: pointer;">Close</button>
            </div>
        `;
        
        // Update subscriber count (simulate)
        updateSubscriberCount();
        
        // Auto close after 3 seconds
        setTimeout(() => {
            closeSubscribeModal();
            location.reload(); // Reload to reset modal content
        }, 3000);
    }, 1500);
}

// Update subscriber count animation
function updateSubscriberCount() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        if (stat.textContent.includes('847')) {
            const currentCount = 2847;
            const newCount = currentCount + 1;
            animateNumber(stat, currentCount, newCount, 1000);
        }
    });
}

// Animate number counting
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Load more posts functionality
function loadMorePosts() {
    const loadMoreBtn = document.querySelector('.load-more');
    const postsGrid = document.querySelector('.posts-grid');
    
    // Show loading state
    loadMoreBtn.textContent = 'Loading...';
    loadMoreBtn.disabled = true;
    
    // Simulate loading more posts
    setTimeout(() => {
        const newPosts = [
            {
                date: 'Sep 29, 2025',
                readTime: '6 min read',
                title: 'The Psychology of Product Design',
                excerpt: 'Understanding how users think and behave is the key to creating products that people love. Here are the psychological principles every designer should know...'
            },
            {
                date: 'Sep 22, 2025',
                readTime: '4 min read',
                title: 'Remote Team Building That Actually Works',
                excerpt: 'Building strong team relationships remotely isn\'t easy, but it\'s possible. Here are the strategies that have worked for our distributed team...'
            },
            {
                date: 'Sep 15, 2025',
                readTime: '8 min read',
                title: 'The End of 9-to-5: Rethinking Work Hours',
                excerpt: 'The traditional workday is becoming obsolete. Here\'s why flexible schedules are the future and how to implement them successfully...'
            }
        ];
        
        newPosts.forEach(post => {
            const postCard = document.createElement('article');
            postCard.className = 'post-card';
            postCard.style.opacity = '0';
            postCard.innerHTML = `
                <div class="post-content">
                    <div class="post-meta">
                        <span class="post-date">${post.date}</span>
                        <span class="post-read-time">${post.readTime}</span>
                    </div>
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <a href="#" class="read-more">Read more →</a>
                </div>
            `;
            
            postsGrid.appendChild(postCard);
            
            // Animate in
            setTimeout(() => {
                postCard.style.transition = 'opacity 0.5s ease';
                postCard.style.opacity = '1';
            }, 100);
        });
        
        // Reset button or hide if no more posts
        loadMoreBtn.textContent = 'Load more posts';
        loadMoreBtn.disabled = false;
        
        // Hide button after loading a few times (simulate end of content)
        const currentPosts = postsGrid.querySelectorAll('.post-card').length;
        if (currentPosts >= 12) {
            loadMoreBtn.style.display = 'none';
        }
    }, 1000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('subscribe-modal');
    if (event.target === modal) {
        closeSubscribeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeSubscribeModal();
    }
});

// Add scroll effect to header
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.post-card, .about-content, .hero-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Animate hero content immediately
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Add reading progress bar
function addReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--accent-color);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize reading progress
addReadingProgress();

console.log('Newsletter blog loaded successfully! 🚀');
