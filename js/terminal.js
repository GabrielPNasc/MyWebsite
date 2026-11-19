// Terminal interativo da pagina terminal.html. Todo o conteudo e escrito com
// textContent / elementos criados via DOM (nada de innerHTML), e os links
// vem de uma lista fixa aqui dentro. O idioma acompanha o <html lang>, que o
// main.js atualiza quando a pessoa troca no seletor. Carregar DEPOIS do main.js.
(function Terminal() {
  'use strict';

  const out = document.getElementById('tty-out');
  const input = document.getElementById('tty-input');
  const screen = document.getElementById('tty-screen');
  const chips = document.getElementById('tty-chips');
  if (!out || !input || !screen) return;

  const EMAIL = 'dev.gabrielnasc@gmail.com';

  const LINKS = {
    github: { label: 'GitHub', url: 'https://github.com/GabrielPNasc', handle: 'GabrielPNasc' },
    linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/gabrielpnasc/', handle: 'in/gabrielpnasc' },
    youtube: { label: 'YouTube', url: 'https://www.youtube.com/channel/UCG4u3sJ6aSnnqwG2Y7sokSA', handle: 'channel' },
    instagram: { label: 'Instagram', url: 'https://www.instagram.com/pires.dev/', handle: 'pires.dev' },
  };

  const REPOS = [
    'https://github.com/GabrielPNasc/Gerador-de-QRCode',
    'https://github.com/GabrielPNasc/Sistema-de-Detectacao-de-movimento',
    'https://github.com/GabrielPNasc/API_system_login',
  ];

  const LANGS = ['pt', 'en', 'es', 'fr', 'ja'];
  const LOCALES = { pt: 'pt-BR', en: 'en-US', es: 'es', fr: 'fr', ja: 'ja' };
  const FILES = {
    'about.txt': 'about',
    'role.txt': 'role',
    'stack.txt': 'stack',
    'projects.txt': 'projects',
    'certs.txt': 'certs',
    'contact.txt': 'contact',
  };
  const COMMANDS = [
    'help', 'about', 'stack', 'projects', 'certs', 'contact', 'ls', 'cat', 'whoami',
    'pwd', 'neofetch', 'theme', 'lang', 'open', 'date', 'echo', 'history', 'clear',
    'exit', 'sudo', 'cd',
  ];
  const ARG_POOL = {
    cat: Object.keys(FILES),
    theme: ['dark', 'light'],
    lang: LANGS,
    open: ['github', 'linkedin', 'youtube', 'instagram', 'email'],
  };

  const TEXT = {
    en: {
      welcome: 'Welcome to gabriel$ — an interactive terminal.',
      hint: 'Type help to see the commands. Tab completes, ↑ and ↓ browse the history.',
      helpTitle: 'Available commands:',
      help: {
        help: 'show this list', about: 'who I am', stack: 'languages and tools',
        projects: 'my projects', certs: 'certificates', contact: 'email and social links',
        ls: 'list files', cat: 'show a file (cat about.txt)', whoami: 'who is logged in',
        neofetch: 'quick summary', theme: 'dark or light (theme dark)',
        lang: 'change language (lang pt)', open: 'open a link (open github)',
        date: 'current date and time', echo: 'repeat text', history: 'previous commands',
        clear: 'clean the screen', exit: 'back to the main site',
      },
      about: [
        "I'm Gabriel, a Computer Science student at CESAR School, in Recife.",
        'I build complete applications with layered architecture and clean code, mostly in Java with Spring Boot and in Python.',
      ],
      role: 'Computer Science student',
      location: 'Recife, Pernambuco, Brazil',
      stackTitle: 'Stack:',
      stack: ['Java · Spring Boot · REST APIs', 'Python · OpenCV · Selenium', 'Git · GitHub'],
      projectsTitle: 'Projects:',
      projects: [
        ['QR Code Generator', 'REST API that turns a link into a QR Code PNG.'],
        ['Motion Detection System', 'Detects movement in a window and sends an alert on WhatsApp.'],
        ['Login System API', 'Sign-up and login through an API, with a database.'],
      ],
      certsTitle: 'Certificates:',
      certs: [
        ['Mar 2026', 'Complete Java — OOP + Projects', 'Udemy'],
        ['Sep 2026', 'Python', 'Santander Open Academy'],
        ['Aug 2026', 'Agile project management with Scrum and Kanban', 'Senac Brasil'],
      ],
      contactTitle: "Let's talk:",
      notFound: (c) => `${c}: command not found. Type help.`,
      catUsage: 'Usage: cat <file>',
      noFile: (f) => `cat: ${f}: no such file. Try ls.`,
      sudo: 'gabriel is not in the sudoers file. This incident will be reported.',
      hire: 'Access granted. Say hi:',
      themeUsage: 'Usage: theme dark | light',
      themeSet: (t) => `Theme set to ${t}.`,
      langUsage: 'Usage: lang pt | en | es | fr | ja',
      langSet: (l) => `Language set to ${l}.`,
      openUsage: 'Usage: open github | linkedin | youtube | instagram | email',
      opening: (x) => `Opening ${x}...`,
      cd: 'This is a static terminal. Use ls and cat.',
      exit: 'Bye! Going back to the main site...',
      historyEmpty: 'No commands yet.',
      nf: { role: 'Role', where: 'Location', stack: 'Stack', school: 'School', mail: 'Contact' },
      school: 'CESAR School (2026 — 2030)',
    },
    pt: {
      welcome: 'Bem-vindo ao gabriel$ — um terminal interativo.',
      hint: 'Digite help para ver os comandos. Tab completa e ↑ ↓ navegam pelo histórico.',
      helpTitle: 'Comandos disponíveis:',
      help: {
        help: 'mostra esta lista', about: 'quem sou eu', stack: 'linguagens e ferramentas',
        projects: 'meus projetos', certs: 'certificados', contact: 'e-mail e redes',
        ls: 'lista os arquivos', cat: 'mostra um arquivo (cat about.txt)', whoami: 'quem está logado',
        neofetch: 'resumo rápido', theme: 'escuro ou claro (theme dark)',
        lang: 'troca o idioma (lang pt)', open: 'abre um link (open github)',
        date: 'data e hora', echo: 'repete o texto', history: 'comandos anteriores',
        clear: 'limpa a tela', exit: 'volta ao site',
      },
      about: [
        'Sou o Gabriel, estudante de Ciência da Computação na CESAR School, em Recife.',
        'Construo aplicações completas com arquitetura em camadas e código limpo, principalmente em Java com Spring Boot e em Python.',
      ],
      role: 'Estudante de Ciência da Computação',
      location: 'Recife, Pernambuco, Brasil',
      stackTitle: 'Stack:',
      stack: ['Java · Spring Boot · APIs REST', 'Python · OpenCV · Selenium', 'Git · GitHub'],
      projectsTitle: 'Projetos:',
      projects: [
        ['Gerador de QR Code', 'API REST que transforma um link em um QR Code PNG.'],
        ['Sistema de Detecção de Movimento', 'Detecta movimento em uma janela e envia alerta pelo WhatsApp.'],
        ['API de Sistema de Login', 'Cadastro e login de usuários por API, com banco de dados.'],
      ],
      certsTitle: 'Certificados:',
      certs: [
        ['mar 2026', 'Java Completo — POO + Projetos', 'Udemy'],
        ['set 2026', 'Python', 'Santander Open Academy'],
        ['ago 2026', 'Gestão ágil de projetos com Scrum e Kanban', 'Senac Brasil'],
      ],
      contactTitle: 'Vamos conversar:',
      notFound: (c) => `${c}: comando não encontrado. Digite help.`,
      catUsage: 'Uso: cat <arquivo>',
      noFile: (f) => `cat: ${f}: arquivo não encontrado. Tente ls.`,
      sudo: 'gabriel não está no arquivo sudoers. Este incidente será reportado.',
      hire: 'Acesso liberado. Mande um oi:',
      themeUsage: 'Uso: theme dark | light',
      themeSet: (t) => `Tema: ${t}.`,
      langUsage: 'Uso: lang pt | en | es | fr | ja',
      langSet: (l) => `Idioma: ${l}.`,
      openUsage: 'Uso: open github | linkedin | youtube | instagram | email',
      opening: (x) => `Abrindo ${x}...`,
      cd: 'Este é um terminal estático. Use ls e cat.',
      exit: 'Tchau! Voltando ao site...',
      historyEmpty: 'Nenhum comando ainda.',
      nf: { role: 'Cargo', where: 'Local', stack: 'Stack', school: 'Faculdade', mail: 'Contato' },
      school: 'CESAR School (2026 — 2030)',
    },
    es: {
      welcome: 'Bienvenido a gabriel$ — una terminal interactiva.',
      hint: 'Escribe help para ver los comandos. Tab completa y ↑ ↓ recorren el historial.',
      helpTitle: 'Comandos disponibles:',
      help: {
        help: 'muestra esta lista', about: 'quién soy', stack: 'lenguajes y herramientas',
        projects: 'mis proyectos', certs: 'certificados', contact: 'correo y redes',
        ls: 'lista los archivos', cat: 'muestra un archivo (cat about.txt)', whoami: 'quién está conectado',
        neofetch: 'resumen rápido', theme: 'oscuro o claro (theme dark)',
        lang: 'cambia el idioma (lang pt)', open: 'abre un enlace (open github)',
        date: 'fecha y hora', echo: 'repite el texto', history: 'comandos anteriores',
        clear: 'limpia la pantalla', exit: 'vuelve al sitio',
      },
      about: [
        'Soy Gabriel, estudiante de Ciencias de la Computación en CESAR School, en Recife.',
        'Construyo aplicaciones completas con arquitectura en capas y código limpio, sobre todo en Java con Spring Boot y en Python.',
      ],
      role: 'Estudiante de Ciencias de la Computación',
      location: 'Recife, Pernambuco, Brasil',
      stackTitle: 'Stack:',
      stack: ['Java · Spring Boot · APIs REST', 'Python · OpenCV · Selenium', 'Git · GitHub'],
      projectsTitle: 'Proyectos:',
      projects: [
        ['Generador de código QR', 'API REST que convierte un enlace en un código QR PNG.'],
        ['Sistema de detección de movimiento', 'Detecta movimiento en una ventana y envía una alerta por WhatsApp.'],
        ['API de sistema de inicio de sesión', 'Registro e inicio de sesión por API, con base de datos.'],
      ],
      certsTitle: 'Certificados:',
      certs: [
        ['mar 2026', 'Java Completo — POO + Proyectos', 'Udemy'],
        ['sep 2026', 'Python', 'Santander Open Academy'],
        ['ago 2026', 'Gestión ágil de proyectos con Scrum y Kanban', 'Senac Brasil'],
      ],
      contactTitle: 'Hablemos:',
      notFound: (c) => `${c}: comando no encontrado. Escribe help.`,
      catUsage: 'Uso: cat <archivo>',
      noFile: (f) => `cat: ${f}: archivo no encontrado. Prueba ls.`,
      sudo: 'gabriel no está en el archivo sudoers. Este incidente será reportado.',
      hire: 'Acceso concedido. Saluda:',
      themeUsage: 'Uso: theme dark | light',
      themeSet: (t) => `Tema: ${t}.`,
      langUsage: 'Uso: lang pt | en | es | fr | ja',
      langSet: (l) => `Idioma: ${l}.`,
      openUsage: 'Uso: open github | linkedin | youtube | instagram | email',
      opening: (x) => `Abriendo ${x}...`,
      cd: 'Esta es una terminal estática. Usa ls y cat.',
      exit: '¡Chao! Volviendo al sitio...',
      historyEmpty: 'Aún no hay comandos.',
      nf: { role: 'Rol', where: 'Lugar', stack: 'Stack', school: 'Universidad', mail: 'Contacto' },
      school: 'CESAR School (2026 — 2030)',
    },
    fr: {
      welcome: 'Bienvenue sur gabriel$ — un terminal interactif.',
      hint: 'Tape help pour voir les commandes. Tab complète, ↑ et ↓ parcourent l’historique.',
      helpTitle: 'Commandes disponibles :',
      help: {
        help: 'affiche cette liste', about: 'qui je suis', stack: 'langages et outils',
        projects: 'mes projets', certs: 'certificats', contact: 'e-mail et réseaux',
        ls: 'liste les fichiers', cat: 'affiche un fichier (cat about.txt)', whoami: 'qui est connecté',
        neofetch: 'résumé rapide', theme: 'sombre ou clair (theme dark)',
        lang: 'change la langue (lang pt)', open: 'ouvre un lien (open github)',
        date: 'date et heure', echo: 'répète le texte', history: 'commandes précédentes',
        clear: 'efface l’écran', exit: 'retour au site',
      },
      about: [
        'Je suis Gabriel, étudiant en informatique à CESAR School, à Recife.',
        'Je crée des applications complètes avec une architecture en couches et du code propre, surtout en Java avec Spring Boot et en Python.',
      ],
      role: 'Étudiant en informatique',
      location: 'Recife, Pernambuco, Brésil',
      stackTitle: 'Stack :',
      stack: ['Java · Spring Boot · APIs REST', 'Python · OpenCV · Selenium', 'Git · GitHub'],
      projectsTitle: 'Projets :',
      projects: [
        ['Générateur de QR Code', 'API REST qui transforme un lien en QR Code PNG.'],
        ['Système de détection de mouvement', 'Détecte un mouvement dans une fenêtre et envoie une alerte sur WhatsApp.'],
        ['API de système de connexion', 'Inscription et connexion via une API, avec base de données.'],
      ],
      certsTitle: 'Certificats :',
      certs: [
        ['mars 2026', 'Java Complet — POO + Projets', 'Udemy'],
        ['sept 2026', 'Python', 'Santander Open Academy'],
        ['août 2026', 'Gestion de projet agile avec Scrum et Kanban', 'Senac Brasil'],
      ],
      contactTitle: 'Discutons :',
      notFound: (c) => `${c} : commande introuvable. Tape help.`,
      catUsage: 'Usage : cat <fichier>',
      noFile: (f) => `cat : ${f} : fichier introuvable. Essaie ls.`,
      sudo: 'gabriel ne figure pas dans le fichier sudoers. Cet incident sera signalé.',
      hire: 'Accès accordé. Dis bonjour :',
      themeUsage: 'Usage : theme dark | light',
      themeSet: (t) => `Thème : ${t}.`,
      langUsage: 'Usage : lang pt | en | es | fr | ja',
      langSet: (l) => `Langue : ${l}.`,
      openUsage: 'Usage : open github | linkedin | youtube | instagram | email',
      opening: (x) => `Ouverture de ${x}...`,
      cd: 'Ceci est un terminal statique. Utilise ls et cat.',
      exit: 'À bientôt ! Retour au site...',
      historyEmpty: 'Aucune commande pour le moment.',
      nf: { role: 'Rôle', where: 'Lieu', stack: 'Stack', school: 'École', mail: 'Contact' },
      school: 'CESAR School (2026 — 2030)',
    },
    ja: {
      welcome: 'gabriel$ へようこそ — インタラクティブなターミナルです。',
      hint: 'help でコマンド一覧を表示します。Tab で補完、↑ ↓ で履歴を移動できます。',
      helpTitle: '使えるコマンド:',
      help: {
        help: 'この一覧を表示', about: '自己紹介', stack: '言語とツール',
        projects: 'プロジェクト', certs: '認定証', contact: 'メールとSNS',
        ls: 'ファイル一覧', cat: 'ファイルを表示 (cat about.txt)', whoami: 'ログイン中のユーザー',
        neofetch: '簡単な概要', theme: 'ダーク/ライト (theme dark)',
        lang: '言語を変更 (lang pt)', open: 'リンクを開く (open github)',
        date: '現在の日時', echo: 'テキストを繰り返す', history: '過去のコマンド',
        clear: '画面を消去', exit: 'サイトに戻る',
      },
      about: [
        'Gabriel です。レシフェの CESAR School でコンピュータサイエンスを学んでいます。',
        'レイヤードアーキテクチャとクリーンなコードで、主に Java（Spring Boot）と Python を使い、完成度の高いアプリを作っています。',
      ],
      role: 'コンピュータサイエンス専攻',
      location: 'ブラジル・ペルナンブコ州レシフェ',
      stackTitle: 'スタック:',
      stack: ['Java · Spring Boot · REST API', 'Python · OpenCV · Selenium', 'Git · GitHub'],
      projectsTitle: 'プロジェクト:',
      projects: [
        ['QR コードジェネレーター', 'リンクを QR コードの PNG に変換する REST API。'],
        ['動体検知システム', 'ウィンドウ内の動きを検知し、WhatsApp で通知します。'],
        ['ログインシステム API', 'API による登録とログイン。データベース連携あり。'],
      ],
      certsTitle: '認定証:',
      certs: [
        ['2026年3月', 'Java 完全版 — OOP + プロジェクト', 'Udemy'],
        ['2026年9月', 'Python', 'Santander Open Academy'],
        ['2026年8月', 'Scrum と Kanban によるアジャイルプロジェクト管理', 'Senac Brasil'],
      ],
      contactTitle: '話しましょう:',
      notFound: (c) => `${c}: コマンドが見つかりません。help と入力してください。`,
      catUsage: '使い方: cat <ファイル>',
      noFile: (f) => `cat: ${f}: ファイルがありません。ls を試してください。`,
      sudo: 'gabriel は sudoers に登録されていません。この件は報告されます。',
      hire: 'アクセス許可。ぜひ連絡してください:',
      themeUsage: '使い方: theme dark | light',
      themeSet: (t) => `テーマ: ${t}`,
      langUsage: '使い方: lang pt | en | es | fr | ja',
      langSet: (l) => `言語: ${l}`,
      openUsage: '使い方: open github | linkedin | youtube | instagram | email',
      opening: (x) => `${x} を開いています...`,
      cd: 'これは静的なターミナルです。ls と cat を使ってください。',
      exit: 'またね！サイトに戻ります...',
      historyEmpty: 'まだコマンドがありません。',
      nf: { role: '役割', where: '場所', stack: 'スタック', school: '学校', mail: '連絡先' },
      school: 'CESAR School（2026 — 2030）',
    },
  };

  // ---------- helpers ----------
  function langCode() {
    const code = String(document.documentElement.lang || 'en').toLowerCase().split('-')[0];
    return TEXT[code] ? code : 'en';
  }

  function L() {
    return TEXT[langCode()];
  }

  // parts: string | {text, cls} | {text, href}  (ou um array deles)
  function addLine(parts) {
    const p = document.createElement('p');
    p.className = 'tty__line';
    const list = Array.isArray(parts) ? parts : [parts];
    list.forEach((part) => {
      if (typeof part === 'string') {
        p.append(part);
      } else if (part.href) {
        const a = document.createElement('a');
        a.href = part.href;
        a.textContent = part.text;
        if (!part.href.startsWith('mailto:')) {
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
        }
        p.append(a);
      } else {
        const s = document.createElement('span');
        s.className = part.cls || '';
        s.textContent = part.text;
        p.append(s);
      }
    });
    if (!p.childNodes.length) p.append('\u00a0');
    out.append(p);
  }

  function blank() { addLine('\u00a0'); }
  function acc(text) { return { text, cls: 't-acc' }; }
  function dim(text) { return { text, cls: 't-dim' }; }
  function amb(text) { return { text, cls: 't-amb' }; }
  function ink(text) { return { text, cls: 't-ink' }; }

  function scrollDown() {
    screen.scrollTop = screen.scrollHeight;
  }

  function echoCommand(text) {
    addLine([acc('$ '), ink(text)]);
  }

  function currentTheme() {
    const root = document.documentElement;
    return root.dataset.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  // ---------- comandos ----------
  const handlers = {
    help() {
      const t = L();
      addLine(amb(t.helpTitle));
      ['help', 'about', 'stack', 'projects', 'certs', 'contact', 'ls', 'cat', 'neofetch',
        'theme', 'lang', 'open', 'whoami', 'date', 'echo', 'history', 'clear', 'exit'].forEach((name) => {
        addLine(['  ', acc(name.padEnd(10)), dim(t.help[name])]);
      });
    },

    about() {
      L().about.forEach((line) => addLine(line));
    },

    role() {
      addLine(L().role);
    },

    stack() {
      const t = L();
      addLine(amb(t.stackTitle));
      t.stack.forEach((line) => addLine(['  ', acc('#'), ' ', line]));
    },

    projects() {
      const t = L();
      addLine(amb(t.projectsTitle));
      t.projects.forEach((item, i) => {
        blank();
        addLine(['  ', acc(item[0])]);
        addLine(['  ', dim(item[1])]);
        addLine(['  ', { text: REPOS[i].replace('https://', ''), href: REPOS[i] }]);
      });
    },

    certs() {
      const t = L();
      addLine(amb(t.certsTitle));
      t.certs.forEach((c) => {
        addLine(['  ', dim(c[0].padEnd(9)), ink(c[1]), dim(`  · ${c[2]}`)]);
      });
    },

    contact() {
      const t = L();
      addLine(amb(t.contactTitle));
      addLine(['  ', acc('Email'.padEnd(11)), { text: EMAIL, href: `mailto:${EMAIL}` }]);
      Object.keys(LINKS).forEach((key) => {
        const item = LINKS[key];
        addLine(['  ', acc(item.label.padEnd(11)), { text: item.handle, href: item.url }]);
      });
    },

    ls() {
      addLine(Object.keys(FILES).join('   '));
    },

    cat(args) {
      const t = L();
      if (!args.length) { addLine(amb(t.catUsage)); return; }
      const name = args[0].toLowerCase();
      if (!FILES[name]) { addLine(amb(t.noFile(args[0]))); return; }
      handlers[FILES[name]]();
    },

    whoami() {
      addLine('gabriel');
    },

    pwd() {
      addLine(L().location);
    },

    neofetch() {
      const t = L();
      const nf = t.nf;
      const pad = 11;
      addLine([acc('gabriel'), dim('@'), acc('recife')]);
      addLine(dim('─────────────'));
      addLine([acc(nf.role.padEnd(pad)), t.role]);
      addLine([acc(nf.where.padEnd(pad)), t.location]);
      addLine([acc(nf.stack.padEnd(pad)), 'Java, Spring Boot, Python']);
      addLine([acc(nf.school.padEnd(pad)), t.school]);
      addLine([acc(nf.mail.padEnd(pad)), { text: EMAIL, href: `mailto:${EMAIL}` }]);
    },

    theme(args) {
      const t = L();
      const wanted = (args[0] || '').toLowerCase();
      if (args.length && wanted !== 'dark' && wanted !== 'light') { addLine(amb(t.themeUsage)); return; }
      const button = document.getElementById('theme-toggle');
      if (button && (!wanted || wanted !== currentTheme())) button.click();
      addLine(t.themeSet(currentTheme()));
    },

    lang(args) {
      const t = L();
      const wanted = (args[0] || '').toLowerCase();
      if (!LANGS.includes(wanted)) { addLine(amb(t.langUsage)); return; }
      const option = document.querySelector(`.lang-menu__btn[data-lang="${wanted}"]`);
      if (option) option.click();
      addLine(L().langSet(wanted));
    },

    open(args) {
      const t = L();
      const key = (args[0] || '').toLowerCase();
      if (key === 'email') {
        addLine(t.opening('email'));
        window.location.href = `mailto:${EMAIL}`;
        return;
      }
      const item = LINKS[key];
      if (!item) { addLine(amb(t.openUsage)); return; }
      addLine([t.opening(item.label), ' ', { text: item.url, href: item.url }]);
      window.open(item.url, '_blank', 'noopener,noreferrer');
    },

    date() {
      addLine(new Date().toLocaleString(LOCALES[langCode()] || 'en-US'));
    },

    echo(args) {
      addLine(args.join(' '));
    },

    history() {
      const t = L();
      if (!history.length) { addLine(dim(t.historyEmpty)); return; }
      history.forEach((cmd, i) => addLine([dim(String(i + 1).padStart(3) + '  '), cmd]));
    },

    clear() {
      out.textContent = '';
    },

    exit() {
      addLine(L().exit);
      setTimeout(() => { window.location.href = 'index.html'; }, 700);
    },

    cd() {
      addLine(amb(L().cd));
    },

    sudo(args) {
      const t = L();
      if (args.join(' ').toLowerCase() === 'hire gabriel') {
        addLine(t.hire);
        addLine(['  ', { text: EMAIL, href: `mailto:${EMAIL}` }]);
        return;
      }
      addLine(amb(t.sudo));
    },
  };

  // ---------- execucao ----------
  const history = [];
  let historyIndex = 0;

  function run(raw) {
    const line = raw.trim();
    echoCommand(raw);
    if (!line) { scrollDown(); return; }

    history.push(line);
    historyIndex = history.length;

    const tokens = line.split(/\s+/);
    const name = tokens[0].toLowerCase();
    const args = tokens.slice(1);

    if (name === 'clear') {
      handlers.clear();
    } else if (COMMANDS.includes(name) && handlers[name]) {
      handlers[name](args);
    } else {
      addLine(amb(L().notFound(tokens[0])));
    }
    scrollDown();
  }

  // ---------- autocompletar (Tab) ----------
  function complete() {
    const value = input.value;
    const parts = value.split(/\s+/);

    if (parts.length === 1) {
      const matches = COMMANDS.filter((c) => c.startsWith(parts[0].toLowerCase()));
      if (matches.length === 1) {
        input.value = `${matches[0]} `;
      } else if (matches.length > 1) {
        echoCommand(value);
        addLine(matches.join('   '));
        scrollDown();
      }
      return;
    }

    if (parts.length === 2) {
      const pool = ARG_POOL[parts[0].toLowerCase()];
      if (!pool) return;
      const matches = pool.filter((c) => c.startsWith(parts[1].toLowerCase()));
      if (matches.length === 1) {
        input.value = `${parts[0]} ${matches[0]} `;
      } else if (matches.length > 1) {
        echoCommand(value);
        addLine(matches.join('   '));
        scrollDown();
      }
    }
  }

  // ---------- eventos ----------
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = input.value;
      input.value = '';
      run(value);
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      complete();
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!history.length) return;
      historyIndex = Math.max(0, historyIndex - 1);
      input.value = history[historyIndex] || '';
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!history.length) return;
      historyIndex = Math.min(history.length, historyIndex + 1);
      input.value = history[historyIndex] || '';
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'l') {
      event.preventDefault();
      handlers.clear();
    }
  });

  // Clicar em qualquer ponto da tela foca o campo (sem atrapalhar selecao de texto ou links).
  screen.addEventListener('click', (event) => {
    if (event.target.closest('a')) return;
    const selection = window.getSelection();
    if (selection && String(selection).length) return;
    input.focus();
  });

  // Botoes de atalho (uteis no celular).
  if (chips) {
    chips.addEventListener('click', (event) => {
      const chip = event.target.closest('[data-cmd]');
      if (!chip) return;
      run(chip.dataset.cmd);
      if (!window.matchMedia('(pointer: coarse)').matches) input.focus();
    });
  }

  // ---------- abertura ----------
  const t0 = L();
  addLine(acc(t0.welcome));
  addLine(dim(t0.hint));
  blank();
  input.focus();
})();