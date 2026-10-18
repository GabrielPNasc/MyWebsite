// Idioma da interface: o HTML ja e escrito em ingles, que e o padrao e tambem
// o fallback — se o navegador pede um idioma sem traducao, nada e trocado e a
// pagina continua em ingles. Na primeira visita o idioma vem da preferencia do
// navegador (navigator.language); depois disso vale a escolha feita no seletor
// de idioma (localStorage). Para acrescentar um idioma: uma chave em HTML_TEXT
// (textos do HTML), uma em JS_TEXT (textos que so existem no JS), o codigo em
// LANG_TAGS e a opcao no menu do index.html.
const I18N_FALLBACK = 'en';

const HTML_TEXT = {
  pt: {
    'meta.description': 'Gabriel Nascimento — Estudante de Ciência da Computação, Java + Spring Boot, Python.',
    'nav.social': 'Redes sociais',
    'nav.sections': 'Seções da página',
    'action.theme': 'Alternar tema claro/escuro',
    'action.language': 'Escolher idioma',
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
  es: {
    'meta.description': 'Gabriel Nascimento — Estudiante de Ciencias de la Computación, Java + Spring Boot, Python.',
    'nav.social': 'Redes sociales',
    'nav.sections': 'Secciones de la página',
    'action.theme': 'Cambiar tema claro/oscuro',
    'action.language': 'Elegir idioma',
    'sidebar.location': 'Recife, Pernambuco, Brasil',
    'sidebar.role': 'Estudiante de Ciencias de la Computación',
    'img.name': 'Foto de Gabriel Nascimento',
    'nav.about': 'Sobre mí',
    'nav.education': 'Formación',
    'nav.projects': 'Proyectos',
    'nav.certificates': 'Certificados',
    'about.title': 'Sobre mí',
    'about.text': 'Soy estudiante de Ciencias de la Computación, enfocado en construir aplicaciones completas aplicando arquitectura en capas y buenas prácticas de código. Mi principal logro hasta ahora es haber desarrollado aplicaciones funcionales desde cero, evolucionando constantemente en lógica, programación orientada a objetos y control de versiones con Git. Me mueven los desafíos, el aprendizaje continuo y la búsqueda de soluciones limpias, organizadas y escalables.',
    'education.title': 'Formación',
    'education.course': 'Ciencias de la Computación',
    'education.tags': 'Gestión de personas · Python',
    'projects.title': 'Proyectos',
    'projects.prev': 'Proyecto anterior',
    'projects.next': 'Proyecto siguiente',
    'projects.stack': 'Tecnologías usadas',
    'projects.qrcode.title': 'Generador de código QR',
    'projects.qrcode.text': 'API REST que recibe un enlace, lo procesa y devuelve el código QR en PNG al instante. El aprendizaje central fue integrar Spring Boot con JavaScript puro y entender a fondo el envío y la representación de archivos de imagen por HTTP.',
    'projects.qrcode.link': 'Ver el repositorio Generador de código QR en GitHub',
    'projects.motion.title': 'Sistema de detección de movimiento',
    'projects.motion.text': 'Vigila la ventana elegida según la cantidad de píxeles alterados entre fotogramas. Al detectar movimiento, emite una alerta sonora y envía automáticamente por WhatsApp una imagen con la hora en que ocurrió.',
    'projects.motion.link': 'Ver el repositorio Sistema de detección de movimiento en GitHub',
    'projects.login.title': 'API de sistema de inicio de sesión',
    'projects.login.text': 'Sistema de autenticación para el registro y el inicio de sesión de usuarios mediante una API: recibe y valida las credenciales y se comunica con la base de datos.',
    'projects.login.link': 'Ver el repositorio API de sistema de inicio de sesión en GitHub',
    'certs.title': 'Certificados',
    'certs.java.title': 'Java Completo — Programación Orientada a Objetos + Proyectos',
    'certs.java.date': 'mar 2026',
    'certs.python.date': 'sep 2026',
    'certs.scrum.title': 'Gestión ágil de proyectos con Scrum y Kanban',
    'certs.scrum.date': 'ago 2026',
    'footer.title': 'Hablemos',
    'footer.text': 'Busco mejorar cada día, el tiempo pasa y no puedo quedarme atrás.',
  },
  ja: {
    'meta.description': 'Gabriel Nascimento — コンピュータサイエンス専攻、Java + Spring Boot、Python。',
    'nav.social': 'ソーシャルネットワーク',
    'nav.sections': 'ページ内のセクション',
    'action.theme': 'ライト/ダークテーマを切り替える',
    'action.language': '言語を選択',
    'sidebar.location': 'ブラジル・ペルナンブコ州レシフェ',
    'sidebar.role': 'コンピュータサイエンス専攻',
    'img.name': 'Gabriel Nascimento の写真',
    'nav.about': '自己紹介',
    'nav.education': '学歴',
    'nav.projects': 'プロジェクト',
    'nav.certificates': '認定証',
    'about.title': '自己紹介',
    'about.text': '私はコンピュータサイエンスを専攻し、レイヤードアーキテクチャと適切なコーディング手法を取り入れた、完成度の高いアプリケーションの開発に取り組んでいます。これまでの主な成果は、実用的なアプリケーションをゼロから開発したことです。論理思考、オブジェクト指向、Git によるバージョン管理を継続的に伸ばしてきました。私は挑戦、継続的な学習、そしてクリーンで整理された拡張性の高いソリューションを追求することを原動力としています。',
    'education.title': '学歴',
    'education.course': 'コンピュータサイエンス',
    'education.tags': 'ピープルマネジメント · Python',
    'projects.title': 'プロジェクト',
    'projects.prev': '前のプロジェクト',
    'projects.next': '次のプロジェクト',
    'projects.stack': '使用技術',
    'projects.qrcode.title': 'QR コードジェネレーター',
    'projects.qrcode.text': 'リンクを受け取り、処理して QR コードを PNG で即座に返す REST API です。Spring Boot と素の JavaScript を連携させ、HTTP 経由で画像ファイルを送信・描画する仕組みを深く理解することが中心的な学びでした。',
    'projects.qrcode.link': 'GitHub で QR コードジェネレーターのリポジトリを見る',
    'projects.motion.title': '動体検知システム',
    'projects.motion.text': 'フレーム間で変化したピクセル数をもとに、選んだウィンドウを監視します。動きを検知すると音声アラートを鳴らし、発生した時刻を示す画像を WhatsApp で自動送信します。',
    'projects.motion.link': 'GitHub で動体検知システムのリポジトリを見る',
    'projects.login.title': 'ログインシステム API',
    'projects.login.text': 'API を通じてユーザーの登録とログインを行う認証システムです。認証情報を受け取って検証し、データベースとの通信を行います。',
    'projects.login.link': 'GitHub でログインシステム API のリポジトリを見る',
    'certs.title': '認定証',
    'certs.java.title': 'Java 完全版 — オブジェクト指向プログラミング + プロジェクト',
    'certs.java.date': '2026年3月',
    'certs.python.date': '2026年9月',
    'certs.scrum.title': 'Scrum と Kanban によるアジャイルプロジェクト管理',
    'certs.scrum.date': '2026年8月',
    'footer.title': '話しましょう',
    'footer.text': '毎日成長したいと考えています。時間は過ぎていくので、後れを取るわけにはいきません。',
  },
  fr: {
    'meta.description': 'Gabriel Nascimento — Étudiant en informatique, Java + Spring Boot, Python.',
    'nav.social': 'Réseaux sociaux',
    'nav.sections': 'Sections de la page',
    'action.theme': 'Basculer le thème clair/sombre',
    'action.language': 'Choisir la langue',
    'sidebar.location': 'Recife, Pernambuco, Brésil',
    'sidebar.role': 'Étudiant en informatique',
    'img.name': 'Photo de Gabriel Nascimento',
    'nav.about': 'À propos',
    'nav.education': 'Formation',
    'nav.projects': 'Projets',
    'nav.certificates': 'Certificats',
    'about.title': 'À propos',
    'about.text': 'Je suis étudiant en informatique, concentré sur la création d’applications complètes en appliquant une architecture en couches et de bonnes pratiques de code. Ma principale réussite jusqu’à présent est d’avoir développé des applications fonctionnelles de zéro, en progressant constamment en logique, en programmation orientée objet et en gestion de versions avec Git. Je suis motivé par les défis, l’apprentissage continu et la recherche de solutions propres, organisées et évolutives.',
    'education.title': 'Formation',
    'education.course': 'Informatique',
    'education.tags': 'Gestion des personnes · Python',
    'projects.title': 'Projets',
    'projects.prev': 'Projet précédent',
    'projects.next': 'Projet suivant',
    'projects.stack': 'Technologies utilisées',
    'projects.qrcode.title': 'Générateur de QR Code',
    'projects.qrcode.text': 'Une API REST qui reçoit un lien, le traite et renvoie le QR Code en PNG immédiatement. L’apprentissage clé a été d’intégrer Spring Boot avec du JavaScript pur et de comprendre en profondeur l’envoi et l’affichage de fichiers image via HTTP.',
    'projects.qrcode.link': 'Voir le dépôt Générateur de QR Code sur GitHub',
    'projects.motion.title': 'Système de détection de mouvement',
    'projects.motion.text': 'Surveille la fenêtre choisie selon le nombre de pixels modifiés entre les images. Lorsqu’un mouvement est détecté, il émet une alerte sonore et envoie automatiquement par WhatsApp une image indiquant l’heure à laquelle il s’est produit.',
    'projects.motion.link': 'Voir le dépôt Système de détection de mouvement sur GitHub',
    'projects.login.title': 'API de système de connexion',
    'projects.login.text': 'Système d’authentification pour l’inscription et la connexion des utilisateurs via une API : il reçoit et valide les identifiants et assure la communication avec la base de données.',
    'projects.login.link': 'Voir le dépôt API de système de connexion sur GitHub',
    'certs.title': 'Certificats',
    'certs.java.title': 'Java Complet — Programmation Orientée Objet + Projets',
    'certs.java.date': 'mars 2026',
    'certs.python.date': 'sept 2026',
    'certs.scrum.title': 'Gestion de projet agile avec Scrum et Kanban',
    'certs.scrum.date': 'août 2026',
    'footer.title': 'Discutons',
    'footer.text': 'Je cherche à m’améliorer chaque jour, le temps passe et je ne peux pas rester à la traîne.',
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
  es: {
    photoBadFile: 'Usa una imagen PNG, JPEG o WEBP de hasta 5MB.',
    photoAltMain: 'Foto de Gabriel Nascimento',
    photoAltAbout: 'Foto de contexto — Sobre mí',
    photoAltGallery: 'Foto de la galería',
  },
  ja: {
    photoBadFile: 'PNG・JPEG・WEBP の画像を 5MB まで使用できます。',
    photoAltMain: 'Gabriel Nascimento の写真',
    photoAltAbout: 'コンテキスト写真 — 自己紹介',
    photoAltGallery: 'ギャラリーの写真',
  },
  fr: {
    photoBadFile: 'Utilisez une image PNG, JPEG ou WEBP jusqu’à 5 Mo.',
    photoAltMain: 'Photo de Gabriel Nascimento',
    photoAltAbout: 'Photo de contexte — À propos',
    photoAltGallery: 'Photo de la galerie',
  },
};

// Idiomas com traducao (o ingles e o padrao, entao nao entra nesta lista).
const I18N_LANGUAGES = Object.freeze(Object.keys(HTML_TEXT));

// Codigo de idioma usado no atributo lang do <html>.
const LANG_TAGS = Object.freeze({ en: 'en', pt: 'pt-BR', es: 'es', ja: 'ja', fr: 'fr' });

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
  const picker = document.getElementById('lang-picker');
  const menu = document.getElementById('lang-menu');

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

  function isSupported(lang) {
    return lang === I18N_FALLBACK || I18N_LANGUAGES.includes(lang);
  }

  // O idioma sai nesta ordem:
  //   1) ?lang=en / ?lang=pt na URL (para testar e para compartilhar link)
  //   2) a escolha feita no botao, salva no navegador
  //   3) o idioma que o proprio navegador informa (navigator.language)
  function forcedLanguage() {
    const forced = normalize(new URLSearchParams(window.location.search).get('lang'));
    return isSupported(forced) ? forced : '';
  }

  function savedLanguage() {
    const saved = normalize(localStorage.getItem('lang'));
    return isSupported(saved) ? saved : '';
  }

  // O navegador ja entrega a preferencia de idioma da pessoa — ela nao precisa
  // configurar nada no site, igual ao tema. Usamos so a primeira preferencia:
  // se ela nao tiver traducao, o site fica no padrao (ingles). Nao descemos a
  // lista atras de outro idioma — um navegador em japones que tenha portugues
  // mais abaixo terminaria em portugues, e nao no padrao.
  function browserLanguage() {
    const primary = normalize(navigator.language || (navigator.languages || [])[0]);
    return isSupported(primary) ? primary : I18N_FALLBACK;
  }

  function detectLanguage() {
    return forcedLanguage() || savedLanguage() || browserLanguage();
  }

  // O botao mostra o codigo do idioma ativo; o rotulo/titulo (traduzido) vem do
  // data-i18n do proprio botao. A opcao ativa fica marcada no menu.
  function updatePicker(lang) {
    if (button) {
      const code = button.querySelector('.lang-toggle__code');
      if (code) code.textContent = lang.toUpperCase();
    }

    if (!menu) return;
    menu.querySelectorAll('[data-lang]').forEach((option) => {
      if (option.dataset.lang === lang) option.setAttribute('aria-current', 'true');
      else option.removeAttribute('aria-current');
    });
  }

  function openMenu() {
    if (!menu || !button) return;
    menu.hidden = false;
    button.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    if (!menu || !button) return;
    menu.hidden = true;
    button.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    if (!menu) return;
    if (menu.hidden) openMenu(); else closeMenu();
  }

  // Escolha manual: fica salva e passa a valer sobre a preferencia do navegador.
  function chooseLanguage(lang) {
    if (!isSupported(lang)) return;

    localStorage.setItem('lang', lang);
    // se o idioma tinha sido forcado pela URL, a escolha manual passa a mandar
    if (new URLSearchParams(window.location.search).has('lang')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.hash);
    }

    apply(lang);
    closeMenu();
    if (button) button.focus();
  }

  function apply(lang) {
    i18nLang = lang;
    root.lang = LANG_TAGS[lang] || lang;

    const table = HTML_TEXT[lang] || {};
    bindings.forEach((binding) => {
      binding.apply(binding.el, table[binding.key] || binding.base);
    });

    updatePicker(lang);
  }

  const bindings = collectBindings();

  if (button) {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleMenu();
    });
  }

  if (menu) {
    menu.addEventListener('click', (event) => {
      const option = event.target.closest('[data-lang]');
      if (option) chooseLanguage(option.dataset.lang);
    });
  }

  // Fecha ao clicar fora ou com Esc.
  document.addEventListener('click', (event) => {
    if (!menu || menu.hidden) return;
    if (picker && picker.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !menu || menu.hidden) return;
    closeMenu();
    if (button) button.focus();
  });

  // Mesma ideia do tema: se a pessoa nao escolheu no botao, o site acompanha a
  // preferencia do navegador quando ela muda.
  window.addEventListener('languagechange', () => {
    if (forcedLanguage() || savedLanguage()) return;
    apply(browserLanguage());
  });

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