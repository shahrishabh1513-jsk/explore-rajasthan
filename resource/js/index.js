// Wait for DOM to load
$(document).ready(function() {
    
    // Initialize AOS Animation
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });

    // Navbar Scroll Effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Dropdown Hover Effect
    $('.dropdown').hover(
        function() {
            $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(300);
        },
        function() {
            $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(300);
        }
    );

    // Smooth Scroll for Anchor Links
    $('a[href*="#"]').on('click', function(e) {
        if (this.hash !== '') {
            e.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800);
        }
    });

    // Counter Animation for Stats
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function animateCounter() {
        $('.counter').each(function() {
            if (isElementInViewport(this) && !$(this).hasClass('animated')) {
                $(this).addClass('animated');
                const $this = $(this);
                const countTo = parseInt($this.text().replace('+', ''));
                
                $({ countNum: 0 }).animate({
                    countNum: countTo
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum) + '+');
                    },
                    complete: function() {
                        $this.text(this.countNum + '+');
                    }
                });
            }
        });
    }

    // Run counter animation on scroll
    $(window).on('scroll', function() {
        animateCounter();
    });

    // Run once on load
    animateCounter();

    // Gallery Image Click Handler
    $('.gallery-item').on('click', function() {
        const imgSrc = $(this).find('img').attr('src');
        const imgAlt = $(this).find('img').attr('alt');
        
        // Create modal dynamically
        const modalHtml = `
            <div class="modal fade" id="galleryModal" tabindex="-1">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-body p-0">
                            <img src="${imgSrc}" alt="${imgAlt}" class="img-fluid">
                            <button type="button" class="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="modal"></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        $('body').append(modalHtml);
        $('#galleryModal').modal('show');
        $('#galleryModal').on('hidden.bs.modal', function() {
            $(this).remove();
        });
    });

    // Search Bar Toggle
    $('.btn-search').on('click', function(e) {
        e.preventDefault();
        const searchHtml = `
            <div class="search-overlay">
                <div class="search-container">
                    <input type="text" class="search-input" placeholder="Search destinations, experiences...">
                    <button class="search-close"><i class="fas fa-times"></i></button>
                </div>
            </div>
        `;
        
        if (!$('.search-overlay').length) {
            $('body').append(searchHtml);
            $('.search-overlay').fadeIn(300);
            
            $('.search-input').focus();
            
            $('.search-close, .search-overlay').on('click', function(e) {
                if (e.target === this) {
                    $('.search-overlay').fadeOut(300, function() {
                        $(this).remove();
                    });
                }
            });
        }
    });

    // Newsletter Form Submission
    $('.newsletter-form').on('submit', function(e) {
        e.preventDefault();
        const email = $(this).find('input[type="email"]').val();
        
        if (email && isValidEmail(email)) {
            // Show success message
            const alertHtml = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Thank you for subscribing!</strong> You'll receive our latest updates.
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
            
            $(this).find('.input-group').after(alertHtml);
            $(this).find('input[type="email"]').val('');
            
            // Auto dismiss after 5 seconds
            setTimeout(function() {
                $('.alert').alert('close');
            }, 5000);
        } else {
            // Show error message
            const alertHtml = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Please enter a valid email address.
                    <button type="button" class="btn-close" data-bs-toggle="alert"></button>
                </div>
            `;
            
            $(this).find('.input-group').after(alertHtml);
        }
    });

    // Email validation helper
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Parallax effect for hero section
    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();
        $('.carousel-item img').css({
            'transform': 'translateY(' + scrollTop * 0.3 + 'px)'
        });
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        $('img[data-src]').each(function() {
            imageObserver.observe(this);
        });
    }

    // Add loading animation
    $(window).on('load', function() {
        $('body').addClass('loaded');
    });

    // Back to top button (optional enhancement)
    const backToTopHtml = `
        <div class="back-to-top">
            <i class="fas fa-arrow-up"></i>
        </div>
    `;
    
    if (!$('.back-to-top').length) {
        $('body').append(backToTopHtml);
    }
    
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });
    
    $('.back-to-top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });
});

// Add CSS for search overlay dynamically
$('<style>')
    .prop('type', 'text/css')
    .html(`
        .search-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            display: none;
        }
        
        .search-container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            max-width: 600px;
        }
        
        .search-input {
            width: 100%;
            padding: 1.5rem 2rem;
            font-size: 1.5rem;
            border: none;
            border-radius: 50px;
            background: white;
            outline: none;
            font-family: 'Poppins', sans-serif;
        }
        
        .search-close {
            position: absolute;
            top: -50px;
            right: 0;
            background: transparent;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .search-close:hover {
            transform: rotate(90deg);
        }
        
        .back-to-top {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #B76E3C, #8B4513);
            border-radius: 50%;
            display: none;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 999;
            box-shadow: 0 5px 20px rgba(183, 110, 60, 0.3);
            transition: all 0.3s ease;
        }
        
        .back-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(183, 110, 60, 0.4);
        }
        
        .alert {
            margin-top: 1rem;
            border-radius: 10px;
        }
    `)
    .appendTo('head');