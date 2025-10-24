// Enhanced Share Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const shareBtn = document.getElementById('shareBtn');
    const shareModal = document.getElementById('shareModal');
    const closeModal = document.getElementById('closeModal');
    const copyUrlBtn = document.getElementById('copyUrlBtn');
    const shareUrlInput = document.getElementById('shareUrl');
    const copyToast = document.getElementById('copyToast');
    const sharePlatforms = document.querySelectorAll('.share-platform');
    
    // Set current URL in the input
    const currentUrl = window.location.href;
    shareUrlInput.value = currentUrl;
    
    // Page title and description for sharing
    const pageTitle = document.title || 'Share Modal with Phosphor Icons';
    const pageDescription = 'Beautiful share modal with social media integration';
    
    // Enhanced modal opening with staggered platform animations
    shareBtn.addEventListener('click', function() {
        shareModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Stagger platform animations
        setTimeout(() => {
            sharePlatforms.forEach((platform, index) => {
                setTimeout(() => {
                    platform.style.transform = 'translateY(0) scale(1)';
                    platform.style.opacity = '1';
                }, index * 50);
            });
        }, 200);
    });
    
    // Enhanced close modal function
    function closeShareModal() {
        // Reset platform positions
        sharePlatforms.forEach((platform) => {
            platform.style.transform = 'translateY(20px) scale(0.8)';
            platform.style.opacity = '0';
        });
        
        // Reset copy button to default state
        copyUrlBtn.classList.remove('copied');
        
        setTimeout(() => {
            shareModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }, 100);
    }
    
    // Initialize platform positions
    sharePlatforms.forEach((platform) => {
        platform.style.transform = 'translateY(20px) scale(0.8)';
        platform.style.opacity = '0';
        platform.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    
    closeModal.addEventListener('click', closeShareModal);
    
    // Close modal when clicking overlay
    shareModal.addEventListener('click', function(e) {
        if (e.target === shareModal) {
            closeShareModal();
        }
    });
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (shareModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeShareModal();
            }
        }
    });
    
    // Enhanced copy functionality with animation
    copyUrlBtn.addEventListener('click', function() {
        const btn = this;
        
        shareUrlInput.select();
        shareUrlInput.setSelectionRange(0, 99999);
        
        try {
            navigator.clipboard.writeText(currentUrl).then(function() {
                handleCopySuccess(btn);
            }).catch(function() {
                document.execCommand('copy');
                handleCopySuccess(btn);
            });
        } catch (err) {
            document.execCommand('copy');
            handleCopySuccess(btn);
        }
    });
    
    // Handle copy success with enhanced feedback
    function handleCopySuccess(btn) {
        btn.classList.add('copied');
        
        // Show enhanced toast
        showCopyToast();
        
        // Reset button state
        setTimeout(() => {
            btn.classList.remove('copied');
        }, 2000);
    }
    
    // Enhanced copy success toast
    function showCopyToast() {
        copyToast.classList.add('show');
        
        // Auto hide with progress animation
        setTimeout(function() {
            copyToast.classList.remove('show');
        }, 3000);
    }
    
    // Enhanced social platform sharing
    sharePlatforms.forEach(function(platform) {
        platform.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        platform.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        platform.addEventListener('click', function() {
            const platformType = this.getAttribute('data-platform');
            const encodedUrl = encodeURIComponent(currentUrl);
            const encodedTitle = encodeURIComponent(pageTitle);
            const encodedDescription = encodeURIComponent(pageDescription);
            
            let shareUrl = '';
            
            switch(platformType) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
                    break;
                case 'pinterest':
                    const firstImage = document.querySelector('img');
                    const imageUrl = firstImage ? encodeURIComponent(firstImage.src) : '';
                    shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}&media=${imageUrl}`;
                    break;
                case 'telegram':
                    shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`;
                    break;
                case 'reddit':
                    shareUrl = `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
            }
        });
    });
    
    // Create ripple effect for platforms
    function createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin-top: -10px;
            margin-left: -10px;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
            style.remove();
        }, 600);
    }
    
    // Enhanced smooth scrolling for modal
    shareModal.addEventListener('wheel', function(e) {
        e.stopPropagation();
    }, { passive: true });
    
    // Add focus management for accessibility
    shareBtn.addEventListener('click', function() {
        setTimeout(() => {
            closeModal.focus();
        }, 300);
    });
    
    // Auto-focus first platform when modal opens via keyboard
    document.addEventListener('keydown', function(e) {
        if (e.target === shareBtn && (e.key === 'Enter' || e.key === ' ')) {
            setTimeout(() => {
                const firstPlatform = shareModal.querySelector('.share-platform');
                if (firstPlatform) {
                    firstPlatform.focus();
                    firstPlatform.style.outline = '2px solid var(--theme-secondary-color)';
                    firstPlatform.style.outlineOffset = '2px';
                }
            }, 300);
        }
    });
    
    // Add platform keyboard interaction
    sharePlatforms.forEach(platform => {
        platform.setAttribute('tabindex', '0');
        platform.setAttribute('role', 'button');
        
        platform.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        platform.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--theme-secondary-color)';
            this.style.outlineOffset = '2px';
        });
        
        platform.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});