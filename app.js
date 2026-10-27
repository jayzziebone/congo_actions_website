/**
 * CONGO ACTIONS — PHILANTHROPIC CAUSES, NGOS & CAMPAIGNS WEBSITE
 * Focuses on humanitarian impact, verified partner NGOs, active campaigns,
 * a carousel slider for payment options, and a brief mobile app overview.
 */

const EXCHANGE_RATE_CDF_PER_USD = 2800;

let currentCurrency = 'USD'; // 'USD' or 'CDF'
let activeNgoFilter = 'ALL';
let activeCampFilter = 'ALL';
let currentCarouselSlide = 0;
const TOTAL_CAROUSEL_SLIDES = 4;

/* ==========================================================================
   1. VERIFIED AFFILIATED NGOS DIRECTORY
   ========================================================================== */
const AFFILIATED_NGOS = [
  {
    id: 'ngo-panzi',
    name: 'Fondation Panzi (Dr. Denis Mukwege)',
    legalRegistrationNumber: 'Arrêté Ministériel N° 045/CAB/2021',
    sector: 'HEALTH',
    sectorLabel: 'Health & Maternal Care',
    icon: '🏥',
    location: 'Bukavu, South Kivu, DRC',
    missionStatement:
      'Holistic medical care, safe maternal delivery, surgical care, psychological recovery, and community support for women, mothers, and children in Eastern DRC.',
    contactEmail: 'contact@fondationpanzidrc.org',
    contactPhone: '+243 998 877 665',
    impactHighlight: '40% Partner in the Eastern DRC Emergency Relief Pool',
    programsSummary: 'Maternal Care • Neonatal Units • Surgical Recovery',
    verificationDocs: [
      'Arrêté Ministériel N° 045/CAB/2021 (Verified)',
      'Certificat F92 — Ministry of Justice (Verified)',
      'Notarized Hospital & Foundation Charter (Verified)',
      'Official NGO Bank & Mobile Money Account (Verified)'
    ]
  },
  {
    id: 'ngo-kivu-water',
    name: 'Kivu Clean Water Initiative',
    legalRegistrationNumber: 'Certificat F92-JUST-2019-KIVU',
    sector: 'EMERGENCY',
    sectorLabel: 'Clean Water & Emergency Relief',
    icon: '💧',
    location: 'Goma, North & South Kivu, DRC',
    missionStatement:
      'Drilling sustainable solar-powered deep water boreholes and building clean drinking water stations to protect displaced families and children from water-borne illness.',
    contactEmail: 'info@kivuclearwater.org',
    contactPhone: '+243 812 345 678',
    impactHighlight: '35% Partner in the Eastern DRC Emergency Relief Pool',
    programsSummary: 'Solar Boreholes • Clean Water Stations • Hygiene Kits',
    verificationDocs: [
      'Arrêté Ministériel Hydraulics & Relief (Verified)',
      'Certificat F92-JUST-2019-KIVU (Verified)',
      'Notarized Non-Profit Bylaws — Goma (Verified)',
      'Official NGO Bank & M-Pesa Account (Verified)'
    ]
  },
  {
    id: 'ngo-orphelinat-kinshasa',
    name: 'Orphelinat de Kinshasa (Ngaliema)',
    legalRegistrationNumber: 'Certificat F92-JUST-2022-KIN',
    sector: 'CHILDREN',
    sectorLabel: 'Children & Orphan Care',
    icon: '🧒🏾',
    location: 'Ngaliema, Kinshasa, DRC',
    missionStatement:
      'Providing loving residential shelter, three nutritious daily meals, pediatric healthcare, clothing, and primary school tuition for 140 orphaned children in Kinshasa.',
    contactEmail: 'contact@orphelinatkinshasa.cd',
    contactPhone: '+243 891 234 567',
    impactHighlight: '25% Partner in the Eastern DRC Emergency Relief Pool',
    programsSummary: 'Child Nutrition • Safe Shelter • Primary Schooling',
    verificationDocs: [
      'Arrêté Ministériel Social & Family Affairs (Verified)',
      'Certificat F92-JUST-2022-KIN (Verified)',
      'Notarized Child Protection Charter (Verified)',
      'Official NGO Bank & Orange Money Account (Verified)'
    ]
  },
  {
    id: 'ngo-sauvons-congo',
    name: 'Sauvons Congo',
    legalRegistrationNumber: 'Certificat F92-JUST-2026-KIN',
    sector: 'EDUCATION',
    sectorLabel: 'Youth & Education',
    icon: '🎓',
    location: 'Masina & Limete, Kinshasa, DRC',
    missionStatement:
      'Empowering underprivileged Congolese youth and high school graduates with solar-powered computer centers, internet access, coding education, and job readiness.',
    contactEmail: 'contact@sauvonscongo.org',
    contactPhone: '+243 999 123 456',
    impactHighlight: '100% Dedicated Youth Education Campaigns',
    programsSummary: 'Solar Computer Labs • Youth Coding • School Supplies',
    verificationDocs: [
      'Arrêté Ministériel Youth & Education (Verified)',
      'Certificat F92-JUST-2026-KIN (Verified)',
      'Notarized Non-Profit Statutes (Verified)',
      'Official NGO Bank & Mobile Money Account (Verified)'
    ]
  }
];

