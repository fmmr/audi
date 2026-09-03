// Audi Q4 EH8XXXX - Feildokumentasjon
// Rendrer alle visninger fra data.js og styrer navigasjon + lightbox.

'use strict';

// ============ UTILITIES ============
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Kompakt fargekoding-linje øverst på undersidene
function renderLegendBar() {
    return `
        <div class="legend-inline">
            <span class="legend-item"><span class="swatch sw-fault"></span>Feil</span>
            <span class="legend-item"><span class="swatch sw-email"></span>E-post</span>
            <span class="legend-item"><span class="swatch sw-workshop"></span>Verksted</span>
            <span class="legend-item"><span class="swatch sw-phone"></span>Telefon</span>
            <span class="legend-item"><span class="swatch sw-other"></span>Annet</span>
        </div>
    `;
}

// ============ NAVIGATION ============
function initNav() {
    const buttons = $$('.nav-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.view;
            buttons.forEach(b => b.classList.toggle('active', b === btn));
            $$('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + target));
            history.replaceState(null, '', '#' + target);
            window.scrollTo({ top: 0, behavior: 'instant' });
        });
    });
    // Deep-link
    const hash = (location.hash || '#status').slice(1);
    const target = document.querySelector(`.nav-btn[data-view="${hash}"]`) || buttons[0];
    target?.click();
}

// ============ SISTE STATUS ============
function renderStatus() {
    const root = $('#view-status');
    const rows = [];

    // Statusbanner (datadrevet fra STATUS i data.js)
    if (typeof STATUS !== 'undefined' && STATUS && STATUS.header) {
        const sev = STATUS.severity || 'info';
        const dateLine = STATUS.date
            ? `<div class="status-date">Oppdatert ${esc(formatDate(STATUS.date))}</div>`
            : '';
        rows.push(`
            <div class="alert alert-${esc(sev)}">
                <div class="icon">${sev === 'kritisk' ? '!' : sev === 'info' || sev === 'lav' ? 'i' : '⚠'}</div>
                <div>
                    <h3>${esc(STATUS.header)}</h3>
                    <p>${esc(STATUS.body || '')}</p>
                    ${dateLine}
                </div>
            </div>
        `);
    }

    // Nøkkeltall
    const stats = computeStats();
    rows.push(`
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:24px">
            ${statTile('Registrerte feil totalt', stats.totalFaults)}
            ${statTile('Feil i 2026 (siste rapport)', stats.faults2026)}
            ${statTile('Verkstedbesøk', stats.workshopVisits)}
            ${statTile('E-poster/telefonkontakt', stats.contacts)}
        </div>
    `);

    // Featured e-poster (kontakter med featured: true) - sortert nyeste øverst
    const featuredMails = CONTACTS
        .filter(c => c.featured)
        .sort((a, b) => sortKey(b.date).localeCompare(sortKey(a.date)));
    if (featuredMails.length > 0) {
        rows.push('<h2>Uthevede e-poster</h2>');
        rows.push('<p class="lead">De viktigste e-postene i saken akkurat nå. Full tekst er tilgjengelig via lenken på hvert kort.</p>');
        featuredMails.forEach(mail => {
            const text = mail.summary || mail.description || '';
            const fromLine = mail.from
                ? `<p class="from">Fra: ${esc(mail.from)}${mail.to ? ' → ' + esc(mail.to) : ''}</p>`
                : '';
            const linkBtn = mail.link
                ? `<div class="actions"><a href="${esc(mail.link)}" target="_blank" rel="noopener">Les full mail</a></div>`
                : '';
            rows.push(`
                <div class="email-card ${mail.critical ? 'critical' : ''}">
                    <div class="meta">
                        <span class="badge badge-date">${esc(mail.displayDate || mail.date)}</span>
                        <span class="badge badge-type type-${esc(mail.type)}">${esc(typeLabel(mail.type))}</span>
                        ${mail.critical ? '<span class="badge badge-severity sev-kritisk">Kritisk</span>' : ''}
                    </div>
                    <h3>${esc(mail.title)}</h3>
                    ${fromLine}
                    <p class="summary">${esc(text)}</p>
                    ${linkBtn}
                </div>
            `);
        });
    }

    // Kontinuerlige feil
    rows.push('<h2 style="margin-top:36px">Kontinuerlige / gjentagende feil</h2>');
    rows.push('<p class="lead">Disse feilene opptrer regelmessig og er dokumentert i mailen 26. august 2026.</p>');
    RECURRING_FAULTS.forEach(f => {
        const cat = CATEGORIES[f.category];
        rows.push(`
            <div class="card">
                <div class="meta">
                    <span class="badge badge-category cat-${f.category}">${esc(cat.short)}</span>
                    <span class="recurring-tag">Gjentagende</span>
                </div>
                <h3>${esc(f.title)}</h3>
                ${f.note ? `<div class="fault-note">${esc(f.note)}</div>` : ''}
                <p>${esc(f.description)}</p>
            </div>
        `);
    });

    root.innerHTML = rows.join('');
}

