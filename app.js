/**
 * CONGO ACTIONS — SITE PHILANTHROPIQUE (CAUSES, ONG & CAMPAGNES)
 * Met en lumière l'impact humanitaire, les ONG partenaires vérifiées,
 * les campagnes actives, le carrousel des moyens de paiement et l'application mobile.
 */

const EXCHANGE_RATE_CDF_PER_USD = 2800;

let currentCurrency = 'USD'; // 'USD' ou 'CDF'
let activeNgoFilter = 'ALL';
let activeCampFilter = 'ALL';
let currentCarouselSlide = 0;
const TOTAL_CAROUSEL_SLIDES = 4;

/* ==========================================================================
   1. RÉPERTOIRE DES ONG AFFILIÉES VÉRIFIÉES
   ========================================================================== */
const AFFILIATED_NGOS = [
  {
    id: 'ngo-panzi',
    name: 'Fondation Panzi (Dr. Denis Mukwege)',
    legalRegistrationNumber: 'Arrêté Ministériel N° 045/CAB/2021',
    sector: 'HEALTH',
    sectorLabel: 'Santé & Soins Maternels',
    icon: '🏥',
    location: 'Bukavu, Sud-Kivu, RDC',
    missionStatement:
      'Soins médicaux holistiques, maternité sécurisée, interventions chirurgicales, accompagnement psychologique et soutien communautaire pour les mères, les femmes et les enfants à l’Est de la RDC.',
    contactEmail: 'contact@fondationpanzidrc.org',
    contactPhone: '+243 998 877 665',
    impactHighlight: 'Partenaire à 40 % du Fonds d’Urgence de l’Est de la RDC',
    programsSummary: 'Soins Maternels • Unités Néonatales • Chirurgie',
    verificationDocs: [
      'Arrêté Ministériel N° 045/CAB/2021 (Vérifié)',
      'Certificat F92 — Ministère de la Justice (Vérifié)',
      'Statuts Notariés de la Fondation & Hôpital (Vérifiés)',
      'Compte Bancaire & Mobile Money Officiel de l’ONG (Vérifié)'
    ]
  },
  {
    id: 'ngo-kivu-water',
    name: 'Kivu Clean Water Initiative',
    legalRegistrationNumber: 'Certificat F92-JUST-2019-KIVU',
    sector: 'EMERGENCY',
    sectorLabel: 'Eau Potable & Urgence',
    icon: '💧',
    location: 'Goma, Nord & Sud-Kivu, RDC',
    missionStatement:
      'Forage de puits d’eau profonds à énergie solaire et installation de bornes-fontaines d’eau potable pour protéger les familles déplacées et les enfants contre le choléra et les maladies hydriques.',
    contactEmail: 'info@kivuclearwater.org',
    contactPhone: '+243 812 345 678',
    impactHighlight: 'Partenaire à 35 % du Fonds d’Urgence de l’Est de la RDC',
    programsSummary: 'Forages Solaires • Bornes-Fontaines • Kits d’Hygiène',
    verificationDocs: [
      'Arrêté Ministériel Hydraulique & Secours (Vérifié)',
      'Certificat F92-JUST-2019-KIVU (Vérifié)',
      'Statuts Notariés ASBL — Goma (Vérifiés)',
      'Compte Bancaire & M-Pesa Officiel de l’ONG (Vérifié)'
    ]
  },
  {
    id: 'ngo-orphelinat-kinshasa',
    name: 'Orphelinat de Kinshasa (Ngaliema)',
    legalRegistrationNumber: 'Certificat F92-JUST-2022-KIN',
    sector: 'CHILDREN',
    sectorLabel: 'Enfance & Orphelinats',
    icon: '🧒🏾',
    location: 'Ngaliema, Kinshasa, RDC',
    missionStatement:
      'Offrir un foyer d’accueil chaleureux, trois repas équilibrés par jour, un suivi pédiatrique, des vêtements et la scolarisation primaire à 140 enfants orphelins à Kinshasa.',
    contactEmail: 'contact@orphelinatkinshasa.cd',
    contactPhone: '+243 891 234 567',
    impactHighlight: 'Partenaire à 25 % du Fonds d’Urgence de l’Est de la RDC',
    programsSummary: 'Nutrition Infantile • Hébergement • École Primaire',
    verificationDocs: [
      'Arrêté Ministériel Affaires Sociales & Famille (Vérifié)',
      'Certificat F92-JUST-2022-KIN (Vérifié)',
      'Statuts Notariés de Protection de l’Enfance (Vérifiés)',
      'Compte Bancaire & Orange Money Officiel de l’ONG (Vérifié)'
    ]
  },
  {
    id: 'ngo-sauvons-congo',
    name: 'Sauvons Congo',
    legalRegistrationNumber: 'Certificat F92-JUST-2026-KIN',
    sector: 'EDUCATION',
    sectorLabel: 'Jeunesse & Éducation',
    icon: '🎓',
    location: 'Masina & Limete, Kinshasa, RDC',
    missionStatement:
      'Accompagner les jeunes diplômés congolais issus de milieux défavorisés grâce à des salles informatiques solaires, un accès Internet haut débit, des cours de programmation et d’insertion professionnelle.',
    contactEmail: 'contact@sauvonscongo.org',
    contactPhone: '+243 999 123 456',
    impactHighlight: 'Campagnes 100 % dédiées à l’éducation des jeunes',
    programsSummary: 'Laboratoires Solaires • Programmation • Fournitures Scolaires',
    verificationDocs: [
      'Arrêté Ministériel Jeunesse & Éducation (Vérifié)',
      'Certificat F92-JUST-2026-KIN (Vérifié)',
      'Statuts Notariés de l’ASBL (Vérifiés)',
      'Compte Bancaire & Mobile Money Officiel de l’ONG (Vérifié)'
    ]
  }
];