/* ==========================================================================
   2. ACTIVE HUMANITARIAN CAMPAIGNS
   ========================================================================== */
const CAMPAIGNS_DATA = [
  {
    id: 'camp-eastern-pool',
    title: 'Eastern DRC Emergency & Health Relief Pool',
    subtitle:
      'One shared gift supporting emergency maternal care, clean drinking water wells, and orphan nutrition across 3 verified NGOs.',
    fullStory:
      'Families and children in Eastern DRC face urgent medical and humanitarian needs. When you contribute to this Shared Relief Pool, your gift is automatically divided among three trusted local partners: 40% to Fondation Panzi for maternal and surgical care in Bukavu, 35% to Kivu Clean Water Initiative for solar water wells in Goma, and 25% to Orphelinat de Kinshasa for child nutrition and shelter.',
    impactMilestones: [
      '120 maternal delivery kits & solar medical refrigerators delivered in Bukavu',
      'Clean drinking water stations serving displaced mothers and children in Goma',
      'Daily warm meals and pediatric checkups for orphaned children'
    ],
    category: 'HEALTH',
    categoryLabel: 'Emergency & Health Pool',
    categoryBadgeClass: 'badge-apricot',
    isPooledFund: true,
    ngoName: 'Fondation Panzi, Kivu Clean Water & Orphelinat de Kinshasa',
    supportersCount: 412,
    targetAmountUsdCents: 10000000, // $100,000
    raisedAmountUsdCents: 4285000,  // $42,850
    targetAmountCdf: 280000000,
    raisedAmountCdf: 120000000,
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80',
    location: 'Goma, Bukavu & Kinshasa'
  },
  {
    id: 'camp-orphans-kinshasa',
    title: 'Nutritious Meals & Primary Schooling for 140 Orphans',
    subtitle:
      'Providing daily breakfast, lunch, and dinner, school uniforms, and classroom tuition for 140 children in Ngaliema.',
    fullStory:
      'Orphelinat de Kinshasa (Ngaliema) cares for 140 orphaned and vulnerable children from infancy through primary school. Your support funds year-round fortified food staples (rice, beans, fresh fruit, and clean milk), new school uniforms, notebooks, and primary school tuition so every child grows up healthy and educated.',
    impactMilestones: [
      '420 nutritious meals prepared every single day for 140 resident children',
      '100% of school-age children enrolled in local primary classrooms',
      'Mosquito nets, clean bedding, and monthly pediatric nurse visits'
    ],
    category: 'CHILDREN',
    categoryLabel: 'Children & Orphans',
    categoryBadgeClass: 'badge-buttercream',
    isPooledFund: false,
    ngoName: 'Orphelinat de Kinshasa (Ngaliema)',
    supportersCount: 198,
    targetAmountUsdCents: 2500000, // $25,000
    raisedAmountUsdCents: 1640000, // $16,400
    targetAmountCdf: 70000000,
    raisedAmountCdf: 45920000,
    imageUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1000&q=80',
    location: 'Ngaliema, Kinshasa, DRC'
  },
  {
    id: 'camp-solar-water-goma',
    title: 'Clean Solar Water for 10,000 Displaced Families',
    subtitle:
      'Drilling 4 deep solar-powered water boreholes and clean tap stands in Mugunga camps outside Goma.',
    fullStory:
      'Access to clean, safe drinking water is the single most effective way to prevent cholera and protect young children in displaced communities around Goma. Kivu Clean Water Initiative is drilling four 120-meter solar-powered boreholes equipped with filtration and multi-tap collection points so mothers and children no longer have to walk miles for unsafe lake water.',
    impactMilestones: [
      '2 solar boreholes already operational and pumping 15,000 liters daily',
      'Zero fuel cost thanks to high-efficiency solar arrays',
      'Community water committees trained for long-term maintenance'
    ],
    category: 'EMERGENCY',
    categoryLabel: 'Clean Water & Relief',
    categoryBadgeClass: 'badge-mint',
    isPooledFund: false,
    ngoName: 'Kivu Clean Water Initiative',
    supportersCount: 326,
    targetAmountUsdCents: 6000000, // $60,000
    raisedAmountUsdCents: 3890000, // $38,900
    targetAmountCdf: 168000000,
    raisedAmountCdf: 108920000,
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=1000&q=80',
    location: 'Mugunga Camp, Goma, DRC'
  },
  {
    id: 'camp-code-for-congo',
    title: 'Code for Congo: Solar IT Labs for 500 Youths',
    subtitle:
      'Equipping two solar-powered community computer centers in Kinshasa (Masina & Limete) for young graduates.',
    fullStory:
      'Thousands of bright young Congolese students graduate high school without ever having access to a computer or reliable electricity. Sauvons Congo is outfitting two solar-powered learning centers in Masina and Limete with laptops, satellite internet, and hands-on courses in digital literacy, software development, and office skills.',
    impactMilestones: [
      '40 laptops and solar battery banks installed in the first Masina classroom',
      'Free 6-month digital skills & coding bootcamps for youth aged 16–24',
      'Dedicated mentorship and local employment placement support'
    ],
    category: 'EDUCATION',
    categoryLabel: 'Youth & Education',
    categoryBadgeClass: 'badge-cerulean',
    isPooledFund: false,
    ngoName: 'Sauvons Congo',
    supportersCount: 164,
    targetAmountUsdCents: 3500000, // $35,000
    raisedAmountUsdCents: 1820000, // $18,200
    targetAmountCdf: 98000000,
    raisedAmountCdf: 50960000,
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
    location: 'Masina & Limete, Kinshasa, DRC'
  },
  {
    id: 'camp-panzi-maternal',
    title: 'Safe Childbirth & Neonatal Care Kits in South Kivu',
    subtitle:
      'Supplying sterile delivery kits, solar incubators, and postnatal care for 600 expectant mothers in Bukavu.',
    fullStory:
      'Led by Fondation Panzi in Bukavu, this campaign equips maternity wards and rural outreach clinics in South Kivu with sterile childbirth kits, solar-powered neonatal warmers for premature newborns, and essential medications so every mother can give birth safely with dignity.',
    impactMilestones: [
      '600 sterile maternal delivery kits funded for expectant mothers',
      '24/7 solar backup power for neonatal incubators in Bukavu',
      'Free postnatal nutrition and newborn immunization follow-ups'
    ],
    category: 'HEALTH',
    categoryLabel: 'Healthcare & Panzi',
    categoryBadgeClass: 'badge-apricot',
    isPooledFund: false,
    ngoName: 'Fondation Panzi (Dr. Denis Mukwege)',
    supportersCount: 245,
    targetAmountUsdCents: 4000000, // $40,000
    raisedAmountUsdCents: 2240000, // $22,400
    targetAmountCdf: 112000000,
    raisedAmountCdf: 62720000,
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80',
    location: 'Bukavu, South Kivu, DRC'
  }
];

