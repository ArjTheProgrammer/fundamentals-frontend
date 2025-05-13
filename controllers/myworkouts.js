// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // Add hover effect to nav links
    const navLinks = document.querySelectorAll('.nav-link:not(.active)');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });
    
    // Add hover effect to workout cards
    const workoutCards = document.querySelectorAll('.workout-card');
    
    workoutCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
        
        // Make cards clickable
        card.addEventListener('click', function() {
            // Placeholder for future functionality
            console.log('Workout clicked:', this.querySelector('.workout-title').textContent);
            
            // Add a subtle click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 100);
        });
    });
    
    // Simulate loading athlete images (for production, replace with real images)
    const athleteImages = document.querySelectorAll('.athlete-image');
    const placeholderColors = ['#ff7700', '#ff9900', '#ffaa00'];
    
    athleteImages.forEach((img, index) => {
        // This is a placeholder - in production, you would use real athlete images
        img.style.backgroundColor = placeholderColors[index % placeholderColors.length];
    });
    
    // Simulate loading basketball image (for production, replace with real image)
    const basketballImage = document.querySelector('.basketball-image');
    if (basketballImage) {
        // This is a placeholder - in production, you would use a real basketball image
        basketballImage.src = 'https://via.placeholder.com/180';
    }
    
    // Add subtle animation to hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Add staggered animation to workout cards
    workoutCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
});