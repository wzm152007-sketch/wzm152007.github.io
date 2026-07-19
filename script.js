const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const dialog = document.querySelector('[data-booking-dialog]');
const bookingForm = document.querySelector('[data-booking-form]');
const formWrap = document.querySelector('[data-booking-form-wrap]');
const bookingSuccess = document.querySelector('[data-booking-success]');

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

function closeMenu() {
  menuToggle?.setAttribute('aria-expanded', 'false');
  const menuLabel = menuToggle?.querySelector('.sr-only');
  if (menuLabel) menuLabel.textContent = 'Ouvrir le menu';
  nav?.classList.remove('open');
}

menuToggle?.addEventListener('click', () => {
  const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(willOpen));
  const menuLabel = menuToggle.querySelector('.sr-only');
  if (menuLabel) menuLabel.textContent = willOpen ? 'Fermer le menu' : 'Ouvrir le menu';
  nav?.classList.toggle('open', willOpen);
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMenu();
});

/* ——— Données de la carte ——— */

const specialties = [
  ['Bananéa', 'Banane, lait, noisette et amande', '6,00 €'],
  ['Bistcha', 'Banane, lait, amande et pistache', '6,50 €'],
  ['Fraiséa', 'Fraise, lait, noisette et amande', '6,00 €'],
  ['Frapistach', 'Fraise, lait, amande et pistache', '6,50 €'],
  ['Frajou', 'Fraise, lait, acajou et pistache', '6,00 €'],
  ['Rougache', 'Fruits rouges, lait, amande et pistache', '6,50 €'],
  ['Rougujacajou', 'Fruits rouges, lait, acajou et pistache', '6,50 €'],
  ['Rougéa', 'Fruits rouges, lait, noisette et amande', '6,00 €'],
  ['Avocéa', 'Avocat, lait, noisette et amande', '6,00 €'],
  ['Myrtiléa', 'Myrtille, lait, noisette et amande', '6,00 €']
];

const menuCategories = [
  ['pizza-tomate', 'Pizzas sauce tomate'],
  ['pizza-creme', 'Pizzas crème fraîche'],
  ['omelettes', 'Omelettes'],
  ['sandwiches', 'Sandwiches'],
  ['texmex', 'Tex-mex'],
  ['smoothies', 'Smoothies'],
  ['mojitos', 'Mojitos sans alcool'],
  ['chaudes', 'Boissons chaudes'],
  ['desserts', 'Desserts']
];

