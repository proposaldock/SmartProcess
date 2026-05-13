(function () {
  'use strict';

  var IMG      = (window.LJC && window.LJC.imgBase)   ? window.LJC.imgBase   : '';
  var AJAX_URL = (window.LJC && window.LJC.ajaxUrl)   ? window.LJC.ajaxUrl   : '';
  var NONCE    = (window.LJC && window.LJC.nonce)     ? window.LJC.nonce     : '';
  var AMELIA   = (window.LJC && window.LJC.ameliaUrl) ? window.LJC.ameliaUrl : '/boka/';
  // Strip stray typographic quotes (raw Unicode or %-encoded) that WP editor injects
  AMELIA = AMELIA.replace(/^(%[0-9A-Fa-f]{2})*[^a-zA-Z\/]*/g, function (m) {
    // Keep only if the match starts with a letter or slash (valid URL start)
    return '';
  });
  // Re-extract from first http(s):// or leading slash
  var _am = AMELIA.match(/(https?:\/\/.+|\/.*)/);
  if (_am) { AMELIA = _am[1]; }
  AMELIA = AMELIA.trim();
  var IMAGES   = (window.LJC && window.LJC.images)    ? window.LJC.images    : {};
  var WELCOME  = (window.LJC && window.LJC.welcome)   ? window.LJC.welcome   : {};
  var STRINGS       = (window.LJC && window.LJC.strings)   ? window.LJC.strings   : {};
  var PROF_OVERRIDE = (window.LJC && window.LJC.profiles)  ? window.LJC.profiles  : {};
  var RINGS_DATA    = (window.LJC && window.LJC.rings)      ? window.LJC.rings     : {};

  // Profile helper — merges admin overrides onto hardcoded defaults
  function getProf(key) {
    var base = PROFILES[key] || PROFILES.classic;
    var ov   = PROF_OVERRIDE[key] || {};
    return {
      name:     ov.name     || base.name,
      quote:    ov.quote    || base.quote,
      stone:    ov.stone    || base.stone,
      mounting: ov.mounting || base.mounting,
      prongs:   ov.prongs   || base.prongs,
      band:     ov.band     || base.band,
      metal:    ov.metal    || base.metal,
      carat:    ov.carat    || base.carat
    };
  }

  // String override helpers — returns admin value if set, null otherwise.
  // Shared questions are cloned with a path prefix (a_/b_/c_) so we fall back
  // to the un-prefixed base qid when no override exists for the clone id.
  function qStr(qid, field) {
    var v = STRINGS[qid + '_' + field];
    if (v !== undefined && v !== '') { return v; }
    var base = qid.replace(/^[a-c]_/, '');
    if (base !== qid) { v = STRINGS[base + '_' + field]; if (v !== undefined && v !== '') { return v; } }
    return null;
  }
  function oStr(qid, oid, field) {
    var v = STRINGS[qid + '_' + oid + '_' + field];
    if (v !== undefined && v !== '') { return v; }
    var base = qid.replace(/^[a-c]_/, '');
    if (base !== qid) { v = STRINGS[base + '_' + oid + '_' + field]; if (v !== undefined && v !== '') { return v; } }
    return null;
  }

  // ── Helpers ────────────────────────────────────────────────────────────────
  function el(id) { return document.getElementById(id); }
  function esc(s) { var d = document.createElement('div'); d.textContent = String(s == null ? '' : s); return d.innerHTML; }
  function forceStyle(node, styles) {
    if (!node) { return; }
    Object.keys(styles).forEach(function (p) { node.style.setProperty(p, styles[p], 'important'); });
  }

  // ── Snapshot helpers ──────────────────────────────────────────────────────
  function restoreSnapshot(n) {
    var snap = snapshots[n];
    if (!snap) { return; }
    questions   = snap.questions.slice();
    answers     = JSON.parse(JSON.stringify(snap.answers));
    snapshots   = snapshots.slice(0, n + 1);
    currentStep = n;
    renderQuestion(n);
  }

  function dotsHtml(activeIndex) {
    var total = snapshots.length;
    if (total <= 1) { return ''; }
    var out = '<div class="ljc-step-dots">';
    for (var i = 0; i < total; i++) {
      if (i === activeIndex) {
        out += '<span class="ljc-step-dot ljc-step-dot--active">' + (i + 1) + '</span>';
      } else if (i < activeIndex) {
        out += '<span class="ljc-step-dot ljc-step-dot--done" data-snap="' + i + '">' + (i + 1) + '</span>';
      }
    }
    out += '</div>';
    return out;
  }

  function startQuiz() {
    snapshots   = [{ step: 0, questions: questions.slice(), answers: JSON.parse(JSON.stringify(answers)) }];
    currentStep = 0;
    renderQuestion(0);
  }

  // Returns a media-library URL if uploaded in admin, otherwise falls back to plugin images/ folder
  function imgSrc(filename) {
    if (!filename) { return ''; }
    var key = filename.replace(/\.jpg$/i, '').replace(/-/g, '_');
    return IMAGES[key] || (IMG + filename);
  }
  function cloneQ(base, overrides) {
    var q = {}; Object.keys(base).forEach(function(k){ q[k] = base[k]; });
    if (overrides) { Object.keys(overrides).forEach(function(k){ q[k] = overrides[k]; }); }
    return q;
  }

  // ── Shared question blocks ─────────────────────────────────────────────────

  var Q_METAL = {
    id: 'metal', cols: 2, type: 'single',
    title: 'Vilket metall föredrar du?',
    subtitle: 'Se swatch-bilderna – välj det som talar till dig',
    options: [
      { id: 'yellowGold', label: 'Gult guld (18k)',    sub: 'Varmt, rikt, tidlöst',                       img: 'metal-yellow.jpg',   fallback: '🟡', scores: { 'MT:yellowGold': 5 } },
      { id: 'roseGold',   label: 'Roséguld (18k)', sub: 'Varmt, romantiskt, modern-vintage',              img: 'metal-rose.jpg',     fallback: '🌸', scores: { 'MT:roseGold': 5 } },
      { id: 'whiteGold',  label: 'Vitguld (18k)',      sub: 'Ljust, samtida, behöver omrhodning',         img: 'metal-white.jpg',    fallback: '⚪',       scores: { 'MT:whiteGold': 5 } },
      { id: 'platinum',   label: 'Platina',             sub: 'Hållbarast, naturvitt, patineras vackert',  img: 'metal-platinum.jpg', fallback: '○',       scores: { 'MT:platinum': 5 } },
      { id: 'mixed',      label: 'Blandade metaller',  sub: 'Tvåton eller kontrast',                      img: '', fallback: '⇄', scores: { 'MT:yellowGold': 2, 'MT:whiteGold': 2, 'ST:bold': 1 } }
    ]
  };

  var Q_METAL_WITH_HELP = cloneQ(Q_METAL, {
    id: 'b_metal',
    options: Q_METAL.options.concat([
      { id: 'helpMetal', label: 'Hjälp mig välja', sub: 'Vi guídar dig genom för- och nackdelar', img: '', fallback: '❓', scores: {} }
    ])
  });

  var Q_SHAPE = {
    id: 'shape', cols: 4, type: 'multi', max: 2,
    title: 'Vilken stenform lockar dig mest?',
    subtitle: 'Välj upp till 2 former som tilltalar dig',
    options: [
      { id: 'round',      label: 'Rund',        sub: 'Mest brillians. Det klassiska.',           img: 'shape-round.jpg',    fallback: '●', scores: { 'SH:round': 5 } },
      { id: 'oval',       label: 'Oval',         sub: 'Förlänger fingret. Romantisk.',  img: 'shape-oval.jpg',     fallback: '⬭', scores: { 'SH:oval': 5 } },
      { id: 'cushion',    label: 'Cushion',      sub: 'Mjuka hörn. Vintage-värme.',    img: 'shape-cushion.jpg',  fallback: '■', scores: { 'SH:cushion': 5 } },
      { id: 'pear',       label: 'Päron',   sub: 'Droppform. Unik och graciös.',       img: 'shape-pear.jpg',     fallback: '💧', scores: { 'SH:pear': 5 } },
      { id: 'emeraldCut', label: 'Emerald',      sub: 'Stegslipning. Arkitektonisk.',             img: 'shape-emerald.jpg',  fallback: '▬', scores: { 'SH:emeraldCut': 5 } },
      { id: 'princess',   label: 'Princess',     sub: 'Kvadratisk. Modern glans.',                img: 'shape-princess.jpg', fallback: '□', scores: { 'SH:princess': 5 } },
      { id: 'marquise',   label: 'Marquise',     sub: 'Ögonform. Djärv och unik.',      img: 'shape-marquise.jpg', fallback: '◇', scores: { 'SH:marquise': 5, 'ST:bold': 1 } },
      { id: 'asscher',    label: 'Asscher',      sub: 'Art Deco. Halleffekt.',                    img: 'shape-asscher.jpg',  fallback: '⬡', scores: { 'SH:asscher': 5, 'ST:vintage': 1 } },
      { id: 'radiant',    label: 'Radiant',      sub: 'Rektangulär briljant.',               img: 'shape-radiant.jpg',  fallback: '▪', scores: { 'SH:radiant': 5 } },
      { id: 'heart',      label: 'Hjärta',  sub: 'Romantisk symbol.',                        img: 'shape-heart.jpg',    fallback: '❤', scores: { 'SH:heart': 5, 'ST:romantic': 2 } }
    ]
  };

  // Path A shape — single-select with "not sure" option
  var A_SHAPE_Q = {
    id: 'a_shape', cols: 4, type: 'single',
    title: 'Vilken stenform passar din partner bäst?',
    subtitle: 'Välj den form du känner sticker ut – eller att du inte vet ännu',
    options: Q_SHAPE.options.concat([
      { id: 'notSure', label: 'Inte säker — de vill ha något unikt', sub: 'Vi hjälper dig hitta formen', img: '', fallback: '❓', scores: {} }
    ])
  };

  var Q_MOUNTING = {
    id: 'mounting', cols: 3, type: 'multi', max: 2,
    title: 'Vilken infattningsstil tilltalar dig?',
    subtitle: 'Välj upp till 2 – infattningen formar hela ringens karaktär',
    options: [
      { id: 'solitaire',  label: 'Klassisk solitär',  sub: 'En sten. Ingenting annat.',         img: 'setting-solitaire.jpg',   fallback: '💍', scores: { 'MN:solitaire': 3, 'PR:fourProng': 2 } },
      { id: 'cathedral',  label: 'Cathedral solitär', sub: 'Upphöjd och kunglig.',          img: 'mount-cathedral.jpg',     fallback: '🏙', scores: { 'MN:cathedral': 3, 'SZ:statement': 1 } },
      { id: 'splitShank', label: 'Split shank',            sub: 'Banden delar sig mot stenen.',       img: 'mount-splitshank.jpg',    fallback: '✶',       scores: { 'MN:splitShank': 3, 'BD:pave': 2 } },
      { id: 'halo',       label: 'Halo',                   sub: 'Diamanter runt centerstenen.',       img: 'setting-halo.jpg',        fallback: '⭐',       scores: { 'MN:halo': 3 } },
      { id: 'bezel',      label: 'Bezel',                  sub: 'Metall runt stenen. Hållfast.',  img: 'setting-bezel.jpg',       fallback: '⬣',       scores: { 'MN:bezel': 3, 'PR:bezel': 3, 'ST:modern': 2 } },
      { id: 'threeStone', label: 'Tre stenar',             sub: 'Förflutet, nutid, framtid.',    img: 'setting-three-stone.jpg', fallback: '✦',       scores: { 'MN:threeStone': 3 } },
      { id: 'cluster',    label: 'Vintage cluster',        sub: 'Många stenar, ornamenterat.',    img: 'mount-cluster.jpg',       fallback: '🌟', scores: { 'MN:cluster': 3, 'ST:vintage': 2 } },
      { id: 'floral',     label: 'Naturinspirerat',        sub: 'Kronblad, löv, organiskt.',      img: 'mount-floral.jpg',        fallback: '🌸', scores: { 'MN:floral': 3, 'ST:nature': 3 } },
      { id: 'eastWest',   label: 'East-West',              sub: 'Stenen liggande horisontellt.',       img: 'mount-eastwest.jpg',      fallback: '↔',       scores: { 'MN:eastWest': 3, 'ST:modern': 2, 'ST:bold': 1 } }
    ]
  };

  var Q_PRONG = {
    id: 'prong', cols: 3, type: 'single',
    title: 'Vilken typ av kramlor föredrar du?',
    subtitle: 'Kramlornas form påverkar hur ljuset faller och ringens karaktär',
    options: [
      { id: 'fourProng',   label: '4 kramlor',            sub: 'Minimalt metall. Mer sten synlig.',    img: 'prong-4.jpg',      fallback: '✛', scores: { 'PR:fourProng': 5 } },
      { id: 'sixProng',    label: '6 kramlor',            sub: 'Mer säkert. Fylligare look.',      img: 'prong-6.jpg',      fallback: '✶', scores: { 'PR:sixProng': 5 } },
      { id: 'doubleProng', label: 'Dubbla kramlor',       sub: 'Delikat och distinkt.',                img: 'prong-double.jpg', fallback: '∷', scores: { 'PR:doubleProng': 5, 'ST:romantic': 1 } },
      { id: 'claw',        label: 'Klokramlor',           sub: 'Maximalt ljus. Lite djärvare.',   img: 'prong-claw.jpg',   fallback: '❯', scores: { 'PR:claw': 5, 'ST:bold': 1 } },
      { id: 'vProng',      label: 'V-kramlor',            sub: 'Skyddar spetsiga stenar.',             img: 'prong-v.jpg',      fallback: '∨', scores: { 'PR:vProng': 5 } },
      { id: 'bezProng',    label: 'Bezel (inga kramlor)', sub: 'Ultramodern. Aldrig hakar.',           img: 'prong-bezel.jpg',  fallback: '⬣', scores: { 'PR:bezel': 5, 'MN:bezel': 1, 'ST:modern': 1 } }
    ]
  };

  var Q_BAND = {
    id: 'band', cols: 4, type: 'single',
    title: 'Hur ska bandet se ut på nära håll?',
    subtitle: 'Välj den detalj som tilltalar dig mest',
    options: [
      { id: 'plain',     label: 'Slätt polerat',     sub: 'Ingenting. Perfekt.',                    img: 'band-plain.jpg',     fallback: '—', scores: { 'BD:plain': 3, 'ST:minimalist': 2, 'ST:classic': 1 } },
      { id: 'pave',      label: 'Pavé',              sub: 'Diamanter längs bandet.',           img: 'band-pave.jpg',      fallback: '✦', scores: { 'BD:pave': 3, 'SZ:statement': 1 } },
      { id: 'twisted',   label: 'Tvinnat / flätat',  sub: 'Romantiskt och unikt.',                  img: 'band-twisted.jpg',   fallback: '➿', scores: { 'BD:twisted': 3, 'ST:romantic': 3 } },
      { id: 'milgrain',  label: 'Milgrain',               sub: 'Pärlad kant – antik känsla.', img: 'band-milgrain.jpg', fallback: '··', scores: { 'BD:milgrain': 3, 'ST:vintage': 3 } },
      { id: 'knifeEdge', label: 'Knife-edge',             sub: 'Skarp rygg – rent och modernt.',   img: 'band-knifeedge.jpg', fallback: '∧', scores: { 'BD:knifeEdge': 3, 'ST:modern': 2 } },
      { id: 'engraved',  label: 'Graverat mönster',  sub: 'Geometrisk eller floral gravyr.',        img: 'band-engraved.jpg',  fallback: '⌘', scores: { 'BD:engraved': 3, 'ST:vintage': 2 } },
      { id: 'florBand',  label: 'Blom- / bladdetalj',     sub: 'Organisk naturtextur.',                  img: 'band-floral.jpg',    fallback: '🌿', scores: { 'BD:floral': 3, 'ST:nature': 3 } },
      { id: 'split',     label: 'Split shank',            sub: 'Bandet delar sig mot stenen.',           img: 'band-split.jpg',     fallback: '❬', scores: { 'BD:split': 3, 'MN:splitShank': 2 } }
    ]
  };

  var Q_FEEL = {
    id: 'feel', cols: 3, type: 'single',
    title: 'Hur stor närvaro ska ringen ha?',
    subtitle: 'Välj den känsla som stämmer med vad du söker',
    options: [
      { id: 'delicate',  label: 'Delikat och diskret', sub: 'Ringen ska viska',                     img: 'feel-delicate.jpg',  fallback: '🪶', scores: { 'SZ:delicate': 5, 'BD:plain': 1 } },
      { id: 'balanced',  label: 'Balanserad',           sub: 'Synlig men inte överväldigande', img: 'feel-balanced.jpg', fallback: '⚖',       scores: { 'SZ:balanced': 5 } },
      { id: 'statement', label: 'Statement-smycke',     sub: 'Ringen ska ta plats i rummet',         img: 'feel-statement.jpg', fallback: '💎', scores: { 'SZ:statement': 5, 'MN:halo': 1, 'BD:pave': 1 } }
    ]
  };

  var Q_BUDGET = {
    id: 'budget', cols: 3, type: 'single', textOnly: true,
    title: 'Vad är din ungefärliga budget?',
    subtitle: 'Hjälper oss prioritera rätt sten och material',
    options: [
      { id: 'tier1', label: 'Under 10 000 kr',          sub: 'Labbdiamanter, moissanit',        img: '', fallback: '', scores: { 'BU:tier1': 5 } },
      { id: 'tier2', label: '10 000–25 000 kr', sub: 'Labbdiamant, bra kvalitet',      img: '', fallback: '', scores: { 'BU:tier2': 5 } },
      { id: 'tier3', label: '25 000–50 000 kr', sub: 'Naturlig diamant, certifikat',   img: '', fallback: '', scores: { 'BU:tier3': 5 } },
      { id: 'tier4', label: '50 000–100 000 kr', sub: 'Premium diamant, platina',     img: '', fallback: '', scores: { 'BU:tier4': 5 } },
      { id: 'tier5', label: '100 000+ kr',               sub: 'Exceptionellt, full custom',     img: '', fallback: '', scores: { 'BU:tier5': 5 } },
      { id: 'flex',  label: 'Inte bestämt ännu',         sub: 'Visa mig vad pengarna gör', img: '', fallback: '', scores: { 'BU:tier2': 1, 'BU:tier3': 2 } }
    ]
  };

  // ── Instinct rings (shared B + C) ─────────────────────────────────────────
  var INSTINCT_OPTIONS = [
    { id: 'iClassic',    label: 'Klassisk rund solitär, platina',       img: 'fullring-classic.jpg',    fallback: '💍', scores: { 'ST:classic': 3, 'SH:round': 2, 'MN:solitaire': 2, 'MT:platinum': 1 } },
    { id: 'iRomantic',   label: 'Oval halo, roséguld',                   img: 'fullring-romantic.jpg',   fallback: '🌸', scores: { 'ST:romantic': 3, 'SH:oval': 2, 'MN:halo': 2, 'MT:roseGold': 2 } },
    { id: 'iModern',     label: 'Emerald bezel, vitguld',                     img: 'fullring-modern.jpg',     fallback: '■',       scores: { 'ST:modern': 3, 'SH:emeraldCut': 2, 'MN:bezel': 2, 'MT:whiteGold': 2 } },
    { id: 'iVintage',    label: 'Cushion cluster, gult guld',                 img: 'fullring-vintage.jpg',    fallback: '🏙', scores: { 'ST:vintage': 3, 'SH:cushion': 2, 'MN:cluster': 2, 'MT:yellowGold': 2 } },
    { id: 'iNature',     label: 'Päron, naturinspirerat band',           img: 'fullring-nature.jpg',     fallback: '🌿', scores: { 'ST:nature': 3, 'SH:pear': 2, 'MN:floral': 2 } },
    { id: 'iBold',       label: 'Marquise halo, pavé-band',              img: 'fullring-bold.jpg',       fallback: '💎', scores: { 'ST:bold': 3, 'SH:marquise': 2, 'SZ:statement': 2 } },
    { id: 'iMinimalist', label: 'Delikat rund solitär, ultratunt band', img: 'fullring-minimalist.jpg', fallback: '●',       scores: { 'ST:minimalist': 3, 'SZ:delicate': 3 } },
    { id: 'iThreeStone', label: 'Tre stenar, cushion, baguetter',             img: 'fullring-threestone.jpg', fallback: '✦',       scores: { 'MN:threeStone': 3, 'SH:cushion': 1, 'ST:classic': 1 } },
    { id: 'iSplitShank', label: 'Split shank oval med pavé',             img: 'fullring-splitshank.jpg', fallback: '↔',       scores: { 'MN:splitShank': 3, 'SH:oval': 1, 'BD:pave': 1 } }
  ];

  // ── A-Q1 (pre-question) ────────────────────────────────────────────────────
  var AQ1_OPTIONS = [
    { id: 'clear',   label: 'Jag har en ganska klar bild — behöver bara hjälp med detaljerna', dest: 'checklist', img: '', fallback: '✔', scores: {} },
    { id: 'some',    label: 'Jag vet lite men behöver vägledning för det mesta',                dest: 'checklist', img: '', fallback: '◌', scores: {} },
    { id: 'scratch', label: 'Jag börjar helt från noll — vägled mig hela vägen',       dest: 'full',      img: '', fallback: '★', scores: {} }
  ];

  // A-CHECKLIST items
  var A_CHECKLIST_ITEMS = [
    { id: 'metal',   label: 'Metallfärg',         sub: 'Guld, silver, platina…' },
    { id: 'shape',   label: 'Stenform',                  sub: 'Rund, oval, cushion…' },
    { id: 'size',    label: 'Storlek / känsla',    sub: 'Diskret eller statement' },
    { id: 'setting', label: 'Infattningsstil',           sub: 'Solitär, halo, bezel…' },
    { id: 'band',    label: 'Banddetalj',                sub: 'Slätt, pavé, milgrain…' },
    { id: 'budget',  label: 'Ungefärlig budget',   sub: '' }
  ];

  // ── Path A question blocks ─────────────────────────────────────────────────

  var A_Q2 = {
    id: 'a_style', cols: 3, type: 'single',
    title: 'Beskriv din partners personliga stil',
    subtitle: 'Välj det alternativ som stämmer bäst',
    options: [
      { id: 'classic',  label: 'Klassisk och elegant',           sub: 'Välklädd, tidlös, aldrig trendkänslig',  img: 'style-classic.jpg',  fallback: '💎', scores: { 'ST:classic': 3, 'MT:yellowGold': 1, 'MT:platinum': 1, 'SH:round': 2, 'MN:solitaire': 2 } },
      { id: 'romantic', label: 'Romantisk och feminin',           sub: 'Mjuk, blommig, naturligt vacker',                       img: 'style-romantic.jpg', fallback: '🌸', scores: { 'ST:romantic': 3, 'MT:roseGold': 3, 'SH:oval': 2, 'MN:halo': 2 } },
      { id: 'modern',   label: 'Modern och minimalistisk',        sub: 'Rena linjer, kvalitet framför kvantitet',           img: 'style-modern.jpg',   fallback: '■',       scores: { 'ST:modern': 2, 'ST:minimalist': 2, 'MT:whiteGold': 2, 'SH:emeraldCut': 2, 'MN:bezel': 2 } },
      { id: 'vintage',  label: 'Vintage och eklektisk',           sub: 'Unika fynd, mix av tidsepoker',                         img: 'style-vintage.jpg',  fallback: '🏙', scores: { 'ST:vintage': 3, 'MT:yellowGold': 2, 'SH:cushion': 2, 'MN:cluster': 2 } },
      { id: 'bold',     label: 'Djärv och uttrycksfull',     sub: 'Gör statement, älskar mode och färg',    img: 'style-bold.jpg',     fallback: '🔥', scores: { 'ST:bold': 3, 'SZ:statement': 2, 'MN:halo': 2, 'SH:marquise': 1, 'SH:pear': 1 } },
      { id: 'nature',   label: 'Naturinspirerad och konstnärlig', sub: 'Organiska former, hantverkskänsla',          img: 'style-nature.jpg',   fallback: '🌿', scores: { 'ST:nature': 3, 'MT:yellowGold': 2, 'SH:pear': 2, 'MN:floral': 3, 'BD:floral': 2 } }
    ]
  };

  var A_Q3 = {
    id: 'a_lifestyle', cols: 3, type: 'single',
    title: 'Vad gör din partner på fritiden?',
    subtitle: 'Hjälper oss välja rätt hållbarhet och form',
    options: [
      { id: 'active',   label: 'Aktiv utomhus',          sub: 'Vandring, klättring, löpning, resor',       img: 'life-active.jpg',   fallback: '🏃', scores: { 'SZ:delicate': 1, 'MN:bezel': 2, 'PR:bezel': 2, 'MT:platinum': 2 } },
      { id: 'creative', label: 'Kreativt skapande',       sub: 'Målning, keramik, musik, design',               img: 'life-creative.jpg', fallback: '🎨', scores: { 'ST:nature': 1, 'ST:vintage': 1, 'MN:floral': 1, 'SH:cushion': 1 } },
      { id: 'social',   label: 'Social fjäril',      sub: 'Restauranger, evenemang, umgänge',              img: 'life-office.jpg',   fallback: '💃', scores: { 'SZ:statement': 2, 'MN:halo': 2, 'ST:bold': 1, 'ST:romantic': 1 } },
      { id: 'home',     label: 'Hem och intriör',    sub: 'Matlagning, inredning, värdskap',               img: 'life-delicate.jpg', fallback: '🏠', scores: { 'ST:romantic': 1, 'ST:classic': 1, 'MN:threeStone': 1, 'BD:engraved': 1 } },
      { id: 'career',   label: 'Karriärfokuserad',        sub: 'Professionell, ambitiös, strukturerad',               img: 'life-hands.jpg',    fallback: '💼', scores: { 'ST:classic': 2, 'MT:platinum': 2, 'MN:solitaire': 1, 'SZ:balanced': 1 } },
      { id: 'nature2',  label: 'Natur och djur',           sub: 'Trädgård, hästar, hållbarhet',  img: 'life-nature.jpg',   fallback: '🌿', scores: { 'ST:nature': 3, 'MN:floral': 2, 'MT:yellowGold': 1, 'SH:pear': 1 } }
    ]
  };

  var A_Q4 = {
    id: 'a_jewelry', cols: 3, type: 'single',
    title: 'Vilka smycken bär din partner vanligtvis?',
    subtitle: 'Ger oss ledtådar om metall och stil',
    options: [
      { id: 'lots',     label: 'Mycket smycken',      sub: 'Staplar, lager, alltid något på',   img: 'jewelry-lots.jpg',    fallback: '✨', scores: { 'SZ:statement': 2, 'MN:halo': 1, 'BD:pave': 2 } },
      { id: 'curated',  label: 'Utvalda bitar',        sub: 'Kvalitet framför kvantitet',             img: 'jewelry-curated.jpg', fallback: '💍', scores: { 'SZ:balanced': 2, 'MN:solitaire': 2, 'MN:threeStone': 1 } },
      { id: 'rarely',   label: 'Sällan smycken',  sub: 'Håller det enkelt',                     img: 'jewelry-rarely.jpg',  fallback: '—', scores: { 'SZ:delicate': 3, 'MN:bezel': 2, 'ST:minimalist': 2 } },
      { id: 'warmTone', label: 'Varmtoniga smycken',   sub: 'Guld, mässing, brons',                  img: 'jewelry-warm.jpg',    fallback: '🟡', scores: { 'MT:yellowGold': 3, 'MT:roseGold': 2 } },
      { id: 'coolTone', label: 'Kyligtoniga smycken',  sub: 'Vitguld, silver, platina',                   img: 'jewelry-cool.jpg',    fallback: '⚪', scores: { 'MT:whiteGold': 3, 'MT:platinum': 2 } },
      { id: 'mixedJew', label: 'Blandad mix',           sub: 'Eklektisk och oförutsägbar',       img: 'jewelry-mixed.jpg',   fallback: '⇄', scores: { 'ST:vintage': 1, 'ST:bold': 1 } }
    ]
  };

  var A_Q4B = {
    id: 'a_height', cols: 2, type: 'single',
    title: 'Hur högt ska ringen sitta på fingret?',
    subtitle: 'Infattningshöjden påverkar komfort och karaktär',
    options: [
      { id: 'low',     label: 'Lågt och diskret',   sub: 'Knappt upphöjd — bekväm varje dag',      img: 'height-low.jpg',     fallback: '▭', scores: { 'MN:bezel': 3, 'PR:bezel': 2, 'SZ:delicate': 1 } },
      { id: 'mid',     label: 'Lite upphöjd',        sub: 'Synlig men inte dramatisk',              img: 'height-mid.jpg',     fallback: '◈', scores: { 'MN:solitaire': 2, 'PR:fourProng': 2, 'SZ:balanced': 1 } },
      { id: 'high',    label: 'Högt och prominent',  sub: 'Stenen dominerar — klassisk hjälte',    img: 'height-high.jpg',    fallback: '▲', scores: { 'MN:cathedral': 3, 'PR:sixProng': 2, 'SZ:statement': 1 } },
      { id: 'notsure', label: 'Inte säker',          sub: 'Vi räknar inte det här — fortsätt',     img: 'height-notsure.jpg', fallback: '❓', scores: {} }
    ]
  };

  var A_Q5B_1 = {
    id: 'a_shape_personality', cols: 1, type: 'single', textOnly: true,
    title: 'Vi hjälper dig hitta formen genom personligheten',
    subtitle: 'Vilken mening stämmer bäst med din partner?',
    options: [
      { id: 'sp_timeless', label: '"De väljer aldrig något för att det är trendig."',       img: '', fallback: '●', scores: { 'SH:round': 3 } },
      { id: 'sp_soft',     label: '"De älskar mjuka, flödande saker — inget skarpt."',           img: '', fallback: '⬭', scores: { 'SH:oval': 3, 'SH:cushion': 2, 'SH:pear': 1 } },
      { id: 'sp_geo',      label: '"De dras till geometrisk precision och rena linjer."',                         img: '', fallback: '▬', scores: { 'SH:emeraldCut': 3, 'SH:princess': 2, 'SH:asscher': 2 } },
      { id: 'sp_stand',    label: '"De gillar att sticka ut — det oväntade valet."',                  img: '', fallback: '◇', scores: { 'SH:marquise': 3, 'SH:pear': 2 } },
      { id: 'sp_romantic', label: '"De är romantiska — allt har en betydelse för dem."',         img: '', fallback: '❤', scores: { 'SH:oval': 2, 'SH:pear': 2, 'SH:heart': 2 } }
    ]
  };

  var A_Q6 = {
    id: 'a_words', cols: 5, type: 'multi', max: 2, textOnly: true,
    title: 'Välj 2 ord som bäst beskriver din partner',
    subtitle: 'Välj exakt 2 ord',
    options: [
      { id: 'elegant',       label: 'Elegant',          img: '', fallback: '✦', scores: { 'ST:classic': 2, 'MN:solitaire': 1 } },
      { id: 'dreamy',        label: 'Drömsk',      img: '', fallback: '✦', scores: { 'ST:romantic': 2, 'SH:oval': 1, 'MN:halo': 1 } },
      { id: 'strong',        label: 'Stark',             img: '', fallback: '✦', scores: { 'ST:bold': 2, 'SZ:statement': 1 } },
      { id: 'artistic',      label: 'Konstnärlig', img: '', fallback: '✦', scores: { 'ST:vintage': 1, 'ST:nature': 1, 'MN:floral': 1 } },
      { id: 'understated',   label: 'Avskalad',          img: '', fallback: '✦', scores: { 'ST:minimalist': 2, 'MN:bezel': 1 } },
      { id: 'warm',          label: 'Varm',              img: '', fallback: '✦', scores: { 'ST:romantic': 1, 'MT:roseGold': 2 } },
      { id: 'sophisticated', label: 'Sofistikerad',      img: '', fallback: '✦', scores: { 'ST:classic': 1, 'MT:platinum': 1, 'SH:emeraldCut': 1 } },
      { id: 'freespirit',    label: 'Fri ande',          img: '', fallback: '✦', scores: { 'ST:nature': 2, 'SH:pear': 1, 'MT:yellowGold': 1 } },
      { id: 'playful',       label: 'Lekfull',           img: '', fallback: '✦', scores: { 'ST:bold': 1, 'SH:heart': 1, 'BD:twisted': 1 } },
      { id: 'quiet',         label: 'Stilla styrka',     img: '', fallback: '✦', scores: { 'ST:minimalist': 2, 'ST:classic': 1 } }
    ]
  };

  var A_Q11 = {
    id: 'a_final', cols: 3, type: 'single',
    title: 'Sista känslokontrollen – vilken ring känns mest som din partner?',
    subtitle: 'Välj utan att tänka för länge',
    options: [
      { id: 'fClassic',  label: 'Klassisk rund solitär, platina',     img: 'fullring-classic.jpg',  fallback: '💍', scores: { 'ST:classic': 4, 'SH:round': 2, 'MN:solitaire': 2, 'MT:platinum': 2 } },
      { id: 'fRomantic', label: 'Oval halo, roséguld, pavé-band', img: 'fullring-romantic.jpg', fallback: '🌸', scores: { 'ST:romantic': 4, 'SH:oval': 2, 'MN:halo': 2, 'MT:roseGold': 2 } },
      { id: 'fModern',   label: 'Emerald bezel, vitguld, knife-edge',       img: 'fullring-modern.jpg',   fallback: '■',       scores: { 'ST:modern': 4, 'SH:emeraldCut': 2, 'MN:bezel': 2, 'MT:whiteGold': 2 } },
      { id: 'fVintage',  label: 'Cushion cluster, gult guld, milgrain',     img: 'fullring-vintage.jpg',  fallback: '🏙', scores: { 'ST:vintage': 4, 'SH:cushion': 2, 'MN:cluster': 2, 'MT:yellowGold': 2 } },
      { id: 'fNature',   label: 'Päron i naturinspirerat band',         img: 'fullring-nature.jpg',   fallback: '🌿', scores: { 'ST:nature': 4, 'SH:pear': 2, 'MN:floral': 2 } },
      { id: 'fBold',     label: 'Marquise dubbelhalo, pavé överallt', img: 'fullring-bold.jpg', fallback: '💎', scores: { 'ST:bold': 4, 'SH:marquise': 2, 'MN:halo': 2, 'SZ:statement': 2 } }
    ]
  };

  // ── Path B extra questions ─────────────────────────────────────────────────

  var B_Q4 = {
    id: 'b_priority', cols: 3, type: 'single',
    title: 'Vad är viktigast för er i själva stenen?',
    subtitle: 'Välj det som väger tyngst',
    options: [
      { id: 'cut',          label: 'Slipen',                  sub: 'Hur den fångar ljuset är allt',     img: 'stone-cut.jpg',     fallback: '✦', scores: { 'SH:round': 2 } },
      { id: 'size',         label: 'Storleken',               sub: 'Vi vill att den syns tydligt',               img: 'stone-size.jpg',    fallback: '💎', scores: { 'SZ:statement': 2, 'MN:halo': 2 } },
      { id: 'clarity',      label: 'Klarheten',               sub: 'Ren, isklar, inga inneslutningar',           img: 'stone-clarity.jpg', fallback: '🔍', scores: { 'SH:emeraldCut': 1, 'SH:asscher': 1 } },
      { id: 'uniqueShape',  label: 'Unik form',               sub: 'Något som sticker ut',                  img: 'stone-unique.jpg',  fallback: '◇', scores: { 'SH:marquise': 1, 'SH:pear': 1 } },
      { id: 'colorStone',   label: 'Färgad sten',         sub: 'Öppna för saffír, rubin, smaragd…', img: '', fallback: '💎', scores: {} },
      { id: 'ethical',      label: 'Etiskt ursprung',         sub: 'Labbdiamant eller certifierat',              img: '', fallback: '🌿', scores: { 'BU:tier2': 1 } }
    ]
  };

  var B_Q2B_1 = {
    id: 'b_metal_guide1', cols: 1, type: 'single', textOnly: true,
    title: 'Vad är viktigast för er i metallen?',
    subtitle: 'Hjälper oss rekommendera rätt material',
    options: [
      { id: 'durability', label: 'Hållbarhet — ska hålla för evigt utan underhåll',  img: '', fallback: '∞', scores: { 'MT:platinum': 4 } },
      { id: 'warmth',     label: 'Värme i färgen — ska kännas dyrbar och rik',           img: '', fallback: '🟡', scores: { 'MT:yellowGold': 3, 'MT:roseGold': 2 } },
      { id: 'brightness', label: 'Maximal ljusstyrka — diamanter ska lysa så mycket som möjligt', img: '', fallback: '⚪', scores: { 'MT:whiteGold': 3, 'MT:platinum': 2 } },
      { id: 'romantic2',  label: 'Romantisk, feminin kvalité i metallen själv',                    img: '', fallback: '🌸', scores: { 'MT:roseGold': 4 } },
      { id: 'prestige',   label: 'Klassisk prestige',                                                          img: '', fallback: '✦', scores: { 'MT:platinum': 2, 'MT:yellowGold': 2 } }
    ]
  };

  var B_Q2B_2 = {
    id: 'b_metal_guide2', cols: 2, type: 'single', textOnly: true,
    title: 'Hudton (valfritt men hjälpsamt)',
    subtitle: 'Vissa metaller kompletterar hudtoner extra väl',
    options: [
      { id: 'cool',    label: 'Ljus / kyligtonig hudton',   sub: 'Kyla metaller kledsäl',          img: '', fallback: '⚪', scores: { 'MT:whiteGold': 1, 'MT:platinum': 1 } },
      { id: 'warm',    label: 'Medium / varmtonig hudton',  sub: 'Varma metaller kompletterar',         img: '', fallback: '🟡', scores: { 'MT:yellowGold': 1, 'MT:roseGold': 1 } },
      { id: 'deep',    label: 'Mörk / djup hudton',   sub: 'Kontrasten blir fantastisk',           img: '', fallback: '✦', scores: { 'MT:yellowGold': 2 } },
      { id: 'skip',    label: 'Inget svar / inte relevant', sub: '',                                    img: '', fallback: '—', scores: {} }
    ]
  };

  var B_Q4B = {
    id: 'b_colored_stone', cols: 3, type: 'single',
    title: 'Vilken färgad sten talar till er?',
    subtitle: 'Varje sten har en unik karaktär',
    options: [
      { id: 'sapphire',   label: 'Blå saffír',           sub: 'Djup, kunglig, tidlös',                   img: 'stone-sapphire.jpg',  fallback: '💙', scores: { 'ST:classic': 2, 'ST:vintage': 1 } },
      { id: 'padpar',     label: 'Padparadscha saffír',        sub: 'Persikoro, extremt sällsynt',             img: 'stone-padpar.jpg',    fallback: '🍑', scores: { 'ST:romantic': 3, 'MT:roseGold': 2 } },
      { id: 'emerald',    label: 'Smaragd',                          sub: 'Djupt grön, överflödig',       img: 'stone-emerald.jpg',   fallback: '💚', scores: { 'ST:bold': 2, 'ST:vintage': 1 } },
      { id: 'ruby',       label: 'Rubin',                            sub: 'Röd, passionerad, dramatisk',             img: 'stone-ruby.jpg',      fallback: '💛', scores: { 'ST:romantic': 2, 'ST:bold': 2 } },
      { id: 'morganite',  label: 'Morganit',                         sub: 'Mjukt persiko-rosa, feminint',                img: 'stone-morganite.jpg', fallback: '🌸', scores: { 'ST:romantic': 2, 'MT:roseGold': 3 } },
      { id: 'saltpepper', label: 'Salt & Pepper diamant',            sub: 'Rå, modern, unik',                       img: 'stone-saltpepper.jpg',fallback: '▫', scores: { 'ST:modern': 2, 'ST:nature': 1 } },
      { id: 'alexandrite',label: 'Alexandrit',                       sub: 'Färgskiftande, magisk',                  img: 'stone-alex.jpg',      fallback: '💜', scores: { 'ST:nature': 2, 'ST:bold': 1 } }
    ]
  };

  var B_Q4C = {
    id: 'b_ethical', cols: 1, type: 'single', textOnly: true,
    title: 'Vad är viktigast för er gällande ursprung?',
    subtitle: 'Alla alternativ ger en vacker ring – det handlar om era värderingar',
    options: [
      { id: 'labgrown', label: 'Labbodlad diamant — identisk look, inget gruvarbete, bra värde',        img: '', fallback: '⚗', scores: { 'BU:tier1': 1 } },
      { id: 'certified',label: 'Certifierad naturlig diamant (GIA, konfliktfri)',                                  img: '', fallback: '✔', scores: {} },
      { id: 'recycled', label: 'Återvunnet metall och vintage-stenar',                                        img: '', fallback: '♻', scores: { 'ST:vintage': 2 } },
      { id: 'traceable', label: 'Spårbart ursprung (kanadensisk eller australisk)',                           img: '', fallback: '🌍', scores: {} }
    ]
  };

  var B_Q10 = {
    id: 'b_values', cols: 3, type: 'single',
    title: 'Vad är viktigast utöver utseendet?',
    subtitle: 'Välj det som väger tyngst för er',
    options: [
      { id: 'longevity',  label: 'Livslång hållbarhet',   sub: 'Ska hålla livet ut',               img: 'val-longevity.jpg', fallback: '∞',           scores: { 'MT:platinum': 2, 'PR:sixProng': 1 } },
      { id: 'comfort',    label: 'Bärbarhet',                   sub: 'Bekväm varje dag',                 img: 'val-comfort.jpg',   fallback: '🤲',     scores: { 'MN:bezel': 1, 'PR:bezel': 1, 'SZ:delicate': 1 } },
      { id: 'unique2',    label: 'Unikhet',                           sub: 'Ingen annan har likadant',             img: 'val-unique.jpg',    fallback: '⭐',           scores: { 'ST:vintage': 1, 'ST:nature': 1, 'MN:floral': 1 } },
      { id: 'sparkle',    label: 'Maximal glans',                    sub: 'Brillians och gnist',                  img: 'val-sparkle.jpg',   fallback: '✨',           scores: { 'SH:round': 1, 'BD:pave': 1, 'MN:halo': 1 } },
      { id: 'story',      label: 'Berättelsen',                 sub: 'Mening och symbolik',                   img: 'val-story.jpg',     fallback: '📖',     scores: { 'MN:threeStone': 2, 'BD:engraved': 1 } },
      { id: 'investment', label: 'Värdebeständighet',      sub: 'Håller sitt värde över tid', img: 'val-invest.jpg', fallback: '💼',  scores: { 'SH:round': 2, 'MT:platinum': 1 } }
    ]
  };

  // ── C-Q1 (pre-question) ────────────────────────────────────────────────────
  var CQ1_OPTIONS = [
    { id: 'vision',      label: 'Jag har en klar vision — behöver hjälp med detaljerna',       dest: 'checklist',   img: '', fallback: '✔', scores: {} },
    { id: 'direction',   label: 'Jag har en allmän riktning men vill utforska',                           dest: 'visual',      img: '', fallback: '👁', scores: {} },
    { id: 'surprise',    label: 'Jag vill bli överraskad — guidemig utifrån min personlighet', dest: 'personality', img: '', fallback: '★', scores: {} },
    { id: 'reference',   label: 'Jag har en referensbild eller ring jag älskar',                          dest: 'reference',   img: '', fallback: '📷', scores: {} }
  ];

  var C_STYLE = {
    id: 'c_style', cols: 3, type: 'single',
    title: 'Hur skulle du beskriva din personliga stil?',
    subtitle: 'Välj det alternativ som stämmer bäst',
    options: [
      { id: 'classic',  label: 'Klassisk och genomtänkt',       sub: 'Jag investerar i tidlöst',                img: 'style-classic.jpg',  fallback: '💎', scores: { 'ST:classic': 3, 'MN:solitaire': 2, 'SH:round': 2 } },
      { id: 'romantic', label: 'Romantisk',                           sub: 'Jag dras till mjukt, vackert, emotionellt',    img: 'style-romantic.jpg', fallback: '🌸', scores: { 'ST:romantic': 3, 'MT:roseGold': 2, 'SH:oval': 2, 'MN:halo': 1 } },
      { id: 'minimal',  label: 'Minimalistisk',                       sub: 'Jag äger mindre men bättre',          img: 'style-modern.jpg',   fallback: '■',       scores: { 'ST:minimalist': 3, 'MN:bezel': 2, 'SZ:delicate': 2 } },
      { id: 'vintage',  label: 'Vintage',                             sub: 'Jag älskar saker med historia',            img: 'style-vintage.jpg',  fallback: '🏙', scores: { 'ST:vintage': 3, 'MN:cluster': 2, 'SH:cushion': 2, 'MT:yellowGold': 2 } },
      { id: 'bold',     label: 'Djärv',                         sub: 'Jag klär mig för att synas',          img: 'style-bold.jpg',     fallback: '🔥', scores: { 'ST:bold': 3, 'SZ:statement': 2, 'MN:halo': 2 } },
      { id: 'nature',   label: 'Natur och konstnärlig',          sub: 'Organiskt, handgjort, jordnära',           img: 'style-nature.jpg',   fallback: '🌿', scores: { 'ST:nature': 3, 'MN:floral': 3, 'MT:yellowGold': 1 } },
      { id: 'dontKnow', label: 'Jag vet ärligt talat inte — det växlar', sub: 'Vi hjälper dig', img: '', fallback: '❓', scores: {} }
    ]
  };

  var C_LIFESTYLE_Q = {
    id: 'c_lifestyle_q', cols: 1, type: 'single', textOnly: true,
    title: 'Hur ser din vardag ut?',
    subtitle: 'Hjälper oss förstå vilken stil och hållbarhet som passar',
    options: [
      { id: 'active2',    label: 'Väldigt aktiv — händerna är alltid i rörelse, utomhus, sport',    img: '', fallback: '🏃', scores: { 'MN:bezel': 3, 'PR:bezel': 2, 'MT:platinum': 2, 'SZ:delicate': 1 } },
      { id: 'professional',label: 'Professionell — möten, kontor, ser representativ ut',                            img: '', fallback: '💼', scores: { 'ST:classic': 2, 'MN:solitaire': 2, 'SZ:balanced': 1 } },
      { id: 'creative2',  label: 'Kreativ — atelje, verkstad, händerna i material',                                  img: '', fallback: '🎨', scores: { 'MN:bezel': 2, 'ST:nature': 1, 'SZ:delicate': 1 } },
      { id: 'social2',    label: 'Social — många tillfällen, middagar, evenemang',                             img: '', fallback: '💃', scores: { 'SZ:statement': 2, 'MN:halo': 1, 'ST:romantic': 1 } },
      { id: 'allAbove',   label: 'Allt ovanstående — den måste fungera överallt',                        img: '', fallback: '⚔', scores: { 'SZ:balanced': 2, 'MN:solitaire': 1, 'MN:bezel': 1 } }
    ]
  };

  var C_STATEMENT = {
    id: 'c_statement', cols: 2, type: 'single', textOnly: true,
    title: 'Vilken mening känns som du?',
    subtitle: 'Välj utan att tänka för länge',
    options: [
      { id: 'st_classic',  label: '"Min ring ska se likadan ut om 50 år som idag."',                      img: '', fallback: '∞',           scores: { 'ST:classic': 4, 'MN:solitaire': 2, 'MT:platinum': 2 } },
      { id: 'st_romantic', label: '"Jag vill se på den och känna något varje gång."',    img: '', fallback: '❤',           scores: { 'ST:romantic': 4, 'MN:halo': 1, 'MT:roseGold': 1 } },
      { id: 'st_minimal',  label: '"Mindre är mer. Åtehållsamheten är poängen."',   img: '', fallback: '—',           scores: { 'ST:minimalist': 4, 'MN:bezel': 2, 'SZ:delicate': 2 } },
      { id: 'st_vintage',  label: '"Jag vill ha något som berättar en historia."',                   img: '', fallback: '📖',   scores: { 'ST:vintage': 4, 'MN:cluster': 1, 'MT:yellowGold': 1 } },
      { id: 'st_bold',     label: '"Jag vill att folk lägger märke till den."',                      img: '', fallback: '💎',   scores: { 'ST:bold': 4, 'SZ:statement': 2 } },
      { id: 'st_nature',   label: '"Den ska kännas som den kom från naturen."',                      img: '', fallback: '🌿',   scores: { 'ST:nature': 4, 'MN:floral': 2, 'BD:floral': 1 } },
      { id: 'st_modern',   label: '"Jag vill ha det vackraste, mest precisa jag äger."',                 img: '', fallback: '✦',           scores: { 'ST:modern': 3, 'ST:minimalist': 1, 'SH:emeraldCut': 1 } }
    ]
  };

  // ── Style profiles ─────────────────────────────────────────────────────────
  var PROFILES = {
    classic:    { name: 'Klassisk',        quote: 'Tidlöst är inte tråkigt — det är avsiktligt. Den ring folk känner igen i samma ögonblick de ser den.', stone: 'Rund briljant, ideal eller excellent slipning', mounting: 'Solitär eller cathedral solitär', prongs: '6 kramlor (Tiffany) eller 4 kramlor', band: 'Slätt polerat, knife-edge eller lätt graverat', metal: 'Platina eller 18k gult guld', carat: 'Kvalitet framför storlek — 0,8–1,5 ct' },
    romantic:   { name: 'Romantisk',       quote: 'Gjord för att beundras från andra sidan rummet. Full av känsla.', stone: 'Oval, päron eller hjärta', mounting: 'Halo, pavé-cathedral eller floating solitär', prongs: 'Dubbla kramlor eller 4 kramlor', band: 'Pavé, tvinnat eller split shank med diamanter', metal: 'Roséguld 18k eller vitguld', carat: '1,0–2,0 ct — halo gör stenen visuellt större' },
    modern:     { name: 'Modern',          quote: 'Stilla radikal. Ser ut att höra hemma på ett designmuseum.', stone: 'Emerald, princess eller asscher', mounting: 'Bezel eller east-west', prongs: 'Full bezel (inga kramlor) eller minimal 4-kramla', band: 'Knife-edge, slätt eller arkitektonisk detalj', metal: 'Platina eller vitguld 18k', carat: '1,0–1,5 ct — klarhet är nyckeln i stegslipen' },
    vintage:    { name: 'Vintage',         quote: 'Rik på detaljer. Oersättlig. Som om den hittades, inte köptes.', stone: 'Cushion, old European cut, asscher eller rose cut', mounting: 'Cluster, filigran solitär eller milgrain halo', prongs: 'Klokramlor eller dubbla kramlor med vintagedetaljer', band: 'Milgrain-kant, graverat eller blomdetalj', metal: '18k gult guld (varmast till vintagekänsla)', carat: '0,8–1,5 ct — vintageslipningar verkar större' },
    minimalist: { name: 'Minimalistisk',   quote: 'Det mest genomtänkta valet du aldrig behöver förklara.', stone: 'Rund eller oval, mindre men oantastlig slipning', mounting: 'Ultratunn solitär eller half-bezel', prongs: '4 minimal-kramla eller fin bezel', band: 'Ultratunn slät band, 1,2–1,5 mm', metal: 'Platina (mest förfinat) eller vitguld', carat: '0,5–1,0 ct — kvalitet är allt' },
    bold:       { name: 'Djärv',     quote: 'Inte för den avskalade. Varje rum märker den.', stone: 'Marquise, päron (stor) eller oval (stor)', mounting: 'Dubbelhalo eller hög cathedral', prongs: 'Klokramlor eller V-kramlor', band: 'Full pavé eller brett slätt band', metal: 'Valfritt — kontrasten mellan metall och sten är det viktiga', carat: '1,5 ct+ — närvaro är målet' },
    nature:     { name: 'Natur',           quote: 'Organisk. Levande. Som om den växte fram snarare än tillverkades.', stone: 'Päron, rose cut eller oval', mounting: 'Blomm-/kronbladsinfattning, naturinspirerat cluster', prongs: 'Dubbla kramlor, klokramlor eller organiska specialkramlor', band: 'Blomgraverat, lövdetalj eller tvinnat band', metal: '18k gult guld eller roséguld', carat: 'Form och infattning bär mer än storleken' }
  };

  var METAL_LABELS  = { yellowGold: 'Gult guld 18k', roseGold: 'Roséguld 18k', whiteGold: 'Vitguld 18k', platinum: 'Platina', mixed: 'Blandade metaller' };
  var SHAPE_LABELS  = { round: 'Rund briljant', oval: 'Oval', cushion: 'Cushion', pear: 'Päron', emeraldCut: 'Emerald', princess: 'Princess', marquise: 'Marquise', asscher: 'Asscher', radiant: 'Radiant', heart: 'Hjärta' };
  var MOUNT_LABELS  = { solitaire: 'Solitär', cathedral: 'Cathedral', splitShank: 'Split shank', halo: 'Halo', bezel: 'Bezel', threeStone: 'Tre stenar', floral: 'Naturinspirerad', cluster: 'Vintage cluster', eastWest: 'East-west' };
  var PRONG_LABELS  = { fourProng: '4 kramlor', sixProng: '6 kramlor', doubleProng: 'Dubbla kramlor', claw: 'Klokramlor', vProng: 'V-kramlor', bezel: 'Bezel (inga kramlor)', bezProng: 'Bezel (inga kramlor)' };
  var BAND_LABELS   = { plain: 'Slätt polerat', pave: 'Pavé', twisted: 'Tvinnat', milgrain: 'Milgrain', engraved: 'Graverat', knifeEdge: 'Knife-edge', floral: 'Blom-/bladdetalj', florBand: 'Blom-/bladdetalj', split: 'Split shank' };
  var FEEL_LABELS   = { delicate: 'Delikat — ringen viskar', balanced: 'Balanserad — synlig men diskret', statement: 'Statement — tar plats i rummet' };
  var BUDGET_LABELS = { tier1: 'Under 10 000 kr', tier2: '10 000–25 000 kr', tier3: '25 000–50 000 kr', tier4: '50 000–100 000 kr', tier5: '100 000+ kr', flex: 'Flexibelt' };

  // ── Path builders ──────────────────────────────────────────────────────────

  function buildPathA(knownItems, fromScratch) {
    // knownItems: array of checked checklist ids. fromScratch: bool
    var qs = [];
    var metalKnown = !fromScratch && knownItems.indexOf('metal') !== -1;
    if (metalKnown) {
      qs.push(cloneQ(Q_METAL, { id: 'a_metal_direct', title: 'Vilket metall önskar din partner?' }));
    }
    qs.push(A_Q2);
    qs.push(A_Q3);
    if (!metalKnown) { qs.push(A_Q4); }
    qs.push(A_Q4B);
    qs.push(A_Q6);
    qs.push(A_SHAPE_Q);
    qs.push(cloneQ(Q_FEEL,     { id: 'a_feel',     title: 'Hur stor närvaro ska ringen ha på din partners hand?' }));
    qs.push(cloneQ(Q_MOUNTING, { id: 'a_mounting', title: 'Vilken infattningsstil passar din partner?' }));
    qs.push(cloneQ(Q_BAND,     { id: 'a_band',     title: 'Hur ska bandet se ut – för din partners smak?' }));
    qs.push(cloneQ(Q_BUDGET,   { id: 'a_budget' }));
    qs.push(A_Q11);
    return qs;
  }

  function buildPathB() {
    return [
      { id: 'b_instinct', cols: 3, type: 'multi', max: 3, title: 'Vilka av dessa ringar väcker en känsla hos er?', subtitle: 'Välj upp till 3 – känn på instinkt, ingen analys', options: INSTINCT_OPTIONS },
      Q_METAL_WITH_HELP,
      cloneQ(Q_SHAPE, { id: 'b_shape' }),
      B_Q4,
      cloneQ(Q_MOUNTING, { id: 'b_mounting' }),
      cloneQ(Q_PRONG,    { id: 'b_prong' }),
      cloneQ(Q_BAND,     { id: 'b_band' }),
      cloneQ(Q_FEEL,     { id: 'b_feel' }),
      cloneQ(Q_BUDGET,   { id: 'b_budget' }),
      B_Q10
    ];
  }

  function buildPathC(startMode, knownItems) {
    var qs = [];
    var metalKnown = startMode === 'checklist' && knownItems && knownItems.indexOf('metal') !== -1;
    if (metalKnown) {
      qs.push(cloneQ(Q_METAL, { id: 'c_metal_direct', title: 'Vilket metall vill du ha?' }));
    }
    if (startMode !== 'personality') {
      qs.push({ id: 'c_instinct', cols: 3, type: 'multi', max: 3, title: 'Vilka av dessa ringar fångar din blick?', subtitle: 'Välj upp till 3 – instinkt, inget tankearbete', options: INSTINCT_OPTIONS });
    }
    qs.push(C_STYLE);
    if (!metalKnown) { qs.push(cloneQ(Q_METAL, { id: 'c_metal' })); }
    qs.push(cloneQ(Q_SHAPE,    { id: 'c_shape' }));
    qs.push(cloneQ(Q_MOUNTING, { id: 'c_mounting' }));
    qs.push(cloneQ(Q_PRONG,    { id: 'c_prong' }));
    qs.push(cloneQ(Q_BAND,     { id: 'c_band' }));
    qs.push(cloneQ(Q_FEEL,     { id: 'c_feel' }));
    qs.push(cloneQ(Q_BUDGET,   { id: 'c_budget' }));
    qs.push(C_STATEMENT);
    return qs;
  }

  // ── State ──────────────────────────────────────────────────────────────────
  var path        = null;
  var questions   = [];
  var currentStep = 0;
  var answers     = {};
  var unsureCount = 0;
  var preState    = { backTo: 'path_select', checkedItems: [], cq1Dest: null };
  var snapshots   = [];        // [{step, questions[], answers{}}] — one per question step entered
  var currentLeadId = null;   // lead row ID from ljc_lead AJAX, used by image upload

  // ── Score computation ──────────────────────────────────────────────────────
  function computeScores() {
    var dims = {
      ST: { classic: 0, romantic: 0, modern: 0, vintage: 0, minimalist: 0, bold: 0, nature: 0 },
      MT: { yellowGold: 0, roseGold: 0, whiteGold: 0, platinum: 0 },
      SH: { round: 0, oval: 0, cushion: 0, pear: 0, emeraldCut: 0, princess: 0, marquise: 0, asscher: 0, radiant: 0, heart: 0 },
      MN: { solitaire: 0, cathedral: 0, splitShank: 0, halo: 0, bezel: 0, threeStone: 0, floral: 0, cluster: 0, eastWest: 0 },
      PR: { fourProng: 0, sixProng: 0, doubleProng: 0, claw: 0, vProng: 0, bezel: 0 },
      BD: { plain: 0, pave: 0, twisted: 0, milgrain: 0, engraved: 0, knifeEdge: 0, floral: 0, split: 0 },
      SZ: { delicate: 0, balanced: 0, statement: 0 },
      BU: { tier1: 0, tier2: 0, tier3: 0, tier4: 0, tier5: 0 }
    };
    questions.forEach(function (q) {
      var ans = answers[q.id];
      if (!ans) { return; }
      var ids = Array.isArray(ans) ? ans : [ans];
      ids.forEach(function (oId) {
        var opt = null;
        for (var i = 0; i < q.options.length; i++) { if (q.options[i].id === oId) { opt = q.options[i]; break; } }
        if (!opt || !opt.scores) { return; }
        Object.keys(opt.scores).forEach(function (key) {
          var p = key.split(':'), dim = p[0], sub = p[1];
          if (dims[dim] && sub in dims[dim]) { dims[dim][sub] += opt.scores[key]; }
        });
      });
    });
    return dims;
  }

  function topKey(obj) {
    var keys = Object.keys(obj), best = keys[0];
    for (var i = 1; i < keys.length; i++) { if (obj[keys[i]] > obj[best]) { best = keys[i]; } }
    return best;
  }

  function topTwoST(obj) {
    var keys = Object.keys(obj).sort(function (a, b) { return obj[b] - obj[a]; });
    return { first: keys[0], second: keys[1], diff: (obj[keys[0]] || 0) - (obj[keys[1]] || 0) };
  }

  function computeResult() {
    var dims = computeScores();
    var st   = topTwoST(dims.ST);
    return {
      style:    st.diff <= 2 ? { primary: st.first, secondary: st.second, hybrid: true } : { primary: st.first, hybrid: false },
      metal:    topKey(dims.MT), shape: topKey(dims.SH), mounting: topKey(dims.MN),
      prong:    topKey(dims.PR), band:  topKey(dims.BD), feel: topKey(dims.SZ), budget: topKey(dims.BU)
    };
  }

  function getAnswerLabels() {
    var labels = {};
    questions.forEach(function (q) {
      var ans = answers[q.id];
      if (!ans) { return; }
      var ids = Array.isArray(ans) ? ans : [ans];
      labels[q.title] = ids.map(function (oId) {
        for (var i = 0; i < q.options.length; i++) { if (q.options[i].id === oId) { return q.options[i].label; } }
        return oId;
      }).join(', ');
    });
    if (answers['c_reference']) { labels['Referensbeskrivning'] = answers['c_reference']; }
    return labels;
  }

  // ── Mid-quiz branching ─────────────────────────────────────────────────────
  function getBranchQuestions() {
    var q = questions[currentStep];
    if (!q) { return null; }
    var ans = answers[q.id];
    if (!ans) { return null; }
    var ids = Array.isArray(ans) ? ans : [ans];

    if (q.id === 'b_metal' && ids.indexOf('helpMetal') !== -1) { return [B_Q2B_1, B_Q2B_2]; }
    if (q.id === 'b_priority' && ids.indexOf('colorStone') !== -1) { return [B_Q4B]; }
    if (q.id === 'b_priority' && ids.indexOf('ethical') !== -1) { return [B_Q4C]; }
    if (q.id === 'a_shape' && ids.indexOf('notSure') !== -1) { unsureCount++; return [A_Q5B_1]; }
    if (q.id === 'c_style' && ids.indexOf('dontKnow') !== -1) { unsureCount++; return [C_LIFESTYLE_Q]; }
    return null;
  }

  // ── Render helpers ─────────────────────────────────────────────────────────
  function attachFallbacks() {
    document.querySelectorAll('.ljc-card-img img').forEach(function (img) {
      img.addEventListener('error', function () {
        var wrap = this.parentNode;
        this.style.display = 'none';
        if (!wrap.querySelector('.ljc-card-fallback')) {
          var fb = document.createElement('div'); fb.className = 'ljc-card-fallback'; fb.textContent = wrap.dataset.fb || ''; wrap.insertBefore(fb, this.nextSibling);
        }
      });
    });
  }

  function renderCard(opt, selected, textOnly, qid) {
    var sel    = selected ? ' ljc-selected' : '';
    var isText = (!opt.img || textOnly);
    var label  = (qid ? oStr(qid, opt.id, 'label') : null) || opt.label || '';
    var sub    = (qid ? oStr(qid, opt.id, 'sub')   : null) || opt.sub   || '';
    var imgHtml = opt.img
      ? '<div class="ljc-card-img" data-fb="' + esc(opt.fallback || '') + '"><img src="' + esc(imgSrc(opt.img)) + '" alt="' + esc(label) + '" loading="lazy">' +
        (opt.tooltip ? '<div class="ljc-card-tooltip">' + esc(opt.tooltip) + '</div>' : '') + '</div>'
      : '';
    var subHtml = sub ? '<span class="ljc-card-sub">' + esc(sub) + '</span>' : '';
    return '<button class="ljc-card' + sel + (isText ? ' ljc-card--text' : '') + '" data-oid="' + esc(opt.id) + '" type="button">' +
      imgHtml + '<span class="ljc-card-label">' + esc(label) + subHtml + '</span></button>';
  }

  // ── Welcome ────────────────────────────────────────────────────────────────
  function renderWelcome() {
    var defDesc = 'Du behöver inte kunna några smyckestermer — jag guidar dig steg för steg och tar fram din unika ringprofil med stil, form, metall och alla detaljer. Det tar ungefär 4–7 minuter.';
    el('ljc-quiz').innerHTML =
      '<div class="ljc-welcome"><div class="ljc-welcome-inner">' +
        '<p class="ljc-eyebrow">Smyckeskonsultation</p>' +
        '<h1 class="ljc-welcome-title">' + esc(WELCOME.title || 'Hitta din perfekta ring') + '</h1>' +
        '<p class="ljc-welcome-desc">' + esc(WELCOME.desc  || defDesc) + '</p>' +
        '<button class="ljc-btn-primary" id="ljc-start" type="button">Starta konsultationen</button>' +
      '</div></div>';
    el('ljc-start').addEventListener('click', renderPathSelect);
  }

  // ── Path selection ─────────────────────────────────────────────────────────
  function renderPathSelect() {
    var pcs = [
      { id: 'surprise', p: 'A', img: 'situation-surprise.jpg', fb: '🎁', label: 'Som en överraskning',   tip: 'Jag handlar i hemlighet. Jag vägleder dig utifrån din partners personlighet och livsstil.' },
      { id: 'together', p: 'B', img: 'situation-together.jpg', fb: '💕', label: 'Vi väljer tillsammans', tip: 'Ni väljer ihop — perfekt för att hitta exakt vad ni båda älskar.' },
      { id: 'myself',   p: 'C', img: 'situation-myself.jpg',   fb: '✨', label: 'Till mig själv',        tip: 'Du vet vad du vill ha — låt oss finslipa detaljerna.' }
    ];
    var psTitle = qStr('path', 'title') || 'Hur väljer ni ringen?';
    var psSub   = qStr('path', 'sub')   || 'Hjälper mig anpassa råden till er situation';
    var html = pcs.map(function (c) {
      var label = oStr('path', c.id, 'label') || c.label;
      var tip   = oStr('path', c.id, 'tip')   || c.tip;
      return '<button class="ljc-card" data-path="' + c.p + '" type="button">' +
        '<div class="ljc-card-img" data-fb="' + c.fb + '"><img src="' + esc(imgSrc(c.img)) + '" alt="' + esc(label) + '" loading="lazy"><div class="ljc-card-tooltip">' + esc(tip) + '</div></div>' +
        '<span class="ljc-card-label">' + esc(label) + '</span></button>';
    }).join('');
    el('ljc-quiz').innerHTML =
      '<div class="ljc-question-wrap">' +
        '<div class="ljc-progress-bar"><div class="ljc-progress-fill" style="width:3%"></div></div>' +
        '<div class="ljc-nav"><span></span><p class="ljc-step-label">Steg 1</p></div>' +
        '<h2 class="ljc-q-title">' + esc(psTitle) + '</h2>' +
        '<p class="ljc-q-sub">' + esc(psSub) + '</p>' +
        '<div class="ljc-cards ljc-cols-3">' + html + '</div>' +
      '</div>';
    attachFallbacks();
    document.querySelectorAll('.ljc-card[data-path]').forEach(function (card) {
      card.addEventListener('click', function () {
        path = this.dataset.path; answers = {}; unsureCount = 0; snapshots = [];
        if (path === 'A') { renderAQ1(); }
        else if (path === 'B') { questions = buildPathB(); preState.backTo = 'path_select'; startQuiz(); }
        else { renderCQ1(); }
      });
    });
  }

  // ── A-Q1 ──────────────────────────────────────────────────────────────────
  function renderAQ1() {
    var aq1Title = qStr('aq1', 'title') || 'Hur mycket vet du redan om vad din partner vill ha?';
    var aq1Sub   = qStr('aq1', 'sub')   || 'Vi anpassar frågorna efter vad du redan känner till';
    var cards = AQ1_OPTIONS.map(function (o) { return renderCard(o, false, true, 'aq1'); }).join('');
    el('ljc-quiz').innerHTML =
      '<div class="ljc-question-wrap">' +
        '<div class="ljc-progress-bar"><div class="ljc-progress-fill" style="width:5%"></div></div>' +
        '<div class="ljc-nav"><button class="ljc-back-btn" id="ljc-aq1-back" type="button">← Tillbaka</button><p class="ljc-step-label">Steg 2</p></div>' +
        '<h2 class="ljc-q-title">' + esc(aq1Title) + '</h2>' +
        '<p class="ljc-q-sub">' + esc(aq1Sub) + '</p>' +
        '<div class="ljc-cards ljc-cols-1 ljc-cards--text">' + cards + '</div>' +
      '</div>';
    attachFallbacks();
    el('ljc-aq1-back').addEventListener('click', renderPathSelect);
    document.querySelectorAll('.ljc-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var dest = AQ1_OPTIONS.filter(function(o){ return o.id === this.dataset.oid; }.bind(this))[0];
        if (!dest) { return; }
        if (dest.dest === 'checklist') { renderAChecklist(); }
        else { questions = buildPathA([], true); preState.backTo = 'a_q1'; startQuiz(); }
      });
    });
  }

  // ── A-CHECKLIST ────────────────────────────────────────────────────────────
  function renderChecklist(items, backFn, nextFn, title, subtitle, qid) {
    var checked = [];
    var itemsHtml = items.map(function (it) {
      var itemLabel = (qid ? oStr(qid, it.id, 'label') : null) || it.label;
      var itemSub   = (qid ? oStr(qid, it.id, 'sub')   : null) || it.sub || '';
      return '<div class="ljc-checklist-item" data-item="' + esc(it.id) + '">' +
        '<div class="ljc-check-icon"></div>' +
        '<div class="ljc-check-content"><strong>' + esc(itemLabel) + '</strong>' +
        (itemSub ? '<span>' + esc(itemSub) + '</span>' : '') + '</div></div>';
    }).join('');
    el('ljc-quiz').innerHTML =
      '<div class="ljc-question-wrap">' +
        '<div class="ljc-progress-bar"><div class="ljc-progress-fill" style="width:8%"></div></div>' +
        '<div class="ljc-nav"><button class="ljc-back-btn" id="ljc-cl-back" type="button">← Tillbaka</button><p class="ljc-step-label">Steg 3</p></div>' +
        '<h2 class="ljc-q-title">' + esc(title) + '</h2>' +
        '<p class="ljc-q-sub">' + esc(subtitle) + '</p>' +
        '<p class="ljc-checklist-note">Markera det du redan känner till – vi frågar bara om resten.</p>' +
        '<div class="ljc-checklist" id="ljc-checklist">' + itemsHtml + '</div>' +
        '<div class="ljc-multi-next-wrap"><button class="ljc-btn-primary" id="ljc-cl-next" type="button">Nästa →</button></div>' +
      '</div>';
    el('ljc-cl-back').addEventListener('click', backFn);
    document.querySelectorAll('.ljc-checklist-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var id = this.dataset.item, idx = checked.indexOf(id);
        if (idx !== -1) { checked.splice(idx, 1); this.classList.remove('ljc-checked'); }
        else { checked.push(id); this.classList.add('ljc-checked'); }
      });
    });
    el('ljc-cl-next').addEventListener('click', function () { nextFn(checked.slice()); });
  }

  function renderAChecklist() {
    var clTitle = qStr('a_checklist', 'title') || 'Vad vet du redan?';
    var clSub   = qStr('a_checklist', 'sub')   || 'Kryssa för det du redan känner till – vi ger dig bara frågor om resten';
    renderChecklist(
      A_CHECKLIST_ITEMS,
      renderAQ1,
      function (checked) {
        preState.checkedItems = checked;
        questions = buildPathA(checked, false);
        preState.backTo = 'a_checklist';
        startQuiz();
      },
      clTitle,
      clSub,
      'a_checklist'
    );
  }

  // ── C-Q1 ──────────────────────────────────────────────────────────────────
  function renderCQ1() {
    var cq1Title = qStr('cq1', 'title') || 'Var börjar du idag?';
    var cq1Sub   = qStr('cq1', 'sub')   || 'Hjälper mig anpassa upplevelsen efter dig';
    var cards = CQ1_OPTIONS.map(function (o) { return renderCard(o, false, true, 'cq1'); }).join('');
    el('ljc-quiz').innerHTML =
      '<div class="ljc-question-wrap">' +
        '<div class="ljc-progress-bar"><div class="ljc-progress-fill" style="width:5%"></div></div>' +
        '<div class="ljc-nav"><button class="ljc-back-btn" id="ljc-cq1-back" type="button">← Tillbaka</button><p class="ljc-step-label">Steg 2</p></div>' +
        '<h2 class="ljc-q-title">' + esc(cq1Title) + '</h2>' +
        '<p class="ljc-q-sub">' + esc(cq1Sub) + '</p>' +
        '<div class="ljc-cards ljc-cols-1 ljc-cards--text">' + cards + '</div>' +
      '</div>';
    attachFallbacks();
    el('ljc-cq1-back').addEventListener('click', renderPathSelect);
    document.querySelectorAll('.ljc-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var opt = CQ1_OPTIONS.filter(function(o){ return o.id === this.dataset.oid; }.bind(this))[0];
        if (!opt) { return; }
        preState.cq1Dest = opt.dest;
        if (opt.dest === 'checklist') { renderCChecklist(); }
        else if (opt.dest === 'reference') { renderCReference(); }
        else {
          questions = buildPathC(opt.dest, []);
          preState.backTo = 'c_q1'; startQuiz();
        }
      });
    });
  }

  function renderCChecklist() {
    var clTitle = qStr('c_checklist', 'title') || 'Vad vet du redan om din ring?';
    var clSub   = qStr('c_checklist', 'sub')   || 'Kryssa för det du redan vet – vi frågar bara om resten';
    renderChecklist(
      A_CHECKLIST_ITEMS,
      renderCQ1,
      function (checked) {
        preState.checkedItems = checked;
        questions = buildPathC('checklist', checked);
        preState.backTo = 'c_checklist';
        startQuiz();
      },
      clTitle,
      clSub,
      'c_checklist'
    );
  }

  function renderCReference() {
    el('ljc-quiz').innerHTML =
      '<div class="ljc-question-wrap">' +
        '<div class="ljc-progress-bar"><div class="ljc-progress-fill" style="width:5%"></div></div>' +
        '<div class="ljc-nav"><button class="ljc-back-btn" id="ljc-ref-back" type="button">← Tillbaka</button><p class="ljc-step-label">Steg 3</p></div>' +
        '<h2 class="ljc-q-title">Beskriv ringen du fastnat för</h2>' +
        '<p class="ljc-q-sub">Berätta om ringen du gillar — vad lockar dig till den?</p>' +
        '<textarea class="ljc-textarea" id="ljc-ref-desc" placeholder="T.ex. &#39;En oval sten med tunna band i ros&eacute;guld, ganska diskret...&#39;" rows="4"></textarea>' +
        '<div class="ljc-multi-next-wrap"><button class="ljc-btn-primary" id="ljc-ref-next" type="button">Fortsätt →</button></div>' +
      '</div>';
    el('ljc-ref-back').addEventListener('click', renderCQ1);
    el('ljc-ref-next').addEventListener('click', function () {
      answers['c_reference'] = (el('ljc-ref-desc').value || '').trim();
      questions = buildPathC('visual', []);
      preState.backTo = 'c_q1'; startQuiz();
    });
  }

  // ── Question renderer ──────────────────────────────────────────────────────
  function renderQuestion(index) {
    var q         = questions[index];
    var total     = questions.length + 2; // +path select +pre-question
    var pct       = Math.round(((index + 3) / (total + 2)) * 100);
    var prevAns   = answers[q.id];
    var selIds    = prevAns ? (Array.isArray(prevAns) ? prevAns : [prevAns]) : [];
    var isMulti   = q.type === 'multi';
    var maxSel    = q.max || 1;
    var textOnly  = !!q.textOnly;

    var cardsHtml = q.options.map(function (opt) { return renderCard(opt, selIds.indexOf(opt.id) !== -1, textOnly, q.id); }).join('');
    var multiHint = isMulti ? '<p class="ljc-multi-hint">Välj upp till ' + maxSel + ' alternativ</p>' : '';
    var nextBtn   = isMulti ? '<div class="ljc-multi-next-wrap"><button class="ljc-btn-primary" id="ljc-multi-next" type="button"' + (selIds.length === 0 ? ' disabled' : '') + '>Nästa →</button></div>' : '';

    el('ljc-quiz').innerHTML =
      '<div class="ljc-question-wrap">' +
        '<div class="ljc-progress-bar"><div class="ljc-progress-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="ljc-nav"><button class="ljc-back-btn" id="ljc-back" type="button">&#8592; Tillbaka</button>' + dotsHtml(index) + '<p class="ljc-step-label">Steg ' + (index + 3) + ' av ' + (questions.length + 2) + '</p></div>' +
        multiHint +
        '<h2 class="ljc-q-title">' + esc(qStr(q.id, 'title') || q.title) + '</h2>' +
        '<p class="ljc-q-sub">' + esc(qStr(q.id, 'sub') || q.subtitle || '') + '</p>' +
        '<div class="ljc-cards ljc-cols-' + q.cols + (textOnly ? ' ljc-cards--text' : '') + '">' + cardsHtml + '</div>' +
        nextBtn +
      '</div>';

    attachFallbacks();

    el('ljc-back').addEventListener('click', function () {
      if (index > 0) { restoreSnapshot(index - 1); }
      else {
        var bt = preState.backTo;
        if      (bt === 'a_q1')        { renderAQ1(); }
        else if (bt === 'a_checklist') { renderAChecklist(); }
        else if (bt === 'c_q1')        { renderCQ1(); }
        else if (bt === 'c_checklist') { renderCChecklist(); }
        else                           { renderPathSelect(); }
      }
    });

    var dotsContainer = el('ljc-quiz').querySelector('.ljc-step-dots');
    if (dotsContainer) {
      dotsContainer.querySelectorAll('.ljc-step-dot--done').forEach(function (dot) {
        dot.addEventListener('click', function () {
          restoreSnapshot(parseInt(this.dataset.snap, 10));
        });
      });
    }

    if (isMulti) {
      var pending = selIds.slice();
      function refreshMulti() {
        var nb = el('ljc-multi-next');
        if (nb) { nb.disabled = pending.length === 0; }
        document.querySelectorAll('.ljc-card').forEach(function (c) { c.classList.toggle('ljc-selected', pending.indexOf(c.dataset.oid) !== -1); });
      }
      document.querySelectorAll('.ljc-card').forEach(function (card) {
        card.addEventListener('click', function () {
          var oid = this.dataset.oid, idx = pending.indexOf(oid);
          if (idx !== -1) { pending.splice(idx, 1); }
          else if (pending.length < maxSel) { pending.push(oid); }
          else { pending.shift(); pending.push(oid); }
          refreshMulti();
        });
      });
      var nb = el('ljc-multi-next');
      if (nb) { nb.addEventListener('click', function () { if (pending.length > 0) { answers[q.id] = pending.slice(); advance(); } }); }
    } else {
      document.querySelectorAll('.ljc-card').forEach(function (card) {
        card.addEventListener('click', function () {
          document.querySelectorAll('.ljc-card').forEach(function (c) { c.classList.remove('ljc-selected'); });
          this.classList.add('ljc-selected');
          answers[q.id] = this.dataset.oid;
          setTimeout(advance, 280);
        });
      });
    }
  }

  function advance() {
    var extra = getBranchQuestions();
    if (extra) {
      var args = [currentStep + 1, 0].concat(extra);
      Array.prototype.splice.apply(questions, args);
    }
    currentStep++;
    if (currentStep < questions.length) {
      snapshots[currentStep] = { step: currentStep, questions: questions.slice(), answers: JSON.parse(JSON.stringify(answers)) };
      renderQuestion(currentStep);
    } else {
      renderResults();
    }
  }

  // ── Results ────────────────────────────────────────────────────────────────
  function renderResults() {
    var result = computeResult();
    var prof   = getProf(result.style.primary);
    var prof2  = result.style.hybrid ? getProf(result.style.secondary) : null;

    var hybridHtml = prof2 ? '<p class="ljc-hybrid-note">Din smak rör sig mellan <strong>' + esc(prof.name) + '</strong> och <strong>' + esc(prof2.name) + '</strong>.</p>' : '';
    var confHtml = unsureCount >= 4
      ? '<div class="ljc-confidence ljc-confidence--low"><p>Du är nära — ett snabbt samtal med vår ringspecialist tar dig hela vägen dit.</p></div>'
      : unsureCount >= 2
        ? '<div class="ljc-confidence ljc-confidence--mid"><p>Några detaljer kan fortfarande förfinas — vår specialist hjälper dig på 15 minuter.</p></div>'
        : '';

    var rows = [
      ['Stil',       prof.name + (prof2 ? ' / ' + prof2.name : '')],
      ['Metall',     METAL_LABELS[result.metal]    || result.metal],
      ['Stenform',   SHAPE_LABELS[result.shape]    || result.shape],
      ['Infattning', MOUNT_LABELS[result.mounting] || result.mounting],
      ['Kramlor',    PRONG_LABELS[result.prong]    || result.prong],
      ['Band',       BAND_LABELS[result.band]      || result.band],
      ['Känsla',     FEEL_LABELS[result.feel]      || result.feel],
      ['Budget',     BUDGET_LABELS[result.budget]  || result.budget]
    ];
    var tableHtml = rows.map(function (r) { return '<tr><th>' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>'; }).join('');

    // Ring recommendations for this profile
    var profRings  = RINGS_DATA[result.style.primary] || [];
    var ringsHtml  = '';
    var validRings = profRings.filter(function (r) { return r.name && r.url; });
    if (validRings.length > 0) {
      var cards = validRings.map(function (r) {
        return '<a class="ljc-ring-card" href="' + esc(r.url) + '" target="_blank" rel="noopener noreferrer">' +
          (r.img ? '<div class="ljc-ring-img"><img src="' + esc(r.img) + '" alt="' + esc(r.name) + '" loading="lazy"></div>' : '<div class="ljc-ring-img ljc-ring-img--empty">💍</div>') +
          '<span class="ljc-ring-name">' + esc(r.name) + '</span>' +
          '<span class="ljc-ring-cta">Se ringen &rarr;</span>' +
          '</a>';
      }).join('');
      ringsHtml = '<div class="ljc-ring-section"><h3>Ringar för din profil</h3><div class="ljc-ring-grid">' + cards + '</div></div>';
    }

    var quizEl = document.getElementById('ljc-quiz');
    if (!quizEl) { return; }

    // ── Save anonymous lead (fire-and-forget, no UI impact) ─────────────────
    if (AJAX_URL && NONCE) {
      var fd = new FormData();
      fd.append('action',          'ljc_lead');
      fd.append('nonce',           NONCE);
      fd.append('path',            path || '');
      fd.append('style_primary',   result.style.primary);
      fd.append('style_secondary', result.style.secondary || '');
      fd.append('metal',           result.metal);
      fd.append('shape',           result.shape);
      fd.append('mounting',        result.mounting);
      fd.append('prong',           result.prong);
      fd.append('band',            result.band);
      fd.append('feel',            result.feel);
      fd.append('budget',          result.budget);
      currentLeadId = null;
      fetch(AJAX_URL, { method: 'POST', body: fd })
        .then(function (r) { return r.json(); })
        .then(function (data) { if (data && data.success && data.data) { currentLeadId = data.data.lead_id || null; } })
        .catch(function () {});
    }

    quizEl.innerHTML =
      '<div class="ljc-results">' +

        '<div class="ljc-progress-bar"><div class="ljc-progress-fill" style="width:100%"></div></div>' +
        '<div class="ljc-nav"><button class="ljc-back-btn" id="ljc-back-res" type="button">&#8592; Tillbaka</button><span></span></div>' +

        '<div class="ljc-res-hero">' +
          '<p class="ljc-eyebrow">Din ringprofil</p>' +
          '<h2 class="ljc-q-title">' + esc(prof.name) + '</h2>' +
          hybridHtml +
          '<blockquote class="ljc-profile-quote">"' + esc(prof.quote) + '"</blockquote>' +
          confHtml +
        '</div>' +

        '<div class="ljc-profile-card"><table class="ljc-profile-table">' + tableHtml + '</table></div>' +

        '<div class="ljc-profile-spec">' +
          '<h3 class="ljc-spec-heading">Vad detta inneb&#228;r f&#246;r din ring</h3>' +
          '<ul class="ljc-spec-list">' +
            '<li><strong>Sten:</strong> '                + esc(prof.stone)    + '</li>' +
            '<li><strong>Infattning:</strong> '          + esc(prof.mounting) + '</li>' +
            '<li><strong>Kramlor:</strong> '             + esc(prof.prongs)   + '</li>' +
            '<li><strong>Band:</strong> '                + esc(prof.band)     + '</li>' +
            '<li><strong>Metall:</strong> '              + esc(prof.metal)    + '</li>' +
            '<li><strong>Rekommenderat karat:</strong> ' + esc(prof.carat)    + '</li>' +
          '</ul>' +
        '</div>' +

        ringsHtml +

        '<div class="ljc-upload-section">' +
          '<h3 class="ljc-upload-heading">Har du en inspirationsbild?</h3>' +
          '<p class="ljc-upload-text">Ladda upp en bild på en ring du gillar — vi tar med den i din konsultation.</p>' +
          '<label class="ljc-upload-label" for="ljc-img-file">' +
            '<div class="ljc-upload-area" id="ljc-upload-area">' +
              '<span class="ljc-upload-icon">&#128247;</span>' +
              '<span class="ljc-upload-prompt">Klicka för att välja bild</span>' +
            '</div>' +
            '<input type="file" id="ljc-img-file" accept="image/*" style="display:none">' +
          '</label>' +
          '<div id="ljc-upload-preview"></div>' +
          '<div class="ljc-upload-status" id="ljc-upload-status"></div>' +
        '</div>' +

        '<div class="ljc-booking-section">' +
          '<h3 class="ljc-cta-heading">Redo att hitta din ring?</h3>' +
          '<p class="ljc-cta-text">Boka en kostnadsfri konsultation med Lilian och ta med dig din ringprofil.</p>' +
          '<a href="' + esc(AMELIA) + '" class="ljc-btn-primary ljc-cta-btn">Boka konsultation &#8594;</a>' +
        '</div>' +

      '</div>';

    // Apply styles via DOM after innerHTML to guarantee they survive any theme interference
    forceStyle(quizEl.querySelector('.ljc-res-hero'), {
      'text-align': 'center', 'max-width': '680px', 'margin': '0 auto 40px'
    });
    forceStyle(quizEl.querySelector('.ljc-res-hero .ljc-eyebrow'),    { 'text-align': 'center' });
    forceStyle(quizEl.querySelector('.ljc-res-hero .ljc-q-title'),    { 'text-align': 'center' });
    forceStyle(quizEl.querySelector('.ljc-res-hero .ljc-hybrid-note'),{ 'text-align': 'center' });
    forceStyle(quizEl.querySelector('.ljc-profile-quote'), {
      'text-align': 'center', 'border': 'none', 'padding': '0'
    });
    forceStyle(quizEl.querySelector('.ljc-profile-card'), {
      'max-width': '680px', 'margin': '0 auto 32px'
    });
    forceStyle(quizEl.querySelector('.ljc-profile-spec'), {
      'max-width': '680px', 'margin': '0 auto 40px'
    });
    forceStyle(quizEl.querySelector('.ljc-spec-heading'), {
      'font-size': '11px', 'font-weight': '600', 'letter-spacing': '0.12em',
      'text-transform': 'uppercase', 'color': '#0f4528', 'margin': '0 0 16px',
      'font-family': 'Poppins, sans-serif'
    });
    forceStyle(quizEl.querySelector('.ljc-spec-list'), {
      'list-style': 'none', 'padding': '0', 'margin': '0'
    });
    forceStyle(quizEl.querySelector('.ljc-booking-section'), {
      'text-align': 'center', 'padding': '56px 0 40px',
      'border-top': '1px solid #E7EBEE'
    });
    forceStyle(quizEl.querySelector('.ljc-cta-heading'), {
      'text-align': 'center', 'font-family': 'Dancing Script, cursive',
      'font-size': '40px', 'color': '#111518', 'margin': '0 0 14px'
    });
    forceStyle(quizEl.querySelector('.ljc-cta-text'), {
      'text-align': 'center', 'color': '#777', 'font-size': '15px',
      'margin': '0 auto 32px', 'max-width': '420px', 'line-height': '1.6'
    });
    forceStyle(quizEl.querySelector('.ljc-cta-btn'), {
      'display': 'inline-block', 'background': '#111518', 'color': '#FBFBFC',
      'text-decoration': 'none', 'border': 'none', 'border-radius': '40px',
      'padding': '17px 52px', 'font-size': '15px', 'font-family': 'Poppins, sans-serif',
      'font-weight': '500', 'letter-spacing': '0.04em', 'cursor': 'pointer',
      'box-shadow': '0 4px 18px rgba(17,21,24,0.22)'
    });

    forceStyle(quizEl.querySelector('.ljc-upload-section'), {
      'max-width': '680px', 'margin': '0 auto 40px', 'padding': '32px 28px',
      'background': '#F9FAF8', 'border-radius': '16px', 'text-align': 'center',
      'border': '1px solid #E7EBEE'
    });
    forceStyle(quizEl.querySelector('.ljc-upload-heading'), {
      'font-family': 'Poppins, sans-serif', 'font-size': '18px',
      'font-weight': '600', 'color': '#111518', 'margin': '0 0 8px'
    });
    forceStyle(quizEl.querySelector('.ljc-upload-text'), {
      'color': '#777', 'font-size': '14px', 'margin': '0 0 20px',
      'line-height': '1.5'
    });
    forceStyle(quizEl.querySelector('.ljc-upload-area'), {
      'border': '2px dashed #D0D5DA', 'border-radius': '12px',
      'padding': '32px 24px', 'display': 'flex', 'flex-direction': 'column',
      'align-items': 'center', 'gap': '8px', 'cursor': 'pointer',
      'transition': 'border-color 0.2s, background 0.2s'
    });
    forceStyle(quizEl.querySelector('.ljc-upload-icon'), { 'font-size': '32px', 'line-height': '1' });
    forceStyle(quizEl.querySelector('.ljc-upload-prompt'), {
      'font-size': '14px', 'color': '#555', 'font-family': 'Poppins, sans-serif'
    });

    // ── Image upload logic ────────────────────────────────────────────────────
    var uploadInput  = quizEl.querySelector('#ljc-img-file');
    var uploadArea   = quizEl.querySelector('#ljc-upload-area');
    var uploadStatus = quizEl.querySelector('#ljc-upload-status');
    var uploadPrev   = quizEl.querySelector('#ljc-upload-preview');

    var doUpload = function (file) {
      if (!AJAX_URL || !NONCE) { return; }
      if (uploadStatus) { uploadStatus.textContent = 'Laddar upp...'; uploadStatus.style.color = '#777'; uploadStatus.style.fontSize = '13px'; uploadStatus.style.fontFamily = 'Poppins, sans-serif'; uploadStatus.style.marginTop = '12px'; }
      var ufd = new FormData();
      ufd.append('action',  'ljc_upload_reference');
      ufd.append('nonce',   NONCE);
      ufd.append('lead_id', currentLeadId || 0);
      ufd.append('file',    file);
      fetch(AJAX_URL, { method: 'POST', body: ufd })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data && data.success) {
            if (uploadStatus) { uploadStatus.textContent = 'Bilden är uppladdad! ✓'; uploadStatus.style.color = '#0f4528'; }
          } else {
            if (uploadStatus) { uploadStatus.textContent = 'Något gick fel. Försök igen.'; uploadStatus.style.color = '#c00'; }
          }
        })
        .catch(function () {
          if (uploadStatus) { uploadStatus.textContent = 'Uppladdningen misslyckades. Försök igen.'; uploadStatus.style.color = '#c00'; }
        });
    };

    if (uploadInput) {
      uploadInput.addEventListener('change', function () {
        var file = this.files[0];
        if (!file) { return; }
        var reader = new FileReader();
        reader.onload = function (ev) {
          if (uploadPrev) {
            uploadPrev.innerHTML = '<img src="' + ev.target.result + '" alt="Inspirationsbild" style="max-width:200px;max-height:200px;object-fit:cover;border-radius:12px;margin:12px auto 0;display:block;box-shadow:0 4px 16px rgba(0,0,0,0.12);">';
          }
          if (uploadArea) { uploadArea.style.display = 'none'; }
        };
        reader.readAsDataURL(file);
        if (currentLeadId) {
          doUpload(file);
        } else {
          if (uploadStatus) { uploadStatus.textContent = 'Väntar...'; uploadStatus.style.color = '#aaa'; }
          var waitAttempts = 0;
          var waitTimer = setInterval(function () {
            waitAttempts++;
            if (currentLeadId) { clearInterval(waitTimer); doUpload(file); }
            else if (waitAttempts >= 20) { clearInterval(waitTimer); doUpload(file); }
          }, 250);
        }
      });
    }

    var backBtn = quizEl.querySelector('#ljc-back-res');
    if (backBtn) {
      backBtn.addEventListener('click', function () { currentStep = questions.length - 1; renderQuestion(currentStep); });
    }
  }

  // ── Boot ───────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () { if (el('ljc-quiz')) { renderWelcome(); } });

}());