/* ==========================================================================
   3. CURRENCY FORMATTING
   ========================================================================== */
function formatCampaignAmount(usdCents, cdfUnits, currency = currentCurrency) {
  if (currency === 'USD') {
    const usd = Math.round(usdCents / 100);
    return '$' + new Intl.NumberFormat('en-US').format(usd);
  } else {
    return new Intl.NumberFormat('en-US').format(cdfUnits) + ' FC';
  }
}

/* ==========================================================================
   4. RENDER ACTIVE CAMPAIGNS
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
              <span class="camp-ver-pill">✓ Verified NGO</span>
            </div>
          </div>

          <div class="camp-content">
            <div class="camp-location-row">
              <span>📍 ${camp.location}</span>
              ${
                camp.isPooledFund
                  ? '<span class="camp-pool-tag">🤝 Shared 3-NGO Pool</span>'
                  : `<span>❤️ ${camp.supportersCount} Supporters</span>`
              }
            </div>

            <h3>${camp.title}</h3>
            <div class="camp-ngo-byline">By ${camp.ngoName}</div>
            <p class="camp-subtitle">${camp.subtitle}</p>

            <div class="camp-progress-box">
              <div class="progress-bar-outer" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${camp.title} fundraising progress">
                <div class="progress-bar-inner" style="width: ${pct}%"></div>
              </div>
              <div class="camp-progress-nums">
                <span><strong>${raisedFormatted}</strong> raised of ${targetFormatted}</span>
                <strong>${pct}%</strong>
              </div>
            </div>

            <div class="camp-actions-row">
              <button type="button" class="btn btn-secondary read-camp-story-btn" data-camp-id="${camp.id}">
                Read Story
              </button>
              <button type="button" class="btn btn-warm open-app-modal-btn" data-context="Support '${camp.title}' in the Congo Actions App">
                Donate in App →
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
   5. RENDER AFFILIATED NGOS DIRECTORY
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
            <span class="ngo-verified-pill">✓ VERIFIED NGO</span>
          </div>
          <h3>${ngo.name}</h3>
          <span class="ngo-reg-code">${ngo.legalRegistrationNumber}</span>
          <p class="ngo-mission">${ngo.missionStatement}</p>
        </div>

        <div>
          <ul class="ngo-meta-list">
            <li>📍 <strong>Location:</strong> ${ngo.location}</li>
            <li>🌟 <strong>Focus:</strong> ${ngo.programsSummary}</li>
            <li>🤝 <strong>Role:</strong> ${ngo.impactHighlight}</li>
          </ul>

          <div class="ngo-card-actions">
            <button type="button" class="btn btn-secondary inspect-ngo-btn" data-ngo-id="${ngo.id}">
              NGO Profile
            </button>
            <button type="button" class="btn btn-primary open-app-modal-btn" data-context="Support ${ngo.name} in the Congo Actions App">
              Support in App
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
   6. PAYMENT OPTIONS CAROUSEL SLIDER
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

  // Touch swipe support on mobile/tablet
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
   7. BRIEF SHARED GIFT CALCULATOR (Integrated in Mobile App Section)
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
      '$' +
      val.toLocaleString('en-US', {
        minimumFractionDigits: val % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2
      });

    donutTotalEl.textContent = fmtUsd(rawVal);
    amtPanziEl.textContent = fmtUsd(panzi);
    amtKivuEl.textContent = fmtUsd(kivu);
    amtOrphanEl.textContent = fmtUsd(orphan);
  } else {
    const panziCdf = Math.round(rawVal * 0.4);
    const kivuCdf = Math.round(rawVal * 0.35);
    const orphanCdf = Math.round(rawVal) - panziCdf - kivuCdf;

    const fmtCdf = (val) => Math.round(val).toLocaleString('en-US') + ' FC';

    donutTotalEl.textContent = fmtCdf(rawVal);
    amtPanziEl.textContent = fmtCdf(panziCdf);
    amtKivuEl.textContent = fmtCdf(kivuCdf);
    amtOrphanEl.textContent = fmtCdf(orphanCdf);
  }
}

/* ==========================================================================
   8. MODALS: NGO PROFILE, CAMPAIGN STORY & APP DOWNLOAD
   ========================================================================== */