function statTile(label, value) {
    return `
        <div style="background:#fff;border:1px solid var(--border);border-radius:10px;padding:14px 16px;box-shadow:var(--shadow-sm)">
            <div style="font-size:.78rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.4px;font-weight:600">${esc(label)}</div>
            <div style="font-family:Georgia,serif;font-size:2rem;color:var(--brand);font-weight:700;margin-top:2px">${esc(value)}</div>
        </div>
    `;
}

function computeStats() {
    return {
        totalFaults: FAULTS.length + RECURRING_FAULTS.length,
        faults2026: FAULTS.filter(f => sortKey(f.date).startsWith('2026')).length,
        workshopVisits: CONTACTS.filter(c => c.type === 'verksted').length,
        contacts: CONTACTS.filter(c => c.type === 'mail-out' || c.type === 'mail-in' || c.type === 'telefon').length
    };
}

// ============ SYSTEMFEIL (KATEGORISERT) ============
function renderSystems() {
    const root = $('#view-systems');
    const rows = [];

    rows.push(renderLegendBar());
    rows.push('<h2>Feil gruppert etter system</h2>');
    rows.push('<p class="lead">For verksted: feilene er kategorisert etter berørt bilsystem for å hjelpe med diagnose av rotårsaker. Klikk på en kategori for å utvide/skjule.</p>');

    // Sett opp per-kategori
    Object.entries(CATEGORIES).forEach(([key, cat]) => {
        const faults = FAULTS.filter(f => f.category === key)
                             .sort((a, b) => sortKey(b.date).localeCompare(sortKey(a.date)));
        const recurring = RECURRING_FAULTS.filter(f => f.category === key);
        const totalCount = faults.length + recurring.length;
        if (totalCount === 0) return;

        const items = [];

        recurring.forEach(f => {
            items.push(`
                <div class="card card-fault">
                    <div class="meta">
                        <span class="recurring-tag">Gjentagende</span>
                    </div>
                    <h3>${esc(f.title)}</h3>
                    ${f.note ? `<div class="fault-note">${esc(f.note)}</div>` : ''}
                    <p>${esc(f.description)}</p>
                </div>
            `);
        });

        faults.forEach(f => items.push(renderFaultCard(f)));

        rows.push(`
            <div class="category-section" style="--cat: ${cat.color}">
                <div class="category-header" onclick="this.parentElement.classList.toggle('collapsed')">
                    <h3>${esc(cat.label)}</h3>
                    <span class="category-count">${totalCount}</span>
                    <span class="category-chevron">▾</span>
                </div>
                <div class="category-body">
                    ${items.join('') || '<p style="color:var(--text-subtle)">Ingen registrerte feil.</p>'}
                </div>
            </div>
        `);
    });

    root.innerHTML = rows.join('');
}

function renderFaultCard(f) {
    const cat = CATEGORIES[f.category];
    const dateLabel = f.displayDate || formatDate(f.date);
    return `
        <div class="card card-fault">
            <div class="meta">
                <span class="badge badge-date">${esc(dateLabel)}</span>
                <span class="badge badge-category cat-${f.category}">${esc(cat.short)}</span>
                ${f.severity ? `<span class="badge badge-severity sev-${f.severity}">${esc(f.severity)}</span>` : ''}
                <span class="badge badge-source">${esc(formatSource(f.source))}</span>
            </div>
            <h3>${esc(f.title)}</h3>
            <p>${esc(f.description)}</p>
            ${renderThumbs(f.images)}
        </div>
    `;
}

function formatSource(src) {
    if (!src) return '';
    if (src === 'observation') return 'Egen observasjon';
    if (src === 'workshop') return 'Verksted';
    const m = src.match(/^mail-(\d{4})(\d{2})(\d{2})$/);
    if (m) return `Mail ${m[3]}.${m[2]}.${m[1]}`;
    return src;
}