const fullMenu = [
  ['pizza-tomate', 'Marguerite', 'Fromage et basilic', '10,00 €'],
  ['pizza-tomate', 'Napoli', 'Fromage, anchois, câpres et olives', '13,00 €'],
  ['pizza-tomate', '4 Fromages', 'Fromage, gorgonzola, chèvre et parmesan', '13,00 €'],
  ['pizza-tomate', "L’Avocatina", 'Fromage, avocat, tomates cerises, basilic, pignons de pin, parmesan et crème fraîche', '13,00 €'],
  ['pizza-tomate', 'Hawaïenne', 'Fromage, jambon et ananas', '13,00 €'],
  ['pizza-tomate', 'Classica', 'Fromage, viande hachée, poivrons, oignons et parmesan', '13,00 €'],
  ['pizza-tomate', 'Colorants', 'Fromage, courgettes, aubergines, poivrons, basilic, parmesan et huile d’olive', '13,00 €'],
  ['pizza-tomate', 'Tona', 'Fromages, oignons rouges, câpres, olives noires et persil frais', '13,00 €'],
  ['pizza-tomate', 'Regina', 'Fromages, champignons et jambon', '13,00 €'],
  ['pizza-tomate', 'Calzone', 'Fromages, œuf, et 4 fromages ou thon ou jambon', '13,00 €'],
  ['pizza-tomate', '4 Saisons', 'Fromages, jambon, chorizo, champignons, artichauts et olives', '13,00 €'],
  ['pizza-tomate', 'Chorizo', 'Fromages, sauce piquillos, roquette, huile d’olive et chorizo', '13,50 €'],
  ['pizza-tomate', 'Merguez', 'Merguez, fromages, poivrons, oignons et œuf', '13,50 €'],
  ['pizza-tomate', 'Océanie', 'Fromages, moules, crevettes, beurre d’escargots et citron', '16,00 €'],
  ['pizza-tomate', 'Méditerranéenne', 'Fromages, aubergines, chèvre fraîche, tomates cerises, basilic frais et parmesan', '14,00 €'],
  ['pizza-tomate', 'Bufala', 'Fromages, bufala, roquette, tomates cerises, canard séché, copeaux de parmesan, huile et poivre', '17,00 €'],
  ['pizza-tomate', 'La Burratina', 'Burrata, tomates cerises, huile d’olive, roquette, copeaux de parmesan, poivre et canard séché', '17,00 €'],
  ['pizza-creme', 'La Crabe Zestée', 'Fromages, zeste de citron, crabe, avocat, citron vert et persil frais', '16,00 €'],
  ['pizza-creme', 'Verde', 'Courgettes, fromages, aubergines, pesto de roquette, parmesan et pignons de pin', '13,00 €'],
  ['pizza-creme', 'La Nordique', 'Fromages, saumon fumé, saumon frais, aneth, crème fraîche, tomates cerises, roquette et citron', '16,00 €'],
  ['pizza-creme', 'Chèvres Miel', 'Chèvre, miel et noix concassées', '13,00 €'],
  ['pizza-creme', 'Ricotta Miel', 'Ricotta, miel et noix concassées', '13,00 €'],
  ['pizza-creme', 'Raclette', 'Fromages, jambon, pommes de terre et raclette', '13,00 €'],
  ['pizza-creme', 'Fermiers', 'Fromages, poulet, pommes de terre et reblochon', '13,50 €'],
  ['pizza-creme', 'Tartiflette', 'Fromages, jambon, lardons, oignons, pommes de terre et reblochon', '13,00 €'],
  ['pizza-creme', 'Vosgienne', 'Fromages, lardons, oignons et œuf', '13,00 €'],
  ['pizza-creme', 'Saint-Jacques', 'Fromages, noix de Saint-Jacques, crevettes, beurre d’escargots, oignons et citron', '16,00 €'],
  ['pizza-creme', 'Dolce Piquante', 'Fromages, gorgonzola, poivre, noisettes concassées et miel', '13,00 €'],
  ['pizza-creme', 'Indienne', 'Poulet sauce curry, pommes de terre, oignons et tomates cerises', '13,50 €'],
  ['omelettes', 'Omelette Pignons de Pin', 'Œuf, basilic, pignons de pin, huile d’olive, roquette, tomates cerises, poivre et parmesan', '6,00 €'],
  ['omelettes', 'Omelette au Chèvre', 'Pommes de terre, œuf, oignons, poivre, huile d’olive et chèvre', '6,00 €'],
  ['sandwiches', 'Poulet', '', '8,00 €'],
  ['sandwiches', 'Jambon', '', '8,00 €'],
  ['sandwiches', 'Saumon', '', '8,00 €'],
  ['sandwiches', 'Viande Hachée', '', '8,00 €'],
  ['sandwiches', '4 Fromages', '', '8,00 €'],
  ['sandwiches', 'Thon', '', '8,00 €'],
  ['sandwiches', 'Merguez', '', '8,00 €'],
  ['texmex', '8 Chicken Wings', '', '9,00 €'],
  ['texmex', '12 Chicken Wings', '', '11,00 €'],
  ['texmex', '10 Nuggets', '', '9,00 €'],
  ['texmex', '16 Nuggets', '', '12,00 €'],
  ['texmex', '10 Onion Rings', '', '9,00 €'],
  ['texmex', '8 Mozza Sticks', '', '9,00 €'],
  ['texmex', '8 Tenders', '', '11,00 €'],
  ['texmex', '8 Bouchées de Camembert', '', '9,00 €'],
  ['texmex', 'Frites ou Potatoes', '', '3,50 €'],
  ['smoothies', 'Fraise Banane', '', '4,50 €'],
  ['smoothies', 'Fruits Rouges Banane', '', '5,00 €'],
  ['smoothies', 'Ananas Banane', '', '4,50 €'],
  ['smoothies', 'Ananas', '', '4,50 €'],
  ['smoothies', 'Orange', '', '4,00 €'],
  ['smoothies', 'Citron', '', '4,00 €'],
  ['mojitos', 'Cocktail Énergétique', 'Glaçons, sirop pina colada et Red Bull', '5,50 €'],
  ['mojitos', 'Mojito Pina Colada', '', '4,50 €'],
  ['mojitos', 'Orange Mojito', '', '4,50 €'],
  ['mojitos', 'Strawberry Mojito (fraise)', '', '4,50 €'],
  ['mojitos', 'Virgin Mojito (classique)', '', '4,00 €'],
  ['mojitos', 'Bleu Mojito (curaçao)', '', '4,50 €'],
  ['chaudes', 'Chocolat Chaud', '', '3,50 €'],
  ['chaudes', "Thé Noir à l’Amande", '', '3,00 €'],
  ['chaudes', 'Thé Vert aux Pignons de Pin', '', '3,00 €'],
  ['chaudes', 'Café Turc', '', '2,00 €'],
  ['desserts', 'Brownie', '', '3,50 €'],
  ['desserts', 'Salade de Fruits', '', '4,00 €'],
  ['desserts', 'Tiramisu', '', '4,50 €'],
  ['desserts', 'Fondant', '', '4,00 €'],
  ['desserts', 'Tarte aux Daims', '', '3,50 €'],
  ['desserts', 'Tarte Fait Maison', '', '3,50 €'],
  ['desserts', 'Pancakes', '', '6,50 €'],
  ['desserts', 'Glace', '', '5,00 €'],
  ['desserts', 'Pâtisserie au Choix Fait Maison', '', '4,50 €']
];

