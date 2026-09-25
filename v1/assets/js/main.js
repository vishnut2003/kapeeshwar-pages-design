/* =========================================================
   Kapeeshwar Ayurveda: v1 design mockup interactions
   All data below is placeholder content for client review.
   ========================================================= */

const img = (f) => 'images/claude-uploads/' + f;

const PRODUCTS = [
  // ---- A2 Ghee ----
  { id: 'g1', cat: 'ghee', sub: 'desi', name: 'Kapeeshwar A2 Desi Cow Ghee', size: '500 ml', price: 1199, mrp: 1399, rating: 4.8, reviews: 1248, tag: 'Best Seller', imgs: ['pack-ghee-jar.svg'], best: true },
  { id: 'g2', cat: 'ghee', sub: 'desi', name: 'Kapeeshwar A2 Desi Cow Ghee', size: '1 L', price: 2249, mrp: 2699, rating: 4.9, reviews: 864, tag: 'Top Rated', imgs: ['pack-ghee-jar.svg'], best: true },
  { id: 'g3', cat: 'ghee', sub: 'desi', name: 'Kapeeshwar A2 Desi Cow Ghee', size: '250 ml', price: 649, mrp: 749, rating: 4.7, reviews: 512, tag: 'Trial Pack', imgs: ['pack-ghee-jar.svg'] },
  { id: 'g4', cat: 'ghee', sub: 'desi', name: 'Kapeeshwar A2 Desi Cow Ghee Tin', size: '5 L', price: 10499, mrp: 12999, rating: 4.8, reviews: 198, tag: 'Value Pack', imgs: ['pack-ghee-tin.svg'], best: true },
  { id: 'g5', cat: 'ghee', sub: 'gir', name: 'Kapeeshwar A2 Gir Cow Ghee', size: '500 ml', price: 1499, mrp: 1799, rating: 4.9, reviews: 342, tag: 'New Launch', imgs: ['pack-ghee-jar.svg'], best: true },
  { id: 'g6', cat: 'ghee', sub: 'gir', name: 'Kapeeshwar A2 Gir Cow Ghee Tin', size: '1 L', price: 2899, mrp: 3399, rating: 4.8, reviews: 156, tag: 'Selling Fast', imgs: ['pack-ghee-tin.svg'] },
  // ---- Wood-pressed oils ----
  { id: 'o1', cat: 'oil', sub: 'mustard', name: 'Wood-Pressed Mustard Oil', size: '1 L', price: 349, mrp: 420, rating: 4.7, reviews: 2104, tag: 'Best Seller', imgs: ['pack-oil-mustard.svg'], best: true },
  { id: 'o2', cat: 'oil', sub: 'mustard', name: 'Wood-Pressed Mustard Oil Can', size: '5 L', price: 1599, mrp: 2050, rating: 4.7, reviews: 640, tag: 'Value Pack', imgs: ['pack-oil-can.svg'] },
  { id: 'o3', cat: 'oil', sub: 'groundnut', name: 'Wood-Pressed Groundnut Oil', size: '1 L', price: 429, mrp: 520, rating: 4.8, reviews: 1320, tag: 'Top Rated', imgs: ['pack-oil-groundnut.svg'], best: true },
  { id: 'o4', cat: 'oil', sub: 'coconut', name: 'Wood-Pressed Coconut Oil', size: '1 L', price: 549, mrp: 650, rating: 4.6, reviews: 488, tag: 'Selling Fast', imgs: ['pack-oil-coconut.svg'] },
  { id: 'o5', cat: 'oil', sub: 'sesame', name: 'Wood-Pressed Sesame (Til) Oil', size: '1 L', price: 499, mrp: 599, rating: 4.7, reviews: 376, tag: 'New Launch', imgs: ['pack-oil-sesame.svg'] },
  { id: 'o6', cat: 'oil', sub: 'groundnut', name: 'Wood-Pressed Groundnut Oil', size: '2 L', price: 829, mrp: 1040, rating: 4.8, reviews: 402, tag: '', imgs: ['pack-oil-groundnut.svg'] },
  // ---- Combos ----
  { id: 'c1', cat: 'combo', sub: 'combo', name: 'Ghee 500ml + Mustard Oil 1L', size: 'Combo', price: 1449, mrp: 1819, rating: 4.8, reviews: 286, tag: 'Most Loved', imgs: ['pack-ghee-jar.svg', 'pack-oil-mustard.svg'], best: true },
  { id: 'c2', cat: 'combo', sub: 'combo', name: 'Kitchen Starter: Ghee 1L + Mustard + Groundnut', size: 'Pack of 3', price: 2899, mrp: 3639, rating: 4.9, reviews: 174, tag: 'Save 20%', imgs: ['pack-oil-mustard.svg', 'pack-ghee-jar.svg', 'pack-oil-groundnut.svg'] },
  { id: 'c3', cat: 'combo', sub: 'combo', name: 'Oil Trio: Mustard + Groundnut + Sesame', size: 'Pack of 3', price: 1149, mrp: 1539, rating: 4.7, reviews: 211, tag: 'Save 25%', imgs: ['pack-oil-groundnut.svg', 'pack-oil-mustard.svg', 'pack-oil-sesame.svg'] },
  { id: 'c4', cat: 'combo', sub: 'combo', name: 'Ghee Gift Pack: Desi Cow + Gir Cow 500ml', size: 'Pack of 2', price: 2549, mrp: 3198, rating: 4.9, reviews: 98, tag: 'Gift Pick', imgs: ['pack-ghee-jar.svg', 'pack-ghee-tin.svg'] },
];

