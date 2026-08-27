const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const cache = {};

async function loadJSON(path) {
  if (cache[path]) return cache[path];

  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`${path} yüklenemedi`);
  }

  const data = await response.json();
  cache[path] = data;

  return data;
}

function esc(s = '') {
  return String(s).replace(/[&<>'"]/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[c]));
}


/* =========================================================
   HEADER
   ========================================================= */

function header(active = '') {
  return `
    <header class="site-header">
      <div class="container nav">

        <a class="brand" href="./index.html">
          <span class="brand-mark">VND</span>

          <span>
            VND Öğrenme
            <small>TÜBİTAK 1001</small>
          </span>
        </a>

        <button class="menu-button" aria-label="Menüyü aç">
          Menü
        </button>

        <nav class="nav-links">

          <a
            class="${active === 'home' ? 'active' : ''}"
            href="./index.html"
          >
            Proje
          </a>

          <a
            class="${active === 'workshop' ? 'active' : ''}"
            href="./calistay.html"
          >
            Çalıştay
          </a>

          <a
            class="${active === 'news' ? 'active' : ''}"
            href="./haberler.html"
          >
            Haberler
          </a>

          <a
            class="${active === 'history' ? 'active' : ''}"
            href="./gecmis.html"
          >
            Geçmiş
          </a>

          <a
            class="${active === 'pubs' ? 'active' : ''}"
            href="./yayinlar.html"
          >
            Yayınlar
          </a>

          <a
            class="${active === 'results' ? 'active' : ''}"
            href="./sonuclar.html"
          >
            Sonuçlar
          </a>

          <a
            class="nav-cta"
            href="https://github.com/vnd-ogrenme"
            target="_blank"
            rel="noopener"
          >
            GitHub ↗
          </a>

        </nav>
      </div>
    </header>
  `;
}


/* =========================================================
   FOOTER
   ========================================================= */

function footer() {
  return `
    <footer class="footer">

      <div class="container footer-grid">

        <div>
          <strong>VND Öğrenme</strong>

          <p>
            Yeni bir vuru üreten nöral devre tabanlı öngörüsel
            kodlama yapısı ve öğrenme kuralının geliştirilmesi.
          </p>
        </div>

        <div class="footer-links">

          <a href="./calistay.html">
            Çalıştay 2026
          </a>

          <a href="./haberler.html">
            Haberler
          </a>

          <a href="./gecmis.html">
            Proje geçmişi
          </a>

          <a href="./yayinlar.html">
            Yayınlar
          </a>

          <a href="./sonuclar.html">
            Sonuçlar
          </a>

          <a
            href="https://github.com/vnd-ogrenme"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>

        </div>

      </div>

    </footer>
  `;
}


/* =========================================================
   SAYFA İSKELETİ
   ========================================================= */

function mountChrome(active) {

  const headerTarget = $('#site-header');
  const footerTarget = $('#site-footer');

  if (headerTarget) {
    headerTarget.innerHTML = header(active);
  }

  if (footerTarget) {
    footerTarget.innerHTML = footer();
  }

  const menuButton = $('.menu-button');
  const navLinks = $('.nav-links');

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
}


/* =========================================================
   HABERLER
   ========================================================= */

function newsDetailUrl(news) {
  return `./haber.html?id=${encodeURIComponent(news.id)}`;
}


function newsCard(news, featured = false) {

  return `
    <a
      class="news-card ${featured ? 'featured' : ''}"
      href="${newsDetailUrl(news)}"
    >

      <div class="news-media">

        ${
          news.image
            ? `
              <img
                src="${esc(news.image)}"
                alt="${esc(news.title)}"
                loading="lazy"
                onerror="this.remove()"
              >
            `
            : ''
        }

      </div>

      <div class="news-body">

        <div>
          <span class="tag">
            ${esc(news.type)}
          </span>

          <span class="news-date">
            ${esc(news.displayDate)}
          </span>
        </div>

        <h3>
          ${esc(news.title)}
        </h3>

        <p>
          ${esc(news.summary)}
        </p>

        <span class="news-read">
          Haberi oku →
        </span>

      </div>

    </a>
  `;
}


/* =========================================================
   ANA SAYFA
   ========================================================= */

async function initHome() {

  mountChrome('home');

  /*
   * Ana sayfanın temel verileri.
   *
   * Çalıştay verisini BURAYA koymuyoruz.
   * Böylece workshop.json hata verse bile
   * haberler ve sayaçlar çalışmaya devam eder.
   */

  const [project, news, publications] = await Promise.all([
    loadJSON('./data/project.json'),
    loadJSON('./data/news.json'),
    loadJSON('./data/publications.json')
  ]);


  /* ---------------------------------------------------------
     Proje bilgileri
     --------------------------------------------------------- */

  const heroTitle = $('#hero-title');
  const heroDesc = $('#hero-desc');
  const projectStatus = $('#project-status');
  const projectStart = $('#project-start');

  if (heroTitle) {
    heroTitle.textContent = project.title || '';
  }

  if (heroDesc) {
    heroDesc.textContent = project.description || '';
  }

  if (projectStatus) {
    projectStatus.textContent = project.status || '';
  }

  if (projectStart) {
    projectStart.textContent = project.startDate || '';
  }


  /* ---------------------------------------------------------
     Proje özeti
     --------------------------------------------------------- */

  const overviewCopy = $('#overview-copy');

  if (overviewCopy) {
    overviewCopy.innerHTML = (project.overview || [])
      .map(item => `
        <p>${esc(item)}</p>
      `)
      .join('');
  }


  /* ---------------------------------------------------------
     Proje hedefleri
     --------------------------------------------------------- */

  const objectives = $('#objectives');

  if (objectives) {
    objectives.innerHTML = (project.objectives || [])
      .map(item => `
        <div class="objective">
          ${esc(item)}
        </div>
      `)
      .join('');
  }


  /* ---------------------------------------------------------
     Haberler
     --------------------------------------------------------- */

  const sortedNews = [...news].sort((a, b) =>
    String(b.date || '').localeCompare(
      String(a.date || '')
    )
  );

  const newsGrid = $('#news-grid');

  if (newsGrid) {

    newsGrid.innerHTML = sortedNews
      .slice(0, 4)
      .map((item, index) =>
        newsCard(item, index < 2)
      )
      .join('');

  }


  /* ---------------------------------------------------------
     Sayaçlar
     --------------------------------------------------------- */

  const publicationCount = $('#publication-count');
  const newsCount = $('#news-count');

  if (publicationCount) {
    publicationCount.textContent = publications.length;
  }

  if (newsCount) {
    newsCount.textContent = news.length;
  }


  /* ---------------------------------------------------------
     Çalıştay

     Çalıştay ayrı yükleniyor.
     Hata olursa ana sayfanın geri kalanı etkilenmez.
     --------------------------------------------------------- */

  try {

    const workshop = await loadJSON(
      './data/workshop.json'
    );

    const workshopDate =
      $('#workshop-date-home');

    const workshopTitle =
      $('#workshop-title-home');

    const workshopDesc =
      $('#workshop-desc-home');

    const workshopVenue =
      $('#workshop-venue-home');

    const workshopDept =
      $('#workshop-dept-home');


    if (
      workshopDate &&
      workshop.displayDate
    ) {
      workshopDate.textContent =
        workshop.displayDate;
    }


    if (
      workshopTitle &&
      workshop.title
    ) {
      workshopTitle.textContent =
        workshop.title;
    }


    if (
      workshopDesc &&
      workshop.description
    ) {
      workshopDesc.textContent =
        workshop.description;
    }


    if (
      workshopVenue &&
      workshop.venue
    ) {
      workshopVenue.textContent =
        workshop.venue;
    }


    if (workshopDept) {

      const department =
        workshop.department || '';

      const city =
        workshop.city || '';

      workshopDept.textContent =
        [department, city]
          .filter(Boolean)
          .join(' · ');
    }

  } catch (error) {

    console.warn(
      'Çalıştay verisi yüklenemedi:',
      error
    );

  }
}


/* =========================================================
   ÇALIŞTAY
   ========================================================= */

function sessionRow(session, index) {

  const speaker = session.speaker
    ? `
      <span class="session-speaker">
        ${esc(session.speaker)}
      </span>
    `
    : '';


  const number = session.kind === 'session'
    ? `
      <span class="session-no">
        ${String(index + 1).padStart(2, '0')}
      </span>
    `
    : `
      <span class="session-no muted">
        •
      </span>
    `;


  return `
    <div class="program-row ${esc(session.kind || 'general')}">

      <time>
        ${esc(session.time)}
      </time>

      ${number}

      <div>

        ${
          session.title
            ? `<strong>${esc(session.title)}</strong>`
            : ''
        }

        ${speaker}

      </div>

    </div>
  `;
}


async function initWorkshop() {

  mountChrome('workshop');

  const workshop = await loadJSON(
    './data/workshop.json'
  );


  document.title =
    `${workshop.title} | VND Öğrenme`;


  const status =
    $('#workshop-status');

  const title =
    $('#workshop-title');

  const subtitle =
    $('#workshop-subtitle');

  const date =
    $('#workshop-date');

  const place =
    $('#workshop-place');

  const department =
    $('#workshop-department');

  const description =
    $('#workshop-description');


  if (status) {
    status.textContent =
      workshop.status || '';
  }


  if (title) {
    title.innerHTML = `
      TÜBİTAK 1001<br>
      Proje Çıktıları
      <span>Çalıştayı</span>
    `;
  }


  if (subtitle) {
    subtitle.textContent =
      workshop.subtitle || '';
  }


  if (date) {
    date.textContent =
      workshop.displayDate || '';
  }


  if (place) {
    place.textContent =
      workshop.venue || '';
  }


  if (department) {

    department.textContent = [
      workshop.department,
      workshop.city
    ]
      .filter(Boolean)
      .join(' · ');

  }


  if (description) {
    description.textContent =
      workshop.description || '';
  }


  /* ---------------------------------------------------------
     Program
     --------------------------------------------------------- */

  const daysTarget =
    $('#workshop-days');

  if (
    daysTarget &&
    Array.isArray(workshop.days)
  ) {

    daysTarget.innerHTML =
      workshop.days.map(day => {

        let sessionIndex = 0;

        const sessions =
          Array.isArray(day.sessions)
            ? day.sessions
            : [];


        const rows = sessions
          .map(session => {

            const index =
              session.kind === 'session'
                ? sessionIndex++
                : -1;

            return sessionRow(
              session,
              index
            );

          })
          .join('');


        return `
          <article class="program-day">

            <header>

              <div>
                <span>
                  ${esc(day.label || '')}
                </span>

                <h3>
                  ${esc(day.date || '')}
                </h3>
              </div>

              ${
                day.theme
                  ? `<strong>${esc(day.theme)}</strong>`
                  : ''
              }

            </header>

            <div class="program-list">
              ${rows}
            </div>

          </article>
        `;

      })
      .join('');

  }


  /* ---------------------------------------------------------
     Konuşmacılar

     Veri yoksa bölüm gizlenir.
     --------------------------------------------------------- */

  const speakersTarget =
    $('#workshop-speakers');

  if (speakersTarget) {

    if (
      Array.isArray(workshop.speakers) &&
      workshop.speakers.length
    ) {

      speakersTarget.innerHTML =
        workshop.speakers
          .map((name, index) => `
            <div class="speaker-chip">

              <span>
                ${String(index + 1).padStart(2, '0')}
              </span>

              <strong>
                ${esc(name)}
              </strong>

            </div>
          `)
          .join('');

    } else {

      speakersTarget.innerHTML = '';

      const section =
        speakersTarget.closest(
          '.workshop-speakers-section'
        );

      if (section) {
        section.hidden = true;
      }

    }

  }
}


/* =========================================================
   HABERLER SAYFASI
   ========================================================= */

async function initNews() {

  mountChrome('news');

  const news = await loadJSON(
    './data/news.json'
  );


  const sorted = [...news].sort((a, b) =>
    String(b.date || '').localeCompare(
      String(a.date || '')
    )
  );


  const types = [
    ...new Set(
      sorted
        .map(item => item.type)
        .filter(Boolean)
    )
  ];


  const filters =
    $('#news-filters');


  if (filters) {

    filters.innerHTML =
      ['Tümü', ...types]
        .map((type, index) => `
          <button
            class="filter ${
              index === 0
                ? 'active'
                : ''
            }"
            data-type="${
              type === 'Tümü'
                ? 'all'
                : esc(type)
            }"
          >
            ${esc(type)}
          </button>
        `)
        .join('');

  }


  renderNews(sorted);


  $$('.filter').forEach(button => {

    button.addEventListener(
      'click',
      () => {

        $$('.filter').forEach(item =>
          item.classList.remove('active')
        );

        button.classList.add('active');


        const type =
          button.dataset.type;


        renderNews(
          type === 'all'
            ? sorted
            : sorted.filter(
                item =>
                  item.type === type
              )
        );

      }
    );

  });
}


function renderNews(items) {

  const target =
    $('#all-news');


  if (!target) {
    return;
  }


  target.innerHTML =
    items.length
      ? items
          .map(item =>
            newsCard(item, false)
          )
          .join('')
      : `
        <div class="empty">
          Henüz haber yok.
        </div>
      `;
}


/* =========================================================
   HABER DETAY
   ========================================================= */

async function initNewsDetail() {

  mountChrome('news');


  const news = await loadJSON(
    './data/news.json'
  );


  const id =
    new URLSearchParams(
      window.location.search
    ).get('id');


  const item =
    news.find(newsItem =>
      String(newsItem.id) ===
      String(id)
    );


  if (!item) {

    const title =
      $('#news-detail-title');

    const summary =
      $('#news-detail-summary');

    const type =
      $('#news-detail-type');

    const date =
      $('#news-detail-date');

    const content =
      $('#news-detail-content');


    if (title) {
      title.textContent =
        'Haber bulunamadı';
    }


    if (summary) {
      summary.textContent =
        'Aradığınız haber kaydı bulunamadı veya bağlantı artık geçerli değil.';
    }


    if (type) {
      type.textContent = 'Haber';
    }


    if (date) {
      date.textContent = '';
    }


    if (content) {
      content.innerHTML = `
        <p>
          <a
            class="link-arrow"
            href="./haberler.html"
          >
            Tüm haberleri görüntüle →
          </a>
        </p>
      `;
    }


    return;
  }


  document.title =
    `${item.title} | VND Öğrenme`;


  const type =
    $('#news-detail-type');

  const date =
    $('#news-detail-date');

  const title =
    $('#news-detail-title');

  const summary =
    $('#news-detail-summary');


  if (type) {
    type.textContent =
      item.type || '';
  }


  if (date) {
    date.textContent =
      item.displayDate || '';
  }


  if (title) {
    title.textContent =
      item.title || '';
  }


  if (summary) {
    summary.textContent =
      item.summary || '';
  }


  /* Görsel */

  if (item.image) {

    const cover =
      $('#news-detail-cover');

    const image =
      $('#news-detail-image');


    if (cover && image) {

      image.src =
        item.image;

      image.alt =
        item.title || '';

      cover.hidden =
        false;


      image.addEventListener(
        'error',
        () => {
          cover.hidden = true;
        }
      );

    }
  }


  /* İçerik */

  const paragraphs =
    (item.content || [])
      .map(paragraph => `
        <p>
          ${esc(paragraph)}
        </p>
      `)
      .join('');


  const items =
    item.items?.length
      ? `
        <h2>Çalışmalar</h2>

        <ul>
          ${item.items
            .map(value => `
              <li>
                ${esc(value)}
              </li>
            `)
            .join('')}
        </ul>
      `
      : '';


  const contentTarget =
    $('#news-detail-content');


  if (contentTarget) {
    contentTarget.innerHTML =
      paragraphs + items;
  }


  /* Sağ bilgi alanı */

  const meta = [];


  meta.push(`
    <div>
      <dt>Tarih</dt>
      <dd>
        ${esc(item.displayDate)}
      </dd>
    </div>
  `);


  meta.push(`
    <div>
      <dt>Tür</dt>
      <dd>
        ${esc(item.type)}
      </dd>
    </div>
  `);


  if (item.meta?.length) {

    meta.push(`
      <div>
        <dt>Yer</dt>

        <dd>
          ${item.meta
            .map(esc)
            .join(' · ')}
        </dd>
      </div>
    `);

  }


  const links =
    item.links?.length
      ? item.links
          .map(link => `
            <a
              href="${esc(link.url)}"
              target="_blank"
              rel="noopener"
            >
              ${esc(link.label)} ↗
            </a>
          `)
          .join('')
      : '';


  const side =
    $('#news-detail-side');


  if (side) {

    side.innerHTML = `
      <h3>
        Haber bilgisi
      </h3>

      <dl>
        ${meta.join('')}
      </dl>

      ${links}
    `;

  }
}


/* =========================================================
   PROJE GEÇMİŞİ
   ========================================================= */

async function initHistory() {

  mountChrome('history');


  const items = await loadJSON(
    './data/timeline.json'
  );


  const years = [
    ...new Set(
      items
        .map(item => item.year)
        .filter(Boolean)
    )
  ]
    .sort()
    .reverse();


  const filters =
    $('#history-filters');


  if (filters) {

    filters.innerHTML =
      ['Tümü', ...years]
        .map((year, index) => `
          <button
            class="filter ${
              index === 0
                ? 'active'
                : ''
            }"
            data-year="${
              year === 'Tümü'
                ? 'all'
                : esc(year)
            }"
          >
            ${esc(year)}
          </button>
        `)
        .join('');

  }


  renderTimeline(items);


  $$('.filter').forEach(button => {

    button.addEventListener(
      'click',
      () => {

        $$('.filter').forEach(item =>
          item.classList.remove(
            'active'
          )
        );


        button.classList.add(
          'active'
        );


        const year =
          button.dataset.year;


        renderTimeline(
          year === 'all'
            ? items
            : items.filter(
                item =>
                  String(item.year) ===
                  String(year)
              )
        );

      }
    );

  });
}


function renderTimeline(items) {

  const target =
    $('#timeline');


  if (!target) {
    return;
  }


  target.innerHTML =
    [...items]
      .sort((a, b) =>
        String(b.date || '')
          .localeCompare(
            String(a.date || '')
          )
      )
      .map(item => `
        <article
          class="timeline-item"
          id="${esc(item.id)}"
        >

          <div class="timeline-date">
            ${esc(item.displayDate)}
          </div>

          <div class="timeline-card">

            <span class="tag">
              ${esc(item.category)}
            </span>

            <h3>
              ${esc(item.title)}
            </h3>

            <p>
              ${esc(item.description)}
            </p>

            ${
              item.meta?.length
                ? `
                  <div class="timeline-meta">
                    ${item.meta
                      .map(value => `
                        <span>
                          ${esc(value)}
                        </span>
                      `)
                      .join('')}
                  </div>
                `
                : ''
            }

            ${
              item.items?.length
                ? `
                  <ul>
                    ${item.items
                      .map(value => `
                        <li>
                          ${esc(value)}
                        </li>
                      `)
                      .join('')}
                  </ul>
                `
                : ''
            }

            ${
              item.links?.length
                ? `
                  <div class="timeline-meta">
                    ${item.links
                      .map(link => `
                        <a
                          href="${esc(link.url)}"
                          target="_blank"
                          rel="noopener"
                        >
                          ${esc(link.label)} ↗
                        </a>
                      `)
                      .join('')}
                  </div>
                `
                : ''
            }

          </div>

        </article>
      `)
      .join('');
}


/* =========================================================
   YAYINLAR
   ========================================================= */

async function initPublications() {

  mountChrome('pubs');


  const publications =
    await loadJSON(
      './data/publications.json'
    );


  const types = [
    ...new Set(
      publications
        .map(item => item.type)
        .filter(Boolean)
    )
  ];


  const filters =
    $('#pub-filters');


  if (filters) {

    filters.innerHTML =
      ['Tümü', ...types]
        .map((type, index) => `
          <button
            class="filter ${
              index === 0
                ? 'active'
                : ''
            }"
            data-type="${
              type === 'Tümü'
                ? 'all'
                : esc(type)
            }"
          >
            ${esc(type)}
          </button>
        `)
        .join('');

  }


  renderPubs(publications);


  $$('.filter').forEach(button => {

    button.addEventListener(
      'click',
      () => {

        $$('.filter').forEach(item =>
          item.classList.remove(
            'active'
          )
        );


        button.classList.add(
          'active'
        );


        const type =
          button.dataset.type;


        renderPubs(
          type === 'all'
            ? publications
            : publications.filter(
                item =>
                  item.type === type
              )
        );

      }
    );

  });
}


function renderPubs(publications) {

  const target =
    $('#pub-list');


  if (!target) {
    return;
  }


  target.innerHTML =
    [...publications]
      .sort((a, b) =>
        Number(b.year || 0) -
        Number(a.year || 0)
      )
      .map(publication => {


        const authors =
          publication.authors?.length
            ? `
              <div class="pub-authors">
                ${publication.authors
                  .map(esc)
                  .join(' · ')}
              </div>
            `
            : '';


        const meta = [

          publication.paperNo
            ? `Bildiri #${esc(publication.paperNo)}`
            : '',

          publication.session
            ? esc(publication.session)
            : ''

        ]
          .filter(Boolean)
          .join(' · ');


        const abstract =
          publication.abstract
            ? `
              <details class="pub-abstract">

                <summary>
                  Özeti göster
                </summary>

                <p>
                  ${esc(publication.abstract)}
                </p>

              </details>
            `
            : '';


        return `
          <article class="pub">

            <div class="pub-year">
              ${esc(publication.year)}
            </div>

            <div>

              <span class="tag">
                ${esc(publication.type)}
              </span>

              <h3>
                ${esc(publication.title)}
              </h3>

              ${authors}

              <p>
                ${esc(publication.venue)}
              </p>

              ${
                meta
                  ? `
                    <div class="pub-meta">
                      ${meta}
                    </div>
                  `
                  : ''
              }

              ${
                publication.doi
                  ? `
                    <div class="doi">
                      DOI:
                      ${esc(publication.doi)}
                    </div>
                  `
                  : ''
              }

              ${abstract}

            </div>

            ${
              publication.url
                ? `
                  <a
                    class="pub-link"
                    href="${esc(publication.url)}"
                    target="_blank"
                    rel="noopener"
                    aria-label="Yayını aç"
                  >
                    ↗
                  </a>
                `
                : '<span></span>'
            }

          </article>
        `;

      })
      .join('') ||
      `
        <div class="empty">
          Henüz kayıt yok.
        </div>
      `;
}


/* =========================================================
   SONUÇLAR
   ========================================================= */

async function initResults() {

  mountChrome('results');


  const results = await loadJSON(
    './data/results.json'
  );


  const target =
    $('#results-grid');


  if (!target) {
    return;
  }


  target.innerHTML =
    results
      .map(result => `
        <article class="result-card">

          <span class="eyebrow">
            ${esc(result.category)}
          </span>

          <h3>
            ${esc(result.title)}
          </h3>

          <p>
            ${esc(result.description)}
          </p>

          ${
            result.links
              ?.map(link => `
                <a
                  class="link-arrow"
                  href="${esc(link.url)}"
                  target="_blank"
                  rel="noopener"
                >
                  ${esc(link.label)} ↗
                </a>
              `)
              .join('') || ''
          }

          <div>
            <span class="status">
              ${esc(result.status)}
            </span>
          </div>

        </article>
      `)
      .join('');
}


/* =========================================================
   SAYFA BAŞLATMA
   ========================================================= */

document.addEventListener(
  'DOMContentLoaded',
  () => {

    const page =
      document.body.dataset.page;


    const init = {

      home:
        initHome,

      workshop:
        initWorkshop,

      news:
        initNews,

      'news-detail':
        initNewsDetail,

      history:
        initHistory,

      pubs:
        initPublications,

      results:
        initResults

    }[page] || (() =>
      mountChrome('')
    );


    init().catch(error => {

      console.error(error);


      const target =
        $('#page-error');


      if (target) {

        target.textContent =
          'İçerik yüklenemedi. Lütfen sayfayı yeniden yükleyin.';

      }

    });

  }
);