/* ==========================================================================
   2. CAMPAGNES HUMANITAIRES ACTIVES
   ========================================================================== */
const CAMPAIGNS_DATA = [
  {
    id: 'camp-eastern-pool',
    title: 'Fonds d’Urgence et de Santé de l’Est de la RDC',
    subtitle:
      'Un don partagé soutenant les soins maternels d’urgence, les puits d’eau potable et la nutrition des orphelins auprès de 3 ONG vérifiées.',
    fullStory:
      'Les familles et les enfants de l’Est de la RDC font face à des besoins médicaux et alimentaires urgents. Lorsque vous contribuez à ce Fonds Commun, votre don est automatiquement réparti entre trois partenaires locaux de confiance : 40 % à la Fondation Panzi pour les soins maternels et chirurgicaux à Bukavu, 35 % à Kivu Clean Water Initiative pour les forages d’eau solaire à Goma, et 25 % à l’Orphelinat de Kinshasa pour l’alimentation et l’hébergement des enfants.',
    impactMilestones: [
      '120 kits d’accouchement médicalisés et réfrigérateurs solaires livrés à Bukavu',
      'Bornes d’eau potable desservant les mères et les enfants déplacés à Goma',
      'Repas chauds quotidiens et suivi pédiatrique pour les enfants orphelins'
    ],
    category: 'HEALTH',
    categoryLabel: 'Fonds d’Urgence & Santé',
    categoryBadgeClass: 'badge-apricot',
    isPooledFund: true,
    ngoName: 'Fondation Panzi, Kivu Clean Water & Orphelinat de Kinshasa',
    supportersCount: 412,
    targetAmountUsdCents: 10000000, // 100 000 $
    raisedAmountUsdCents: 4285000,  // 42 850 $
    targetAmountCdf: 280000000,
    raisedAmountCdf: 120000000,
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80',
    location: 'Goma, Bukavu & Kinshasa'
  },
  {
    id: 'camp-orphans-kinshasa',
    title: 'Repas Nutritifs & Scolarisation pour 140 Orphelins',
    subtitle:
      'Assurer trois repas par jour, des uniformes scolaires et les frais d’école primaire pour 140 enfants à Ngaliema.',
    fullStory:
      'L’Orphelinat de Kinshasa (Ngaliema) accueille 140 enfants orphelins et vulnérables, de la petite enfance jusqu’à l’école primaire. Votre soutien finance toute l’année des denrées alimentaires nutritives (riz, haricots, fruits frais et lait), des uniformes scolaires neufs, des cahiers ainsi que les frais de scolarité afin que chaque enfant grandisse en bonne santé et sur les bancs de l’école.',
    impactMilestones: [
      '420 repas nutritifs préparés chaque jour pour les 140 enfants du foyer',
      '100 % des enfants en âge scolaire inscrits à l’école primaire locale',
      'Moustiquaires, literie propre et visites mensuelles d’un infirmier pédiatrique'
    ],
    category: 'CHILDREN',
    categoryLabel: 'Enfance & Orphelinats',
    categoryBadgeClass: 'badge-buttercream',
    isPooledFund: false,
    ngoName: 'Orphelinat de Kinshasa (Ngaliema)',
    supportersCount: 198,
    targetAmountUsdCents: 2500000, // 25 000 $
    raisedAmountUsdCents: 1640000, // 16 400 $
    targetAmountCdf: 70000000,
    raisedAmountCdf: 45920000,
    imageUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1000&q=80',
    location: 'Ngaliema, Kinshasa, RDC'
  },
  {
    id: 'camp-solar-water-goma',
    title: 'Eau Potable Solaire pour 10 000 Familles Déplacées',
    subtitle:
      'Forage de 4 puits d’eau profonds à énergie solaire et bornes-fontaines dans les camps de Mugunga près de Goma.',
    fullStory:
      'L’accès à une eau propre et salubre est le moyen le plus efficace de prévenir le choléra et de protéger les jeunes enfants dans les camps de déplacés autour de Goma. Kivu Clean Water Initiative réalise quatre forages solaires à 120 mètres de profondeur équipés de systèmes de filtration et de rampes de distribution pour que les mères et les enfants n’aient plus à parcourir des kilomètres.',
    impactMilestones: [
      '2 forages solaires déjà opérationnels distribuant 15 000 litres d’eau par jour',
      'Autonomie énergétique totale grâce aux panneaux solaires haute performance',
      'Comités locaux formés à l’entretien durable des stations d’eau'
    ],
    category: 'EMERGENCY',
    categoryLabel: 'Eau Potable & Urgence',
    categoryBadgeClass: 'badge-mint',
    isPooledFund: false,
    ngoName: 'Kivu Clean Water Initiative',
    supportersCount: 326,
    targetAmountUsdCents: 6000000, // 60 000 $
    raisedAmountUsdCents: 3890000, // 38 900 $
    targetAmountCdf: 168000000,
    raisedAmountCdf: 108920000,
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=1000&q=80',
    location: 'Camp de Mugunga, Goma, RDC'
  },
  {
    id: 'camp-code-for-congo',
    title: 'Code for Congo : Salles Informatiques Solaires pour 500 Jeunes',
    subtitle:
      'Équipement de deux centres informatiques communautaires à énergie solaire à Kinshasa (Masina & Limete).',
    fullStory:
      'Des milliers de jeunes diplômés congolais terminent leurs études secondaires sans jamais avoir eu accès à un ordinateur ou à une connexion électrique stable. Sauvons Congo équipe deux centres d’apprentissage solaires à Masina et Limete avec des ordinateurs portables, une connexion Internet par satellite et des formations gratuites aux métiers du numérique.',
    impactMilestones: [
      '40 ordinateurs et batteries solaires installés dans le premier centre de Masina',
      'Formations gratuites de 6 mois au numérique et à la programmation (16–24 ans)',
      'Mentorat et accompagnement vers l’emploi et le travail indépendant'
    ],
    category: 'EDUCATION',
    categoryLabel: 'Jeunesse & Éducation',
    categoryBadgeClass: 'badge-cerulean',
    isPooledFund: false,
    ngoName: 'Sauvons Congo',
    supportersCount: 164,
    targetAmountUsdCents: 3500000, // 35 000 $
    raisedAmountUsdCents: 1820000, // 18 200 $
    targetAmountCdf: 98000000,
    raisedAmountCdf: 50960000,
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
    location: 'Masina & Limete, Kinshasa, RDC'
  },
  {
    id: 'camp-panzi-maternal',
    title: 'Maternité Sans Risque & Soins Néonatals au Sud-Kivu',
    subtitle:
      'Fourniture de kits d’accouchement stériles, couveuses solaires et soins postnatals pour 600 futures mamans à Bukavu.',
    fullStory:
      'Menée par la Fondation Panzi à Bukavu, cette campagne équipe les maternités et cliniques rurales du Sud-Kivu en kits d’accouchement stériles, couveuses solaires pour les nouveau-nés prématurés et médicaments essentiels afin que chaque mère puisse donner la vie en toute sécurité.',
    impactMilestones: [
      '600 kits d’accouchement stériles financés pour les futures mamans',
      'Alimentation solaire 24h/24 pour les couveuses néonatales à Bukavu',
      'Suivi nutritionnel postnatal et vaccination gratuite des nouveau-nés'
    ],
    category: 'HEALTH',
    categoryLabel: 'Santé & Hôpital Panzi',
    categoryBadgeClass: 'badge-apricot',
    isPooledFund: false,
    ngoName: 'Fondation Panzi (Dr. Denis Mukwege)',
    supportersCount: 245,
    targetAmountUsdCents: 4000000, // 40 000 $
    raisedAmountUsdCents: 2240000, // 22 400 $
    targetAmountCdf: 112000000,
    raisedAmountCdf: 62720000,
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80',
    location: 'Bukavu, Sud-Kivu, RDC'
  }
];

