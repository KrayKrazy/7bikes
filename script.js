/* =========================================
   Dryanno Lisos e Cachos - JS Lógica
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar AOS (Animate On Scroll)
    AOS.init({
        once: true, // Animação ocorre apenas na primeira vez que rola a página
        offset: 100, // Inicia a animação 100px antes do elemento aparecer
    });

    // 2. Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. E-commerce Cart Logic
    const updateCartBadge = () => {
        let cart = JSON.parse(localStorage.getItem('7bikes_cart')) || [];
        const badge = document.getElementById('cart-badge');
        
        if (badge) {
            let totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
            if (totalItems > 0) {
                badge.style.display = 'block';
                badge.innerText = totalItems;
                
                // Add pop animation
                badge.style.transform = 'scale(1.5)';
                setTimeout(() => badge.style.transform = 'scale(1)', 200);
            } else {
                badge.style.display = 'none';
            }
        }
    };

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const img = button.getAttribute('data-img');

            let cart = JSON.parse(localStorage.getItem('7bikes_cart')) || [];
            
            let existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, img, quantity: 1 });
            }

            localStorage.setItem('7bikes_cart', JSON.stringify(cart));
            
            // Visual Feedback
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fa-solid fa-check"></i> Adicionado';
            button.style.background = '#4CAF50';
            updateCartBadge();

            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = ''; // reset to class default
            }, 1500);
        });
    });

    // Initialize badge on page load
    updateCartBadge();
});
