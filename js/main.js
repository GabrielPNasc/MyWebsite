// Idioma da interface: o HTML ja e escrito em ingles, que e o padrao e tambem
// o fallback — se o navegador pede um idioma sem traducao, nada e trocado e a
// pagina continua em ingles. Na primeira visita o idioma vem da preferencia do
// navegador; depois disso vale a escolha feita no botao (localStorage).
// Para acrescentar um idioma: uma chave em HTML_TEXT (textos do HTML), uma em
// JS_TEXT (textos que so existem no JS) e os rotulos em NEXT_LABEL.
const I18N_FALLBACK = 'en';

const HTML_TEXT = {
  pt: {
    'meta.description': 'Gabriel Nascimento — Estudante de Ciência da Computação, Java + Spring Boot, Python.',
    'nav.social': 'Redes sociais',
    'nav.sections': 'Seções da página',
    'action.theme': 'Alternar tema claro/escuro',
    'sidebar.location': 'Recife, Pernambuco, Brasil',
    'sidebar.role': 'Estudante de Ciência da Computação',
    'img.name': 'Foto de Gabriel Nascimento',
    'nav.about': 'Sobre',
    'nav.education': 'Formação',
    'nav.projects': 'Projetos',
    'nav.certificates': 'Certificados',
    'about.title': 'Sobre',
    'about.text': 'Sou estudante de Ciência da Computação, focado em construir aplicações completas aplicando arquitetura em camadas e boas práticas de código. Minha principal conquista até aqui é ter desenvolvido aplicações funcionais do zero, evoluindo constantemente em lógica, orientação a objetos e versionamento com Git. Sou movido por desafios, aprendizado contínuo e pela busca de soluções limpas, organizadas e escaláveis.',
    'education.title': 'Formação',
    'education.course': 'Ciência da Computação',
    'education.tags': 'Gestão de pessoas · Python',
    'projects.title': 'Projetos',
    'projects.prev': 'Projeto anterior',
    'projects.next': 'Próximo projeto',
    'projects.stack': 'Tecnologias usadas',
    'projects.qrcode.title': 'Gerador de QR Code',
    'projects.qrcode.text': 'API REST que recebe um link, processa e devolve o QR Code em PNG na hora. O aprendizado central foi integrar Spring Boot com JavaScript puro e entender a fundo o envio e a renderização de arquivos de imagem via HTTP.',
    'projects.qrcode.link': 'Ver repositório Gerador de QR Code no GitHub',
    'projects.motion.title': 'Sistema de Detecção de Movimento',
    'projects.motion.text': 'Monitora a janela escolhida pela quantidade de pixels alterados entre os frames. Ao detectar movimento, emite um alerta sonoro e envia automaticamente pelo WhatsApp uma imagem informando o horário em que ele ocorreu.',
    'projects.motion.link': 'Ver repositório Sistema de Detecção de Movimento no GitHub',
    'projects.login.title': 'API de Sistema de Login',
    'projects.login.text': 'Sistema de autenticação para cadastro e login de usuários por meio de uma API: recebe e valida as credenciais e realiza a comunicação com o banco de dados.',
    'projects.login.link': 'Ver repositório API System Login no GitHub',
    'certs.title': 'Certificados',
    'certs.java.title': 'Java Completo — Programação Orientada a Objetos + Projetos',
    'certs.java.date': 'mar 2026',
    'certs.python.date': 'set 2026',
    'certs.scrum.title': 'Gestão ágil de projetos com Scrum e Kanban',
    'certs.scrum.date': 'ago 2026',
    'footer.title': 'Vamos conversar',
    'footer.text': 'Estou buscando evoluir a cada dia, o tempo passa e eu não posso ficar para trás .',
  },
};

// Textos que existem apenas no JS (alertas, alt de preview), com fallback no padrao.
const JS_TEXT = {
  en: {
    photoBadFile: 'Use a PNG, JPEG or WEBP image up to 5MB.',
    photoAltMain: 'Photo of Gabriel Nascimento',
    photoAltAbout: 'Context photo — About',
    photoAltGallery: 'Gallery photo',
  },
  pt: {
    photoBadFile: 'Use uma imagem PNG, JPEG ou WEBP de até 5MB.',
    photoAltMain: 'Foto de Gabriel Nascimento',
    photoAltAbout: 'Foto de contexto — Sobre',
    photoAltGallery: 'Foto da galeria',
  },
};

// Rotulo do botao de idioma: idioma atual -> idioma de destino.
const NEXT_LABEL = {
  en: { pt: 'Switch to Portuguese', en: 'Switch to English' },
  pt: { pt: 'Mudar para português', en: 'Mudar para inglês' },
};

// Idiomas com traducao (o ingles e o padrao, entao nao entra nesta lista).
const I18N_LANGUAGES = Object.freeze(Object.keys(HTML_TEXT));
const LANG_TAGS = Object.freeze({ en: 'en', pt: 'pt-BR' });

// Idioma ativo, ajustado pelo modulo abaixo antes de qualquer traducao.
let i18nLang = I18N_FALLBACK;

function i18nText(key) {
  const table = JS_TEXT[i18nLang] || {};
  return table[key] || JS_TEXT[I18N_FALLBACK][key] || '';
}

