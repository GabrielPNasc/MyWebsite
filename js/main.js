// Preview local de imagens: cada slot de foto reaproveita o mesmo
// componente, evitando duplicar validação e limpeza de object URLs.
(function PhotoSlots() {
  'use strict';

  const ALLOWED_TYPES = Object.freeze(['image/png', 'image/jpeg', 'image/webp']);
  const MAX_SIZE_BYTES = 5 * 1024 * 1024;

  const SLOT_PAIRS = Object.freeze([
    { slotId: 'photo-main', inputId: 'photo-input-main', alt: 'Foto de Gabriel Nascimento' },
    { slotId: 'photo-about', inputId: 'photo-input-about', alt: 'Foto de contexto — Sobre' },
    { slotId: 'photo-gallery-1', inputId: 'photo-input-gallery-1', alt: 'Foto da galeria' },
    { slotId: 'photo-gallery-2', inputId: 'photo-input-gallery-2', alt: 'Foto da galeria' },
    { slotId: 'photo-gallery-3', inputId: 'photo-input-gallery-3', alt: 'Foto da galeria' },
    { slotId: 'photo-gallery-4', inputId: 'photo-input-gallery-4', alt: 'Foto da galeria' },
  ]);

  function isValidFile(file) {
    return ALLOWED_TYPES.includes(file.type) && file.size <= MAX_SIZE_BYTES;
  }

  // Cada chamada isola sua própria object URL, sem vazar estado global.
  function createPhotoSlotPreview({ slot, input, alt }) {
    let currentObjectUrl = null;

    function revokePreviousUrl() {
      if (currentObjectUrl) {
        URL.revokeObjectURL(currentObjectUrl);
        currentObjectUrl = null;
      }
    }

    function render(file) {
      revokePreviousUrl();
      currentObjectUrl = URL.createObjectURL(file);

      slot.textContent = '';
      const img = new Image();
      img.src = currentObjectUrl;
      img.alt = alt;
      img.className = 'photo-slot__img';
      slot.appendChild(img);
      slot.dataset.empty = 'false';
    }

    function handleChange(event) {
      const [file] = event.target.files;
      if (!file) return;

      if (!isValidFile(file)) {
        window.alert('Use uma imagem PNG, JPEG ou WEBP de até 5MB.');
        input.value = '';
        return;
      }

      render(file);
    }

    input.addEventListener('change', handleChange);
    window.addEventListener('pagehide', revokePreviousUrl);
  }

  SLOT_PAIRS.forEach(({ slotId, inputId, alt }) => {
    const slot = document.getElementById(slotId);
    const input = document.getElementById(inputId);
    if (slot && input) {
      createPhotoSlotPreview({ slot, input, alt });
    }
  });
})();

// Carrossel de projetos: avança/volta a largura exata de um card,
// medida em tempo real para acompanhar mudanças de layout.
(function ProjectCarousel() {
  'use strict';

  function createCarouselController({ track, prevButton, nextButton }) {
    function getStep() {
      const card = track.querySelector('.project-card');
      if (!card) return track.clientWidth;
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || '0');
      return card.getBoundingClientRect().width + gap;
    }

    function scrollByStep(direction) {
      track.scrollBy({ left: direction * getStep(), behavior: 'smooth' });
    }

    prevButton.addEventListener('click', () => scrollByStep(-1));
    nextButton.addEventListener('click', () => scrollByStep(1));
  }

  const track = document.getElementById('projects-carousel');
  const prevButton = document.querySelector('[data-carousel-prev]');
  const nextButton = document.querySelector('[data-carousel-next]');

  if (track && prevButton && nextButton) {
    createCarouselController({ track, prevButton, nextButton });
  }
})();

// Esconde a barra superior perto do rodapé, que repete os mesmos links,
// para não duplicar a mesma informação visível ao mesmo tempo.
(function TopbarAutoHide() {
  'use strict';

  const topbar = document.querySelector('.topbar');
  const footer = document.querySelector('.footer');
  if (!topbar || !footer) return;

  let ticking = false;

  function update() {
    ticking = false;
    const footerTop = footer.getBoundingClientRect().top;
    const shouldHide = footerTop < window.innerHeight * 0.75;
    topbar.classList.toggle('topbar--hidden', shouldHide);
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  window.addEventListener('load', update);
  update();
})();

// Alterna entre tema claro e escuro. Por padrão segue o sistema; a
// escolha manual do usuário é salva em localStorage e passa a valer
// sobre a preferência do sistema. O <head> já aplica o valor salvo
// antes do primeiro paint, evitando flash de tema errado.
(function ThemeToggle() {
  'use strict';

  const STORAGE_KEY = 'theme';
  const button = document.getElementById('theme-toggle');
  const root = document.documentElement;
  if (!button) return;

  const media = window.matchMedia('(prefers-color-scheme: dark)');

  function systemTheme() {
    return media.matches ? 'dark' : 'light';
  }

  function currentTheme() {
    return root.dataset.theme || systemTheme();
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    button.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  function toggleTheme() {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  media.addEventListener('change', () => {
    if (!localStorage.getItem(STORAGE_KEY)) applyTheme(systemTheme());
  });

  button.addEventListener('click', toggleTheme);
  applyTheme(currentTheme());
})();