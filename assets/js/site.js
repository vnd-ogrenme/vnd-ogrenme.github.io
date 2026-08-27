const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const cache = {};

async function loadJSON(path) {
  if (cache[path]) return cache[path];
  const r = await fetch(path);
  if (!r.ok) throw new Error(path);
  return cache[path] = await r.json();
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

function header(active = '') {
  return `<header class="site-header">
    <div class="container nav">
      <a class="brand" href="./index.html">
        <span class="brand-mark">VND</span>
        <span>
          VND Öğrenme
          <small>TÜBİTAK 1001</small>
        </span>
      </a>

      <button class="menu-button" aria-label="Menüyü aç">Menü</button>

      <nav class="nav-links">
        <a class="${active === 'home' ? 'active' : ''}" href="./index.html">Proje</a>
        <a class="${active === 'workshop' ? 'active' : ''}" href="./calistay.html">Çalıştay</a>
        <a class="${active === 'news' ? 'active' : ''}" href="./haberler.html">Haberler</a>
        <a class="${active === 'history' ? 'active' : ''}" href="./gecmis.html">Geçmiş</a>
        <a class="${active === 'pubs' ? 'active' : ''}" href="./yayinlar.html">Yayınlar</a>
        <a class="${active === 'results' ? 'active' : ''}" href="./sonuclar.html">Sonuçlar</a>
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
  </header>`;
}

function footer() {
  return `<footer class="footer">
    <div class="container footer-grid">
      <div>
        <strong>VND Öğrenme</strong>
        <p>
          Yeni bir vuru üreten nöral devre tabanlı öngörüsel kodlama
          yapısı ve öğrenme kuralının geliştirilmesi.
        </p>
      </div>

      <div class="footer-links">
        <a href="./calistay.html">Çalıştay 2026</a>
        <a href="./haberler.html">Haberler</a>
        <a href="./gecmis.html">Proje geçmişi</a>
        <a href="./yayinlar.html">Yayınlar</a>
        <a href="./sonuclar.html">Sonuçlar</a>
        <a href="https://github.com/vnd-ogrenme">GitHub</a>
      </div>
    </div>
  </footer>`;
}

function mountChrome(active) {
  $('#site-header').innerHTML = header(active);
  $('#site-footer').innerHTML = footer();

  $('.menu-button').addEventListener('click', () => {
    $('.nav-links').classList.toggle('open');
  });
}

function newsDetailUrl(n) {
  return `./haber.html?id=${encodeURIComponent(n.id)}`;
}

function newsCard(n, featured = false) {
  return `<a
    class="news-card ${featured ? 'featured' : ''}"
    href="${newsDetailUrl(n)}"
  >
    <div class="news-media">
      ${
        n.image
          ? `<img
              src="${esc(n.image)}"
              alt="${esc(n.title)}"
              onerror="this.remove()"
            >`
          : ''
      }
    </div>

    <div class="news-body">
      <div>
        <span class="tag">${esc(n.type)}</span>
        <span class="news-date">${esc(n.displayDate)}</span>
      </div>

      <h3>${esc(n.title)}</h3>
      <p>${esc(n.summary)}</p>
      <span class="news-read">Haberi oku →</span>
    </div>
  </a>`;
}

async function initHome() {
  mountChrome('home');

  const [p, news, pubs, workshop] = await Promise.all([
    loadJSON('./data/project.json'),
    loadJSON('./data/news.json'),
    loadJSON('./data/publications.json'),
    loadJSON('./data/workshop.json')
  ]);

  $('#hero-title').textContent = p.title;
  $('#hero-desc').textContent = p.description;
  $('#project-status').textContent = p.status;
  $('#project-start').textContent = p.startDate;

  $('#overview-copy').innerHTML = p.overview
    .map(x => `<p>${esc(x)}</p>`)
    .join('');

  $('#objectives').innerHTML = p.objectives
    .map(x => `<div class="objective">${esc(x)}</div>`)
    .join('');

  const sortedNews = [...news].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  $('#news-grid').innerHTML = sortedNews
    .slice(0, 4)
    .map((n, i) => newsCard(n, i < 2))
    .join('');

  $('#publication-count').textContent = pubs.length;
  $('#news-count').textContent = news.length;

  $('#workshop-date-home').textContent = workshop.displayDate;
  $('#workshop-title-home').textContent = workshop.title;
  $('#workshop-desc-home').textContent = workshop.description;
  $('#workshop-venue-home').textContent = workshop.venue;
  $('#workshop-dept-home').textContent =
    `${workshop.department} · ${workshop.city}`;
}

function sessionRow(s, index) {
  const speaker = s.speaker
    ? `<span class="session-speaker">${esc(s.speaker)}</span>`
    : '';

  const number =
    s.kind === 'session'
      ? `<span class="session-no">${String(index + 1).padStart(2, '0')}</span>`
      : '<span class="session-no muted">•</span>';

  return `<div class="program-row ${esc(s.kind || 'general')}">
    <time>${esc(s.time)}</time>
    ${number}

    <div>
      <strong>${esc(s.title)}</strong>
      ${speaker}
    </div>
  </div>`;
}

async function initWorkshop() {
  mountChrome('workshop');

  const w = await loadJSON('./data/workshop.json');

  document.title = `${w.title} | VND Öğrenme`;

  $('#workshop-status').textContent = w.status;

  $('#workshop-title').innerHTML =
    `TÜBİTAK 1001<br>Proje Çıktıları <span>Çalıştayı</span>`;

  $('#workshop-subtitle').textContent = w.subtitle;
  $('#workshop-date').textContent = w.displayDate;
  $('#workshop-place').textContent = w.venue;
  $('#workshop-department').textContent =
    `${w.department} · ${w.city}`;
  $('#workshop-description').textContent = w.description;

  $('#workshop-days').innerHTML = w.days.map(day => {
    let sessionIndex = 0;

    const rows = day.sessions
      .map(s =>
        sessionRow(
          s,
          s.kind === 'session' ? sessionIndex++ : -1
        )
      )
      .join('');

    return `<article class="program-day">
      <header>
        <div>
          <span>${esc(day.label)}</span>
          <h3>${esc(day.date)}</h3>
        </div>

        <strong>${esc(day.theme)}</strong>
      </header>

      <div class="program-list">
        ${rows}
      </div>
    </article>`;
  }).join('');

  $('#workshop-speakers').innerHTML = w.speakers
    .map((name, i) => `
      <div class="speaker-chip">
        <span>${String(i + 1).padStart(2, '0')}</span>
        <strong>${esc(name)}</strong>
      </div>
    `)
    .join('');
}

async function initNews() {
  mountChrome('news');

  const news = await loadJSON('./data/news.json');

  const sorted = [...news].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  const types = [...new Set(sorted.map(x => x.type))];

  $('#news-filters').innerHTML = ['Tümü', ...types]
    .map((t, i) => `
      <button
        class="filter ${i === 0 ? 'active' : ''}"
        data-type="${t === 'Tümü' ? 'all' : esc(t)}"
      >
        ${esc(t)}
      </button>
    `)
    .join('');

  renderNews(sorted);

  $$('.filter').forEach(b => {
    b.addEventListener('click', () => {
      $$('.filter').forEach(x => x.classList.remove('active'));
      b.classList.add('active');

      renderNews(
        b.dataset.type === 'all'
          ? sorted
          : sorted.filter(x => x.type === b.dataset.type)
      );
    });
  });
}

function renderNews(items) {
  $('#all-news').innerHTML =
    items.map(n => newsCard(n, false)).join('') ||
    '<div class="empty">Henüz haber yok.</div>';
}

async function initNewsDetail() {
  mountChrome('news');

  const news = await loadJSON('./data/news.json');
  const id = new URLSearchParams(window.location.search).get('id');
  const item = news.find(n => n.id === id);

  if (!item) {
    $('#news-detail-title').textContent = 'Haber bulunamadı';

    $('#news-detail-summary').textContent =
      'Aradığınız haber kaydı bulunamadı veya bağlantı artık geçerli değil.';

    $('#news-detail-type').textContent = 'Haber';
    $('#news-detail-date').textContent = '';

    $('#news-detail-content').innerHTML =
      '<p><a class="link-arrow" href="./haberler.html">Tüm haberleri görüntüle →</a></p>';

    return;
  }

  document.title = `${item.title} | VND Öğrenme`;

  $('#news-detail-type').textContent = item.type;
  $('#news-detail-date').textContent = item.displayDate;
  $('#news-detail-title').textContent = item.title;
  $('#news-detail-summary').textContent = item.summary;

  if (item.image) {
    const cover = $('#news-detail-cover');
    const image = $('#news-detail-image');

    image.src = item.image;
    image.alt = item.title;
    cover.hidden = false;

    image.addEventListener('error', () => {
      cover.hidden = true;
    });
  }

  const paragraphs = (item.content || [])
    .map(p => `<p>${esc(p)}</p>`)
    .join('');

  const items = item.items?.length
    ? `<h2>Çalışmalar</h2>
       <ul>
         ${item.items.map(x => `<li>${esc(x)}</li>`).join('')}
       </ul>`
    : '';

  $('#news-detail-content').innerHTML =
    paragraphs + items;

  const meta = [];

  meta.push(`
    <div>
      <dt>Tarih</dt>
      <dd>${esc(item.displayDate)}</dd>
    </div>
  `);

  meta.push(`
    <div>
      <dt>Tür</dt>
      <dd>${esc(item.type)}</dd>
    </div>
  `);

  if (item.meta?.length) {
    meta.push(`
      <div>
        <dt>Yer</dt>
        <dd>${item.meta.map(esc).join(' · ')}</dd>
      </div>
    `);
  }

  const links = item.links?.length
    ? item.links
        .map(l => `
          <a
            href="${esc(l.url)}"
            target="_blank"
            rel="noopener"
          >
            ${esc(l.label)} ↗
          </a>
        `)
        .join('')
    : '';

  $('#news-detail-side').innerHTML = `
    <h3>Haber bilgisi</h3>
    <dl>${meta.join('')}</dl>
    ${links}
  `;
}

async function initHistory() {
  mountChrome('history');

  const items = await loadJSON('./data/timeline.json');

  const years = [...new Set(items.map(x => x.year))]
    .sort()
    .reverse();

  $('#history-filters').innerHTML = ['Tümü', ...years]
    .map((y, i) => `
      <button
        class="filter ${i === 0 ? 'active' : ''}"
        data-year="${y === 'Tümü' ? 'all' : y}"
      >
        ${y}
      </button>
    `)
    .join('');

  renderTimeline(items);

  $$('.filter').forEach(b => {
    b.addEventListener('click', () => {
      $$('.filter').forEach(x => x.classList.remove('active'));
      b.classList.add('active');

      renderTimeline(
        b.dataset.year === 'all'
          ? items
          : items.filter(x => x.year === b.dataset.year)
      );
    });
  });
}

function renderTimeline(items) {
  $('#timeline').innerHTML = [...items]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(x => `
      <article
        class="timeline-item"
        id="${esc(x.id)}"
      >
        <div class="timeline-date">
          ${esc(x.displayDate)}
        </div>

        <div class="timeline-card">
          <span class="tag">${esc(x.category)}</span>

          <h3>${esc(x.title)}</h3>

          <p>${esc(x.description)}</p>

          ${
            x.meta?.length
              ? `<div class="timeline-meta">
                  ${x.meta
                    .map(m => `<span>${esc(m)}</span>`)
                    .join('')}
                </div>`
              : ''
          }

          ${
            x.items?.length
              ? `<ul>
                  ${x.items
                    .map(i => `<li>${esc(i)}</li>`)
                    .join('')}
                </ul>`
              : ''
          }

          ${
            x.links?.length
              ? `<div class="timeline-meta">
                  ${x.links
                    .map(l => `
                      <a
                        href="${esc(l.url)}"
                        target="_blank"
                        rel="noopener"
                      >
                        ${esc(l.label)} ↗
                      </a>
                    `)
                    .join('')}
                </div>`
              : ''
          }
        </div>
      </article>
    `)
    .join('');
}

async function initPublications() {
  mountChrome('pubs');

  const pubs = await loadJSON('./data/publications.json');

  const types = [...new Set(pubs.map(x => x.type))];

  $('#pub-filters').innerHTML = ['Tümü', ...types]
    .map((t, i) => `
      <button
        class="filter ${i === 0 ? 'active' : ''}"
        data-type="${t === 'Tümü' ? 'all' : esc(t)}"
      >
        ${esc(t)}
      </button>
    `)
    .join('');

  renderPubs(pubs);

  $$('.filter').forEach(b => {
    b.addEventListener('click', () => {
      $$('.filter').forEach(x => x.classList.remove('active'));
      b.classList.add('active');

      renderPubs(
        b.dataset.type === 'all'
          ? pubs
          : pubs.filter(x => x.type === b.dataset.type)
      );
    });
  });
}

function renderPubs(pubs) {
  $('#pub-list').innerHTML = [...pubs]
    .sort((a, b) => b.year - a.year)
    .map(p => {
      const authors = p.authors?.length
        ? `<div class="pub-authors">
            ${p.authors.map(esc).join(' · ')}
          </div>`
        : '';

      const meta = [
        p.paperNo
          ? `Bildiri #${esc(p.paperNo)}`
          : '',
        p.session
          ? esc(p.session)
          : ''
      ]
        .filter(Boolean)
        .join(' · ');

      const abstract = p.abstract
        ? `<details class="pub-abstract">
            <summary>Özeti göster</summary>
            <p>${esc(p.abstract)}</p>
          </details>`
        : '';

      return `<article class="pub">
        <div class="pub-year">
          ${p.year}
        </div>

        <div>
          <span class="tag">${esc(p.type)}</span>

          <h3>${esc(p.title)}</h3>

          ${authors}

          <p>${esc(p.venue)}</p>

          ${
            meta
              ? `<div class="pub-meta">${meta}</div>`
              : ''
          }

          ${
            p.doi
              ? `<div class="doi">
                  DOI: ${esc(p.doi)}
                </div>`
              : ''
          }

          ${abstract}
        </div>

        ${
          p.url
            ? `<a
                class="pub-link"
                href="${esc(p.url)}"
                target="_blank"
                rel="noopener"
                aria-label="Yayını aç"
              >
                ↗
              </a>`
            : '<span></span>'
        }
      </article>`;
    })
    .join('') ||
    '<div class="empty">Henüz kayıt yok.</div>';
}

async function initResults() {
  mountChrome('results');

  const results = await loadJSON('./data/results.json');

  $('#results-grid').innerHTML = results
    .map(r => `
      <article class="result-card">
        <span class="eyebrow">
          ${esc(r.category)}
        </span>

        <h3>${esc(r.title)}</h3>

        <p>${esc(r.description)}</p>

        ${
          r.links
            ?.map(l => `
              <a
                class="link-arrow"
                href="${esc(l.url)}"
                target="_blank"
                rel="noopener"
              >
                ${esc(l.label)} ↗
              </a>
            `)
            .join('') || ''
        }

        <div>
          <span class="status">
            ${esc(r.status)}
          </span>
        </div>
      </article>
    `)
    .join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;

  const init = {
    home: initHome,
    workshop: initWorkshop,
    news: initNews,
    'news-detail': initNewsDetail,
    history: initHistory,
    pubs: initPublications,
    results: initResults
  }[page] || (() => mountChrome(''));

  init().catch(err => {
    console.error(err);

    const target = $('#page-error');

    if (target) {
      target.textContent =
        'İçerik yüklenemedi. GitHub Pages üzerinde çalıştırıldığından emin olun.';
    }
  });
});
