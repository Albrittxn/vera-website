(function () {
  document.documentElement.classList.add('js');
  const storageKey = 'vera-cart';
  const readCart = () => { try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { return []; } };
  const writeCart = (cart) => { try { localStorage.setItem(storageKey, JSON.stringify(cart)); } catch {} };
  const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

  function updateCartCount() {
    document.querySelectorAll('[data-cart-count]').forEach((element) => { element.textContent = readCart().length; });
  }

  document.querySelectorAll('.language-menu').forEach((menu) => {
    const current = menu.querySelector('.language-current');
    menu.querySelectorAll('[data-language]').forEach((option) => option.addEventListener('click', () => { current.textContent = option.dataset.language; menu.open = false; }));
  });
  document.addEventListener('click', (event) => { document.querySelectorAll('.language-menu[open]').forEach((menu) => { if (!menu.contains(event.target)) menu.open = false; }); });

  document.querySelectorAll('.add-button').forEach((button) => {
    button.addEventListener('click', () => {
      const cart = readCart();
      cart.push({ id: `${button.dataset.product}-${Date.now()}`, name: button.dataset.product, price: Number(button.dataset.price), image: button.dataset.image || '' });
      writeCart(cart);
      updateCartCount();
      const original = button.textContent;
      button.textContent = 'Added to bag';
      button.classList.add('added');
      window.setTimeout(() => { button.textContent = original; button.classList.remove('added'); }, 1300);
    });
  });

  function escapeHTML(value) { return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]); }
  function renderCart() {
    const list = document.querySelector('[data-cart-list]');
    if (!list) return;
    const empty = document.querySelector('[data-cart-empty]');
    const summary = document.querySelector('[data-cart-summary]');
    const total = document.querySelector('[data-cart-total]');
    const cart = readCart();
    list.innerHTML = '';
    if (!cart.length) { empty.classList.remove('is-hidden'); summary.classList.add('is-hidden'); return; }
    empty.classList.add('is-hidden'); summary.classList.remove('is-hidden');
    cart.forEach((item, index) => {
      const row = document.createElement('article');
      row.className = 'cart-row';
      row.style.animationDelay = `${index * 70}ms`;
      row.innerHTML = `<div class="cart-thumb">${item.image ? `<img src="${escapeHTML(item.image)}" alt="">` : '<span class="cart-wordmark">VERA</span>'}</div><div><h2>${escapeHTML(item.name)}</h2><p>VERA · Made to move</p></div><span class="cart-price">${formatPrice(item.price)}</span><button class="remove-button" type="button">Remove</button>`;
      row.querySelector('.remove-button').addEventListener('click', () => { writeCart(readCart().filter((cartItem) => cartItem.id !== item.id)); updateCartCount(); renderCart(); });
      list.appendChild(row);
    });
    total.textContent = formatPrice(cart.reduce((sum, item) => sum + item.price, 0));
  }
  document.querySelector('[data-mock-checkout]')?.addEventListener('click', (event) => { const original = event.currentTarget.textContent; event.currentTarget.textContent = 'Checkout coming soon'; window.setTimeout(() => { event.currentTarget.textContent = original; }, 1600); });

  const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) revealObserver.unobserve(entry.target), entry.target.classList.add('is-visible'); }), { threshold: .12 });
  document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element));

  const heroScroll = document.querySelector('[data-hero-scroll]');
  const heroMedia = document.querySelector('[data-hero-media]');
  let heroFrame = null;
  function updateHeroParallax() {
    if (!heroScroll || !heroMedia) return;
    const progress = Math.min(Math.max(-heroScroll.getBoundingClientRect().top / window.innerHeight, 0), 1);
    heroMedia.style.setProperty('--hero-parallax', `${progress * -78}px`);
    heroFrame = null;
  }
  window.addEventListener('scroll', () => { if (heroFrame === null) heroFrame = window.requestAnimationFrame(updateHeroParallax); }, { passive: true });
  updateHeroParallax();

  document.querySelectorAll('[data-year]').forEach((element) => { element.textContent = new Date().getFullYear(); });
  updateCartCount();
  renderCart();
})();
