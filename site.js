(function () {
  document.documentElement.classList.add('js');
  const storageKey = 'vera-cart';
  const imageAliases = { 'vera-linen-short-white.jpg': 'vera-linen-short-card.jpg', 'vera-linen-shirt-white.jpg': 'vera-linen-shirt-card.jpg', 'vera-linen-pant-white.jpg': 'vera-linen-pant-card.jpg', 'vera-sailor-cap-black.jpg': 'vera-sailor-cap-card.jpg', 'vera-palm-cap-black.jpg': 'vera-palm-cap-card.jpg' };
  const productNameAliases = {
    'Maré Linen Short': 'Portofino Linen Shorts',
    'Maré Linen Shirt': 'Sorrento Linen Shirt',
    'Maré Linen Pant': 'Ravello Linen Trousers',
    'Maré Sailor Cap': 'Regatta Sailor Cap',
    'Maré Palm Cap': 'Palm Coast Cap',
    'Maré Ridged Case': 'Riviera Ridged Case',
    'Maré Suede Card Holder': 'Belvedere Card Holder',
    'Maré Ring Necklace': 'Aurelio Ring Necklace',
    'Maré Clear Fade Sunglasses': 'Lucent Fade Sunglasses',
    'Maré Herringbone Bracelet': 'Signet Herringbone Bracelet'
  };
  const readCart = () => { try { return JSON.parse(localStorage.getItem(storageKey) || '[]').map((item) => ({ ...item, name: productNameAliases[item.name] || item.name, image: imageAliases[item.image] || item.image })); } catch { return []; } };
  const writeCart = (cart) => { try { localStorage.setItem(storageKey, JSON.stringify(cart)); } catch {} };
  const formatPrice = (value) => `$${Number(value).toFixed(2)}`;
  const pageLoader = document.querySelector('.page-loader');
  const pageTransitionMs = 260;
  if (pageLoader) window.setTimeout(() => { document.body.classList.add('page-ready'); }, 140);

  function setupPageTransitions() {
    if (!pageLoader) return;
    document.querySelectorAll('a[href]').forEach((link) => {
      if (link.target || link.hasAttribute('download') || link.dataset.noTransition !== undefined) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || !['http:', 'https:'].includes(destination.protocol)) return;
      if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;
      link.addEventListener('click', (event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        pageLoader.classList.add('is-active');
        document.body.classList.remove('page-ready');
        const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : pageTransitionMs;
        window.setTimeout(() => { window.location.assign(destination.href); }, delay);
      });
    });
  }

  function setupMobileNavigation() {
    document.querySelectorAll('.mobile-menu-toggle').forEach((toggle) => {
      const container = toggle.closest('.site-nav-start');
      const nav = container?.querySelector('.site-nav-links');
      if (!container || !nav) return;
      const desktopUtilities = toggle.closest('.site-header')?.querySelector('.site-nav-right');
      let mobileUtilities = nav.querySelector('.mobile-menu-utilities');
      if (desktopUtilities && !mobileUtilities) {
        mobileUtilities = desktopUtilities.cloneNode(true);
        mobileUtilities.classList.add('mobile-menu-utilities');
        mobileUtilities.setAttribute('aria-hidden', 'true');
        nav.appendChild(mobileUtilities);
      }
      const setOpen = (open) => {
        container.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        mobileUtilities?.setAttribute('aria-hidden', String(!open));
      };
      toggle.addEventListener('click', (event) => { event.stopPropagation(); setOpen(!container.classList.contains('is-open')); });
      nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
      document.addEventListener('click', (event) => { if (!container.contains(event.target)) setOpen(false); });
      document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
    });
  }

  function storageFlag(storageName, key) {
    try { return window[storageName].getItem(key) === 'true'; } catch { return false; }
  }

  function setStorageFlag(storageName, key) {
    try { window[storageName].setItem(key, 'true'); } catch {}
  }

  function setupOfferModal() {
    if (storageFlag('localStorage', 'vera-offer-claimed') || storageFlag('sessionStorage', 'vera-offer-dismissed')) return;

    const modal = document.createElement('div');
    modal.className = 'offer-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `<section class="offer-modal-panel" role="dialog" aria-modal="true" aria-labelledby="offer-modal-title">
      <button class="offer-modal-close" type="button" data-offer-close aria-label="Close offer">×</button>
      <p class="offer-modal-eyebrow">A welcome from VERA</p>
      <h2 id="offer-modal-title">A free linen shirt, on us.</h2>
      <p class="offer-modal-intro">Leave your number for a free linen shirt and 10% off your first order, on whichever pieces you choose.</p>
      <div class="offer-modal-perks"><span>Free linen shirt</span><span>10% off first order</span></div>
      <form class="offer-modal-form" novalidate>
        <label for="offer-phone">Phone number</label>
        <div class="offer-modal-input-row"><input id="offer-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="(555) 123-4567" required><button class="button-solid" type="submit">Unlock offer</button></div>
        <p class="offer-modal-fineprint">By continuing, you agree to receive occasional VERA text messages. Message and data rates may apply. Reply STOP to opt out.</p>
        <p class="offer-modal-error" role="alert" hidden>Enter a valid phone number to continue.</p>
      </form>
      <div class="offer-modal-success" hidden><p class="offer-modal-eyebrow">You’re on the list</p><p>Your offer is reserved. We’ll send the details shortly.</p><button class="button-solid" type="button" data-offer-close>Continue browsing</button></div>
    </section>`;
    document.body.appendChild(modal);

    const form = modal.querySelector('.offer-modal-form');
    const input = modal.querySelector('#offer-phone');
    const error = modal.querySelector('.offer-modal-error');
    const success = modal.querySelector('.offer-modal-success');
    let previouslyFocused = null;
    let offerTimer = null;

    function dismissOffer() {
      setStorageFlag('sessionStorage', 'vera-offer-dismissed');
      modal.classList.remove('is-visible');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('offer-open');
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') previouslyFocused.focus({ preventScroll: true });
    }

    function showOffer() {
      previouslyFocused = document.activeElement;
      modal.classList.add('is-visible');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('offer-open');
      window.setTimeout(() => input.focus(), 160);
    }

    modal.querySelectorAll('[data-offer-close]').forEach((button) => button.addEventListener('click', dismissOffer));
    modal.addEventListener('click', (event) => { if (event.target === modal) dismissOffer(); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.classList.contains('is-visible')) dismissOffer(); });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const digits = input.value.replace(/\D/g, '');
      if (digits.length < 7) { error.hidden = false; input.focus(); return; }
      error.hidden = true;
      setStorageFlag('sessionStorage', 'vera-offer-dismissed');
      setStorageFlag('localStorage', 'vera-offer-claimed');
      form.hidden = true;
      success.hidden = false;
    });

    offerTimer = window.setTimeout(() => {
      if (!storageFlag('localStorage', 'vera-offer-claimed') && !storageFlag('sessionStorage', 'vera-offer-dismissed')) showOffer();
    }, 5000);
    window.addEventListener('pagehide', () => { if (offerTimer) window.clearTimeout(offerTimer); }, { once: true });
  }

  function updateCartCount() {
    document.querySelectorAll('[data-cart-count]').forEach((element) => { element.textContent = readCart().length; });
  }

  function setupLanguageMenus() {
    document.querySelectorAll('.language-menu').forEach((menu) => {
      const current = menu.querySelector('.language-current');
      menu.querySelectorAll('[data-language]').forEach((option) => option.addEventListener('click', () => { current.textContent = option.dataset.language; menu.open = false; }));
    });
    document.addEventListener('click', (event) => { document.querySelectorAll('.language-menu[open]').forEach((menu) => { if (!menu.contains(event.target)) menu.open = false; }); });
  }

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

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) revealObserver.unobserve(entry.target), entry.target.classList.add('is-visible'); }), { threshold: .12 });
    document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element));
  } else {
    document.querySelectorAll('[data-reveal]').forEach((element) => element.classList.add('is-visible'));
  }

  const heroScroll = document.querySelector('[data-hero-scroll]');
  const heroMedia = document.querySelector('[data-hero-media]');
  const overlayHeader = document.querySelector('.site-header--overlay');
  let heroFrame = null;
  function updateHeroParallax() {
    if (!heroScroll || !heroMedia) return;
    const progress = Math.min(Math.max(-heroScroll.getBoundingClientRect().top / window.innerHeight, 0), 1);
    heroMedia.style.setProperty('--hero-parallax', `${progress * -78}px`);
    heroFrame = null;
  }
  function updateOverlayHeader() {
    if (!overlayHeader || !heroScroll) return;
    overlayHeader.classList.toggle('is-scrolled', heroScroll.getBoundingClientRect().bottom <= overlayHeader.offsetHeight);
  }
  window.addEventListener('scroll', () => {
    if (heroFrame === null) heroFrame = window.requestAnimationFrame(updateHeroParallax);
    updateOverlayHeader();
  }, { passive: true });
  updateHeroParallax();
  updateOverlayHeader();

  document.querySelectorAll('[data-year]').forEach((element) => { element.textContent = new Date().getFullYear(); });
  updateCartCount();
  renderCart();
  setupMobileNavigation();
  setupLanguageMenus();
  setupPageTransitions();
  setupOfferModal();
})();