function renderThumbs(images) {
    if (!images || images.length === 0) {
        return '<div class="no-images">Ingen bilder</div>';
    }
    const thumbs = images.map(img => `
        <button class="thumb ${img.type === 'video' ? 'is-video' : ''}"
                data-full="${esc(img.full)}" data-type="${esc(img.type)}"
                aria-label="Åpne ${esc(img.type === 'video' ? 'video' : 'bilde')}">
            <img src="${esc(img.thumb)}" alt="" loading="lazy">
        </button>
    `).join('');
    return `<div class="thumbs">${thumbs}</div>`;
}

// ============ TIDSLINJE ============
let timelineFilter = { types: new Set(['fault', 'email', 'workshop', 'phone', 'other']) };

function renderTimeline() {
    const root = $('#view-timeline');
    const rows = [];

    rows.push(renderLegendBar());
    rows.push('<h2>Kronologisk tidslinje</h2>');

    // Mail-liste-generator (kollapsbar)
    rows.push(`
        <details class="mail-gen">
            <summary>Generer feilliste for mail (fra dato)</summary>
            <div class="mail-gen-body">
                <div class="mail-gen-controls">
                    <label>Fra dato:
                        <input type="date" id="mailgen-from" value="2026-01-01">
                    </label>
                    <label>Til dato (valgfri):
                        <input type="date" id="mailgen-to">
                    </label>
                    <button id="mailgen-generate" class="filter-btn active">Oppdater</button>
                    <button id="mailgen-copy" class="filter-btn">Kopier til utklippstavlen</button>
                    <span id="mailgen-status" class="mailgen-status"></span>
                </div>
                <textarea id="mailgen-output" rows="12" spellcheck="false"
                    placeholder="Klikk 'Oppdater' for å generere liste..."></textarea>
                <div class="mail-gen-hint">Redigèr fritt før du limer inn i mail.</div>
            </div>
        </details>
    `);
    rows.push('<p class="lead">Alle feil, verkstedbesøk, telefonsamtaler og e-poster i kronologisk rekkefølge (nyeste øverst).</p>');

    // Filterkontroller
    rows.push(`
        <div class="timeline-controls">
            <label>Vis:</label>
            <button class="filter-btn active" data-filter="fault">Feil</button>
            <button class="filter-btn active" data-filter="email">E-post</button>
            <button class="filter-btn active" data-filter="workshop">Verksted</button>
            <button class="filter-btn active" data-filter="phone">Telefon</button>
            <button class="filter-btn active" data-filter="other">Annet</button>
            <span class="timeline-count" id="timeline-count"></span>
        </div>
    `);

    rows.push('<div class="timeline" id="timeline-list"></div>');

    root.innerHTML = rows.join('');

    // Filter-events (kun ekte filter-knapper, ikke generatorens knapper)
    $$('#view-timeline .timeline-controls .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            const key = btn.dataset.filter;
            if (btn.classList.contains('active')) timelineFilter.types.add(key);
            else timelineFilter.types.delete(key);
            renderTimelineList();
        });
    });

    // Mail-generator events
    initMailGenerator();

    renderTimelineList();
}

// ============ MAIL-LISTE-GENERATOR ============
function generateFaultList(fromISO, toISO) {
    const fromKey = fromISO ? fromISO.replace(/-/g, '') : '00000000';
    const toKey   = toISO   ? toISO.replace(/-/g, '')   : '99999999';
    return FAULTS
        .map(f => ({
            key: sortKey(f.date).replace(/-/g, ''),
            date: f.date,
            title: f.title
        }))
        .filter(f => f.key !== '00000000' && f.key >= fromKey && f.key <= toKey)
        .sort((a, b) => a.key.localeCompare(b.key))
        .map(f => `${f.key} - ${f.title}`)
        .join('\n');
}

function initMailGenerator() {
    const from = $('#mailgen-from');
    const to = $('#mailgen-to');
    const out = $('#mailgen-output');
    const status = $('#mailgen-status');
    if (!from || !out) return;

    const update = () => {
        out.value = generateFaultList(from.value, to.value);
        const lines = out.value ? out.value.split('\n').length : 0;
        status.textContent = `${lines} feil funnet`;
    };

    $('#mailgen-generate').addEventListener('click', update);
    from.addEventListener('change', update);
    to.addEventListener('change', update);

    $('#mailgen-copy').addEventListener('click', async () => {
        if (!out.value) update();
        try {
            await navigator.clipboard.writeText(out.value);
            status.textContent = 'Kopiert til utklippstavlen ✓';
            setTimeout(() => { status.textContent = `${out.value.split('\n').length} feil funnet`; }, 2000);
        } catch (e) {
            out.select();
            document.execCommand('copy');
            status.textContent = 'Kopiert (fallback)';
        }
    });

    // Kjør en initial fylling
    update();
}

