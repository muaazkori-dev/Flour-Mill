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
            priceResult.textContent = `Rs. ${total}`;
            priceResult.style.color = "var(--primary-color)";
        } else {
            priceResult.textContent = "Rs. --";
            priceResult.style.color = "var(--primary-light)";
        }
    }

    grindWeightInput.addEventListener('input', calculatePrice);
    grindRateInput.addEventListener('input', calculatePrice);

    /* --- Delivery Checker Removed (Now serves entire Sanghar District) --- */


    /* --- WhatsApp Booking Form Submission --- */
    const bookingForm = document.getElementById('bookingForm');
    
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 1. Get form values
        const name = document.getElementById('custName').value.trim();
        const phone = document.getElementById('custPhone').value.trim();
        const serviceNode = document.getElementById('custService');
        const serviceText = serviceNode.options[serviceNode.selectedIndex].text;
        const weight = document.getElementById('custWeight').value.trim();
        const deliveryNode = document.getElementById('custDelivery');
        const deliveryText = deliveryNode.options[deliveryNode.selectedIndex].text;

        // 2. Format the WhatsApp Message
        const message = `*New Order Request*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service:* ${serviceText}\n*Estimated Weight:* ${weight} Kg\n*Delivery Option:* ${deliveryText}\n\nPlease process my request!`;
        
        // 3. Encode the message for the URL
        const encodedMessage = encodeURIComponent(message);
        
        // 4. Your WhatsApp Number (must include country code without '+')
        const whatsappNumber = "923337155323"; 

        // 5. Open WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
        
        // Optional: Reset form or show a success toast on website
        showToast("Redirecting to WhatsApp...");
        bookingForm.reset();
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
