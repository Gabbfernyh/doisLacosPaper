
// ---- Nav scroll state ----
const siteNav = document.getElementById('siteNav');
window.addEventListener('scroll', () => {
    siteNav.classList.toggle('scrolled', window.scrollY > 12);
});

// ---- Mobile menu ----
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');

const closeMobileMenu = () => {
    document.body.classList.remove('menu-open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    burgerBtn.setAttribute('aria-label', 'Abrir menu');
    mobileMenu.setAttribute('aria-hidden', 'true');
};

const openMobileMenu = () => {
    document.body.classList.add('menu-open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    burgerBtn.setAttribute('aria-label', 'Fechar menu');
    mobileMenu.setAttribute('aria-hidden', 'false');
};

burgerBtn.addEventListener('click', () => {
    const isOpen = document.body.classList.contains('menu-open');
    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMobileMenu();
});
mobileMenuClose.addEventListener('click', closeMobileMenu);
document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', closeMobileMenu);
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
});
document.addEventListener('click', (e) => {
    const isMenuOpen = document.body.classList.contains('menu-open');
    if (!isMenuOpen) return;

    const clickedInsideMenu = mobileMenu.contains(e.target);
    const clickedBurger = burgerBtn.contains(e.target);

    if (!clickedInsideMenu && !clickedBurger) {
        closeMobileMenu();
    }
});

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
        }
    });
}, { threshold: .15 });
revealEls.forEach(el => io.observe(el));

// ---- Catalog filters ----
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.target;
        productCards.forEach(card => {
            card.classList.toggle('active', card.id === target);
        });
    });
});

// ---- FAQ accordion ----
document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (item.classList.contains('open')) {
        a.style.maxHeight = a.scrollHeight + 'px';
    }
    q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(other => {
            other.classList.remove('open');
            other.querySelector('.faq-a').style.maxHeight = 0;
        });
        if (!isOpen) {
            item.classList.add('open');
            a.style.maxHeight = a.scrollHeight + 'px';
        }
    });
});

// ---- Order form -> WhatsApp ----
const orderForm = document.getElementById('orderForm');
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const whats = document.getElementById('whats').value.trim();
    const produto = document.getElementById('produto').value;
    const msg = document.getElementById('msg').value.trim();
    const texto = `Olá! Meu nome é ${nome}.\nWhatsApp para contato: ${whats}\nProduto desejado: ${produto}\nDetalhes: ${msg || 'sem detalhes adicionais'}`;
    const url = `https://wa.me/5500000000000?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
});
