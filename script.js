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
});