function openNgoProfileModal(ngoId) {
  const ngo = AFFILIATED_NGOS.find((n) => n.id === ngoId);
  const dialog = document.getElementById('ngo-dossier-modal');
  if (!ngo || !dialog) return;

  document.getElementById('ngo-modal-reg').textContent = ngo.legalRegistrationNumber;
  document.getElementById('ngo-modal-title').textContent = ngo.name;
  document.getElementById('ngo-modal-support-btn').setAttribute(
    'data-context',
    `Support ${ngo.name} via the Congo Actions Mobile App`
  );

  const bodyEl = document.getElementById('ngo-modal-body');
  bodyEl.innerHTML = `
    <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-block-end:0.9rem;">
      <span class="ngo-verified-pill">✓ OFFICIALLY VERIFIED NGO</span>
      <span class="slide-pill">📍 ${ngo.location}</span>
      <span class="slide-pill">${ngo.sectorLabel}</span>
    </div>
    <p style="color:var(--text-slate-navy); font-size:0.95rem; margin-block-end:1rem;">${ngo.missionStatement}</p>

    <div class="info-panel-box">
      <div class="info-panel-title">Verified Legal Registration &amp; Compliance Documents</div>
      ${ngo.verificationDocs
        .map(
          (doc) => `
        <div class="info-kv-row">
          <span>📄 ${doc}</span>
          <strong style="color:var(--mint-green);">✓ Verified</strong>
        </div>
      `
        )
        .join('')}
    </div>

    <div class="info-panel-box">
      <div class="info-panel-title">Humanitarian Programs &amp; Contact</div>
      <div class="info-kv-row">
        <span>Core Programs</span>
        <strong>${ngo.programsSummary}</strong>
      </div>
      <div class="info-kv-row">
        <span>Shared Pool Role</span>
        <strong>${ngo.impactHighlight}</strong>
      </div>
      <div class="info-kv-row">
        <span>Official Contact</span>
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
    `Support '${camp.title}' in the Congo Actions App`
  );

  const bodyEl = document.getElementById('camp-modal-body');
  bodyEl.innerHTML = `
    <img src="${camp.imageUrl}" alt="${camp.title}" style="inline-size:100%; max-block-size:220px; object-fit:cover; border-radius:16px; margin-block-end:1rem;" />
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-block-end:0.75rem;">
      <strong style="color:var(--logo-royal-blue); font-size:0.9rem;">Led by: ${camp.ngoName}</strong>
      <span class="ngo-verified-pill">✓ Verified Cause</span>
    </div>
    <p style="color:var(--text-slate-navy); font-size:0.94rem;">${camp.fullStory}</p>

    <div class="camp-progress-box" style="margin-block:1rem;">
      <div class="progress-bar-outer">
        <div class="progress-bar-inner" style="width: ${pct}%"></div>
      </div>
      <div class="camp-progress-nums">
        <span><strong>${raisedFormatted}</strong> raised of ${targetFormatted} goal</span>
        <strong>${pct}% Funded (${camp.supportersCount} Supporters)</strong>
      </div>
    </div>

    <div class="info-panel-box">
      <div class="info-panel-title">Key Impact Milestones</div>
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
      const ctx = btn.getAttribute('data-context') || 'SUPPORT THIS CAUSE IN THE APP';
      if (contextLabel) contextLabel.textContent = ctx;
      if (ngoModal && ngoModal.open) ngoModal.close();
      if (campModal && campModal.open) campModal.close();
      if (appModal) appModal.showModal();
    });
  });
}