const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));
const cart = {}; // id -> qty
const inr = (n) => '₹' + n.toLocaleString('en-IN');
const off = (p) => Math.round((1 - p.price / p.mrp) * 100);
const stars = (r) => '★★★★★'.slice(0, Math.round(r)) + '☆☆☆☆☆'.slice(0, 5 - Math.round(r));

/* ---------- Product card template ---------- */
function cardHTML(p) {
  const media = p.imgs.length === 1 ? '' : p.imgs.length === 2 ? 'duo' : 'trio';
  const coupon = Math.round(p.price * 0.85);
  return `
  <article class="p-card" data-id="${p.id}" data-cat="${p.cat}" data-sub="${p.sub}" data-deal="${off(p) >= 20}">
    <div class="p-media ${media}">
      <span class="p-off">${off(p)}% OFF</span>
      ${p.tag ? `<span class="p-tag"><i data-lucide="flame"></i>${p.tag}</span>` : ''}
      ${p.imgs.map((f) => `<img src="${img(f)}" alt="${p.name}" loading="lazy">`).join('')}
      <span class="p-size">${p.size}</span>
      <button class="p-wish" aria-label="Add to wishlist"><i data-lucide="heart"></i></button>
    </div>
    <div class="p-body">
      <div class="p-rating"><span class="stars">${stars(p.rating)}</span> ${p.rating} (${p.reviews.toLocaleString('en-IN')})</div>
      <h3 class="p-name">${p.name}</h3>
      <div class="p-price">
        <span class="now">${inr(p.price)}</span>
        <span class="mrp">${inr(p.mrp)}</span>
        <span class="unit">/ ${p.size}</span>
      </div>
      <div class="p-coupon">Best price <b>${inr(coupon)}</b> with code <b>PURE15</b></div>
      <div class="p-actions">${actionHTML(p.id)}</div>
    </div>
  </article>`;
}

function actionHTML(id) {
  const q = cart[id] || 0;
  if (!q) return `<button class="add-btn" data-add="${id}"><i data-lucide="shopping-bag"></i> ADD</button>`;
  return `<div class="qty"><button data-dec="${id}" aria-label="Decrease"><i data-lucide="minus"></i></button><span>${q}</span><button data-inc="${id}" aria-label="Increase"><i data-lucide="plus"></i></button></div>`;
}

function renderRow(el) {
  const src = el.dataset.source; // best | ghee | oil | combo
  const list = src === 'best' ? PRODUCTS.filter((p) => p.best) : PRODUCTS.filter((p) => p.cat === src);
  el.innerHTML = list.map(cardHTML).join('');
}

function icons() { if (window.lucide) lucide.createIcons(); }

/* ---------- Filtering (category tabs + sub tabs) ---------- */
function applyFilter(track, test) {
  let shown = 0;
  track.querySelectorAll('.p-card').forEach((c) => {
    const ok = test(c);
    c.style.display = ok ? '' : 'none';
    if (ok) shown++;
  });
  track.scrollLeft = 0;
  let note = track.querySelector('.empty-note');
  if (!shown && !note) track.insertAdjacentHTML('beforeend', '<p class="empty-note">More products coming soon.</p>');
  if (shown && note) note.remove();
  track.dispatchEvent(new Event('scroll'));
}