/* ——— La carte : onglets par catégorie ——— */

const tabsWrap = document.querySelector('[data-menu-tabs]');
const panel = document.querySelector('[data-menu-panel]');
if (tabsWrap && panel) {
  panel.id = 'menu-panel';
  panel.setAttribute('role', 'tabpanel');

  const renderCategory = (categoryId) => {
    const items = fullMenu.filter(([c]) => c === categoryId);
    panel.innerHTML = `<ul class="menu-list">${items.map(([, name, description, price]) => `
      <li class="menu-item">
        <h3>${name}</h3>
        <span class="price">${price}</span>
        ${description ? `<p>${description}</p>` : ''}
      </li>`).join('')}</ul>`;
  };

  const selectTab = (button) => {
    tabsWrap.querySelectorAll('.menu-tab').forEach((tab) => {
      tab.setAttribute('aria-selected', String(tab === button));
      tab.tabIndex = tab === button ? 0 : -1;
    });
    renderCategory(button.dataset.category);
  };

  menuCategories.forEach(([categoryId, label], index) => {
    const count = fullMenu.filter(([c]) => c === categoryId).length;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'menu-tab';
    button.dataset.category = categoryId;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', String(index === 0));
    button.setAttribute('aria-controls', 'menu-panel');
    button.tabIndex = index === 0 ? 0 : -1;
    button.innerHTML = `${label} <small>(${count})</small>`;
    button.addEventListener('click', () => selectTab(button));
    tabsWrap.appendChild(button);
  });

  tabsWrap.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    const tabs = [...tabsWrap.querySelectorAll('.menu-tab')];
    const current = tabs.indexOf(document.activeElement);
    if (current === -1) return;
    event.preventDefault();
    const next = (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    tabs[next].focus();
    selectTab(tabs[next]);
  });

  renderCategory(menuCategories[0][0]);
}

/* ——— Spécialités : jus maison ——— */

const juiceList = document.querySelector('[data-juice-list]');
if (juiceList) {
  juiceList.innerHTML = specialties.map(([name, description, price]) => `
    <article class="juice-item">
      <h3>${name}</h3>
      <span class="price">${price}</span>
      <p>${description}</p>
    </article>
  `).join('');
}

/* ——— Réservation ——— */

document.querySelectorAll('[data-open-booking]').forEach((button) => {
  button.addEventListener('click', () => {
    if (typeof dialog?.showModal === 'function') dialog.showModal();
  });
});

document.querySelector('[data-close-booking]')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => {
  const box = dialog.getBoundingClientRect();
  const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  if (outside) dialog.close();
});

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  formWrap.hidden = true;
  bookingSuccess.hidden = false;
});

const dateInput = document.querySelector('[data-date-input]');
if (dateInput) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  dateInput.min = `${year}-${month}-${day}`;
}

document.querySelector('[data-year]').textContent = new Date().getFullYear();

/* ——— Retour en haut ——— */

const backToTop = document.querySelector('[data-back-to-top]');
if (backToTop) {
  const toggleBackToTop = () => {
    backToTop.classList.toggle('is-visible', window.scrollY > window.innerHeight);
  };
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