/* ==========================================================================
   3. FORMATAGE DES MONTANTS EN FRANÇAIS
   ========================================================================== */
function formatCampaignAmount(usdCents, cdfUnits, currency = currentCurrency) {
  if (currency === 'USD') {
    const usd = Math.round(usdCents / 100);
    return new Intl.NumberFormat('fr-FR').format(usd) + ' $';
  } else {
    return new Intl.NumberFormat('fr-FR').format(cdfUnits) + ' FC';
  }
}

/* ==========================================================================
   4. AFFICHAGE DES CAMPAGNES ACTIVES
   ========================================================================== */
function renderCampaigns() {
  const gridEl = document.getElementById('campaigns-grid');
  if (!gridEl) return;

  const filtered =
    activeCampFilter === 'ALL'
      ? CAMPAIGNS_DATA
      : CAMPAIGNS_DATA.filter((c) => c.category === activeCampFilter);

  gridEl.innerHTML = filtered
    .map((camp) => {
      const pct = Math.min(
        100,
        Math.round((camp.raisedAmountUsdCents / Math.max(1, camp.targetAmountUsdCents)) * 100)
      );
      const raisedFormatted = formatCampaignAmount(
        camp.raisedAmountUsdCents,
        camp.raisedAmountCdf,
        currentCurrency
      );
      const targetFormatted = formatCampaignAmount(
        camp.targetAmountUsdCents,
        camp.targetAmountCdf,
        currentCurrency
      );

      return `
        <article class="campaign-card">
          <div class="camp-media">
            <img src="${camp.imageUrl}" alt="${camp.title}" loading="lazy" />
            <div class="camp-badges-top">
              <span class="camp-cat-pill ${camp.categoryBadgeClass}">${camp.categoryLabel}</span>
              <span class="camp-ver-pill">✓ ONG Vérifiée</span>
            </div>
          </div>

          <div class="camp-content">
            <div class="camp-location-row">
              <span>📍 ${camp.location}</span>
              ${
                camp.isPooledFund
                  ? '<span class="camp-pool-tag">🤝 Fonds Partagé (3 ONG)</span>'
                  : `<span>❤️ ${camp.supportersCount} Donateurs</span>`
              }
            </div>

            <h3>${camp.title}</h3>
            <div class="camp-ngo-byline">Par ${camp.ngoName}</div>
            <p class="camp-subtitle">${camp.subtitle}</p>

            <div class="camp-progress-box">
              <div class="progress-bar-outer" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Progression de la collecte ${camp.title}">
                <div class="progress-bar-inner" style="width: ${pct}%"></div>
              </div>
              <div class="camp-progress-nums">
                <span><strong>${raisedFormatted}</strong> collectés sur ${targetFormatted}</span>
                <strong>${pct} %</strong>
              </div>
            </div>

            <div class="camp-actions-row">
              <button type="button" class="btn btn-secondary read-camp-story-btn" data-camp-id="${camp.id}">
                Lire l'histoire
              </button>
              <button type="button" class="btn btn-warm open-app-modal-btn" data-context="Soutenir « ${camp.title} » dans l'application Congo Actions">
                Donner via l'App →
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  gridEl.querySelectorAll('.read-camp-story-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      openCampaignStoryModal(btn.getAttribute('data-camp-id'));
    });
  });

  bindAppModalTriggers(gridEl);
}

/* ==========================================================================
   5. AFFICHAGE DU RÉPERTOIRE DES ONG AFFILIÉES
   ========================================================================== */
function renderAffiliatedNgos() {
  const gridEl = document.getElementById('ngo-directory-grid');
  if (!gridEl) return;

  const filtered =
    activeNgoFilter === 'ALL'
      ? AFFILIATED_NGOS
      : AFFILIATED_NGOS.filter((n) => n.sector === activeNgoFilter);

  gridEl.innerHTML = filtered
    .map(
      (ngo) => `
      <article class="ngo-card">
        <div>
          <div class="ngo-card-top">
            <div class="ngo-icon-box" aria-hidden="true">${ngo.icon}</div>
            <span class="ngo-verified-pill">✓ ONG VÉRIFIÉE</span>
          </div>
          <h3>${ngo.name}</h3>
          <span class="ngo-reg-code">${ngo.legalRegistrationNumber}</span>
          <p class="ngo-mission">${ngo.missionStatement}</p>
        </div>

        <div>
          <ul class="ngo-meta-list">
            <li>📍 <strong>Siège :</strong> ${ngo.location}</li>
            <li>🌟 <strong>Domaines :</strong> ${ngo.programsSummary}</li>
            <li>🤝 <strong>Rôle :</strong> ${ngo.impactHighlight}</li>
          </ul>

          <div class="ngo-card-actions">
            <button type="button" class="btn btn-secondary inspect-ngo-btn" data-ngo-id="${ngo.id}">
              Profil de l'ONG
            </button>
            <button type="button" class="btn btn-primary open-app-modal-btn" data-context="Soutenir ${ngo.name} dans l'application Congo Actions">
              Soutenir via l'App
            </button>
          </div>
        </div>
      </article>
    `
    )
    .join('');

  gridEl.querySelectorAll('.inspect-ngo-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      openNgoProfileModal(btn.getAttribute('data-ngo-id'));
    });
  });

  bindAppModalTriggers(gridEl);
}

/* ==========================================================================
   6. CARROUSEL DES MOYENS DE PAIEMENT
   ========================================================================== */
function goToCarouselSlide(index) {
  const track = document.getElementById('payment-carousel-track');
  const dots = document.querySelectorAll('#payment-carousel-dots .carousel-dot');
  if (!track) return;

  currentCarouselSlide = (index + TOTAL_CAROUSEL_SLIDES) % TOTAL_CAROUSEL_SLIDES;
  track.style.transform = `translateX(-${currentCarouselSlide * 100}%)`;

  dots.forEach((dot, idx) => {
    const isActive = idx === currentCarouselSlide;
    dot.classList.toggle('active', isActive);
    dot.setAttribute('aria-selected', String(isActive));
  });
}

function initPaymentCarousel() {
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');
  const dots = document.querySelectorAll('#payment-carousel-dots .carousel-dot');
  const viewport = document.getElementById('payment-carousel-viewport');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToCarouselSlide(currentCarouselSlide - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToCarouselSlide(currentCarouselSlide + 1));
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetSlide = Number(dot.getAttribute('data-slide') || 0);
      goToCarouselSlide(targetSlide);
    });
  });

  if (viewport) {
    let startX = 0;
    viewport.addEventListener(
      'touchstart',
      (e) => {
        startX = e.touches[0].clientX;
      },
      { passive: true }
    );
    viewport.addEventListener(
      'touchend',
      (e) => {
        const diffX = startX - e.changedTouches[0].clientX;
        if (Math.abs(diffX) > 45) {
          if (diffX > 0) {
            goToCarouselSlide(currentCarouselSlide + 1);
          } else {
            goToCarouselSlide(currentCarouselSlide - 1);
          }
        }
      },
      { passive: true }
    );
  }
}

/* ==========================================================================
   7. APERÇU INTERACTIF DU DON PARTAGÉ (Section Application Mobile)
   ========================================================================== */
function updateSharedGiftPreview() {
  const inputEl = document.getElementById('sim-amount-input');
  const prefixEl = document.getElementById('sim-currency-prefix');
  const donutTotalEl = document.getElementById('sim-donut-total');
  const amtPanziEl = document.getElementById('sim-amt-panzi');
  const amtKivuEl = document.getElementById('sim-amt-kivu');
  const amtOrphanEl = document.getElementById('sim-amt-orphan');

  if (!inputEl || !donutTotalEl) return;

  const rawVal = Math.max(1, Number(inputEl.value) || 100);
  prefixEl.textContent = currentCurrency === 'USD' ? '$' : 'FC';

  if (currentCurrency === 'USD') {
    const panzi = rawVal * 0.4;
    const kivu = rawVal * 0.35;
    const orphan = rawVal * 0.25;

    const fmtUsd = (val) =>
      val.toLocaleString('fr-FR', {
        minimumFractionDigits: val % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2
      }) + ' $';

    donutTotalEl.textContent = fmtUsd(rawVal);
    amtPanziEl.textContent = fmtUsd(panzi);
    amtKivuEl.textContent = fmtUsd(kivu);
    amtOrphanEl.textContent = fmtUsd(orphan);
  } else {
    const panziCdf = Math.round(rawVal * 0.4);
    const kivuCdf = Math.round(rawVal * 0.35);
    const orphanCdf = Math.round(rawVal) - panziCdf - kivuCdf;

    const fmtCdf = (val) => Math.round(val).toLocaleString('fr-FR') + ' FC';

    donutTotalEl.textContent = fmtCdf(rawVal);
    amtPanziEl.textContent = fmtCdf(panziCdf);
    amtKivuEl.textContent = fmtCdf(kivuCdf);
    amtOrphanEl.textContent = fmtCdf(orphanCdf);
  }
}

/* ==========================================================================
   8. MODALES : PROFIL ONG, HISTOIRE DE CAMPAGNE & TÉLÉCHARGEMENT APP
   ========================================================================== */
function openNgoProfileModal(ngoId) {
  const ngo = AFFILIATED_NGOS.find((n) => n.id === ngoId);
  const dialog = document.getElementById('ngo-dossier-modal');
  if (!ngo || !dialog) return;

  document.getElementById('ngo-modal-reg').textContent = ngo.legalRegistrationNumber;
  document.getElementById('ngo-modal-title').textContent = ngo.name;
  document.getElementById('ngo-modal-support-btn').setAttribute(
    'data-context',
    `Soutenir ${ngo.name} via l'application mobile Congo Actions`
  );

  const bodyEl = document.getElementById('ngo-modal-body');
  bodyEl.innerHTML = `
    <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-block-end:0.9rem;">
      <span class="ngo-verified-pill">✓ ONG OFFICIELLEMENT VÉRIFIÉE</span>
      <span class="slide-pill">📍 ${ngo.location}</span>
      <span class="slide-pill">${ngo.sectorLabel}</span>
    </div>
    <p style="color:var(--text-slate-navy); font-size:0.95rem; margin-block-end:1rem;">${ngo.missionStatement}</p>

    <div class="info-panel-box">
      <div class="info-panel-title">Documents Légaux &amp; Agréments Vérifiés</div>
      ${ngo.verificationDocs
        .map(
          (doc) => `
        <div class="info-kv-row">
          <span>📄 ${doc}</span>
          <strong style="color:var(--mint-green);">✓ Vérifié</strong>
        </div>
      `
        )
        .join('')}
    </div>

    <div class="info-panel-box">
      <div class="info-panel-title">Programmes Humanitaires &amp; Contact</div>
      <div class="info-kv-row">
        <span>Programmes clés</span>
        <strong>${ngo.programsSummary}</strong>
      </div>
      <div class="info-kv-row">
        <span>Rôle dans le Fonds Commun</span>
        <strong>${ngo.impactHighlight}</strong>
      </div>
      <div class="info-kv-row">
        <span>Contact officiel</span>
        <strong>${ngo.contactEmail} • ${ngo.contactPhone}</strong>
      </div>
    </div>
  `;

  dialog.showModal();
}

function openCampaignStoryModal(campId) {
  const camp = CAMPAIGNS_DATA.find((c) => c.id === campId);
  const dialog = document.getElementById('campaign-story-modal');
  if (!camp || !dialog) return;

  const pct = Math.min(
    100,
    Math.round((camp.raisedAmountUsdCents / Math.max(1, camp.targetAmountUsdCents)) * 100)
  );
  const raisedFormatted = formatCampaignAmount(
    camp.raisedAmountUsdCents,
    camp.raisedAmountCdf,
    currentCurrency
  );
  const targetFormatted = formatCampaignAmount(
    camp.targetAmountUsdCents,
    camp.targetAmountCdf,
    currentCurrency
  );

  document.getElementById('camp-modal-category').textContent = `${camp.categoryLabel} • ${camp.location}`;
  document.getElementById('camp-modal-title').textContent = camp.title;
  document.getElementById('camp-modal-donate-btn').setAttribute(
    'data-context',
    `Soutenir « ${camp.title} » dans l'application Congo Actions`
  );

  const bodyEl = document.getElementById('camp-modal-body');
  bodyEl.innerHTML = `
    <img src="${camp.imageUrl}" alt="${camp.title}" style="inline-size:100%; max-block-size:220px; object-fit:cover; border-radius:16px; margin-block-end:1rem;" />
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-block-end:0.75rem;">
      <strong style="color:var(--logo-royal-blue); font-size:0.9rem;">Menée par : ${camp.ngoName}</strong>
      <span class="ngo-verified-pill">✓ Cause Vérifiée</span>
    </div>
    <p style="color:var(--text-slate-navy); font-size:0.94rem;">${camp.fullStory}</p>

    <div class="camp-progress-box" style="margin-block:1rem;">
      <div class="progress-bar-outer">
        <div class="progress-bar-inner" style="width: ${pct}%"></div>
      </div>
      <div class="camp-progress-nums">
        <span><strong>${raisedFormatted}</strong> collectés sur un objectif de ${targetFormatted}</span>
        <strong>${pct} % financé (${camp.supportersCount} donateurs)</strong>
      </div>
    </div>

    <div class="info-panel-box">
      <div class="info-panel-title">Résultats &amp; Avancées sur le Terrain</div>
      ${camp.impactMilestones
        .map(
          (m) => `
        <div class="info-kv-row">
          <span>✓ ${m}</span>
        </div>
      `
        )
        .join('')}
    </div>
  `;

  dialog.showModal();
}

function bindAppModalTriggers(root = document) {
  const appModal = document.getElementById('app-download-modal');
  const ngoModal = document.getElementById('ngo-dossier-modal');
  const campModal = document.getElementById('campaign-story-modal');
  const contextLabel = document.getElementById('modal-context-label');

  root.querySelectorAll('.open-app-modal-btn').forEach((btn) => {
    if (btn.dataset.boundModal === 'true') return;
    btn.dataset.boundModal = 'true';
    btn.addEventListener('click', () => {
      const ctx = btn.getAttribute('data-context') || 'SOUTENIR CETTE CAUSE DANS L’APPLICATION';
      if (contextLabel) contextLabel.textContent = ctx;
      if (ngoModal && ngoModal.open) ngoModal.close();
      if (campModal && campModal.open) campModal.close();
      if (appModal) appModal.showModal();
    });
  });
}

/* ==========================================================================
   9. INITIALISATION & ÉCOUTEURS D'ÉVÉNEMENTS
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  renderCampaigns();
  renderAffiliatedNgos();
  initPaymentCarousel();
  updateSharedGiftPreview();
  bindAppModalTriggers();

  // Cartes des piliers humanitaires -> filtre et défilement vers les campagnes
  document.querySelectorAll('[data-select-category]').forEach((card) => {
    card.addEventListener('click', () => {
      const cat = card.getAttribute('data-select-category');
      activeCampFilter = cat;
      document.querySelectorAll('[data-camp-filter]').forEach((pill) => {
        pill.classList.toggle('active', pill.getAttribute('data-camp-filter') === cat);
      });
      renderCampaigns();
      const targetSection = document.getElementById('active-causes');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Filtres des campagnes par catégorie
  document.querySelectorAll('[data-camp-filter]').forEach((pill) => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('[data-camp-filter]').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      activeCampFilter = pill.getAttribute('data-camp-filter');
      renderCampaigns();
    });
  });

  // Filtres des ONG par secteur
  document.querySelectorAll('[data-ngo-filter]').forEach((pill) => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('[data-ngo-filter]').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      activeNgoFilter = pill.getAttribute('data-ngo-filter');
      renderAffiliatedNgos();
    });
  });

  // Boutons de montant prédéfini et champ personnalisé du simulateur de don partagé
  const simInput = document.getElementById('sim-amount-input');
  document.querySelectorAll('.sim-preset-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sim-preset-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const usdPreset = Number(btn.getAttribute('data-usd-preset') || 100);
      if (simInput) {
        simInput.value =
          currentCurrency === 'USD' ? usdPreset : usdPreset * EXCHANGE_RATE_CDF_PER_USD;
      }
      updateSharedGiftPreview();
    });
  });

  if (simInput) {
    simInput.addEventListener('input', () => {
      document.querySelectorAll('.sim-preset-btn').forEach((b) => b.classList.remove('active'));
      updateSharedGiftPreview();
    });
  }

  // Menu mobile déroulant
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', String(!isExpanded));
      mobileDrawer.hidden = isExpanded;
    });
    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.hidden = true;
      });
    });
  }

  // Fermeture des fenêtres modales
  const appModal = document.getElementById('app-download-modal');
  const ngoModal = document.getElementById('ngo-dossier-modal');
  const campModal = document.getElementById('campaign-story-modal');

  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', () => appModal && appModal.close());
  });
  document.querySelectorAll('[data-close-ngo-modal]').forEach((btn) => {
    btn.addEventListener('click', () => ngoModal && ngoModal.close());
  });
  document.querySelectorAll('[data-close-camp-modal]').forEach((btn) => {
    btn.addEventListener('click', () => campModal && campModal.close());
  });

  [appModal, ngoModal, campModal].forEach((dialog) => {
    if (!dialog) return;
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
  });
});
