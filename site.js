(function () {
  document.documentElement.classList.add('js');
  const storageKey = 'vera-cart';
  const imageAliases = { 'vera-linen-short-white.jpg': 'vera-linen-short-card.jpg', 'vera-linen-shirt-white.jpg': 'vera-linen-shirt-card.jpg', 'vera-linen-pant-white.jpg': 'vera-linen-pant-card.jpg', 'vera-sailor-cap-black.jpg': 'vera-sailor-cap-card.jpg', 'vera-palm-cap-black.jpg': 'vera-palm-cap-card.jpg' };
  const productNameAliases = {
    'Portofino Linen Shorts': 'Linen Shorts',
    'Sorrento Linen Shirt': 'Linen Shirt',
    'Ravello Linen Trousers': 'Linen Trousers',
    'Regatta Sailor Cap': 'Sailor Cap',
    'Palm Coast Cap': 'Palm Cap',
    'Riviera Ridged Case': 'Ridged Phone Case',
    'Belvedere Card Holder': 'Suede Card Holder',
    'Aurelio Ring Necklace': 'Ring Necklace',
    'Lucent Fade Sunglasses': 'Sunglasses',
    'Signet Herringbone Bracelet': 'Herringbone Bracelet',
    'Maré Linen Short': 'Linen Shorts',
    'Maré Linen Shirt': 'Linen Shirt',
    'Maré Linen Pant': 'Linen Trousers',
    'Maré Sailor Cap': 'Sailor Cap',
    'Maré Palm Cap': 'Palm Cap',
    'Maré Ridged Case': 'Ridged Phone Case',
    'Maré Suede Card Holder': 'Suede Card Holder',
    'Maré Ring Necklace': 'Ring Necklace',
    'Maré Clear Fade Sunglasses': 'Sunglasses',
    'Maré Herringbone Bracelet': 'Herringbone Bracelet'
  };
  const productPrices = {
    'Linen Shorts': 28,
    'Linen Shirt': 42,
    'Linen Trousers': 42,
    'Sailor Cap': 26,
    'Palm Cap': 26,
    'Ridged Phone Case': 22,
    'Suede Card Holder': 28,
    'Ring Necklace': 22,
    'Sunglasses': 28,
    'Herringbone Bracelet': 28
  };
  const productVariants = {
    'Linen Shorts': [
      { color: 'Powder Blue', image: 'vera-linen-short-blue-card.jpg', swatch: '#b9d1e8' },
      { color: 'White', image: 'vera-linen-short-card.jpg', swatch: '#f2f1ec' },
      { color: 'Black', image: 'vera-linen-short-black-card.jpg', swatch: '#1d1e1e' },
      { color: 'Grey', image: 'vera-linen-short-grey-card.jpg', swatch: '#b8bab8' }
    ],
    'Linen Shirt': [
      { color: 'Navy', image: 'vera-linen-shirt-navy-card.jpg', swatch: '#242948' },
      { color: 'White', image: 'vera-linen-shirt-card.jpg', swatch: '#f2f1ec' },
      { color: 'Champagne', image: 'vera-linen-shirt-champagne-card.jpg', swatch: '#e6ddc8' },
      { color: 'Black', image: 'vera-linen-shirt-black-card.jpg', swatch: '#222323' }
    ],
    'Linen Trousers': [
      { color: 'Champagne', image: 'vera-linen-pant-champagne-card.jpg', swatch: '#e6ddc8' },
      { color: 'White', image: 'vera-linen-pant-card.jpg', swatch: '#f2f1ec' },
      { color: 'Navy', image: 'vera-linen-pant-navy-card.jpg', swatch: '#242948' },
      { color: 'Black', image: 'vera-linen-pant-black-card.jpg', swatch: '#222323' }
    ],
    'Sailor Cap': [
      { color: 'Khaki', image: 'vera-sailor-cap-khaki-card.jpg', swatch: '#a79a86' },
      { color: 'Black', image: 'vera-sailor-cap-card.jpg', swatch: '#222323' },
      { color: 'Grey', image: 'vera-sailor-cap-grey-card.jpg', swatch: '#77787d' },
      { color: 'Navy', image: 'vera-sailor-cap-navy-card.jpg', swatch: '#31415c' },
      { color: 'Burgundy', image: 'vera-sailor-cap-burgundy-card.jpg', swatch: '#8a4656' }
    ],
    'Palm Cap': [
      { color: 'Black', image: 'vera-palm-cap-card.jpg', swatch: '#222323' },
      { color: 'Grey', image: 'vera-palm-cap-grey-card.jpg', swatch: '#77787d' },
      { color: 'Khaki', image: 'vera-palm-cap-khaki-card.jpg', swatch: '#a79a86' },
      { color: 'Navy', image: 'vera-palm-cap-navy-card.jpg', swatch: '#31415c' },
      { color: 'Burgundy', image: 'vera-palm-cap-burgundy-card.jpg', swatch: '#8a4656' }
    ],
    'Ridged Phone Case': [
      { color: 'Silver', image: 'vera-ridged-phone-case-card.jpg', swatch: '#c4c6c7' },
      { color: 'Black', image: 'vera-ridged-phone-case-black-card.jpg', swatch: '#222326' }
    ],
    'Suede Card Holder': [
      { color: 'Black', image: 'vera-suede-card-holder-black-card.jpg', swatch: '#1d1e20' },
      { color: 'Grey', image: 'vera-suede-card-holder-card.jpg', swatch: '#56575b' }
    ],
    'Ring Necklace': [
      { color: 'Gold', image: 'vera-ring-necklace-card.jpg?v=20260726-2', swatch: '#c79b4b' },
      { color: 'Silver', image: 'vera-ring-necklace-silver-card.jpg?v=20260726-2', swatch: '#c3c6c8' }
    ],
    'Sunglasses': [
      { color: 'Clear / Blue', image: 'vera-clear-glasses-clear-blue-card.jpg?v=20260726-2', swatch: '#a9cde6' },
      { color: 'Clear / Grey', image: 'vera-clear-glasses-card.jpg?v=20260726-2', swatch: '#b9bcc1' },
      { color: 'Black / Grey', image: 'vera-clear-glasses-black-grey-card.jpg?v=20260726-2', swatch: '#37383c' },
      { color: 'Black / Blue', image: 'vera-clear-glasses-black-blue-card.jpg?v=20260726-2', swatch: '#2f4d6a' }
    ],
    'Herringbone Bracelet': [
      { color: 'Gold', image: 'vera-herringbone-bracelet-card.jpg', swatch: '#d3a447' },
      { color: 'Silver', image: 'vera-herringbone-bracelet-silver-card.jpg', swatch: '#c5c8ca' }
    ]
  };
  const readCart = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '[]').map((item) => {
        const name = productNameAliases[item.name] || item.name;
        const priceNum = Number(productPrices[name] ?? item.price);
        const validPrice = (isNaN(priceNum) || priceNum <= 0) ? (productPrices[name] || 28) : priceNum;
        return {
          ...item,
          name,
          size: item.size || 'M',
          image: imageAliases[item.image] || item.image,
          price: validPrice
        };
      });
    } catch {
      return [];
    }
  };
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

  function setupProductVariants() {
    document.querySelectorAll('.product-card').forEach((card) => {
      const productName = card.querySelector('h2')?.textContent.trim();
      const variants = productVariants[productName];
      const visual = card.querySelector('.product-visual');
      const details = card.querySelector('.product-details');
      const addButton = details?.querySelector('.add-button');
      if (!variants?.length || !visual || !details || !addButton) return;

      card.classList.add('product-card--variants');
      visual.classList.add('product-visual--swipeable');
      visual.setAttribute('role', 'group');
      visual.setAttribute('aria-label', `${productName} color gallery. Swipe or use arrow keys to change color.`);
      visual.tabIndex = 0;

      let track = visual.querySelector('.product-variant-track');
      const initialImg = visual.querySelector('img');
      const initialSrc = initialImg?.getAttribute('src');

      if (!track) {
        track = document.createElement('div');
        track.className = 'product-variant-track';

        variants.forEach((variant) => {
          const slide = document.createElement('div');
          slide.className = 'product-variant-slide';
          const img = document.createElement('img');
          img.src = variant.image;
          img.alt = `${variant.color} ${productName}`;
          img.draggable = false;
          img.loading = 'lazy';
          img.decoding = 'async';
          slide.appendChild(img);
          track.appendChild(slide);
        });

        visual.insertBefore(track, visual.firstChild);

        visual.querySelectorAll(':scope > img').forEach((img) => img.remove());
      }

      let activeIndex = Math.max(0, variants.findIndex((variant) => initialSrc && variant.image === initialSrc));
      if (activeIndex < 0) activeIndex = 0;

      const previousButton = document.createElement('button');
      previousButton.className = 'product-variant-arrow product-variant-arrow--previous';
      previousButton.type = 'button';
      previousButton.innerHTML = '<span aria-hidden="true">‹</span>';
      const nextButton = document.createElement('button');
      nextButton.className = 'product-variant-arrow product-variant-arrow--next';
      nextButton.type = 'button';
      nextButton.innerHTML = '<span aria-hidden="true">›</span>';
      visual.append(previousButton, nextButton);

      const selector = document.createElement('div');
      selector.className = 'product-variants';
      const colorLabel = document.createElement('span');
      colorLabel.className = 'product-color-label';
      colorLabel.append(document.createTextNode('Color '));
      const selectedColor = document.createElement('strong');
      selectedColor.setAttribute('aria-live', 'polite');
      colorLabel.append(selectedColor);
      const swatchList = document.createElement('div');
      swatchList.className = 'product-swatches';
      swatchList.setAttribute('role', 'group');
      swatchList.setAttribute('aria-label', `Choose ${productName} color`);
      selector.append(colorLabel, swatchList);
      details.insertBefore(selector, addButton);

      let pointerStart = null;
      let dragOffsetPercent = 0;

      const swatches = variants.map((variant, index) => {
        const swatch = document.createElement('button');
        swatch.className = 'product-swatch';
        swatch.type = 'button';
        swatch.style.setProperty('--swatch', variant.swatch);
        swatch.setAttribute('aria-label', `Show ${productName} in ${variant.color}`);
        swatch.innerHTML = '<span aria-hidden="true"></span>';
        swatch.addEventListener('click', () => setVariant(index));
        swatchList.appendChild(swatch);
        return swatch;
      });

      function updateSelection(variant) {
        selectedColor.textContent = variant.color;
        addButton.dataset.image = variant.image;
        addButton.dataset.color = variant.color;
        previousButton.setAttribute('aria-label', `Show previous color: ${variants[(activeIndex - 1 + variants.length) % variants.length].color}`);
        nextButton.setAttribute('aria-label', `Show next color: ${variants[(activeIndex + 1) % variants.length].color}`);
        swatches.forEach((swatch, index) => {
          const selected = index === activeIndex;
          swatch.classList.toggle('is-active', selected);
          swatch.setAttribute('aria-pressed', String(selected));
        });
      }

      function setVariant(nextIndex, customDuration = null) {
        const normalizedIndex = (nextIndex + variants.length) % variants.length;
        const steps = Math.abs(normalizedIndex - activeIndex);
        activeIndex = normalizedIndex;
        const variant = variants[activeIndex];
        updateSelection(variant);

        const duration = customDuration !== null ? customDuration : Math.min(0.42 + (steps - 1) * 0.14, 0.76);
        track.style.transition = `transform ${duration}s cubic-bezier(0.25, 1, 0.5, 1)`;
        track.style.transform = `translate3d(-${activeIndex * 100}%, 0, 0)`;
      }

      function clearPointer() {
        if (visual.classList.contains('is-dragging')) {
          visual.classList.remove('is-dragging');
        }
        pointerStart = null;
        dragOffsetPercent = 0;
      }

      visual.addEventListener('pointerdown', (event) => {
        if (event.button !== 0) return;
        pointerStart = { id: event.pointerId, x: event.clientX, y: event.clientY, activeStart: activeIndex };
        try { visual.setPointerCapture(event.pointerId); } catch {}
        visual.classList.add('is-dragging');
      });

      visual.addEventListener('pointermove', (event) => {
        if (!pointerStart || pointerStart.id !== event.pointerId) return;
        const deltaX = event.clientX - pointerStart.x;
        const deltaY = event.clientY - pointerStart.y;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          const visualWidth = visual.clientWidth || 1;
          dragOffsetPercent = (deltaX / visualWidth) * 100;
          const currentPosPercent = -(pointerStart.activeStart * 100) + dragOffsetPercent;
          track.style.transition = 'none';
          track.style.transform = `translate3d(${currentPosPercent}%, 0, 0)`;
        }
      });

      visual.addEventListener('pointerup', (event) => {
        if (!pointerStart || pointerStart.id !== event.pointerId) return;
        const deltaX = event.clientX - pointerStart.x;
        const deltaY = event.clientY - pointerStart.y;
        const threshold = 38;
        if (Math.abs(deltaX) > threshold && Math.abs(deltaX) > Math.abs(deltaY) * 1.15) {
          const targetIndex = activeIndex + (deltaX < 0 ? 1 : -1);
          clearPointer();
          setVariant(targetIndex, 0.38);
        } else {
          clearPointer();
          setVariant(activeIndex, 0.32);
        }
      });

      visual.addEventListener('pointercancel', () => {
        if (pointerStart) {
          clearPointer();
          setVariant(activeIndex, 0.32);
        }
      });

      visual.addEventListener('dragstart', (event) => event.preventDefault());

      visual.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') { event.preventDefault(); setVariant(activeIndex + 1); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); setVariant(activeIndex - 1); }
      });

      [previousButton, nextButton].forEach((button) => button.addEventListener('pointerdown', (event) => event.stopPropagation()));
      previousButton.addEventListener('click', (event) => { event.stopPropagation(); setVariant(activeIndex - 1); });
      nextButton.addEventListener('click', (event) => { event.stopPropagation(); setVariant(activeIndex + 1); });

      track.style.transition = 'none';
      track.style.transform = `translate3d(-${activeIndex * 100}%, 0, 0)`;
      void track.offsetWidth;
      track.style.transition = '';

      updateSelection(variants[activeIndex]);
    });
  }

  const productDetails = {
    'Linen Shorts': {
      category: 'Clothing',
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      description: 'Cut from an airy European cotton-linen blend with a relaxed silhouette and elasticized drawstring waistband. Designed for salt air, coastal walks, and effortless summer days.',
      details: '55% Linen, 45% Cotton · Elastic waistband with drawstring · Side seam pockets · Back patch pocket · Inseam: 6.5"',
      shipping: 'Free standard shipping on orders over $80. Express 2-day delivery available at checkout. 30-day effortless returns.',
      sizeChart: [
        { size: 'S', chest: '36-38"', waist: '28-30"', hip: '35-37"' },
        { size: 'M', chest: '39-41"', waist: '31-33"', hip: '38-40"' },
        { size: 'L', chest: '42-44"', waist: '34-36"', hip: '41-43"' },
        { size: 'XL', chest: '45-47"', waist: '37-39"', hip: '44-46"' },
        { size: '2XL', chest: '48-50"', waist: '40-42"', hip: '47-49"' }
      ]
    },
    'Linen Shirt': {
      category: 'Clothing',
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      description: 'A relaxed long-sleeve linen shirt crafted from breathable open-weave European linen. Features a refined resort collar, mother-of-pearl style buttons, and a gently curved hem.',
      details: '100% European Linen · Breathable open weave · Button cuffs · Pre-washed for softness',
      shipping: 'Free standard shipping on orders over $80. Express 2-day delivery available at checkout. 30-day effortless returns.',
      sizeChart: [
        { size: 'S', chest: '36-38"', waist: '28-30"', hip: '35-37"' },
        { size: 'M', chest: '39-41"', waist: '31-33"', hip: '38-40"' },
        { size: 'L', chest: '42-44"', waist: '34-36"', hip: '41-43"' },
        { size: 'XL', chest: '45-47"', waist: '37-39"', hip: '44-46"' },
        { size: '2XL', chest: '48-50"', waist: '40-42"', hip: '47-49"' }
      ]
    },
    'Linen Trousers': {
      category: 'Clothing',
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      description: 'Relaxed straight-leg trousers with clean tailoring and a lightweight, breathable feel. Features a semi-elastic waistband with internal drawstring for all-day comfort.',
      details: '100% Washed Linen · Straight-leg relaxed fit · Rear welt pocket · Machine washable on gentle cycle',
      shipping: 'Free standard shipping on orders over $80. Express 2-day delivery available at checkout. 30-day effortless returns.',
      sizeChart: [
        { size: 'S', chest: '36-38"', waist: '28-30"', hip: '35-37"' },
        { size: 'M', chest: '39-41"', waist: '31-33"', hip: '38-40"' },
        { size: 'L', chest: '42-44"', waist: '34-36"', hip: '41-43"' },
        { size: 'XL', chest: '45-47"', waist: '37-39"', hip: '44-46"' },
        { size: '2XL', chest: '48-50"', waist: '40-42"', hip: '47-49"' }
      ]
    },
    'Sailor Cap': {
      category: 'Accessories',
      sizes: ['O/S'],
      description: 'Six-panel washed cotton twill cap featuring minimalist sailboat embroidery on the front and an adjustable brass buckle closure at the back.',
      details: '100% Washed Cotton Twill · Custom front embroidery · Adjustable brass buckle strap · One size fits most',
      shipping: 'Free standard shipping on orders over $80. Express 2-day delivery available at checkout. 30-day effortless returns.'
    },
    'Palm Cap': {
      category: 'Accessories',
      sizes: ['O/S'],
      description: 'Unstructured 6-panel dad cap made from garment-dyed cotton. Finished with minimalist palm embroidery and a sleek metal buckle closure.',
      details: '100% Washed Cotton Twill · Minimalist palm embroidery · Metal strap closure · One size fits most',
      shipping: 'Free standard shipping on orders over $80. Express 2-day delivery available at checkout. 30-day effortless returns.'
    },
    'Ridged Phone Case': {
      category: 'Accessories',
      sizes: [
        'iPhone 17', 'iPhone 17 Pro', 'iPhone 17 Pro Max',
        'iPhone 16', 'iPhone 16 Pro', 'iPhone 16 Pro Max',
        'iPhone 15', 'iPhone 15 Pro', 'iPhone 15 Pro Max',
        'iPhone 14', 'iPhone 14 Pro', 'iPhone 14 Pro Max'
      ],
      description: 'Precision-molded protective phone case with tactile vertical ridge texturing and a sleek brushed metallic finish.',
      details: 'Shock-absorbing TPU core · Raised camera protection lip · Tactile ridged exterior',
      shipping: 'Free standard shipping on orders over $80. Express 2-day delivery available at checkout. 30-day effortless returns.'
    },
    'Suede Card Holder': {
      category: 'Accessories',
      sizes: ['O/S'],
      description: 'Compact card holder crafted from premium velvet suede with hand-painted edges and three card slots plus a central bill compartment.',
      details: '100% Genuine Suede · 3 card slots + 1 center pouch · Debossed VERA emblem',
      shipping: 'Free standard shipping on orders over $80. Express 2-day delivery available at checkout. 30-day effortless returns.'
    },
    'Ring Necklace': {
      category: 'Accessories',
      sizes: ['O/S'],
      description: 'Supple double leather cord necklace featuring an antique-finish ring pendant. Adjustable sliding knot design.',
      details: 'Genuine leather cord · Antique alloy pendant · Adjustable length (18" - 26")',
      shipping: 'Free standard shipping on orders over $80. Express 2-day delivery available at checkout. 30-day effortless returns.'
    },
    'Sunglasses': {
      category: 'Accessories',
      sizes: ['O/S'],
      description: 'Handcrafted clear acetate frames paired with gradient UV400 protective lenses. Designed with durable five-barrel hinges.',
      details: 'Hand-polished acetate · 100% UV400 protection · Scratch-resistant gradient lenses',
      shipping: 'Free standard shipping on orders over $80. Express 2-day delivery available at checkout. 30-day effortless returns.'
    },
    'Herringbone Bracelet': {
      category: 'Accessories',
      sizes: ['7.0"', '7.5"', '8.0"'],
      description: 'Flat herringbone chain bracelet with a high-polish mirror finish and secure lobster clasp closure.',
      details: '18k Gold / Sterling Silver plated · 4mm chain width · Includes 1.5" extender',
      shipping: 'Free standard shipping on orders over $80. Express 2-day delivery available at checkout. 30-day effortless returns.'
    }
  };


  function setupProductInlay() {
    let backdrop = document.querySelector('.product-inlay-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'product-inlay-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      backdrop.innerHTML = '<div class="product-inlay-panel" role="dialog" aria-modal="true"></div>';
      document.body.appendChild(backdrop);
    }

    const panel = backdrop.querySelector('.product-inlay-panel');
    let activeProductName = null;
    let activeColor = '';
    let activeSize = 'M';
    let activeVariantIndex = 0;

    function closeInlay() {
      backdrop.classList.remove('is-visible');
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('inlay-open');
    }

    backdrop.addEventListener('click', (event) => {
      if (event.target === backdrop) closeInlay();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && backdrop.classList.contains('is-visible')) closeInlay();
    });

    function openInlay(productName, preferredColor = '') {
      const canonicalName = productNameAliases[productName] || productName;
      const variants = productVariants[canonicalName];
      const details = productDetails[canonicalName];
      const price = productPrices[canonicalName];

      if (!variants || !details) return;

      activeProductName = canonicalName;
      activeVariantIndex = preferredColor ? Math.max(0, variants.findIndex(v => v.color === preferredColor)) : 0;
      activeColor = variants[activeVariantIndex].color;
      activeSize = details.sizes.includes('M') ? 'M' : details.sizes[0];

      panel.innerHTML = `
        <button class="product-inlay-close" type="button" aria-label="Close product preview">×</button>
        <div class="product-inlay-gallery">
          <div class="product-inlay-visual">
            <div class="product-inlay-track">
              ${variants.map(v => `<div class="product-inlay-slide"><img src="${escapeHTML(v.image)}" alt="${escapeHTML(v.color)} ${escapeHTML(canonicalName)}"></div>`).join('')}
            </div>
          </div>
          <div class="product-inlay-thumbs">
            ${variants.map((v, idx) => `<button class="product-inlay-thumb ${idx === activeVariantIndex ? 'is-active' : ''}" type="button" data-index="${idx}"><img src="${escapeHTML(v.image)}" alt="${escapeHTML(v.color)}"></button>`).join('')}
          </div>
        </div>
        <div class="product-inlay-details">
          <p class="product-inlay-brand">VERA · ${escapeHTML(details.category)}</p>
          <h2 class="product-inlay-title">${escapeHTML(canonicalName)}</h2>
          <div class="product-inlay-price-row">
            <span class="product-inlay-price">$${price.toFixed(2)}</span>
            <span class="product-inlay-stock"><span class="product-inlay-stock-dot"></span> In Stock</span>
          </div>
          <p class="product-inlay-description">${escapeHTML(details.description)}</p>

          <div class="product-inlay-section">
            <div class="product-inlay-label">Color: <strong data-inlay-color-label>${escapeHTML(activeColor)}</strong></div>
            <div class="product-inlay-colors">
              ${variants.map((v, idx) => `
                <button class="product-inlay-color-btn ${idx === activeVariantIndex ? 'is-active' : ''}" type="button" data-index="${idx}" data-color="${escapeHTML(v.color)}">
                  <span class="product-inlay-color-swatch" style="--swatch: ${v.swatch}"></span>
                  <span>${escapeHTML(v.color)}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <div class="product-inlay-section">
            <div class="product-inlay-label">
              <span>Size: <strong data-inlay-size-label>${escapeHTML(activeSize)}</strong></span>
              ${details.sizeChart ? '<button class="size-guide-trigger" type="button" data-toggle-size-guide>Size Guide</button>' : ''}
            </div>
            <div class="product-inlay-sizes">
              ${details.sizes.map(sz => `
                <button class="product-inlay-size-btn ${sz === activeSize ? 'is-active' : ''}" type="button" data-size="${escapeHTML(sz)}">${escapeHTML(sz)}</button>
              `).join('')}
            </div>
          </div>

          <div class="product-inlay-actions">
            <button class="product-inlay-add-btn" type="button">+ ADD TO BAG</button>
          </div>

          <div class="product-inlay-perks">
            <div class="product-inlay-perk"><span>🌐</span><span>Free Shipping</span></div>
            <div class="product-inlay-perk"><span>↩</span><span>30-Day Returns</span></div>
            <div class="product-inlay-perk"><span>✦</span><span>Premium Quality</span></div>
          </div>

          <div class="product-inlay-accordions">
            <details class="product-inlay-accordion" open>
              <summary>Details & Fabric</summary>
              <div class="product-inlay-accordion-body">${escapeHTML(details.details)}</div>
            </details>
            <details class="product-inlay-accordion">
              <summary>Shipping & Returns</summary>
              <div class="product-inlay-accordion-body">${escapeHTML(details.shipping)}</div>
            </details>
            ${details.sizeChart ? `
            <details class="product-inlay-accordion" data-size-accordion>
              <summary>Size Chart (Inches)</summary>
              <div class="product-inlay-accordion-body">
                <table class="size-table">
                  <thead><tr><th>Size</th><th>Chest</th><th>Waist</th><th>Hip</th></tr></thead>
                  <tbody>
                    ${details.sizeChart.map(sc => `<tr><td><strong>${sc.size}</strong></td><td>${sc.chest}</td><td>${sc.waist}</td><td>${sc.hip}</td></tr>`).join('')}
                  </tbody>
                </table>
              </div>
            </details>
            ` : ''}
          </div>
        </div>
      `;

      const closeBtn = panel.querySelector('.product-inlay-close');
      closeBtn.addEventListener('click', closeInlay);

      const track = panel.querySelector('.product-inlay-track');
      const thumbs = panel.querySelectorAll('.product-inlay-thumb');
      const colorBtns = panel.querySelectorAll('.product-inlay-color-btn');
      const sizeBtns = panel.querySelectorAll('.product-inlay-size-btn');
      const colorLabel = panel.querySelector('[data-inlay-color-label]');
      const sizeLabel = panel.querySelector('[data-inlay-size-label]');
      const addBtn = panel.querySelector('.product-inlay-add-btn');
      const sizeGuideBtn = panel.querySelector('[data-toggle-size-guide]');
      const sizeAccordion = panel.querySelector('[data-size-accordion]');

      function setInlayVariant(index) {
        activeVariantIndex = (index + variants.length) % variants.length;
        activeColor = variants[activeVariantIndex].color;
        colorLabel.textContent = activeColor;
        track.style.transform = `translate3d(-${activeVariantIndex * 100}%, 0, 0)`;

        thumbs.forEach((t, i) => t.classList.toggle('is-active', i === activeVariantIndex));
        colorBtns.forEach((c, i) => c.classList.toggle('is-active', i === activeVariantIndex));
      }

      thumbs.forEach((t) => t.addEventListener('click', () => setInlayVariant(Number(t.dataset.index))));
      colorBtns.forEach((c) => c.addEventListener('click', () => setInlayVariant(Number(c.dataset.index))));

      sizeBtns.forEach((s) => s.addEventListener('click', () => {
        activeSize = s.dataset.size;
        sizeLabel.textContent = activeSize;
        sizeBtns.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.size === activeSize));
      }));

      if (sizeGuideBtn && sizeAccordion) {
        sizeGuideBtn.addEventListener('click', () => {
          sizeAccordion.open = true;
          sizeAccordion.scrollIntoView({ behavior: 'smooth' });
        });
      }

      addBtn.addEventListener('click', () => {
        const cart = readCart();
        const currentVariant = variants[activeVariantIndex];
        cart.push({
          id: `${canonicalName}-${activeColor}-${activeSize}-${Date.now()}`,
          name: canonicalName,
          color: activeColor,
          size: activeSize,
          price: price,
          image: currentVariant.image
        });
        writeCart(cart);
        updateCartCount();
        const originalText = addBtn.textContent;
        addBtn.textContent = '✓ ADDED TO BAG';
        addBtn.classList.add('added');
        window.setTimeout(() => {
          addBtn.textContent = originalText;
          addBtn.classList.remove('added');
        }, 1400);
      });

      setInlayVariant(activeVariantIndex);

      backdrop.classList.add('is-visible');
      backdrop.setAttribute('aria-hidden', 'false');
      document.body.classList.add('inlay-open');
    }

    // Attach click handlers to product cards to open inlay modal
    document.querySelectorAll('.product-card').forEach((card) => {
      const name = card.querySelector('h2')?.textContent.trim();
      if (!name) return;

      card.style.cursor = 'pointer';
      card.addEventListener('click', (event) => {
        if (event.target.closest('.add-button')) return; // quick add button handles direct add
        const activeColor = card.querySelector('.product-color-label strong')?.textContent.trim() || '';
        openInlay(name, activeColor);
      });
    });

    window.openVERAInlay = openInlay;
  }

  document.querySelectorAll('.add-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const cart = readCart();
      const productName = button.dataset.product;
      const canonicalName = productNameAliases[productName] || productName;
      const details = productDetails[canonicalName];
      const defaultSize = details?.sizes.includes('M') ? 'M' : (details?.sizes[0] || 'O/S');

      cart.push({
        id: `${productName}-${button.dataset.color || 'default'}-${defaultSize}-${Date.now()}`,
        name: productName,
        color: button.dataset.color || '',
        size: defaultSize,
        price: Number(button.dataset.price),
        image: button.dataset.image || ''
      });
      writeCart(cart);
      updateCartCount();
      const original = button.textContent;
      button.textContent = 'Added to bag';
      button.classList.add('added');
      window.setTimeout(() => { button.textContent = original; button.classList.remove('added'); }, 1300);
    });
  });

  function escapeHTML(value) { return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]); }

  function calculateShippingFee(subtotal) {
    if (subtotal <= 0 || subtotal >= 50) return 0;
    return Math.round(subtotal * 0.15 * 100) / 100;
  }

  function renderCart() {
    const list = document.querySelector('[data-cart-list]');
    if (!list) return;
    const empty = document.querySelector('[data-cart-empty]');
    const summary = document.querySelector('[data-cart-summary]');
    const tracker = document.querySelector('[data-shipping-tracker]');
    const trackerText = document.querySelector('[data-shipping-tracker-text]');
    const trackerFill = document.querySelector('[data-shipping-tracker-fill]');
    const subtotalEl = document.querySelector('[data-cart-subtotal]');
    const shippingEl = document.querySelector('[data-cart-shipping]');
    const totalEl = document.querySelector('[data-cart-total]');

    const cart = readCart();

    list.innerHTML = '';
    if (!cart.length) {
      empty.classList.remove('is-hidden');
      summary.classList.add('is-hidden');
      if (tracker) tracker.classList.add('is-hidden');
      return;
    }

    empty.classList.add('is-hidden');
    summary.classList.remove('is-hidden');

    cart.forEach((item, index) => {
      const row = document.createElement('article');
      row.className = 'cart-row';
      row.style.animationDelay = `${index * 70}ms`;
      const sizeTag = item.size ? ` · Size ${escapeHTML(item.size)}` : '';
      row.innerHTML = `<div class="cart-thumb">${item.image ? `<img src="${escapeHTML(item.image)}" alt="">` : '<span class="cart-wordmark">VERA</span>'}</div><div><h2>${escapeHTML(item.name)}</h2><p>${item.color ? `${escapeHTML(item.color)}${sizeTag} · VERA` : `VERA${sizeTag}`}</p></div><span class="cart-price">${formatPrice(item.price)}</span><button class="remove-button" type="button">Remove</button>`;
      row.querySelector('.remove-button').addEventListener('click', () => { writeCart(readCart().filter((cartItem) => cartItem.id !== item.id)); updateCartCount(); renderCart(); });
      list.appendChild(row);
    });

    const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
    const shippingFee = calculateShippingFee(subtotal);
    const grandTotal = subtotal + shippingFee;

    if (tracker) {
      if (subtotal <= 0) {
        tracker.classList.add('is-hidden');
      } else {
        tracker.classList.remove('is-hidden');
        const remaining = 50 - subtotal;
        const percentage = Math.min(Math.max((subtotal / 50) * 100, 0), 100);
        if (trackerFill) {
          trackerFill.style.width = `${percentage}%`;
          trackerFill.classList.toggle('unlocked', subtotal >= 50);
        }
        if (trackerText) {
          if (subtotal >= 50) {
            trackerText.innerHTML = `<strong>Complimentary shipping unlocked</strong>`;
          } else {
            trackerText.innerHTML = `Add <strong>$${remaining.toFixed(2)}</strong> more for complimentary shipping (15% of subtotal below $50.00)`;
          }
        }
      }
    }

    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee);
    if (totalEl) totalEl.textContent = formatPrice(grandTotal);
  }

  function checkCheckoutSuccess() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout') === 'success') {
      const banner = document.querySelector('[data-checkout-success]');
      if (banner) banner.classList.remove('is-hidden');
      writeCart([]);
      updateCartCount();
    }
  }

  const checkoutBtn = document.querySelector('[data-square-checkout], [data-mock-checkout]');
  checkoutBtn?.addEventListener('click', async () => {
    const cart = readCart();
    if (!cart.length) return;

    const originalText = checkoutBtn.textContent;
    checkoutBtn.textContent = 'Connecting to Square...';
    checkoutBtn.disabled = true;

    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart })
      });
      const data = await response.json();

      if (data.status === 'success' && data.checkout_url) {
        window.location.href = data.checkout_url;
      } else if (data.status === 'config_required') {
        alert(`Square Checkout API Ready!\n\nTo process live/sandbox payments:\n1. Open .env in your project folder\n2. Add your SQUARE_ACCESS_TOKEN and SQUARE_LOCATION_ID from developer.squareup.com`);
        checkoutBtn.textContent = originalText;
        checkoutBtn.disabled = false;
      } else {
        alert(`Square API Notice: ${data.error || data.message || 'Unable to connect'}`);
        checkoutBtn.textContent = originalText;
        checkoutBtn.disabled = false;
      }
    } catch (err) {
      alert('Square Checkout API Endpoint Ready. Connect your Square API keys in .env to process checkout.');
      checkoutBtn.textContent = originalText;
      checkoutBtn.disabled = false;
    }
  });

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
  localStorage.removeItem('vera-coupon');
  setupProductVariants();
  setupProductInlay();
  checkCheckoutSuccess();
  updateCartCount();
  renderCart();
  setupMobileNavigation();
  setupLanguageMenus();
  setupPageTransitions();
  setupOfferModal();
})();