function initTabs() {
  // Pill sub-tabs inside ghee / oil sections
  document.querySelectorAll('.pill-tabs').forEach((group) => {
    const track = document.querySelector(group.dataset.target);
    group.querySelectorAll('.pill-tab').forEach((pill) => pill.addEventListener('click', () => {
      group.querySelectorAll('.pill-tab').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      const s = pill.dataset.sub;
      applyFilter(track, (c) => s === 'all' || c.dataset.sub === s);
    }));
  });
}

/* ---------- Carousels ---------- */
function initCarousels() {
  document.querySelectorAll('.carousel').forEach((car) => {
    const track = car.querySelector('.carousel-track');
    const prev = car.querySelector('.car-arrow.prev');
    const next = car.querySelector('.car-arrow.next');
    if (!prev || !next) return;
    const step = () => {
      const first = [...track.children].find((c) => c.offsetParent !== null);
      return first ? first.getBoundingClientRect().width + 20 : track.clientWidth;
    };
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    const update = () => {
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    if (car.dataset.autoplay) {
      const tick = () => {
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) track.scrollTo({ left: 0, behavior: 'smooth' });
        else track.scrollBy({ left: step(), behavior: 'smooth' });
      };
      let timer = setInterval(tick, +car.dataset.autoplay);
      car.addEventListener('mouseenter', () => clearInterval(timer));
      car.addEventListener('mouseleave', () => {
        clearInterval(timer);
        timer = setInterval(tick, +car.dataset.autoplay);
      });
    }
  });
}

/* ---------- Hero slider ---------- */
function initHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const track = hero.querySelector('.hero-track');
  const slides = hero.querySelectorAll('.slide');
  let i = 0, timer;
  function go(n, user) {
    i = (n + slides.length) % slides.length;
    track.style.transform = `translateX(-${i * 100}%)`;
    if (user) restart();
  }
  function restart() { clearInterval(timer); timer = setInterval(() => go(i + 1), 5500); }

  // swipe
  let x0 = null;
  hero.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1), true);
    x0 = null;
  });

  // Fit the slide to the first fold: viewport height minus the bars above the hero
  const fit = () => {
    const top = hero.getBoundingClientRect().top + window.scrollY;
    hero.style.setProperty('--hero-h', Math.max(0, window.innerHeight - top) + 'px');
  };
  fit();
  window.addEventListener('resize', fit);
  window.addEventListener('load', fit);
  if (document.fonts) document.fonts.ready.then(fit);

  go(0);
  restart();
}

/* ---------- Announcement rotation ---------- */
function initAnnounce() {
  const msgs = document.querySelectorAll('.announce-msg');
  if (msgs.length < 2) return;
  let i = 0, timer;
  const show = (dir) => {
    const cur = msgs[i];
    cur.classList.remove('active');
    cur.classList.add('leave');
    cur.classList.toggle('rev', dir < 0);
    setTimeout(() => cur.classList.remove('leave', 'rev'), 500);
    i = (i + dir + msgs.length) % msgs.length;
    msgs[i].classList.add('active');
  };
  const restart = () => { clearInterval(timer); timer = setInterval(() => show(1), 4500); };
  document.querySelectorAll('[data-announce]').forEach((b) => b.addEventListener('click', () => { show(+b.dataset.announce); restart(); }));
  restart();

  // Coupon chip: copy code to clipboard
  document.querySelectorAll('.coupon-chip').forEach((chip) => chip.addEventListener('click', () => {
    const code = chip.dataset.copy;
    (navigator.clipboard ? navigator.clipboard.writeText(code) : Promise.reject()).catch(() => {});
    toast(`Coupon ${code} copied! Apply it at checkout.`);
  }));
}

/* ---------- Cart ---------- */
const FREE_SHIP = 999;

function setQty(id, q) {
  if (q > (cart[id] || 0)) {
    document.querySelectorAll('.cart-btn').forEach((b) => { b.classList.remove('pulse'); void b.offsetWidth; b.classList.add('pulse'); });
  }
  if (q <= 0) delete cart[id]; else cart[id] = q;
  document.querySelectorAll(`.p-card[data-id="${id}"] .p-actions`).forEach((el) => { el.innerHTML = actionHTML(id); });
  renderCart();
  icons();
}

