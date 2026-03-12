/* 
===========================================
    Flour Mill - Interactivity
    Author: Flour Mill
    Version: 1.0.0
===========================================
*/

document.addEventListener('DOMContentLoaded', () => {

    /* --- Navbar Scroll Effect --- */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- Mobile Menu Toggle --- */
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    /* --- Calculators Logic --- */
    
    // 1. Wheat to Flour Estimator
    const wheatInput = document.getElementById('wheatWeight');
    const flourResult = document.getElementById('flourResult');
    
    // Assuming ~5% weight loss due to moisture and bran removal
    const flourConversionRate = 0.95; 

    wheatInput.addEventListener('input', (e) => {
        const weight = parseFloat(e.target.value);
        if (weight > 0) {
            const estimatedFlour = (weight * flourConversionRate).toFixed(1);
            flourResult.innerHTML = `${estimatedFlour} Kg <span style="font-size:1rem;color:var(--text-muted);font-weight:normal">(est.)</span>`;
            flourResult.style.color = "var(--primary-color)";
        } else {
            flourResult.textContent = "-- Kg";
            flourResult.style.color = "var(--primary-light)";
        }
    });

    // 2. Grinding Price Calculator
    const grindWeightInput = document.getElementById('grindWeight');
    const grindRateInput = document.getElementById('grindRate');
    const priceResult = document.getElementById('priceResult');

    function calculatePrice() {
        const weight = parseFloat(grindWeightInput.value);
        const rate = parseFloat(grindRateInput.value);
        
        if (weight > 0 && rate > 0) {
            const total = (weight * rate).toFixed(0);
            priceResult.textContent = `₹ ${total}`;
            priceResult.style.color = "var(--primary-color)";
        } else {
            priceResult.textContent = "₹ --";
            priceResult.style.color = "var(--primary-light)";
        }
    }

    grindWeightInput.addEventListener('input', calculatePrice);
    grindRateInput.addEventListener('input', calculatePrice);

    /* --- Delivery Checker --- */
    const pincodeInput = document.getElementById('pincode');
    const checkBtn = document.getElementById('checkPincodeBtn');
    const msgEl = document.getElementById('pincodeMsg');

    // Dummy workable pincodes for Demo
    const validPincodes = ['110001', '110002', '122001', '122018', '201301'];

    checkBtn.addEventListener('click', () => {
        const code = pincodeInput.value.trim();
        msgEl.className = 'pincode-msg'; // Reset class
        
        if (code.length < 5) {
            msgEl.textContent = 'Please enter a valid pincode.';
            msgEl.classList.add('msg-error');
            return;
        }

        // Simulate API verification delay
        checkBtn.textContent = 'Checking...';
        checkBtn.disabled = true;

        setTimeout(() => {
            if (validPincodes.includes(code)) {
                msgEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> Great! We deliver to your area.';
                msgEl.classList.add('msg-success');
            } else {
                msgEl.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Sorry, we currently don\'t serve this area.';
                msgEl.classList.add('msg-error');
            }
            checkBtn.textContent = 'Check';
            checkBtn.disabled = false;
        }, 800);
    });


    /* --- Booking Form Submission --- */
    const bookingForm = document.getElementById('bookingForm');
    
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = bookingForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
        btn.disabled = true;
        
        // Simulate fake network request
        setTimeout(() => {
            showToast("Order Placed Successfully! We will contact you soon.");
            bookingForm.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    });

    /* --- Toast Notification Helper --- */
    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }
});