function renderTimelineList() {
    const list = $('#timeline-list');
    if (!list) return;

    // Samle alle hendelser til én liste
    const events = [];
    FAULTS.forEach(f => {
        events.push({
            kind: 'fault',
            sort: sortKey(f.date),
            date: f.displayDate || formatDate(f.date),
            data: f
        });
    });
    CONTACTS.forEach(c => {
        const kind = (c.type === 'verksted') ? 'workshop'
                   : (c.type === 'mail-in' || c.type === 'mail-out') ? 'email'
                   : (c.type === 'telefon') ? 'phone'
                   : 'other';
        events.push({
            kind,
            sort: sortKey(c.date),
            date: c.displayDate || formatDate(c.date),
            data: c
        });
    });

    // Filter
    const filtered = events.filter(e => timelineFilter.types.has(e.kind));
    filtered.sort((a, b) => b.sort.localeCompare(a.sort));

    // Grupper per år
    const html = [];
    let currentYear = null;
    filtered.forEach(e => {
        const year = e.sort.slice(0, 4);
        if (year !== currentYear) {
            html.push(`<div class="timeline-year">${year === '0000' ? 'Uten dato' : year}</div>`);
            currentYear = year;
        }
        html.push(renderTimelineItem(e));
    });

    if (filtered.length === 0) {
        html.push('<p style="color:var(--text-subtle)">Ingen hendelser med valgte filter.</p>');
    }

    list.innerHTML = html.join('');

    // Oppdater telleren "X av Y viste"
    const countEl = $('#timeline-count');
    if (countEl) {
        countEl.textContent = filtered.length === events.length
            ? `${events.length} hendelser`
            : `${filtered.length} av ${events.length} viste`;
    }
}

function renderTimelineItem(e) {
    if (e.kind === 'fault') {
        const f = e.data;
        const cat = CATEGORIES[f.category];
        return `
            <div class="timeline-item item-fault">
                <div class="card card-fault">
                    <div class="meta">
                        <span class="badge badge-date">${esc(e.date)}</span>
                        <span class="badge badge-category cat-${f.category}">${esc(cat.short)}</span>
                        ${f.severity ? `<span class="badge badge-severity sev-${f.severity}">${esc(f.severity)}</span>` : ''}
                        <span class="badge badge-source">${esc(formatSource(f.source))}</span>
                    </div>
                    <h3>${esc(f.title)}</h3>
                    <p>${esc(f.description)}</p>
                    ${renderThumbs(f.images)}
                </div>
            </div>
        `;
    }
    // Kontakt
    const c = e.data;
    const cardClass = e.kind === 'email' ? 'card-email'
                    : e.kind === 'workshop' ? 'card-workshop'
                    : e.kind === 'phone' ? 'card-phone'
                    : 'card-other';
    const fromToLine = (c.from || c.to)
        ? `<div class="card-fromto">${c.from ? 'Fra: <b>' + esc(c.from) + '</b>' : ''}${c.from && c.to ? ' &nbsp;→&nbsp; ' : ''}${c.to ? 'Til: <b>' + esc(c.to) + '</b>' : ''}</div>`
        : '';
    return `
        <div class="timeline-item item-${e.kind}">
            <div class="card ${cardClass}">
                <div class="meta">
                    <span class="badge badge-date">${esc(e.date)}</span>
                    <span class="badge badge-type type-${esc(c.type)}">${esc(typeLabel(c.type))}</span>
                </div>
                <h3>${esc(c.title)}</h3>
                ${fromToLine}
                <p>${esc(c.description)}</p>
                ${c.link ? `<div style="margin-top:8px"><a href="${esc(c.link)}" target="_blank" rel="noopener">Åpne mail</a></div>` : ''}
            </div>
        </div>
    `;
}

function typeLabel(t) {
    return { 'mail-out': 'Mail ut', 'mail-in': 'Mail inn', 'verksted': 'Verksted', 'telefon': 'Telefon', 'annet': 'Annet' }[t] || t;
}