// Troca o texto ja renderizado para o idioma escolhido. Cada ponto traduzivel
// guarda o valor original em ingles, entao voltar ao padrao (ou cair no
// fallback, quando falta traducao de uma chave) e so reaplicar esse valor.
(function I18n() {
  'use strict';

  const root = document.documentElement;
  const button = document.getElementById('lang-toggle');

  const SETTERS = {
    text: (el, value) => { el.textContent = value; },
    ariaLabel: (el, value) => el.setAttribute('aria-label', value),
    alt: (el, value) => el.setAttribute('alt', value),
    content: (el, value) => el.setAttribute('content', value),
    title: (el, value) => el.setAttribute('title', value),
  };

  const SELECTOR = [
    '[data-i18n]',
    '[data-i18n-aria-label]',
    '[data-i18n-alt]',
    '[data-i18n-content]',
    '[data-i18n-title]',
  ].join(',');

  function collectBindings() {
    const bindings = [];

    document.querySelectorAll(SELECTOR).forEach((el) => {
      const { i18n, i18nAriaLabel, i18nAlt, i18nContent, i18nTitle } = el.dataset;
      if (i18n) bindings.push({ el, key: i18n, apply: SETTERS.text, base: el.textContent });
      if (i18nAriaLabel) bindings.push({ el, key: i18nAriaLabel, apply: SETTERS.ariaLabel, base: el.getAttribute('aria-label') });
      if (i18nAlt) bindings.push({ el, key: i18nAlt, apply: SETTERS.alt, base: el.getAttribute('alt') });
      if (i18nContent) bindings.push({ el, key: i18nContent, apply: SETTERS.content, base: el.getAttribute('content') });
      if (i18nTitle) bindings.push({ el, key: i18nTitle, apply: SETTERS.title, base: el.getAttribute('title') });
    });

    return bindings;
  }

  function normalize(tag) {
    return String(tag || '').toLowerCase().split('-')[0];
  }

  function otherLanguage(lang) {
    return lang === I18N_FALLBACK ? (I18N_LANGUAGES[0] || I18N_FALLBACK) : I18N_FALLBACK;
  }

  // A preferencia do navegador so decide quando existe traducao para o idioma;
  // qualquer outro idioma cai no padrao (ingles).
  function detectLanguage() {
    const saved = normalize(localStorage.getItem('lang'));
    if (saved === I18N_FALLBACK || I18N_LANGUAGES.includes(saved)) return saved;

    const preferences = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language];

    for (const preference of preferences) {
      const base = normalize(preference);
      // O idioma padrao tambem conta como disponivel: se o navegador pede
      // ingles, nao faz sentido descer para a proxima preferencia da lista.
      if (base === I18N_FALLBACK || I18N_LANGUAGES.includes(base)) return base;
    }

    return I18N_FALLBACK;
  }

  function updateButton(lang) {
    if (!button) return;
    const code = button.querySelector('.lang-toggle__code');
    if (code) code.textContent = lang.toUpperCase();

    const label = (NEXT_LABEL[lang] || {})[otherLanguage(lang)] || '';
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
  }

  function apply(lang) {
    i18nLang = lang;
    root.lang = LANG_TAGS[lang] || lang;

    const table = HTML_TEXT[lang] || {};
    bindings.forEach((binding) => {
      binding.apply(binding.el, table[binding.key] || binding.base);
    });

    updateButton(lang);
  }

  const bindings = collectBindings();

  if (button) {
    button.addEventListener('click', () => {
      const next = otherLanguage(i18nLang);
      localStorage.setItem('lang', next);
      apply(next);
    });
  }

  apply(detectLanguage());
})();

// Preview local de imagens: cada slot de foto reaproveita o mesmo
// componente, evitando duplicar validação e limpeza de object URLs.
(function PhotoSlots() {
  'use strict';

  const ALLOWED_TYPES = Object.freeze(['image/png', 'image/jpeg', 'image/webp']);
  const MAX_SIZE_BYTES = 5 * 1024 * 1024;

  const SLOT_PAIRS = Object.freeze([
    { slotId: 'photo-main', inputId: 'photo-input-main', altKey: 'photoAltMain' },
    { slotId: 'photo-about', inputId: 'photo-input-about', altKey: 'photoAltAbout' },
    { slotId: 'photo-gallery-1', inputId: 'photo-input-gallery-1', altKey: 'photoAltGallery' },
    { slotId: 'photo-gallery-2', inputId: 'photo-input-gallery-2', altKey: 'photoAltGallery' },
    { slotId: 'photo-gallery-3', inputId: 'photo-input-gallery-3', altKey: 'photoAltGallery' },
    { slotId: 'photo-gallery-4', inputId: 'photo-input-gallery-4', altKey: 'photoAltGallery' },
  ]);

  function isValidFile(file) {
    return ALLOWED_TYPES.includes(file.type) && file.size <= MAX_SIZE_BYTES;
  }

  // Cada chamada isola sua própria object URL, sem vazar estado global.
  function createPhotoSlotPreview({ slot, input, altKey }) {
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
      img.alt = i18nText(altKey);
      img.className = 'photo-slot__img';
      slot.appendChild(img);
      slot.dataset.empty = 'false';
    }

    function handleChange(event) {
      const [file] = event.target.files;
      if (!file) return;

      if (!isValidFile(file)) {
        window.alert(i18nText('photoBadFile'));
        input.value = '';
        return;
      }

      render(file);
    }

    input.addEventListener('change', handleChange);
    window.addEventListener('pagehide', revokePreviousUrl);
  }

  SLOT_PAIRS.forEach(({ slotId, inputId, altKey }) => {
    const slot = document.getElementById(slotId);
    const input = document.getElementById(inputId);
    if (slot && input) {
      createPhotoSlotPreview({ slot, input, altKey });
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