function renderCart() {
  const ids = Object.keys(cart);
  const count = ids.reduce((s, id) => s + cart[id], 0);
  const total = ids.reduce((s, id) => s + cart[id] * byId[id].price, 0);
  document.querySelectorAll('.cart-count').forEach((b) => {
    b.textContent = count;
    b.style.display = count ? '' : 'none';
    b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
  });

  const items = document.querySelector('.cart-items');
  const foot = document.querySelector('.cart-foot');
  const left = Math.max(0, FREE_SHIP - total);
  document.querySelector('.free-ship-text').innerHTML = left
    ? `Add <b>${inr(left)}</b> more to get <b>FREE delivery</b>`
    : `<b>Yay! You've unlocked FREE delivery</b>`;
  document.querySelector('.progress i').style.width = Math.min(100, (total / FREE_SHIP) * 100) + '%';

  if (!ids.length) {
    items.innerHTML = `<div class="cart-empty"><i data-lucide="shopping-basket"></i><h4>Your cart is empty</h4><p>Add pure A2 ghee & wood-pressed oils to get started.</p><button class="btn btn-primary" data-close-cart>Continue Shopping</button></div>`;
    foot.style.display = 'none';
    return;
  }
  foot.style.display = '';
  items.innerHTML = ids.map((id) => {
    const p = byId[id];
    return `<div class="cart-item">
      <div class="ci-img"><img src="${img(p.imgs[0])}" alt=""></div>
      <div><h5>${p.name}</h5><div class="ci-price"><b>${inr(p.price)}</b> · ${p.size}</div></div>
      <div class="qty"><button data-dec="${id}"><i data-lucide="minus"></i></button><span>${cart[id]}</span><button data-inc="${id}"><i data-lucide="plus"></i></button></div>
    </div>`;
  }).join('');
  document.querySelector('.cart-total').textContent = inr(total);
}

function toast(msg) {
  const t = document.querySelector('.toast');
  t.querySelector('span').textContent = msg;
  t.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ---------- Drawers ---------- */
function toggle(el, open) {
  el.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

/* ---------- Global click delegation ---------- */
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-add],[data-inc],[data-dec],[data-open-cart],[data-close-cart],[data-open-menu],[data-close-menu],.p-wish,.has-dropdown > a');
  if (!t) return;
  if (t.dataset.add) { setQty(t.dataset.add, 1); toast(byId[t.dataset.add].name + ' added to cart'); }
  else if (t.dataset.inc) setQty(t.dataset.inc, (cart[t.dataset.inc] || 0) + 1);
  else if (t.dataset.dec) setQty(t.dataset.dec, (cart[t.dataset.dec] || 0) - 1);
  else if (t.hasAttribute('data-open-cart')) { e.preventDefault(); toggle(document.querySelector('.cart-drawer'), true); }
  else if (t.hasAttribute('data-close-cart')) toggle(document.querySelector('.cart-drawer'), false);
  else if (t.hasAttribute('data-open-menu')) toggle(document.querySelector('.mobile-nav'), true);
  else if (t.hasAttribute('data-close-menu')) toggle(document.querySelector('.mobile-nav'), false);
  else if (t.classList.contains('p-wish')) { t.classList.toggle('on'); toast(t.classList.contains('on') ? 'Saved to wishlist' : 'Removed from wishlist'); }
  else if (t.matches('.has-dropdown > a') && window.matchMedia('(hover: none)').matches) {
    e.preventDefault(); t.parentElement.classList.toggle('open');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') document.querySelectorAll('.cart-drawer.open, .mobile-nav.open').forEach((d) => toggle(d, false));
});

/* ---------- Header shadow on scroll ---------- */
window.addEventListener('scroll', () => {
  document.querySelector('.header').classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ---------- Newsletter (fake) ---------- */
document.querySelectorAll('.nl-form').forEach((f) => f.addEventListener('submit', (e) => {
  e.preventDefault();
  f.reset();
  toast('Thanks for subscribing! Check your inbox for 10% OFF.');
}));

/* ---------- Boot ---------- */
document.querySelectorAll('[data-source]').forEach(renderRow);
renderCart();
icons();
initAnnounce();
initHero();
initTabs();
initCarousels();