// ============ BILDEGALLERI ============
function renderGallery() {
    const root = $('#view-gallery');
    const rows = [];

    rows.push(renderLegendBar());
    rows.push('<h2>Bildegalleri</h2>');
    rows.push('<p class="lead">Alle dokumentasjonsbilder og -videoer gruppert etter kategori. Klikk på et bilde for å se det i full størrelse.</p>');

    Object.entries(CATEGORIES).forEach(([key, cat]) => {
        const items = [];
        FAULTS.filter(f => f.category === key).forEach(f => {
            (f.images || []).forEach(img => {
                items.push({
                    ...img,
                    title: f.title,
                    date: f.displayDate || formatDate(f.date)
                });
            });
        });
        if (items.length === 0) return;

        rows.push(`
            <div class="gallery-cat" style="--cat: ${cat.color}">
                <h3>${esc(cat.label)} <span class="count-inline">${items.length}</span></h3>
                <div class="gallery-grid">
                    ${items.map(img => `
                        <button class="gallery-item ${img.type === 'video' ? 'is-video' : ''}"
                                data-full="${esc(img.full)}" data-type="${esc(img.type)}"
                                aria-label="Åpne ${esc(img.title)}">
                            <img src="${esc(img.thumb)}" alt="" loading="lazy">
                            <div class="caption">${esc(img.date)}<br>${esc(img.title)}</div>
                        </button>
                    `).join('')}
                </div>
            </div>
        `);
    });

    root.innerHTML = rows.join('');
}

// ============ LIGHTBOX MODAL ============
let modalItems = [];
let modalIndex = -1;

function collectModalItems() {
    modalItems = [];
    $$('button[data-full]').forEach(el => {
        modalItems.push({
            full: el.dataset.full,
            type: el.dataset.type || 'image',
            title: el.getAttribute('aria-label') || ''
        });
    });
}

function initModal() {
    // Delegert klikk-håndtering (fungerer for elementer som renderes dynamisk)
    document.body.addEventListener('click', (ev) => {
        const btn = ev.target.closest('button[data-full]');
        if (btn) {
            collectModalItems();
            const key = btn.dataset.full;
            modalIndex = modalItems.findIndex(m => m.full === key);
            if (modalIndex >= 0) openModalAt(modalIndex);
        }
    });

    $('.modal-close').addEventListener('click', closeModal);
    $('.modal-nav.prev').addEventListener('click', () => nav(-1));
    $('.modal-nav.next').addEventListener('click', () => nav(1));
    $('#modal').addEventListener('click', (ev) => {
        if (ev.target.id === 'modal') closeModal();
    });
    window.addEventListener('keydown', (ev) => {
        if (!$('#modal').classList.contains('open')) return;
        if (ev.key === 'Escape')     closeModal();
        if (ev.key === 'ArrowLeft')  nav(-1);
        if (ev.key === 'ArrowRight') nav(1);
    });

    // Touch swipe
    let startX = 0;
    const m = $('#modal');
    m.addEventListener('touchstart', (ev) => { startX = ev.changedTouches[0].screenX; });
    m.addEventListener('touchend',   (ev) => {
        const dx = ev.changedTouches[0].screenX - startX;
        if (Math.abs(dx) > 60) nav(dx < 0 ? 1 : -1);
    });
}

function openModalAt(i) {
    modalIndex = (i + modalItems.length) % modalItems.length;
    const item = modalItems[modalIndex];
    const modal = $('#modal');
    const img = $('#modal-image');
    const vid = $('#modal-video');
    const meta = $('#modal-meta');

    if (item.type === 'video') {
        img.style.display = 'none';
        vid.style.display = 'block';
        vid.src = item.full;
    } else {
        vid.style.display = 'none';
        vid.pause?.();
        vid.src = '';
        img.style.display = 'block';
        img.src = item.full;
    }
    meta.textContent = `${item.title}  ·  ${modalIndex + 1}/${modalItems.length}`;
    modal.classList.add('open');
}
function closeModal() {
    const modal = $('#modal');
    modal.classList.remove('open');
    $('#modal-video').pause?.();
    $('#modal-video').src = '';
    $('#modal-image').src = '';
}
function nav(delta) {
    if (modalIndex < 0) return;
    openModalAt(modalIndex + delta);
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
    // Kjør auto-discovery av bilder basert på filnavn + manifest
    if (typeof applyAutoDiscovery === 'function') applyAutoDiscovery();

    // Fyll inn counts på nav-knapper
    document.querySelector('.nav-btn[data-view="status"] .count').textContent = CONTACTS.filter(c => c.featured).length;
    document.querySelector('.nav-btn[data-view="systems"] .count').textContent = Object.keys(CATEGORIES).length;
    document.querySelector('.nav-btn[data-view="timeline"] .count').textContent = FAULTS.length + CONTACTS.length;
    document.querySelector('.nav-btn[data-view="gallery"] .count').textContent = allImages().length;

    // Rendre alle visninger opp front (billig - all HTML lever i minnet uansett)
    renderStatus();
    renderSystems();
    renderTimeline();
    renderGallery();

    initNav();
    initModal();
});
