/**
 * main.js
 *
 * Cada espaço de foto da página (sidebar, sobre, projeto, galeria) usa o
 * mesmo componente de preview local, criado por uma factory function.
 * Isso evita duplicar a mesma lógica pra cada slot e mantém regra de
 * validação/segurança num único lugar.
 *
 * Padrões usados:
 *  - Factory function: createPhotoSlotPreview() gera um componente
 *    independente por par (slot, input).
 *  - Module pattern (IIFE): nada além do necessário toca o escopo global.
 *
 * Segurança:
 *  - Nenhum uso de innerHTML/eval com dado do usuário; a <img> é criada
 *    via DOM API e só o objeto File validado é usado.
 *  - Tipo (PNG/JPEG/WEBP) e tamanho (até 5MB) são validados antes do preview.
 *  - object URLs são revogadas ao trocar de imagem ou sair da página,
 *    evitando vazamento de memória.
 *  - Compatível com a CSP script-src 'self' do index.html (sem inline).
 */
(function PhotoSlots() {
  'use strict';

  const ALLOWED_TYPES = Object.freeze(['image/png', 'image/jpeg', 'image/webp']);
  const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

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

  /**
   * Factory: recebe os elementos de um slot e devolve um componente com
   * seu próprio estado (a object URL atual), sem vazar nada pro global.
   */
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

/**
 * Carrossel de projetos.
 *
 * Padrão: factory function novamente (createCarouselController), pra manter
 * a mesma abordagem usada nos slots de foto — um componente independente,
 * sem estado global, que podia ser reaproveitado se a página ganhar mais
 * de um carrossel no futuro.
 *
 * Comportamento: os botões avançam/voltam exatamente a largura de um card
 * (medida em tempo real, então continua correto se o CSS mudar o tamanho
 * do card em telas menores) usando scroll nativo suave — sem libs externas.
 */
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

/**
 * Barra superior de redes sociais.
 *
 * Quando o rodapé (que repete os mesmos links) chega perto do meio da tela,
 * a barra some com animação; ao subir de volta, ela reaparece.
 * Usa scroll com requestAnimationFrame (leve) e também roda no load/resize.
 */
(function TopbarAutoHide() {
  'use strict';

  const topbar = document.querySelector('.topbar');
  const footer = document.querySelector('.footer');
  if (!topbar || !footer) return;

  let ticking = false;

  function update() {
    ticking = false;
    const footerTop = footer.getBoundingClientRect().top;
    // some quando o topo do rodapé sobe até 75% da altura da tela
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