/* ==========================================================================
   9. CURRENCY SWITCHER ($ USD ⇄ FC CDF)
   ========================================================================== */
function setGlobalCurrency(newCurrency) {
  currentCurrency = newCurrency;

  document.querySelectorAll('.currency-btn').forEach((btn) => {
    const isMatch = btn.getAttribute('data-currency') === currentCurrency;
    btn.classList.toggle('active', isMatch);
    btn.setAttribute('aria-pressed', String(isMatch));
  });

  // Update Hero impact metrics
  document.querySelectorAll('.currency-value').forEach((el) => {
    const usd = Number(el.getAttribute('data-usd') || 0);
    const cdf = Number(el.getAttribute('data-cdf') || 0);
    if (currentCurrency === 'USD') {
      el.textContent = '$' + usd.toLocaleString('en-US') + '+';
    } else {
      el.textContent = cdf.toLocaleString('en-US') + '+ FC';
    }
  });

  // Update preset buttons in brief shared gift preview
  const simInput = document.getElementById('sim-amount-input');
  document.querySelectorAll('.sim-preset-btn').forEach((btn) => {
    const usdPreset = Number(btn.getAttribute('data-usd-preset') || 100);
    if (currentCurrency === 'USD') {
      btn.textContent = '$' + usdPreset.toLocaleString('en-US');
      if (btn.classList.contains('active') && simInput) {
        simInput.value = usdPreset;
      }
    } else {
      const cdfPreset = usdPreset * EXCHANGE_RATE_CDF_PER_USD;
      btn.textContent = cdfPreset.toLocaleString('en-US') + ' FC';
      if (btn.classList.contains('active') && simInput) {
        simInput.value = cdfPreset;
      }
    }
  });

  renderCampaigns();
  updateSharedGiftPreview();
}

/* ==========================================================================
   10. INITIALIZATION & EVENT LISTENERS
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  renderCampaigns();
  renderAffiliatedNgos();
  initPaymentCarousel();
  updateSharedGiftPreview();
  bindAppModalTriggers();

  // Currency toggle buttons
  document.querySelectorAll('.currency-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      setGlobalCurrency(btn.getAttribute('data-currency'));
    });
  });

  // Cause Pillar cards jump to & filter Active Campaigns
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

  // Campaign category filter pills
  document.querySelectorAll('[data-camp-filter]').forEach((pill) => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('[data-camp-filter]').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      activeCampFilter = pill.getAttribute('data-camp-filter');
      renderCampaigns();
    });
  });

  // NGO sector filter pills
  document.querySelectorAll('[data-ngo-filter]').forEach((pill) => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('[data-ngo-filter]').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      activeNgoFilter = pill.getAttribute('data-ngo-filter');
      renderAffiliatedNgos();
    });
  });

  // Shared gift preview presets & input
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

  // Mobile Menu Drawer Toggle
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

  // Close Modal buttons & backdrop clicks
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
