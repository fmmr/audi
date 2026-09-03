// Feildatabase for Audi Q4 e-tron (EH8XXXX)
// Kategorier: lading | mmi | hud | app | klima | nokkel | diverse
// Kilder:     observation (egen observasjon) | mail-YYYYMMDD (rapportert i mail) | verksted (verkstedrapport)

// Statusbanner øverst på "Siste status"-fanen.
// severity styrer farge: kritisk (rød) | høy (oransje) | middels (gul) | lav (blå/grå) | info (blå)
// Sett STATUS = null for å skjule banneret helt.
const STATUS = {
    header:   'Bilen til verksted 3. september - kabellås-feil funnet',
    body:     'Møller ringte 2. sep og tilbød time neste morgen. Møtte 07:30 den 3. sep. Verkstedet fant feil ved kabellåsen (kabelen låser seg ikke) - antas å være kilden til både AC- og DC-feilene. I tillegg kjøres en softwareoppgradering (4+ timer). Fikk leiebil. Fortsatt planlagt større verkstedtime 21. september for oppfølging av øvrige feil.',
    severity: 'høy',
    date:     '2026-09-03',
};

const CATEGORIES = {
    lading:  { label: 'Lading & Batteri',      color: '#f59e0b', short: 'Lading' },
    mmi:     { label: 'MMI & Programvare',     color: '#6366f1', short: 'MMI' },
    hud:     { label: 'HUD & Sikkerhet',       color: '#dc2626', short: 'HUD' },
    app:     { label: 'App & Tilkobling',      color: '#10b981', short: 'App' },
    klima:   { label: 'Klima & Komfort',       color: '#06b6d4', short: 'Klima' },
    nokkel:  { label: 'Nøkkel & Adgang',       color: '#a855f7', short: 'Nøkkel' },
    tilkobling: { label: 'Nettverk & tilkobling', color: '#0891b2', short: 'Nett' },
    diverse: { label: 'Diverse (motor, ledningsnett m.m.)', color: '#737373', short: 'Diverse' },
};

// Alle bilde-referanser peker mot filnavn under docs/. Videoer åpnes via video-parameter.
// image: { thumb, full, type: 'image'|'video' } - thumb er 'thumbs/xxx' hvis den finnes
const FAULTS = [
    // ============ 2026 ============
    {
        date: '2026-09-02',
        category: 'lading', source: 'observation', severity: 'kritisk',
        title: 'DC-lading-feil fra 10.-26. aug er tilbake',
        description: 'Feilmeldingen "DC-lading ikke mulig" fra 10.-26. august er tilbake. 2. sep: kjørt 4 små turer, varselet på under 3 av dem, ikke på den siste. 3. sep: feilmeldinger dukket opp igjen.',
        images: [
            { thumb: 'thumbs/20260902_lading_IMG_3160.jpg', full: '20260902_lading_IMG_3160.jpg', type: 'image' },
            { thumb: 'thumbs/20260902_lading_IMG_3161.jpg', full: '20260902_lading_IMG_3161.jpg', type: 'image' },
            { thumb: 'thumbs/20260903_lading_IMG_3175.jpg', full: '20260903_lading_IMG_3175.jpg', type: 'image' },
            { thumb: 'thumbs/20260903_lading_IMG_3176.jpg', full: '20260903_lading_IMG_3176.jpg', type: 'image' }
        ]
    },
    {
        date: '2026-09-02',
        category: 'klima', source: 'observation', severity: 'middels',
        title: 'Klimaanlegg gikk på med AC OFF - knallvarm bil i sola',
        description: 'Bilen sto i sola og var knallvarm. Klima gikk på selv om AC var i OFF-stilling. Enda et eksempel på de "random klimainnstillingene" som er beskrevet under vedvarende feil.',
        images: [
            { thumb: 'thumbs/20260902_klima_IMG_3159.jpg', full: '20260902_klima_IMG_3159.jpg', type: 'image' }
        ]
    },
    {
        date: '2026-09-02',
        category: 'lading', source: 'observation', severity: 'kritisk',
        title: 'AC-lading feiler flere netter på rad',
        description: 'Natt 1-2. sep: koblet til på 64% (1. sep 22:36) til 80% (2. sep 13:27) - ca 15 timer for 16% (13,97 kWh), snittladeeffekt 1,09 kW. Natt 2-3. sep: ny mislykket ladeøkt. Bilen sto med melding "lading startes" i timevis (skal normalt kun vises i 30 sek mens lading initialiseres). Smartlading var av fordi bilen ikke rakk fastsatt tid i Tibber.',
        images: [
            { thumb: 'thumbs/20260902_IMG_3140.jpg', full: '20260902_IMG_3140.jpg', type: 'image' },
            { thumb: 'thumbs/20260902_IMG_3141.jpg', full: '20260902_IMG_3141.jpg', type: 'image' },
            { thumb: 'thumbs/20260902_IMG_3144.jpg', full: '20260902_IMG_3144.jpg', type: 'image' },
            { thumb: 'thumbs/20260902_lading_IMG_3157.jpg', full: '20260902_lading_IMG_3157.jpg', type: 'image' },
            { thumb: 'thumbs/20260902_lading_IMG_3158.jpg', full: '20260902_lading_IMG_3158.jpg', type: 'image' },
            { thumb: 'thumbs/20260903_lading_IMG_3170.png', full: '20260903_lading_IMG_3170.png', type: 'image' },
            { thumb: 'thumbs/20260903_lading_IMG_3171.png', full: '20260903_lading_IMG_3171.png', type: 'image' },
            { thumb: 'thumbs/20260903_lading_IMG_3172.png', full: '20260903_lading_IMG_3172.png', type: 'image' }
        ]
    },
    {
        date: '2026-09-01',
        category: 'lading', source: 'observation', severity: 'høy',
        title: 'Ladelyset blinker rødt/grønt + tilhørende app-feil',
        description: 'Ladelyset på bilen blinker rødt/grønt (video), med tilhørende feilmelding i myAudi-appen. Samme symptom som tidligere ladefeil (bl.a. 15. august, 30. august).',
        images: []
    },
    {
        date: '2026-08-30', displayDate: '30. august 2026 (i mail som "20240830")',
        category: 'tilkobling', source: 'mail-20260831', severity: 'middels',
        title: 'Mangler dataforbindelse - Høvik, Bærum',
        description: 'Mangler dataforbindelse på hovedvei ved Høvik i Bærum.',
        images: [{ thumb: 'thumbs/20260830_IMG_3099.jpg', full: '20260830_IMG_3099.jpg', type: 'image' }]
    },
    {
        date: '2026-08-30', displayDate: '30. august 2026 (i mail som "20240830")',
        category: 'lading', source: 'mail-20260831', severity: 'kritisk',
        title: 'Ladekabel sitter fast på Hurum - kun marginalt ladet',
        description: 'Ladekabel sitter fast på Hurum, bilen kun ladet marginalt på 5 timer. Ladelys blinker rødt/grønt (video).',
        images: [
            { thumb: 'thumbs/20260830_IMG_3108.png', full: '20260830_IMG_3108.mp4', type: 'video' },
            { thumb: 'thumbs/20260830_IMG_3111.jpg', full: '20260830_IMG_3111.jpg', type: 'image' },
            { thumb: 'thumbs/20260830_IMG_3112.jpg', full: '20260830_IMG_3112.jpg', type: 'image' },
            { thumb: 'thumbs/20260830_IMG_3113.jpg', full: '20260830_IMG_3113.jpg', type: 'image' },
            { thumb: 'thumbs/20260830_IMG_3114.jpg', full: '20260830_IMG_3114.jpg', type: 'image' },
            { thumb: 'thumbs/20260830_IMG_3115.jpg', full: '20260830_IMG_3115.jpg', type: 'image' }
        ]
    },
    {
        date: '2026-08-30', displayDate: '30. august 2026 (i mail som "20240830")',
        category: 'tilkobling', source: 'mail-20260831', severity: 'middels',
        title: 'Mangler dataforbindelse - Hurum',
        description: 'Mangler dataforbindelse på hovedvei på Hurum.',
        images: [{ thumb: 'thumbs/20260830_IMG_3110.jpg', full: '20260830_IMG_3110.jpg', type: 'image' }]
    },
    {
        date: '2026-08-31', displayDate: '31. august 2026 (morgen, natt 30.-31.)',
        category: 'lading', source: 'mail-20260831', severity: 'kritisk',
        title: 'Bilen kun ladet 9% på 11 timer (32A)',
        description: 'Natt til 31. august: bilen kun ladet marginalt på 11 timer (9% på 32A easee-lader). Tredje ladeforsøk på under et døgn med samme symptom - se også Høvik morgen 30. aug (~6t/~2%) og Hurum midt på dagen 30. aug (5t/marginalt).',
        images: []
    },
    {
        date: '2026-08-30', displayDate: '30. august 2026 (morgen)',
        category: 'lading', source: 'mail-20260831', severity: 'kritisk',
        title: 'Ladekabel sitter fast på Høvik - ladet svært lite',
        description: 'Ladekabel satt fast på Høvik om morgenen. Bilen var plugget i ca 6 timer men ladet kun et par prosent. Easee-appen viste ca 1 kW - samme symptom som senere samme dag på Hurum og påfølgende natt (11t/9%).',
        images: []
    },
    {
        date: '2026-08-29',
        category: 'lading', source: 'observation', severity: 'høy',
        title: 'Ladekabel sitter fast',
        description: 'Ladekabel sitter fast i ladeport. Video av ladeport med kabel.',
        images: []
    },
    {
        date: '2026-08-27', displayDate: '27. august 2026 (i mail som "20240827")',
        category: 'app', source: 'mail-20260827', severity: 'høy',
        title: 'App sender 53 pushmeldinger under kjøring',
        description: 'App sender 53(!) pushmeldinger mens jeg kjører. Tekst: "Det har oppstått en feil: Batteriladingen prioriteres".',
        images: [
            { thumb: 'thumbs/20260827_IMG_3080.jpg', full: '20260827_IMG_3080.jpg', type: 'image' },
            { thumb: 'thumbs/20260827_IMG_3082.jpg', full: '20260827_IMG_3082.jpg', type: 'image' }
        ]
    },
    {
        date: '2026-08-27', displayDate: '27. august 2026 (i mail som "20240827")',
        category: 'tilkobling', source: 'mail-20260827', severity: 'middels',
        title: 'Mangler dataforbindelse - E-134',
        description: 'Mangler dataforbindelse på hovedvei (E-134).',
        images: [{ thumb: 'thumbs/20260827_IMG_3079.jpg', full: '20260827_IMG_3079.jpg', type: 'image' }]
    },
    {
        date: '2026-08-10..2026-08-26', displayDate: '10.-26. august 2026',
        category: 'lading', source: 'mail-20260826', severity: 'kritisk',
        title: 'Feilmelding: DC-lading ikke mulig',
        description: 'Vedvarende feilmelding om at DC-lading ikke er mulig.',
        images: [
            { thumb: 'thumbs/20260812_lading_IMG_2947.jpg', full: '20260812_lading_IMG_2947.jpg', type: 'image' },
            { thumb: 'thumbs/20260812_lading_IMG_2948.jpg', full: '20260812_lading_IMG_2948.jpg', type: 'image' }
        ]
    },
    {
        date: '2026-08-15',
        category: 'lading', source: 'mail-20260826', severity: 'høy',
        title: 'Ladelys veksler mellom rødt og grønt under lading',
        description: 'Ladelys veksler mellom rødt og grønt under lading.',
        images: []
    },
    {
        date: '2026-08-16',
        category: 'klima', source: 'observation', severity: 'middels',
        title: 'Klimaanlegg gikk rett på Lo uten grunn',
        description: 'Klimaanlegg gikk rett på Lo (Low) selv om det ikke var spesielt varmt i bilen. Konkret eksempel på de "random klimainnstillingene" som er beskrevet under vedvarende feil.',
        images: []
    },
    {
        date: '2026-08-24',
        category: 'tilkobling', source: 'observation', severity: 'middels',
        title: 'Kan ikke opprette dataforbindelse - Tofteveien, Hurum',
        description: 'MMI: "Kan ikke opprette dataforbindelse" på hovedvei (Tofteveien, Hurum).',
        images: []
    },
    {
        date: '2026-08-11',
        category: 'nokkel', source: 'mail-20260826', severity: 'middels',
        title: 'Bagasjerommet åpner ved trykk på lås opp',
        description: 'Bagasjerommet åpner når man trykker på lås opp (2 ganger).',
        images: []
    },
    {
        date: '2026-08-10',
        category: 'lading', source: 'mail-20260826', severity: 'høy',
        title: 'Ladekabel sitter fast',
        description: 'Ladekabel sitter fast. Fikk den løs ved å dra i spaken i bagasjerommet.',
        images: []
    },
    {
        date: '2026-08-01',
        category: 'tilkobling', source: 'mail-20260826', severity: 'middels',
        title: 'Mangler dataforbindelse på hovedvei',
        description: 'Mangler dataforbindelse på hovedvei.',
        images: [{ thumb: 'thumbs/20260801_IMG_2713.jpg', full: '20260801_IMG_2713.jpg', type: 'image' }]
    },
    {
        date: '2026-08-01',
        category: 'app', source: 'mail-20260826', severity: 'høy',
        title: 'App feiler: mange pushmeldinger om feil',
        description: 'App feiler: mange pushmeldinger om at det har oppstått en feil.',
        images: [{ thumb: 'thumbs/20260801_IMG_2709.jpg', full: '20260801_IMG_2709.jpg', type: 'image' }]
    },
    {
        date: '2026-08-01',
        category: 'hud', source: 'observation', severity: 'høy',
        title: 'HUD forsvinner under kjøring',
        description: 'Head-up-display forsvinner under kjøring.',
        images: []
    },
    {
        date: '2026-08-01',
        category: 'mmi', source: 'mail-20260826', severity: 'høy',
        title: 'MMI privatsfære - må logge på på nytt, alle innstillinger mistet',
        description: 'MMI: privatsfære-melding - må logge på på nytt. Alle innstillinger mistet, må stille språk (hard restart). Etterpå mangler flere av de vanlige knappene/favorittene.',
        images: []
    },
    {
        date: '2026-07-16',
        category: 'app', source: 'mail-20260826', severity: 'middels',
        title: 'App feiler: kan ikke starte klimatisering',
        description: 'App feiler: kan ikke starte klimatisering.',
        images: []
    },
    {
        date: '2026-07-13',
        category: 'mmi', source: 'mail-20260826', severity: 'høy',
        title: 'MMI krasjer - innstillinger mistet (favoritter)',
        description: 'MMI krasjer - innstillinger mistet (favoritter).',
        images: []
    },
    {
        date: '2026-06-21..2026-06-30', displayDate: '21.-30. juni 2026',
        category: 'app', source: 'mail-20260826', severity: 'høy',
        title: 'App feiler: "midlertidig deaktivert"',
        description: 'App feiler: "midlertidig deaktivert" (pågikk 21.-30. juni).',
        images: [
            { thumb: 'thumbs/20260621_IMG_1676.jpg', full: '20260621_IMG_1676.jpg', type: 'image' },
            { thumb: 'thumbs/20260628_IMG_1737.jpg', full: '20260628_IMG_1737.jpg', type: 'image' },
            { thumb: 'thumbs/20260630_IMG_1767.jpg', full: '20260630_IMG_1767.jpg', type: 'image' },
            { thumb: 'thumbs/20260630_IMG_1768.jpg', full: '20260630_IMG_1768.jpg', type: 'image' },
            { thumb: 'thumbs/20260630_IMG_1769.jpg', full: '20260630_IMG_1769.jpg', type: 'image' },
            { thumb: 'thumbs/20260630_IMG_1770.jpg', full: '20260630_IMG_1770.jpg', type: 'image' },
            { thumb: 'thumbs/20260630_IMG_1771.jpg', full: '20260630_IMG_1771.jpg', type: 'image' }
        ]
    },
    {
        date: '2026-06-17',
        category: 'nokkel', source: 'mail-20260826', severity: 'høy',
        title: 'Keyless fungerer ikke',
        description: 'Keyless fungerer ikke. Video fra 17. juni: nøkkel foran dør i regn, opplåsing feiler.',
        images: []
    },
    {
        date: '2026-06-14',
        category: 'tilkobling', source: 'observation', severity: 'middels',
        title: 'Bluetooth: kan ikke opprette forbindelse',
        description: 'Bluetooth: kan ikke opprette forbindelse.',
        images: []
    },
    {
        date: '2026-03-27',
        category: 'hud', source: 'mail-20260826', severity: 'høy',
        title: 'HUD forsvinner under kjøring',
        description: 'Head-up-display forsvinner under kjøring.',
        images: []
    },
    {
        date: '2026-05-02',
        category: 'mmi', source: 'observation', severity: 'høy',
        title: 'MMI krasjer - "Velkommen Fredrik" hele kjøreturen',
        description: 'MMI viser "Velkommen Fredrik. Laster inn brukerinformasjon. Vent litt..." under hele kjøreturen. To bilder tatt kl 17:08 og 17:25 illustrerer at MMI er stuck i minst 17 minutter.',
        images: []
    },
    {
        date: '2026-07-28',
        category: 'app', source: 'observation', severity: 'middels',
        title: 'App: kan ikke starte parkeringsklimatisering',
        description: 'App melder "Parkeringsklimatisering kunne ikke startes. Bilen din er eventuelt på et sted med utilstrekkelig internettforbindelse" (feilkode E:CV.PA.34). Bilen sto et sted hvor det vanligvis er full dekning.',
        images: []
    },
    {
        date: '2026-08-02',
        category: 'app', source: 'observation', severity: 'lav',
        title: 'App: status utdatert (3 timer siden), ingen data',
        description: 'App viser at data er "for 3 timer siden". Km og % vises som "--". Bilen sto et sted hvor det vanligvis er full dekning.',
        images: []
    },
    {
        date: '2026-03-25',
        category: 'tilkobling', source: 'mail-20260826', severity: 'middels',
        title: 'Mangler dataforbindelse på hovedvei',
        description: 'Mangler dataforbindelse på hovedvei.',
        images: []
    },
    {
        date: '2026-03-25',
        category: 'hud', source: 'mail-20260826', severity: 'høy',
        title: 'HUD forsvinner under kjøring',
        description: 'Head-up-display forsvinner under kjøring.',
        images: []
    },
    {
        date: '2026-03-21',
        category: 'app', source: 'mail-20260826', severity: 'middels',
        title: 'App feiler: kan ikke lese status fra bil (pågikk i flere dager)',
        description: 'App feiler: kan ikke lese status fra bil. Feilen pågikk i flere dager.',
        images: []
    },
    {
        date: '2026-03-20',
        category: 'hud', source: 'mail-20260826', severity: 'høy',
        title: 'HUD forsvinner under kjøring',
        description: 'Head-up-display forsvinner under kjøring.',
        images: []
    },
    {
        date: '2026-02-08',
        category: 'mmi', source: 'mail-20260826', severity: 'høy',
        title: 'MMI krasjer - "velkommen Fredrik" hele turen',
        description: 'MMI krasjer - umulig å nullstille - står "velkommen Fredrik" hele kjøreturen.',
        images: []
    },
    {
        date: '2026-02-08',
        category: 'hud', source: 'mail-20260826', severity: 'høy',
        title: 'HUD forsvinner under kjøring',
        description: 'Head-up-display forsvinner under kjøring.',
        images: []
    },
    {
        date: '2026-02-08',
        category: 'mmi', source: 'mail-20260826', severity: 'høy',
        title: 'MMI krasjer - favoritter mistet',
        description: 'MMI krasjer - innstillinger mistet (favoritter).',
        images: []
    },
    {
        date: '2026-02-08',
        category: 'hud', source: 'observation', severity: 'høy',
        title: 'Adaptiv kjøreassistent: prediktiv regulering ikke tilgjengelig',
        description: '"Adaptiv kjøreassistent: prediktiv regulering ikke tilgjengelig nå. Se instruksjonsbok". Skjer av og til i tunnel, men også langs europavei.',
        images: []
    },
    {
        date: '2026-01-12',
        category: 'app', source: 'mail-20260826', severity: 'middels',
        title: 'App feiler: kan ikke sette lademål',
        description: 'App feiler: kan ikke sette lademål.',
        images: []
    },

    // ============ 2025 (fra mail 20260826) ============
    {
        date: '2025-12-31',
        category: 'hud', source: 'mail-20260826', severity: 'kritisk',
        title: 'Flere sikkerhetsassistanser ute samtidig - "sensorsikt begrenset"',
        description: '40-54 km/t, -4,0°C, kl 11:20-11:21. To samtidige feilmeldinger: (1) Audi pre sense: for tiden begrenset - sensorsikt begrenset pga. forholdene, (2) Nødstoppassistent: ikke tilgjengelig for øyeblikket. Bilen skylder på forholdene, men ingen åpenbar hindring foran sensorene.',
        images: []
    },
    {
        date: '2025-12-27',
        category: 'klima', source: 'mail-20260826', severity: 'høy',
        title: 'Klima: SYNC-knappen fungerer ikke',
        description: 'SYNC-knappen på klimaanlegget reagerer ikke - kan ikke synkronisere temperatur mellom fører- og passasjerside. Se video.',
        images: []
    },
    {
        date: '2025-12-27',
        category: 'hud', source: 'mail-20260826', severity: 'høy',
        title: 'HUD forsvinner under kjøring',
        description: 'Head-up-display forsvinner under kjøring.',
        images: []
    },
    {
        date: '2025-12-26',
        category: 'hud', source: 'mail-20260826', severity: 'kritisk',
        title: 'Flere sikkerhetsassistanser ute samtidig - "sensorsikt begrenset"',
        description: '75 km/t, -3,5°C, kl 17:53. Tre samtidige feilmeldinger: (1) Nødstoppassistent: ikke tilgjengelig for øyeblikket, (2) Audi pre sense: for tiden begrenset - sensorsikt begrenset pga. forholdene, (3) Kjørefeltassistanse: ikke tilgjengelig - sensorsikt begrenset pga. forholdene. Bilen skylder på forholdene, men ingen åpenbar hindring foran sensorene.',
        images: []
    },
    {
        date: '2025-12-21',
        category: 'hud', source: 'mail-20260826', severity: 'høy',
        title: 'HUD forsvinner under kjøring',
        description: 'Head-up-display forsvinner under kjøring.',
        images: []
    },
    {
        date: '2025-10-17',
        category: 'hud', source: 'mail-20260826', severity: 'høy',
        title: 'HUD forsvinner under kjøring',
        description: 'Head-up-display forsvinner under kjøring.',
        images: []
    },
    {
        date: '2025-08-27',
        category: 'mmi', source: 'mail-20260826', severity: 'høy',
        title: 'MMI krasjer - favoritter mistet',
        description: 'MMI krasjer - innstillinger mistet (favoritter).',
        images: []
    },
    {
        date: '2025-08-23',
        category: 'tilkobling', source: 'mail-20260826', severity: 'middels',
        title: 'Bluetooth: kan ikke opprette forbindelse',
        description: 'Bluetooth: kan ikke opprette noen bluetooth-forbindelse.',
        images: []
    },
    {
        date: '2025-07-21',
        category: 'app', source: 'observation', severity: 'middels',
        title: 'App: kan ikke stille lademål (100→80/90)',
        description: 'Forsøkte å endre lademål fra 100% til 80/90% via appen, men det var ikke mulig. Bildet viser app-status (90% ladet, "Oppdatert for 2 Timer siden") som illustrasjon.',
        images: []
    },
    {
        date: '2025-07-14',
        category: 'tilkobling', source: 'mail-20260826', severity: 'middels',
        title: 'Mangler dataforbindelse på hovedvei',
        description: 'Mangler dataforbindelse på hovedvei.',
        images: []
    },
    {
        date: '2025-07-12',
        category: 'app', source: 'mail-20260826', severity: 'middels',
        title: 'App feiler: kan ikke starte klimatisering',
        description: 'App feiler: kan ikke starte klimatisering.',
        images: []
    },
    {
        date: '2025-05-24',
        category: 'tilkobling', source: 'mail-20260826', severity: 'middels',
        title: 'Mangler dataforbindelse på hovedvei',
        description: 'Mangler dataforbindelse på hovedvei.',
        images: []
    },
    {
        date: '2025-05-22',
        category: 'app', source: 'mail-20260826', severity: 'middels',
        title: 'App feiler: data lastes ikke inn (E:BFF.9999)',
        description: 'Ca 07:53: "Feil ved innlasting - connect-tjenestene for denne bilen kunne ikke eller kun delvis lastes inn". Feilkoder: E:BFF.9999, E:BFF.4001. Inkluderer at man ikke får satt lademål fra app.',
        images: []
    },

    // ============ 2025 (fra opprinnelig HTML - "Feil etter verkstedbesøk 2. januar") ============
    {
        date: '2025-05-06',
        category: 'nokkel', source: 'observation', severity: 'høy',
        title: 'Keyless fungerer ikke - må bruke nøkkel',
        description: 'Keyless fungerer plutselig ikke. Må bruke nøkkelen for å åpne bilen. Låsing fungerer men opplåsing fungerer ikke.',
        images: [{ thumb: 'thumbs/20250506_IMG_8581.png', full: '20250506_IMG_8581.mp4', type: 'video' }]
    },
    {
        date: '2025-04-12',
        category: 'diverse', source: 'observation', severity: 'kritisk',
        title: '"Motor: Feil! Oppsøk verksted" - cruise control ute',
        description: '"Motor: Feil! Oppsøk verksted" kommer i displayet hver gang bilen brukes. Denne feilen går ikke bort. Det går fint an å kjøre med bilen, men adaptiv kjøreassistent/cruise control virker ikke. (Fikset hos Møller Rud 20250428.)',
        images: [
            { thumb: 'thumbs/20250412_IMG_8287.jpg', full: '20250412_IMG_8287.jpg', type: 'image' },
            { thumb: 'thumbs/20250413_IMG_8294.jpg', full: '20250413_IMG_8294.jpg', type: 'image' }
        ]
    },
    {
        date: '2025-04-13',
        category: 'mmi', source: 'observation', severity: 'middels',
        title: '"Velkommen. Laster brukerinformasjon" hele turen',
        description: '"Velkommen. Laster brukerinformasjon. Vent litt..." melding i MMI hele bilturen (20 min).',
        images: [{ thumb: 'thumbs/20250413_IMG_8295.jpg', full: '20250413_IMG_8295.jpg', type: 'image' }]
    },
    {
        date: '2025-03-28',
        category: 'hud', source: 'observation', severity: 'høy',
        title: 'HUD forsvant under kjøring',
        description: 'Head-up-displayet forsvant under kjøring igjen.',
        images: [{ thumb: 'thumbs/20250328_IMG_8142.jpg', full: '20250328_IMG_8142.jpg', type: 'image' }]
    },
    {
        date: '2025-03-22',
        category: 'mmi', source: 'observation', severity: 'middels',
        title: '"Sperren for registrerte brukeren ikke opphevet"',
        description: 'Fikk plutselig meldingen: "Sperren for den registrerte brukeren er ikke opphevet ennå. Forbereder bytte til gjestebrukeren."',
        images: [{ thumb: 'thumbs/20250322_IMG_8109.jpg', full: '20250322_IMG_8109.jpg', type: 'image' }]
    },
    {
        date: '2025-03-21',
        category: 'tilkobling', source: 'observation', severity: 'lav',
        title: 'Lang kø ikke registrert i navigasjonssystemet',
        description: 'Lang kø (15 min forsinkelse, 3 km) uten at den er registrert i navigasjonssystemet. Som regel er bilen flink til å varsle om dette, men ikke i dette tilfelle. Samtidig viste Google Maps stillestående kø i området.',
        images: [
            { thumb: 'thumbs/20250321_IMG_8101.jpg', full: '20250321_IMG_8101.jpg', type: 'image' },
            { thumb: 'thumbs/20250321_IMG_8102.jpg', full: '20250321_IMG_8102.jpg', type: 'image' }
        ]
    },
    {
        date: '2025-03-18', displayDate: '2025-03-18 (og mange datoer i jan-apr 2025)',
        category: 'tilkobling', source: 'observation', severity: 'høy',
        title: 'Stadig bortfall av nettilgang - selv i tettbygde strøk',
        description: 'Stadig bortfall av nettilgang, selv i tettbygde strøk, f.eks. Oslo Sentrum, rundt Sandvika, utenfor Møller Billingstad, langs E16, langs E6, langs RV3. Skjer så og si på hver eneste biltur av en viss varighet. Noen ganger fra start, andre ganger etter hvert. Nettilgangen kommer typisk omsider tilbake. Har skjedd mange ganger, som f.eks.: 20250122, 20250124, 20250129, 20250130, 20250206, 20250208, 20250214, 20250215, 20250218, 20250222, 20250222, 20250225, 20250228, 20250316, 20250318, 20250411 og 20250414.',
        images: [
            { thumb: 'thumbs/20250122_IMG_7623.jpg', full: '20250122_IMG_7623.jpg', type: 'image' },
            { thumb: 'thumbs/20250122_IMG_7630.jpg', full: '20250122_IMG_7630.jpg', type: 'image' },
            { thumb: 'thumbs/20250124_IMG_7658.jpg', full: '20250124_IMG_7658.jpg', type: 'image' },
            { thumb: 'thumbs/20250129_IMG_7701.jpg', full: '20250129_IMG_7701.jpg', type: 'image' },
            { thumb: 'thumbs/20250130_IMG_7704.jpg', full: '20250130_IMG_7704.jpg', type: 'image' },
            { thumb: 'thumbs/20250206_IMG_7784.jpg', full: '20250206_IMG_7784.jpg', type: 'image' },
            { thumb: 'thumbs/20250208_IMG_7794.jpg', full: '20250208_IMG_7794.jpg', type: 'image' },
            { thumb: 'thumbs/20250214_IMG_7857.jpg', full: '20250214_IMG_7857.jpg', type: 'image' },
            { thumb: 'thumbs/20250215_IMG_7872.jpg', full: '20250215_IMG_7872.jpg', type: 'image' },
            { thumb: 'thumbs/20250218_IMG_7889.jpg', full: '20250218_IMG_7889.jpg', type: 'image' },
            { thumb: 'thumbs/20250222_IMG_7912.jpg', full: '20250222_IMG_7912.jpg', type: 'image' },
            { thumb: 'thumbs/20250222_IMG_7913.jpg', full: '20250222_IMG_7913.jpg', type: 'image' },
            { thumb: 'thumbs/20250225_IMG_7960.jpg', full: '20250225_IMG_7960.jpg', type: 'image' },
            { thumb: 'thumbs/20250228_IMG_7973.jpg', full: '20250228_IMG_7973.jpg', type: 'image' },
            { thumb: 'thumbs/20250316_IMG_4261.jpg', full: '20250316_IMG_4261.jpg', type: 'image' },
            { thumb: 'thumbs/20250318_IMG_8083.jpg', full: '20250318_IMG_8083.jpg', type: 'image' },
            { thumb: 'thumbs/20250411_IMG_8269.jpg', full: '20250411_IMG_8269.jpg', type: 'image' },
            { thumb: 'thumbs/20250414_IMG_8315.jpg', full: '20250414_IMG_8315.jpg', type: 'image' }
        ]
    },
    {
        date: '2025-03-02',
        category: 'mmi', source: 'observation', severity: 'middels',
        title: 'Klokkeslett i MMI feil og umulig å stille',
        description: 'Klokkeslett i MMI er feil og ikke mulig å stille manuelt. Dette innvirker også da på navigasjonstidspunkter. Klokke i skjermen på dashboardet er riktig på samme tid. Klokka var ca 10:10, men viste ca 09:01. Neste gang jeg brukte bilen var klokka riktig.',
        images: [
            { thumb: 'thumbs/20250302_IMG_7985.jpg', full: '20250302_IMG_7985.jpg', type: 'image' },
            { thumb: 'thumbs/20250302_IMG_7986.jpg', full: '20250302_IMG_7986.jpg', type: 'image' },
            { thumb: 'thumbs/20250302_IMG_7988.jpg', full: '20250302_IMG_7988.jpg', type: 'image' }
        ]
    },
    {
        date: '2025-02-28',
        category: 'hud', source: 'observation', severity: 'høy',
        title: 'HUD forsvant under kjøring',
        description: 'Head-up-displayet forsvant under kjøring igjen.',
        images: [{ thumb: 'thumbs/20250228_IMG_7974.png', full: '20250228_IMG_7974.mp4', type: 'video' }]
    },
    {
        date: '2025-02-25',
        category: 'mmi', source: 'observation', severity: 'høy',
        title: 'MMI ble resatt midt under langtur',
        description: 'Midt under en langtur ble MMI resatt. MMI ble borte i ca 1 minutt. Tekst: "Velkommen Fredrik...". Etter at den kom tilbake var en del av innstillingene helt borte, f.eks. favorittene på radioen. Bilen husket fortsatt andre ting, f.eks. navigeringsruten jeg var i gang med, samt favorittene under både bil og navigasjon.',
        images: [
            { thumb: 'thumbs/20250225_IMG_7958.jpg', full: '20250225_IMG_7958.jpg', type: 'image' },
            { thumb: 'thumbs/20250225_IMG_7959.jpg', full: '20250225_IMG_7959.jpg', type: 'image' }
        ]
    },
    {
        date: '2025-02-25',
        category: 'hud', source: 'observation', severity: 'høy',
        title: 'HUD forsvant under kjøring',
        description: 'Head-up-displayet forsvant under kjøring igjen.',
        images: [{ thumb: 'thumbs/20250225_IMG_7961.png', full: '20250225_IMG_7961.mp4', type: 'video' }]
    },
    {
        date: '2025-02-21',
        category: 'hud', source: 'observation', severity: 'høy',
        title: 'HUD forsvant under kjøring',
        description: 'Head-up-displayet forsvant under kjøring igjen.',
        images: [{ thumb: 'thumbs/20250221_IMG_7903.jpg', full: '20250221_IMG_7903.jpg', type: 'image' }]
    },
    {
        date: '2025-02-10',
        category: 'klima', source: 'observation', severity: 'høy',
        title: 'Klimatisering fra app fungerte ikke - iskald bil ved avreise',
        description: 'ca 07:30: Satt avreisetid i app-en (klimatisering) til 08:15. ca 07:50: Sjekket at klimatiseringen startet. Da jeg kom ut til bilen 08:14 gikk ikke klimatiseringen, rutene var ikke tint, og bilen var iskald. Bildene av rutene er tatt 08:14.',
        images: [
            { thumb: 'thumbs/20250210_IMG_7819.jpg', full: '20250210_IMG_7819.jpg', type: 'image' },
            { thumb: 'thumbs/20250210_IMG_7821.jpg', full: '20250210_IMG_7821.jpg', type: 'image' },
            { thumb: 'thumbs/20250210_IMG_7822.jpg', full: '20250210_IMG_7822.jpg', type: 'image' },
            { thumb: 'thumbs/times.jpg', full: 'times.jpg', type: 'image' }
        ]
    },
    {
        date: '2025-02-07',
        category: 'hud', source: 'observation', severity: 'høy',
        title: 'HUD forsvant under kjøring',
        description: 'Head-up-displayet forsvant under kjøring igjen.',
        images: [{ thumb: 'thumbs/20250207_hud.png', full: '20250207_IMG_7790.mp4', type: 'video' }]
    },
    {
        date: '2025-02-02',
        category: 'hud', source: 'observation', severity: 'høy',
        title: 'HUD forsvant under kjøring',
        description: 'Head-up-displayet forsvant under kjøring igjen.',
        images: [{ thumb: 'thumbs/20250202_hud.png', full: '20250202_IMG_7754.mp4', type: 'video' }]
    },
    {
        date: '2025-02-02',
        category: 'klima', source: 'observation', severity: 'middels',
        title: 'Klimatisering fra app slo seg av etter 10 min',
        description: 'Starta klimatisering fra myAudi-appen og sjekket at den startet som den skulle. Da jeg sjekket 10 minutter senere hadde den skrudd seg av av seg selv.',
        images: [{ thumb: 'thumbs/20250202_IMG_7753.jpg', full: '20250202_IMG_7753.jpg', type: 'image' }]
    },
    {
        date: '2025-01-31',
        category: 'klima', source: 'observation', severity: 'middels',
        title: 'Klimatisering fra app - iskaldt etter 20 min',
        description: 'Starta klimatisering ca 12:00 fra myAudi-appen. Ingen feilmelding i appen, men da jeg gikk inn i bilen 20 minutter etter start var det iskaldt og varmen var ikke på.',
        images: []
    },
    {
        date: '2025-01-25',
        category: 'hud', source: 'observation', severity: 'høy',
        title: 'HUD forsvant under kjøring',
        description: 'Head-up-displayet forsvant under kjøring igjen.',
        images: [{ thumb: 'thumbs/hud_3.png', full: '20250125_IMG_7667.mp4', type: 'video' }]
    },
    {
        date: '2025-01-20',
        category: 'hud', source: 'observation', severity: 'høy',
        title: 'HUD forsvant under kjøring',
        description: 'Head-up-displayet forsvant under kjøring igjen.',
        images: [{ thumb: 'thumbs/hud_1.png', full: '20250120_IMG_7607.mp4', type: 'video' }]
    },
    {
        date: '2025-01-20',
        category: 'lading', source: 'observation', severity: 'middels',
        title: 'Pushmelding: "Det har oppstått en feil ladenettet"',
        description: 'Pushmelding i app-en: "Det har oppstått en feil ladenettet" (sic) med tilhørende feil i app-en. Disse kommer nesten daglig, og stammer nok fra at vi bruker smartlading, så det ikke nødvendigvis er strøm i ladekabelen når vi plugger den i. Dette er jo imidlertid ikke en feil - det er helt normalt, og bilen/app-en bør ikke feile pga dette.',
        images: [
            { thumb: 'thumbs/20250120_IMG_7605.jpg', full: '20250120_IMG_7605.jpg', type: 'image' },
            { thumb: 'thumbs/20250120_IMG_7606.jpg', full: '20250120_IMG_7606.jpg', type: 'image' }
        ]
    },
    {
        date: '2025-01-19',
        category: 'hud', source: 'observation', severity: 'høy',
        title: 'HUD forsvant under kjøring',
        description: 'Head-up-displayet forsvant under kjøring igjen.',
        images: [{ thumb: 'thumbs/hud_2.png', full: '20250119_IMG_7600.mp4', type: 'video' }]
    },
    {
        date: '2025-01-17',
        category: 'mmi', source: 'observation', severity: 'høy',
        title: 'Mange feilmeldinger om verksted/systemfeil',
        description: 'Mange feilmeldinger om å kontakte verksted/systemfeil. Ikke samme ordlyd som de som dukker opp ved dårlig sikt lenger ned. Mer "alvorlig" ordlyd. Feilene forsvant ved omstart av bilen.',
        images: [
            { thumb: 'thumbs/20250117_IMG_7579.jpg', full: '20250117_IMG_7579.jpg', type: 'image' },
            { thumb: 'thumbs/20250117_IMG_7580.jpg', full: '20250117_IMG_7580.jpg', type: 'image' },
            { thumb: 'thumbs/20250117_IMG_7581.jpg', full: '20250117_IMG_7581.jpg', type: 'image' },
            { thumb: 'thumbs/20250117_IMG_7584.jpg', full: '20250117_IMG_7584.jpg', type: 'image' },
            { thumb: 'thumbs/20250117_IMG_7585.jpg', full: '20250117_IMG_7585.jpg', type: 'image' }
        ]
    },
    {
        date: '2025-01-17',
        category: 'app', source: 'observation', severity: 'middels',
        title: 'App - ukjent feil, "Serveren har sendt et ugyldig svar"',
        description: 'Feil med app-en - Det var ikke mulig å sette på klimaanlegget. "ukjent feil" og "Serveren har sendt et ugyldig svar". Det hjelper ikke å prøve igjen (som feilmeldingen sier).',
        images: [
            { thumb: 'thumbs/app_igjen_igjen_1.jpg', full: 'app_igjen_igjen_1.jpg', type: 'image' },
            { thumb: 'thumbs/app_igjen_igjen_2.jpg', full: 'app_igjen_igjen_2.jpg', type: 'image' },
            { thumb: 'thumbs/app_igjen_igjen_3.jpg', full: 'app_igjen_igjen_3.jpg', type: 'image' }
        ]
    },
    {
        date: '2025-01-13',
        category: 'app', source: 'observation', severity: 'middels',
        title: 'App - "ukjent feil" og "bilen svarer ikke"',
        description: 'Feil med app-en - Det var ikke mulig å sette på klimaanlegget. "ukjent feil" og "bilen svarer ikke". Det hjelper ikke å prøve igjen (som feilmeldingen sier).',
        images: [
            { thumb: 'thumbs/app_igjen_1.jpg', full: 'app_igjen_1.jpg', type: 'image' },
            { thumb: 'thumbs/app_igjen_2.jpg', full: 'app_igjen_2.jpg', type: 'image' },
            { thumb: 'thumbs/app_igjen_3.jpg', full: 'app_igjen_3.jpg', type: 'image' },
            { thumb: 'thumbs/app_igjen_4.jpg', full: 'app_igjen_4.jpg', type: 'image' },
            { thumb: 'thumbs/app_igjen_5.jpg', full: 'app_igjen_5.jpg', type: 'image' }
        ]
    },
    // ============ 2024 (fra HTML "Feil etter 13. desember") ============
    {
        date: '2024-12-13..2024-12-31', displayDate: 'Etter 13. desember 2024',
        category: 'mmi', source: 'observation', severity: 'middels',
        title: 'MMI husker ikke favoritter som hurtigvalg',
        description: 'MMI: Husker ikke at vi vil ha favoritter i stedet for media som hurtigvalg. Blir resatt hver gang vi kjører bilen.',
        images: []
    },
    {
        date: '2024-12-13..2024-12-31', displayDate: 'Etter 13. desember 2024',
        category: 'mmi', source: 'observation', severity: 'lav',
        title: 'Kart husker ikke innstillinger (zoom, auto-zoom)',
        description: 'Kart: Husker ikke innstillinger, som for eksempel zoom-nivå eller auto-zoom av.',
        images: []
    },
    {
        date: '2024-12-13..2024-12-31', displayDate: 'Etter 13. desember 2024',
        category: 'mmi', source: 'observation', severity: 'middels',
        title: '"Velkommen. Laster brukerinformasjon" hele turen',
        description: '"Velkommen. Laster brukerinformasjon. Vent litt..." melding i MMI hele bilturen (20 min).',
        images: [{ thumb: 'thumbs/velkommen.jpg', full: 'velkommen.jpg', type: 'image' }]
    },
    {
        date: '2024-12-13..2024-12-31', displayDate: 'Etter 13. desember 2024',
        category: 'mmi', source: 'observation', severity: 'høy',
        title: 'Alle online-tjenester "grået ut" i MMI',
        description: 'Alle online-tjenester (for eksempel trafikk) "grået ut" i MMI. Hvis vi prøver å aktivere kommer "Tilpasser privatsfæreinnstillingene" og forsvinner etter noen sekunder, uten at noen av tjenestene virker. Har skjedd 2 ganger.',
        images: [
            { thumb: 'thumbs/online_1.jpg', full: 'online_1.jpg', type: 'image' },
            { thumb: 'thumbs/online_2.jpg', full: 'online_2.jpg', type: 'image' },
            { thumb: 'thumbs/online_3.jpg', full: 'online_3.jpg', type: 'image' }
        ]
    },
    {
        date: '2024-12-13..2024-12-31', displayDate: 'Etter 13. desember 2024',
        category: 'mmi', source: 'observation', severity: 'middels',
        title: 'Klokka 82 minutter feil - umulig å stille',
        description: 'Klokka var plutselig 82 minutter feil, uten at det gikk an å få stilt den eller skru av automatisk oppdatering av klokke.',
        images: [{ thumb: 'thumbs/klokke.jpg', full: 'klokke.jpg', type: 'image' }]
    },
    {
        date: '2024-12-13..2024-12-31', displayDate: 'Etter 13. desember 2024',
        category: 'mmi', source: 'observation', severity: 'middels',
        title: '"Sperren for registrerte brukeren - forbereder gjestebruker"',
        description: 'Fikk plutselig meldingen: "Sperren for den registrerte brukeren er ikke opphevet enda. Forbereder å bytte til gjestebruker".',
        images: [{ thumb: 'thumbs/sperre.jpg', full: 'sperre.jpg', type: 'image' }]
    },
    {
        date: '2024-12-13..2024-12-31', displayDate: 'Etter 13. desember 2024',
        category: 'mmi', source: 'observation', severity: 'middels',
        title: '"Rettighetskontroll pågår"',
        description: 'Fikk plutselig meldingen: "Rettighetskontroll pågår".',
        images: [{ thumb: 'thumbs/rettighetskontroll.jpg', full: 'rettighetskontroll.jpg', type: 'image' }]
    },
    {
        date: '2024-12-13..2024-12-31', displayDate: 'Etter 13. desember 2024',
        category: 'mmi', source: 'observation', severity: 'middels',
        title: 'Talekontrollen låst i "hva kan jeg hjelpe med"',
        description: 'Talekontrollen låst i "hva kan jeg hjelpe med" hele bilturen.',
        images: [{ thumb: 'thumbs/hva.png', full: 'hva.mp4', type: 'video' }]
    },
    {
        date: '2024-12-13..2024-12-31', displayDate: 'Etter 13. desember 2024',
        category: 'app', source: 'observation', severity: 'høy',
        title: 'App melder "sikkerhetssytem: Feil" uten mer info',
        description: 'Appen melder om "sikkerhetssytem: Feil" uten at det er noe mer info eller info i bilen om dette.',
        images: [{ thumb: 'thumbs/feil.jpg', full: 'feil.jpg', type: 'image' }]
    },

    // ============ 2024 (fra HTML "Nye feil meldt i mail 13. desember") ============
    {
        date: '2024-12-13', displayDate: 'Meldt i mail 13. desember 2024',
        category: 'hud', source: 'mail-20241213', severity: 'kritisk',
        title: 'HUD sluttet å fungere/slukket helt - 5 ganger',
        description: 'Head-up-displayet har sluttet å fungere/slukket helt under kjøring, og ikke mulig å skru på via MMI. Dette har skjedd 5 ganger.',
        images: [
            { thumb: 'thumbs/head.png', full: 'head_1.mp4', type: 'video' },
            { thumb: 'thumbs/head.png', full: 'head_2.mp4', type: 'video' },
            { thumb: 'thumbs/head.png', full: 'head_3.mp4', type: 'video' }
        ]
    },

    // ============ 2024 (fra HTML "Feil meldt i mail 28. november") ============
    {
        date: '2024-11-28', displayDate: 'Meldt i mail 28. november 2024',
        category: 'app', source: 'mail-20241128', severity: 'høy',
        title: 'Umulig å sette i gang varme fra myAudi APP-en',
        description: 'Umulig å sette i gang varme fra myAudi APP-en (saksnummer 0003198748 hos "Audi Digitale Tjenester").',
        images: [
            { thumb: 'thumbs/park_1.jpg', full: 'park_1.jpg', type: 'image' },
            { thumb: 'thumbs/park_2.jpg', full: 'park_2.jpg', type: 'image' }
        ]
    },
    {
        date: '2024-11-28', displayDate: 'Meldt i mail 28. november 2024',
        category: 'app', source: 'mail-20241128', severity: 'høy',
        title: 'Umulig å stille lademål fra myAudi APP-en',
        description: 'Umulig å stille lademål fra myAudi APP-en (saksnummer 0003198748 hos "Audi Digitale Tjenester").',
        images: [
            { thumb: 'thumbs/lade_1.jpg', full: 'lade_1.jpg', type: 'image' },
            { thumb: 'thumbs/lade_2.jpg', full: 'lade_2.jpg', type: 'image' },
            { thumb: 'thumbs/lade_3.jpg', full: 'lade_3.jpg', type: 'image' }
        ]
    },
    {
        date: '2024-11-28', displayDate: 'Meldt i mail 28. november 2024',
        category: 'app', source: 'mail-20241128', severity: 'middels',
        title: 'Umulig å sende tidsur fra myAudi APP-en',
        description: 'Umulig å sende tidsur fra myAudi APP-en.',
        images: [
            { thumb: 'thumbs/tidsur_1.jpg', full: 'tidsur_1.jpg', type: 'image' },
            { thumb: 'thumbs/tidsur_2.jpg', full: 'tidsur_2.jpg', type: 'image' }
        ]
    },
    {
        date: '2024-11-28', displayDate: 'Meldt i mail 28. november 2024',
        category: 'mmi', source: 'mail-20241128', severity: 'middels',
        title: 'Umulig å sette hovedbruker på bilen',
        description: 'Umulig å sette hovedbruker på bilen (feilsøkt live med "Audi Digitale Tjenester"). (audi.com & app har meg som hovedbruker.)',
        images: [
            { thumb: 'thumbs/bruker_1.jpg', full: 'bruker_1.jpg', type: 'image' },
            { thumb: 'thumbs/bruker_2.jpg', full: 'bruker_2.jpg', type: 'image' }
        ]
    },
    {
        date: '2024-11-28', displayDate: 'Meldt i mail 28. november 2024',
        category: 'nokkel', source: 'mail-20241128', severity: 'høy',
        title: 'Keyless virker ikke med mindre man nettopp har kjørt bilen',
        description: 'Keyless virker ikke med mindre man nettopp har kjørt bilen.',
        images: [{ thumb: 'thumbs/door.png', full: 'door.mp4', type: 'video' }]
    },
    {
        date: '2024-11-28', displayDate: 'Meldt i mail 28. november 2024',
        category: 'diverse', source: 'mail-20241128', severity: 'høy',
        title: '"Ledningsnett: begrenset for øyeblikket" - 7-8 ganger',
        description: '"Ledningsnett: begrenset for øyeblikket. Det er mulig å kjøre forsiktig videre" - har dukket opp 7-8 ganger.',
        images: [
            { thumb: 'thumbs/ledning_1.jpg', full: 'ledning_1.jpg', type: 'image' },
            { thumb: 'thumbs/ledning_2.jpg', full: 'ledning_2.jpg', type: 'image' },
            { thumb: 'thumbs/ledning_3.jpg', full: 'ledning_3.jpg', type: 'image' },
            { thumb: 'thumbs/ledning_4.jpg', full: 'ledning_4.jpg', type: 'image' },
            { thumb: 'thumbs/ledning_5.jpg', full: 'ledning_5.jpg', type: 'image' }
        ]
    },
    {
        date: '2024-09-05', displayDate: 'ca 5. september 2024',
        category: 'diverse', source: 'mail-20241128', severity: 'kritisk',
        title: 'Beskjed om alvorlig feil - må stoppe (2-3 ganger)',
        description: 'Vi har fått beskjed om at det er noe alvorlig feil med bilen og at vi må stoppe med en gang 2-3 ganger.',
        images: [
            { thumb: 'thumbs/20240905_IMG_6106.jpg', full: '20240905_IMG_6106.jpg', type: 'image' },
            { thumb: 'thumbs/20240905_IMG_6107.jpg', full: '20240905_IMG_6107.jpg', type: 'image' }
        ]
    },
    {
        date: '2024-11-28', displayDate: 'Meldt i mail 28. november 2024',
        category: 'lading', source: 'mail-20241128', severity: 'høy',
        title: 'App: "Lading ikke mulig. Det har oppstått en teknisk feil"',
        description: 'Appen sier stadig at "Lading ikke er mulig. Det har oppstått en teknisk feil".',
        images: [
            { thumb: 'thumbs/ladeapp_1.jpg', full: 'ladeapp_1.jpg', type: 'image' },
            { thumb: 'thumbs/ladeapp_2.jpg', full: 'ladeapp_2.jpg', type: 'image' },
            { thumb: 'thumbs/ladeapp_3.jpg', full: 'ladeapp_3.jpg', type: 'image' },
            { thumb: 'thumbs/ladeapp_4.jpg', full: 'ladeapp_4.jpg', type: 'image' }
        ]
    },
    {
        date: '2024-11-28', displayDate: 'Meldt i mail 28. november 2024',
        category: 'lading', source: 'mail-20241128', severity: 'kritisk',
        title: 'Bilen sier "Ladesystem feil!"',
        description: 'Bilen sier "Ladesystem feil!"',
        images: [
            { thumb: 'thumbs/ladebil_1.jpg', full: 'ladebil_1.jpg', type: 'image' },
            { thumb: 'thumbs/ladebil_2.jpg', full: 'ladebil_2.jpg', type: 'image' }
        ]
    },
    {
        date: '2024-11-28', displayDate: 'Meldt i mail 28. november 2024',
        category: 'lading', source: 'mail-20241128', severity: 'middels',
        title: 'Ladeluke rødt lys uten feil',
        description: 'Feilen med ladeluka som stadig viser rødt lys uten at det er noe feil.',
        images: [
            { thumb: 'thumbs/ladeluke_1.jpg', full: 'ladeluke_1.jpg', type: 'image' },
            { thumb: 'thumbs/ladeluke_2.jpg', full: 'ladeluke_2.jpg', type: 'image' }
        ]
    },
];

// Kontinuerlige/vedvarende feil (fra mail 20260826 pkt 3 og oppsummering)
// Valgfritt felt: note - vises som fremhevet "OBS"-boks under tittelen
const RECURRING_FAULTS = [
    { category: 'hud', title: 'Filskifteassistent (lane change assist) virker ikke - IKKE forveksles med filholder',
      description: 'Filskifteassistenten aktiveres ved å slå på blinklys på flerfeltsvei - bilen skal da selv skifte fil. Symptom: pilene i displayet forblir grå selv på veier bilen sier støtter funksjonen (f.eks. E18 Sandvika, E16, E6). En bekjent har funnet ut at grensen for aktivering kan være satt alt for høyt (150 km/h), mens instruksjonsboka sier 90 km/h.',
      note: 'OBS: dette gjelder AKTIV filskifteassistent (bilen skifter fil på kommando via blinklys), IKKE filholderfunksjonen ("lane keep assist") under adaptiv cruise control. Verkstedet har tidligere misforstått dette.',
      swFix: true },
    { category: 'mmi', title: 'CarPlay overtar - kan ikke velge favoritter i MMI',
      description: 'Hvis iPhone/CarPlay er koblet til går det ikke an å velge favoritter i MMI. Den hopper rett tilbake til CarPlay.',
      swFix: true },
    { category: 'klima', title: 'Klimaanlegg kommer på i tilfeldig innstilling - ofte helt av',
      description: 'Klimaanlegg kommer på i random innstilling - ofte helt av. Det burde komme på enten på siste innstilte, en fast innstilling, eller en fornuftig innstilling iht klima her-og-nå.',
      swFix: true },
    { category: 'hud', title: 'Fartsoverskridelse-varsling: må stille to ganger',
      description: 'Fartsoverskridelse-varsling 1: hvis man skal stille hastigheten for varsling hopper den tilbake til 3 km/t første gang. Man må gjøre det to ganger.',
      swFix: true },
    { category: 'hud', title: 'Fartsoverskridelse-varsling: mangler hurtigknapp på ratt',
      description: 'Fartsoverskridelse-varsling 2: burde være mulig å bruke hurtigknappen på rattet til å skru av denne i stedet for å bla i menyer.',
      swFix: true },
    { category: 'hud', title: 'HUD (head-up-display) forsvinner til stadighet under kjøring',
      description: 'Displayet slukker uten forvarsel og lar seg ikke slå på igjen via MMI - må starte bilen på nytt. Minst 17 dokumenterte tilfeller siden desember 2024 (se tidslinjen for datoer).' },
    { category: 'klima', title: 'Setevarme førersiden fungerer ikke',
      description: 'Setevarmen på førersiden fungerer ikke - blir bare såvidt lunken.' },
    { category: 'tilkobling', title: 'Mister nettverket i bilen til stadighet',
      description: 'Mister nettverket i bilen til stadighet - selv i tettbygde strøk.' },
    { category: 'lading', title: 'Forvirrende og motstridende meldinger vedr lading',
      description: 'Bilen støtter smartlading (laderen bestemmer når det skal lades), men kommuniserer med bruker som om det er en feil - f.eks. rødt lys i ladeluka og diverse feilmeldinger i appen, selv når lading fungerer som normalt.' },
    { category: 'hud', title: 'Ønske om samme grensesnitt som 2025-modell for fartsvarsel',
      description: 'Ønske om å få samme grensesnitt som 2025-modellen vedr fartsvarsel: kunne tilordne fra hurtigtast, samt hyggeligere lydvarsel.',
      swFix: true },
    { category: 'klima', title: 'Rattvarme påfallende svak sammenlignet med andre biler',
      description: 'Rattvarmen blir kun såvidt lunken selv på høyeste innstilling. Merkbart svakere enn rattvarme i andre biler jeg har testet.' },
    { category: 'klima', title: 'Klimatisering starter men slutter etter kort tid - iskald bil',
      description: 'Klimatisering starter men slutter etter kort tid - iskald bil.' },
    { category: 'hud', title: 'Tjenester utilgjengelig - automatisk fjernlys, skiltgjenkjennelse',
      description: 'En del tjenester er ikke tilgjengelig - automatisk fjernlys, skiltgjenkjennelse osv - uten at det er noen åpenbar siktbegrensning foran sladrspeilet. Antakelig sensorsikt-relatert, men gjør det vanskelig å vite hvor is bør fjernes.' },
    { category: 'lading', title: 'Batteriforvarming mangler egen funksjon - må fakes via navigasjon',
      description: 'For å få batteriforvarming før hurtiglading må man legge ladestopp i navigasjonssystemet. Burde vært en eksplisitt funksjon man kan starte når man vet at det er ca 15 min igjen til lading. Nå må man "fake" en ladestopp omtrent der man tror man skal lade, og det blir ofte feil.',
      swFix: true },
];

// Kontaktlogg (verksted, mail, telefon)
// Se feltbeskrivelse under CONTACTS-arrayet - alle mailer er nå eksportert fra Mail.app
const CONTACTS = [
    { date: '2026-09-03', type: 'verksted',
      title: 'Verkstedbesøk - kabellås-feil funnet, softwareoppgradering',
      description: 'Møtte 07:30, satt til ca 09:30. Verkstedet fant feil ved kabellåsen (kabelen låser seg ikke) - antas å være kilden til både AC- og DC-feilene. I tillegg kjørte de en softwareoppgradering som tok 4+ timer. Uklart om dette er samme oppgradering det tidligere ble sagt [at ikke var tilgjengelig for denne bilen](./mails/20260827_in_ref_bestilling_av_feilsoking_pa.txt). Fikk leiebil mens bilen er på verksted.' },
    { date: '2026-09-02', type: 'telefon',
      title: 'Møller ringte om kritisk ladefeil',
      description: 'Møller ringte og spurte om jeg kunne komme innom i morgen tidlig for en kikk på den kritiske ladefeilen. Avtalt oppmøte 07:30 den 3. september.' },
    { date: '2026-09-01', type: 'mail-out',
      title: 'Re: EH8XXXX - Kritiske ladefeil – behov for avklaring om ventetid og erstatningsbil',
      description: 'Forutsetningen for å vente med verkstedtime helt til 21. september har endret seg nå som bilen i praksis ikke tar til seg lading...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/202609101_ut_kritisk.txt',
      featured: true, critical: true,
      summary: 'Forutsetningen for å vente med verkstedtime helt til 21. september har endret seg nå som bilen i praksis ikke tar til seg lading. Mitt forslag er derfor at jeg leverer bilen til dere nå...' },
    { date: '2026-08-31', type: 'mail-out',
      title: 'Re: Ref bestilling av feilsøking på EH8XXXX',
      description: 'Hei igjen. Ref sericeavtale 21. september samt tidligere sendte mailer. 1. Nå begynner det å blir kritisk her: DC-lading-varslingen har ikke vært tilstede de siste dagene, og har...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20260831_ut_ref_bestilling_av_feilsoking_pa.txt',
      featured: true, critical: true,
      summary: 'Kritisk melding: bilen lader ekstremt sakte (9% på 11 timer på 32A easee-lader), ladelys blinker mellom rødt og grønt, ladekabel sitter fast. Samme symptom på 2 forskjellige ladere på 2 lokasjoner. Nye feil de siste dagene: MMI krasjer, mangler dataforbindelse (Høvik, Hurum), bilen kun marginalt ladet.' },
    { date: '2026-08-28', type: 'mail-in',
      title: 'Sv: Ref bestilling av feilsøking på EH8XXXX',
      description: 'Hei, Har vedlagt nettsiden og informasjonen til ordren, har også oppdatert mekaniker på saken. Mekaniker får tatt en titt på saken og korrelere informasjonen som du har lagt opp...',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20260828_in_ref_bestilling_av_feilsoking_pa.txt' },
    { date: '2026-08-28', type: 'mail-out',
      title: 'Re: Ref bestilling av feilsøking på EH8XXXX',
      description: 'OK - da håper jeg dere får fikset feilene på en annen måte.  flere feil.',
      from: 'Fredrik',
      to: 'Møller;[Møller verkstedbestilling]',
      link: './mails/20260828_ut_ref_bestilling_av_feilsoking_pa.txt' },
    { date: '2026-08-27', type: 'mail-in',
      title: 'Sv: Ref bestilling av feilsøking på EH8XXXX',
      description: 'Hei, Jeg har sendt deg en ny signering som er gyldig i 24 timer 🙂 Har også oppdatert ordre internt her. Det eksisterer ingen nyere software til din bil som ikke allerede er...',
      from: 'Møller',
      to: 'Fredrik',
      link: './mails/20260827_in_ref_bestilling_av_feilsoking_pa.txt',
      featured: true, critical: false,
      summary: 'Solberg: "Det eksisterer ingen nyere software til din bil som ikke allerede er installert." Ny signeringslink sendt. Kontrakt signert samme dag av meg. Jeg svarer 28. aug: "OK - da håper jeg dere får fikset feilene på en annen måte. Jeg kan ikke ha en bil med alle disse feilene."' },
    { date: '2026-08-26', type: 'mail-out',
      title: 'Ref bestilling av feilsøking på EH8XXXX',
      description: '1. Linken for signering jeg fikk på SMS er ikke gyldig - kan dere sjekke opp dette? 2. Jeg håper virkelig at det er mulig å få oppdatert softwaren på bilen som andre Q4 2024 har...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20260826_ut_ref_bestilling_av_feilsoking_pa.txt',
      featured: true, critical: false,
      summary: 'Omfattende mail: (1) signeringslink ugyldig, (2) håp om softwareoppdatering som andre Q4 2024 har fått, (3) kontinuerlige feil (CarPlay/favoritter, klima, fartsvarsel, filskifte), (4) konkrete feil siden forrige verksted - 30+ datoer fra mai 2025 til august 2026 dekkende HUD, MMI, app, klima, lading, keyless.' },
    { date: '2026-08-19', type: 'mail-in',
      title: 'Bekreftelse 584773/2026 ,EH8XXXX',
      description: 'Vedlagt følger Bekreftelse 584773/2026 ,EH8XXXX',
      from: '[Møller/Audi]',
      to: 'fredrik',
      link: './mails/20260819_in_bekreftelse_584773_2026_eh8xxxx.txt' },
    { date: '2025-09-02', type: 'mail-out',
      title: 'Re: EH8XXXX',
      description: 'Hei igjen Richard. Jeg la merke til at det på skrivet som lå i bilen og beskrev hva som ble gjort i går sto følgende “løsning” på de fleste av punktene: "relevant hendelse mot tpi...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20250902_ut_eh8xxxx.txt' },
    { date: '2025-09-02', type: 'mail-in',
      title: 'SV: EH8XXXX',
      description: 'Hei igjen. Det skal ha blitt utbedret med ledningsnettet vi skiftet i går. -----Opprinnelig melding----- Fra: Fredrik På vegne av Fredrik Rødland Sendt: tirsdag 2. september 2025...',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20250902_in_eh8xxxx.txt' },
    { date: '2025-09-01', type: 'mail-out',
      title: 'Re: EH8XXXX',
      description: 'Hei Ricard. Det meste tidligere er dokumentert på http://audi.rodland.no <http://audi.rodland.no/> Det som har dukket opp etter forrige verkstedsbesøk er: 22. Mai - feil I appen:...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20250901_ut_eh8xxxx.txt' },
    { date: '2025-09-01', type: 'mail-in',
      title: 'EH8XXXX',
      description: 'Hei. Hvis du har mulighet å sende meg bildene du har av feilmeldingene så hadde det vært flott. Med vennlig hilsen Møller Serviceleder Audi ￼ + 47 902 65 541...',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20250901_in_eh8xxxx.txt' },
    { date: '2025-04-22', type: 'mail-out',
      title: 'Re: Bekreftelse 531991/2025 ,EH8XXXX',
      description: 'Dette høres veldig bra ut Magnus - takk for hjelpen. Bare så det ikke er noen misforståelser: - Vil det si at den opprinnelige timen fortsatt står ved lag - dvs 3. juni - for å se...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20250422_1041_ut_bekreftelse_531991_2025_eh8xxxx.txt' },
    { date: '2025-04-22', type: 'mail-out',
      title: 'Re: Bekreftelse 531991/2025 ,EH8XXXX',
      description: '',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20250422_1306_ut_bekreftelse_531991_2025_eh8xxxx.txt' },
    { date: '2025-04-22', type: 'mail-out',
      title: 'Re: Bekreftelse 531991/2025 ,EH8XXXX',
      description: 'Hei Magnus. Ja - lampen lyser fortsatt og cruisekontrollen virker heller ikke (tror det er samme feil/årsak) Tirsdag 29/4 hadde passet veldig bra for dette. Fredrik 22. apr. 2025...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20250422_ut_bekreftelse_531991_2025_eh8xxxx.txt' },
    { date: '2025-04-22', type: 'mail-in',
      title: 'Sv: Bekreftelse 531991/2025 ,EH8XXXX',
      description: 'Da ligger det bekreftelse på timen her, merk da at bilen levers til Olav Ingstadsvei 8, 1351 Rud. De har også fått liken til nettsiden som du har opprettet. mvh Magnus Fra:...',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20250422_1012_in_bekreftelse_531991_2025_eh8xxxx.txt' },
    { date: '2025-04-22', type: 'mail-in',
      title: 'Sv: Bekreftelse 531991/2025 ,EH8XXXX',
      description: 'Ja stemmer, timen 3/6 står som avtalt. Jeg kan sette det som venting, men jeg tenkte det kan ta litt tid å finne ut av, og har de bilen noen timer, kan de kanskje få den feilen...',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20250422_1248_in_bekreftelse_531991_2025_eh8xxxx.txt' },
    { date: '2025-04-22', type: 'mail-in',
      title: 'Sv: Bekreftelse 531991/2025 ,EH8XXXX',
      description: 'Den er god, da er de informert om at du venter du der fra 07:20. Bare hyggelig, ha en god ettermiddag. mvh Magnus Fra: Fredrik Sendt: tirsdag 22. april 2025 13:06 Til: Magnus Emil...',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20250422_1318_in_bekreftelse_531991_2025_eh8xxxx.txt' },
    { date: '2025-04-22', type: 'mail-in',
      title: 'Sv: Bekreftelse 531991/2025 ,EH8XXXX',
      description: 'Hei Fredrik. Lyser lampen for motor enda? Jeg kan få booket deg inn til Mandag 28/4 hos en tekniker på avdelingen vår på Rud. De kan feilsøke rundt motorfeilen. Kan den datoen...',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20250422_in_bekreftelse_531991_2025_eh8xxxx.txt' },
    { date: '2025-04-16', type: 'mail-out',
      title: 'Re: Bekreftelse 531991/2025 ,EH8XXXX',
      description: 'Hei Magnus. Vedr første punkt i ordren: Kontroll: feilmelding motor står det "Merker ikke noe på bilen.”. Dette er feil - Adaptiv kjøreassisten/Cruise control virker ikke. Jeg er...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20250416_ut_bekreftelse_531991_2025_eh8xxxx.txt' },
    { date: '2025-04-16', type: 'mail-in',
      title: 'Bekreftelse 531991/2025 ,EH8XXXX',
      description: 'Vedlagt følger Bekreftelse 531991/2025 ,EH8XXXX',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20250416_in_bekreftelse_531991_2025_eh8xxxx.txt' },
    { date: '2025-04-14', type: 'mail-in',
      title: 'EH8XXXX',
      description: 'Hei, Jeg jobber med time til deg. Får sendt deg en bekreftelse i morgen. Med vennlig hilsen Magnus Stang Kundefront Audi Tlf: +47 24 03 25 00 Mob. +47 481 48 812 ￼ ￼ Møller Bil...',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20250414_in_eh8xxxx.txt' },
    { date: '2025-01-01', type: 'mail-out',
      title: 'Hei igjen - Audi Q4 EH8XXXX',
      description: 'Hei. Det har vært så mange mails frem og tilbake nå, og stadig nye feil som dukker opp i bilen, så jeg har samlet alt sammen på denne siden: https://rodland.no/audi/ Nye feil som...',
      from: 'Fredrik',
      to: 'Møller;[Møller/Audi]',
      link: './mails/20250101_ut_hei_igjen_audi_q4_eh8xxxx.txt' },
    { date: '2024-12-20', type: 'mail-out',
      title: 'Re: Hei igjen - Audi Q4 EH8XXXX',
      description: 'Hei. Jeg fikk i dag en ny kontrakt vedr min Audi Q4 og verkstedbesøk over nyttår. Jeg er glad de fleste av punktene jeg har nevnt for Trym er der. Det jeg ser ikke er med på...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20241220_ut_hei_igjen_audi_q4_eh8xxxx.txt' },
    { date: '2024-12-20', type: 'mail-in',
      title: 'Bekreftelse 515582/2024 ,EH8XXXX',
      description: 'Vedlagt følger Bekreftelse 515582/2024 ,EH8XXXX',
      from: '[Møller/Audi]',
      to: 'fredrik',
      link: './mails/20241220_in_bekreftelse_515582_2024_eh8xxxx.txt' },
    { date: '2024-12-16', type: 'mail-in',
      title: 'Sv: Hei igjen - Audi Q4 EH8XXXX',
      description: 'Hei, Fredrik Dette har jeg full forståelse for, jeg har sendt over det du har sendt meg foreløpig til verkstedet. Hvis du ønsker en konkret kontaktperson kan du sende over...',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20241216_in_hei_igjen_audi_q4_eh8xxxx.txt' },
    { date: '2024-12-13', type: 'mail-out',
      title: 'Re: Hei igjen - Audi Q4 EH8XXXX',
      description: 'Hei Trym Er enig i at Q4 er en flott bil - når den virker. Når den derimot daglig kommer med forskjellige feilmeldinger og utstyr vi tildels har betalt dyrt for ikke virker, så er...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20241213_ut_hei_igjen_audi_q4_eh8xxxx.txt' },
    { date: '2024-12-06', type: 'mail-in',
      title: 'Sv: Hei igjen - Audi Q4 EH8XXXX',
      description: 'Hei, Fredrik Dette er utrolig leit å høre da Q4 e-tron er en råflott bil, men skjønner at dere ikke har fått denne opplevelsen enda med tanke på feil ved bilen. I forhold til de...',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20241206_in_hei_igjen_audi_q4_eh8xxxx.txt' },
    { date: '2024-12-05', type: 'mail-out',
      title: 'Hei igjen - Audi Q4 EH8XXXX',
      description: 'Hei. Jeg lurte på om du fikk mailen jeg sendte forrige uke vedr mye småting som er feil med bilen? Mvh, Fredrik -- Fredrik Rødland Cell: +47 99 21 98 17 Maisen Pedersens vei 1...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20241205_ut_hei_igjen_audi_q4_eh8xxxx.txt' },
    { date: '2024-11-28', type: 'mail-out',
      title: 'Div feil på Audi Q4 EH8XXXX',
      description: 'Hei Trym. Jeg vet ikke helt hvem jeg skal kontakte hos dere, men min frustrasjon er ganske stor, og håper du kan hjelpe oss: Det er flere feil med bilen, den kritiske er at jeg...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20241128_ut_div_feil_pa_audi_q4.txt' },
    { date: '2024-11-28', type: 'mail-in',
      title: 'Audi Digitale Tjenester: [ Timebestilling ] Saksnummer: 0003198748',
      description: '￼ Hei Fredrik, Ditt saksnummer er: 0003198748 (vennligst lagre dette saksnummeret for raskere oppfølging). Vi har sendt ny melding til din foretrukne Audi Service Partner, Møller...',
      from: 'Audi connect NO',
      to: 'fredrik',
      link: './mails/20241128_in_audi_digitale_tjenester_timebestilling_s.txt' },
    { date: '2024-11-28', type: 'mail-in',
      title: 'Bekreftelse 515582/2024 ,EH8XXXX',
      description: 'Vedlagt følger Bekreftelse 515582/2024 ,EH8XXXX',
      from: '[Møller/Audi]',
      to: 'fredrik',
      link: './mails/20241128_in_bekreftelse_515582_2024_eh8xxxx.txt' },
    { date: '2024-11-27', type: 'mail-out',
      title: 'Re: Audi Digitale Tjenester: [ Timebestilling ] Saksnummer: 0003198748',
      description: 'hei. Jeg har enda ikke hørt noe fra Møller. Det har nå nesten gått 2 måneder siden jeg tok kontakt, og humøret på dette er ganske labert. Kan dere sørge for at de tar kontakt så...',
      from: 'Fredrik',
      to: '[Audi Digital Support]',
      link: './mails/20241127_ut_audi_digitale_tjenester_timebestilling_s.txt' },
    { date: '2024-11-23', type: 'mail-in',
      title: 'Audi Digitale Tjenester: [ Timebestilling ] Saksnummer: 0003198748',
      description: '￼ Hei Fredrik, Ditt saksnummer er: 0003198748 (vennligst lagre dette saksnummeret for raskere oppfølging). Vi har vært i kontakt med din foretrukne Audi Service Partner, Møller...',
      from: 'Audi connect NO',
      to: 'fredrik',
      link: './mails/20241123_in_audi_digitale_tjenester_timebestilling_s.txt' },
    { date: '2024-11-22', type: 'mail-out',
      title: 'Re: Audi Digitale Tjenester: [ Fullmakt ] Saksnummer: 0003198748',
      description: 'hei. Mitt foretrukne serviceverksted er Møller Bil Asker and Bærum Jeg gir dere/dem samtykke til å fikse denne saken så raskt som mulig. mvh, Fredrik Rødland -- Fredrik Rødland...',
      from: 'Fredrik',
      to: '[Audi Digital Support]',
      link: './mails/20241122_ut_audi_digitale_tjenester_fullmakt_saksnum.txt' },
    { date: '2024-11-21', type: 'mail-in',
      title: 'Audi Digitale Tjenester: [ Fullmakt ] Saksnummer: 0003198748',
      description: '￼ Hei Fredrik, Ditt saksnummer er: 0003198748 (Vennligst lagre dette saksnummeret for raskere oppfølging). Vi henvender oss til deg nå, da vi har mottatt en tilbakemelding fra vår...',
      from: 'Audi connect NO',
      to: 'fredrik',
      link: './mails/20241121_in_audi_digitale_tjenester_fullmakt_saksnum.txt' },
    { date: '2024-11-21', type: 'mail-in',
      title: 'Forespørselen din er under behandling (0003198748)',
      description: '￼ Hei, Din henvendelse med saksnummer (0003198748) er fortsatt i undersøkelse og analyse av ansvarlig avdeling. Vi vil kontakte deg så snart vi har mottatt en tilbakemelding. Vi...',
      from: 'Audi Connect No Support',
      to: 'fredrik',
      link: './mails/20241121_in_foresporselen_din_er_under_behandling.txt' },
    { date: '2024-11-18', type: 'mail-out',
      title: 'HJELP! Re: Audi Digitale Tjenester: [ Audi connect ] Saksnummer: 0003213210 0003198748',
      description: 'Hei. Jeg er nødt til at dette funker - spesielt nå som vinteren kommer. Å starte dette manuelt ved å sette meg inn i bilen og “boote” hver morgen er ikke en opsjon. Jeg har fått...',
      from: 'Fredrik',
      to: '[Audi Digital Support]',
      link: './mails/20241118_ut_hjelp_re_audi_digitale_tjenester.txt' },
    { date: '2024-11-17', type: 'mail-in',
      title: 'Audi Digitale Tjenester: [ Audi connect ] Saksnummer: 0003213210',
      description: '￼ Hei Fredrik, Takk for henvendelsen din vedrørende Audi Digitale Tjenester. Saksnummeret ditt er: 0003213210 (Vennligst lagre dette saksnummeret for raskere oppfølging). Vi...',
      from: 'Audi connect NO',
      to: 'fredrik',
      link: './mails/20241117_in_audi_digitale_tjenester_audi_connect.txt' },
    { date: '2024-11-09', type: 'mail-out',
      title: 'Re: Audi Digitale Tjenester: Forespørsel om informasjon - Saksnummer: - 0003198748',
      description: 'Kontoen min er: fredrik iPhone 14 med iOS 18.2 Skjermdumpene som ble sendt med den opprinnelig mailen ble tatt 7. nov ca kl 10:30 Tidl mail: I am not able to send actions...',
      from: 'Fredrik',
      to: '[Audi Digital Support]',
      link: './mails/20241109_ut_audi_digitale_tjenester_foresporsel_om.txt' },
    { date: '2024-11-08', type: 'mail-out',
      title: 'Re: Audi Digitale Tjenester: Forespørsel om informasjon - Saksnummer: - 0003198748',
      description: 'Alt står i den opprinnelig mailen bortsett fra: iPhone 14 med iOS 18.2 Da har dere alt dere har bedt om Fredrik 8. nov. 2024 kl. 16:40 skrev Audi connect NO...',
      from: 'Fredrik',
      to: '[Audi Digital Support]',
      link: './mails/20241108_ut_audi_digitale_tjenester_foresporsel_om.txt' },
    { date: '2024-11-08', type: 'mail-in',
      title: 'Audi Digitale Tjenester: Forespørsel om informasjon - Saksnummer: - 0003198748',
      description: '￼ Hei Fredrik! Takk for henvendelsen din vedrørende Audi Digitale Tjenester. Saksnummeret ditt er: 0003198748 - (Vennligst lagre dette saksnummeret for raskere oppfølging). Vi...',
      from: 'Audi connect NO',
      to: 'fredrik',
      link: './mails/20241108_in_audi_digitale_tjenester_foresporsel_om.txt' },
    { date: '2024-11-07', type: 'mail-out',
      title: 'Not able to communicate with car from app',
      description: 'Hi. I am not able to send actions from the myAudi app to my car Audi Q4 Norwegian regno: EH8XXXX, vin: WAUZZZFZXRP056133 I’ve tried many days and at least three different...',
      from: 'Fredrik',
      to: '[Audi Digital Support]',
      link: './mails/20241107_ut_not_able_to_communicate_with.txt' },
    { date: '2024-11-07', type: 'mail-in',
      title: 'Din forespørsel er under behandling',
      description: '￼ Takk for din henvendelse til Audi Digitale Tjenester. Vi behandler henvendelsen din og kommer tilbake til deg så fort som mulig. Ditt referansenummer er 0003198748. For...',
      from: 'Audi Support - no reply',
      to: 'fredrik',
      link: './mails/20241107_in_din_foresporsel_er_under_behandling.txt' },
    { date: '2024-10-17', type: 'mail-out',
      title: 'Not able to turn on heating myAudi',
      description: 'I\'m not able to turn on heating even though I\'m in a densely populated area which has never had any problems with cellular coverage. Please investigate. ￼ Fredrik',
      from: 'Fredrik',
      to: '[Audi Digital Support]',
      link: './mails/20241017_ut_not_able_to_turn_on.txt' },
    { date: '2024-10-07', type: 'mail-in',
      title: 'Audi Digitale Tjenester: [Audi Connect] Saksnummer: 0003125072',
      description: '￼ Hei Fredrik, Saksnummeret ditt er: 0003125072 (Vennligst lagre dette saksnummeret for raskere oppfølging). Vi ønsker å informere deg om at vi har mottatt en tilbakemelding fra...',
      from: 'Audi connect NO',
      to: 'fredrik',
      link: './mails/20241007_in_audi_digitale_tjenester_audi_connect.txt' },
    { date: '2024-10-05', type: 'mail-out',
      title: 'Re: Audi Digitale Tjenester: [ Informasjonforespørsel ] Saksnummer: 0003125072',
      description: 'Vedlagt 2 skjermbilder med feilene: ￼￼ Fredrik 5. okt. 2024 kl. 10:44 skrev Audi connect NO: ﻿ ￼ Hei Fredrik, Takk for henvendelsen din vedrørende Audi...',
      from: 'Fredrik',
      to: '[Audi Digital Support]',
      link: './mails/20241005_ut_audi_digitale_tjenester_informasjonfores.txt' },
    { date: '2024-10-05', type: 'mail-out',
      title: 'Trouble sending charging limit and acclimatization to my car',
      description: 'For 3 days I haven\'t been able to send anything from myAudi app to my car. I only get the following message. The app is able to retrieve the correct charging status from the car...',
      from: 'Fredrik',
      to: '[Audi Digital Support]',
      link: './mails/20241005_ut_trouble_sending_charging_limit_and.txt' },
    { date: '2024-10-05', type: 'mail-in',
      title: 'Audi Digitale Tjenester: [ Informasjonforespørsel ] Saksnummer: 0003125072',
      description: '￼ Hei Fredrik, Takk for henvendelsen din vedrørende Audi Digitale Tjenester. Saksnummeret ditt er: 0003125072 (Vennligst lagre dette saksnummeret for raskere oppfølging). Vi...',
      from: 'Audi connect NO',
      to: 'fredrik',
      link: './mails/20241005_in_audi_digitale_tjenester_informasjonfores.txt' },
    { date: '2024-10-05', type: 'mail-in',
      title: 'Audi Digitale Tjenester: [ Teknisk avdeling ] Saksnummer: 0003125072',
      description: '￼ Hei Fredrik, Saksnummeret ditt er: 0003125072 (Vennligst lagre dette saksnummeret for raskere oppfølging). Vi vil først og fremst takke deg for at du har sendt oss mer...',
      from: 'Audi connect NO',
      to: 'fredrik',
      link: './mails/20241005_in_audi_digitale_tjenester_teknisk_avdeling.txt' },
    { date: '2024-10-05', type: 'mail-in',
      title: 'Din forespørsel er under behandling',
      description: '￼ Takk for din henvendelse til Audi Digitale Tjenester. Vi behandler henvendelsen din og kommer tilbake til deg så fort som mulig. Ditt referansenummer er 0003125055. For...',
      from: 'Audi Support - no reply',
      to: 'fredrik',
      link: './mails/20241005_in_din_foresporsel_er_under_behandling.txt' },
    { date: '2024-04-17', type: 'mail-out',
      title: 'Re: Hm. (Smart)lading funker ikke',
      description: 'Hei Trym. Det er ikke snakk om å rekke å gå i dvale før ladingen er aktivert. Det er snakk om at Audien feiler komunikasjonen med laderen, selv om andre biler klarer dette helt...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20240417_ut_hm_smart_lading_funker_ikke.txt' },
    { date: '2024-04-16', type: 'mail-in',
      title: 'Sv: Hm. (Smart)lading funker ikke',
      description: 'Hei, Fredrik Beklager sent svar fra meg, da jeg har vært borte og opptatt store deler av denne uken. Problemet du beskriver til meg er ikke kjent for verkstedet når jeg tar det...',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20240416_in_hm_smart_lading_funker_ikke.txt' },
    { date: '2024-04-13', type: 'mail-out',
      title: 'Hm. (Smart)lading funker ikke',
      description: 'Hei. Jeg er vant til å lade e-golf med smartlading. Har easee charge. På Audi q4 og det funker ikke. A. Hvis easee er i smartladingsmodus (og ikke aktivt lader nå) sier bilen at...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20240413_ut_hm_smart_lading_funker_ikke.txt' },
    { date: '2024-04-08', type: 'mail-out',
      title: 'Re: Utlevering av ny Audi Q4 e-tron HAM:06132991',
      description: 'Hei Trym. 1. Til info så ble betalingen stoppet i helgen pga beløpsgrense i banken, men er lagt inn nå med forfall i dag, så regner med at det går i orden. 2. Jeg har ikke fått...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20240408_ut_utlevering_av_ny_audi_q4.txt' },
    { date: '2024-04-08', type: 'mail-in',
      title: 'Sv: Utlevering av ny Audi Q4 e-tron HAM:06132991',
      description: 'Hei, Fredrik Takk for beskjed. Da hører jeg med finans avdelingen vår i morgen, så regner jeg med at dette går i orden. Registrering av bilen gjøres samme dag som du henter bil....',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20240408_in_utlevering_av_ny_audi_q4.txt' },
    { date: '2024-03-25', type: 'mail-in',
      title: 'Sv: Utlevering av ny Audi Q4 e-tron HAM:06132991',
      description: 'Hei, Fredrik Jeg takker så mye for beskjed. Det er ikke noe problem å flytte fra 15 til 16.30. samme dag. Nytt utleveringstidspunkt 10.04.24 kl 16.30. Gleder meg til utlevering av...',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20240325_in_utlevering_av_ny_audi_q4.txt' },
    { date: '2024-03-24', type: 'mail-out',
      title: 'Re: Utlevering av ny Audi Q4 e-tron HAM:06132991',
      description: 'Hei igjen Trym. Det viser seg at onsdag 10. kl 15 passet dårlig for Mona. Kan vi flytte det til 1630? Evt torsdag 11. på morgenen. Fredrik 21. mar. 2024 kl. 16:24 skrev Trym Eirik...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20240324_ut_utlevering_av_ny_audi_q4.txt' },
    { date: '2024-03-21', type: 'mail-out',
      title: 'Re: Utlevering av ny Audi Q4 e-tron HAM:06132991',
      description: 'Hei igjen - takk for svar! Dekkhotell: ok - Da gjør vi som dere foreslår og har de på Holmen i sommer. Så avtaler jeg med dem til høsten hva vi gjør videre. Personnummer: Fredrik...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20240321_ut_utlevering_av_ny_audi_q4.txt' },
    { date: '2024-03-21', type: 'mail-in',
      title: 'Sv: Utlevering av ny Audi Q4 e-tron HAM:06132991',
      description: 'Supert! Da får jeg sendt dekkene dit. Bilen blir også registrert på begge. Med vennlig hilsen Møller Salgskonsulent Audi ￼ + 47 905 74 513 Møller ￼...',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20240321_1624_in_utlevering_av_ny_audi_q4.txt' },
    { date: '2024-03-21', type: 'mail-in',
      title: 'Sv: Utlevering av ny Audi Q4 e-tron HAM:06132991',
      description: 'Hei, Fredrik og Mona Du kan se bort i fra leasing og innbytte. Dette er en standard mal fra Møller bil som sendes ut og der nevner de også dette. Dekkhotell får dere med helt...',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20240321_in_utlevering_av_ny_audi_q4.txt' },
    { date: '2024-03-20', type: 'mail-out',
      title: 'Re: Utlevering av ny Audi Q4 e-tron HAM:06132991',
      description: 'Hei Trym. Jeg har noen kommentarer til mailen: - det står veldig mye om leasing/innbytte - regner med det ikke gjelder oss. - dekkhotell - det kan jeg ikke huske at vi snakket om...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20240320_ut_utlevering_av_ny_audi_q4.txt' },
    { date: '2024-03-20', type: 'mail-in',
      title: 'Utlevering av ny Audi Q4 e-tron HAM:06132991',
      description: 'Hei, Fredrik Takk for hyggelig samtale, og gratulerer igjen med ny bil. Det er tid for overlevering av din nye Audi Q4 e-tron, og jeg vil med dette bekrefte tidspunkt for...',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20240320_in_utlevering_av_ny_audi_q4.txt' },
    { date: '2024-03-19', type: 'mail-out',
      title: 'Oppdatering Audi Q4',
      description: 'Hei igjen Trym. Har du en oppdatering på hvor bilen er og når den kan ventes? Mvh, Fredrik -- Fredrik Rødland Cell: +47 99 21 98 17 Maisen Pedersens vei 1 Twitter: <at>fredrikr...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20240319_ut_oppdatering_audi_q4.txt' },
    { date: '2024-03-19', type: 'mail-in',
      title: 'Sv: Oppdatering Audi Q4',
      description: 'Hei, Fredrik Hyggelig å høre fra deg! Bilen deres har akkurat kommet til landet og kjøres av båten i skrivende sekund. I morgen vil jeg få dato fra Bekkelaget om når den blir...',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20240319_in_oppdatering_audi_q4.txt' },
    { date: '2024-03-07', type: 'mail-out',
      title: 'Re: Oppdatering Audi Q4',
      description: 'Hei igjen Trym. Har du en oppdatering på produksjon/sending/levering? Mvh, Fredrik -- Fredrik Rødland Cell: +47 99 21 98 17 Maisen Pedersens vei 1 Twitter: <at>fredrikr NO-1363...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20240307_ut_oppdatering_audi_q4.txt' },
    { date: '2024-03-07', type: 'mail-in',
      title: 'Sv: Oppdatering Audi Q4',
      description: 'Hei, Fredrik Bilen deres er ferdig produsert og ble utmeldt fra fabrikken i Zwickau i går. Nå venter den/er under transport mot Bremerhaven før den blir lastet på båt over til...',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20240307_in_oppdatering_audi_q4.txt' },
    { date: '2024-02-23', type: 'mail-out',
      title: 'Oppdatering Audi Q4',
      description: 'Hei Trym. Har du en oppdatering på status på bilen? Ble den produsert denne uka? Vet du noe mer omleveringstid? Mvh, Fredrik -- Fredrik Rødland Cell: +47 99 21 98 17 Maisen...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20240223_ut_oppdatering_audi_q4.txt' },
    { date: '2024-02-23', type: 'mail-in',
      title: 'Sv: Oppdatering Audi Q4',
      description: 'Hei, Fredrik Status og oppdatering på bilen deres. Bilen er produksjonsbekreftet til uke 9, så i løpet av neste uke starter den ferden på samlebåndet. ￼ Utlevering er litt for...',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20240223_in_oppdatering_audi_q4.txt' },
    { date: '2024-02-06', type: 'mail-in',
      title: 'Sv: Audi Q4 e-tron - Oppdatert tilbud HAM:06132697',
      description: 'Hei, Fredrik Viser til en hyggelig samtale over telefon angående deres nye Q4 e-tron. Vi tar et møte i morgen kl09.45 i forhold til utstyr og farge på bilen deres. Bilen som er...',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20240206_in_audi_q4_e_tron_oppdatert.txt' },
    { date: '2024-02-05', type: 'mail-out',
      title: 'Re: Audi Q4 e-tron - Oppdatert tilbud HAM:06132697',
      description: 'Hei igjen Trym. Ref samtale i dag pr telefon. Vi synes det var veldig rart at vi ikke fikk sjansen til å se på farge og legge til "Ambiente belysning". Vi hadde en ganske klar...',
      from: 'Fredrik',
      to: 'Møller',
      link: './mails/20240205_2137_ut_audi_q4_e_tron_oppdatert.txt' },
    { date: '2024-01-24', type: 'mail-in',
      title: 'Audi Q4 e-tron - Oppdatert tilbud HAM:06132697',
      description: 'Hei, Fredrik Jeg forsøkte å ringe deg, men fikk ikke svar. I dag har vi fått beskjed fra fabrikken at 360-kamera er tilgjengelig igjen på modellutgaven PRO i en begrenset periode....',
      from: 'Møller',
      to: 'fredrik',
      link: './mails/20240124_in_audi_q4_e_tron_oppdatert.txt' },
    { date: '2026-08-19', type: 'telefon', title: 'Ringt Møller om DC-ladingsfeil m.m.',
      description: 'Ringt Møller om DC-ladingsfeil, andre feil, service, software. Time avtalt til 2026-09-21.' },
    { date: '2025-09-21', type: 'verksted', title: 'Planlagt: 2-års service + DC-ladefeil + oppfølging av øvrige feil',
      description: 'Bestilt time hos Møller Asker & Bærum, Slependen. Innhold iflg kontrakt: (1) 2-års serviceavtale (inspeksjon, bremsevæskeskift, pollenfilter, kontroll vannavløpsslanger takluke), (2) kontroll av lading - "Kunde opplever at han ikke får ladet på hurtiglading. Kunde sier dette startet etter at ladekabelen hjemme satt fast ca 10.8. Kunde sier at det fungerer å lade på hjemmelader" (saksnr 206758357), (3) kontroll av varslinger - "ca 10 forskjellige varselmeldinger dukker opp random. Kunde skal sende bilder. Kunde sier det finnes oppgradering for Q4 2024 som skal løse dette", (4) gratis dekk- og rutekontroll. Ladekabel medbringes for kontroll.' },
    { date: '2025-09-01', type: 'verksted', title: 'Verkstedbesøk Møller Asker & Bærum - ledningspakke montert',
      description: 'Oppfølging fra 3. juni: bilen tilbake for å få montert ledningspakken som ikke var på lager sist. Detaljene om hva som konkret ble utført er uklare.' },
    { date: '2025-06-03', type: 'verksted', title: 'Verkstedbesøk - 10 planlagte kontroller, manglet deler (ledningspakke)',
      description: 'Planlagte kontroller (bestilt 2025-04-16): (1) Feilmelding motor - gul lampe rundt motorfeil, merker ikke noe på bilen (diss 187858139, mulig TPI 2074281/4), (2) HUD - visning i rute forsvinner under kjøring (diss 187858390), (3) Setevarme - førersiden fungerer inkonsekvent (diss 187858549), (4) Klimatisering - starter men slutter etter kort tid, iskald bil (bl.a. 2025-01-31 og 2025-02-02) (diss 187868397), (5) Rattvarme - blir bare så vidt lunken (diss 187870185), (6) Nettverkstilgang - stadig bortfall selv i tettbygde strøk (Oslo, Sandvika, E16, E6, RV3) - mulig TPI 2072890/3 (diss 187870403), (7) MMI - resetting midt under langtur, favoritter mistet (diss 187870915, mulig TPI 2074357/9), (8) Oppstart MMI - "Velkommen. Laster brukerinformasjon" hele bilturen (diss 187871020), (9) Klokke MMI - feil og ikke mulig å stille manuelt - mulig TPI 2077030/1 (diss 187871378), (10) Ladeluke - rødt lys uten reell feil (diss 187871612), (11) Assistentsystem - "lane change" fungerer ikke, aktiveringsgrense feil satt (150 km/t vs 90 km/t iflg instruksjonsbok) (diss 187872929). Resultat: manglet deler (bl.a. ledningspakke) - måtte tilbake 1. september for å fullføre.' },
    { date: '2025-04-28', type: 'verksted', title: 'Verkstedbesøk Møller Rud - motorfeil resatt',
      description: 'Fikk time 28. april hos Møller Rud. Leverte bilen 0730. Ca kl 0900 var bilen ferdig. "Dette er en kjent feil for akkurat denne modellen og vi venter på en softwareoppgradering for den. Vi har imidlertid klart å resette feilen, så nå slipper du å bli plaget og cruisekontrollen virker igjen." Snakket med Henrik (servicerådgiver på Rud) og forklarte at det mest frustrerende egentlig var all tiden og kontakten som blir brukt av meg for å få denne feilen nullstilt. Han sa jeg kunne ringe ham direkte hvis/når det skjedde igjen.' },
    { date: '2025-04-14', type: 'verksted', title: 'Innom Møller Billingstad - motorfeil før påske',
      description: 'Var innom Møller Billingstad for å høre om de kunne kikke på feilen: "Motor: Feil! Oppsøk verksted" og finne ut hva dette skyldtes så jeg kunne bruke bilen i påsken. Det hadde de dessverre ikke mulighet til så bilen må inn på verksted. Jeg presenterte denne oversikten over de andre feilene med bilen, og kundebehandler lovte å komme tilbake til meg ila dagen med forslag til time. Etter litt frem og tilbake på mail skal jeg til Rud 20250429 for å sjekke motorfeilen, mens jeg har en time 3. juni for å sjekke de andre feilene.' },
    { date: '2025-01-20', type: 'telefon', title: 'Ringt verkstedet - feilene fortsetter',
      description: 'Iom at jeg ikke hadde hørt noe fra verkstedet tok jeg kontakt og snakket med en fra verkstedet som gjentok at 12v-batteriet var byttet etter instrukser fra teknisk support. Jeg sa at en del av feilene fortsetter å være tilstede, og vi ble enige om at jeg samlet opp litt og tok kontakt for ny time.' },
    { date: '2025-01-02', type: 'verksted', title: 'Verkstedbesøk - kun 12v-batteri byttet (planlagt 7 kontroller)',
      description: 'Levert bilen på service. Viste https://rodland.no/audi/ til serviceteknikker. Etter mye om og men fikk låne en bil ut dagen. Bilen ferdig ca 1600. Planlagte kontroller (fra bestilling 2024-12-20): (1) Forvarming - myAudi app kan ikke starte forvarming, "ikke nok spenning på 12v batteriet", (2) Keyless - virker ikke om morgenen på noen dører, (3) Ledningsnett - "ledningsnett begrenset for øyeblikket" 3-4 ganger, (4) Feilmelding - "alvorlig feil - må stoppe med en gang" 2-3 ganger, (5) Lading - app sier "Lading ikke mulig - teknisk feil", rødt lys på ladeluke, "ladesystem feil"-varsel, (6) Hovedbruker - ikke lenger registrert hovedbruker i bilen, (7) Lademål - kan ikke stille. Resultat: Kun 12v-batteriet ble byttet. Prøvde å sette lademål fra app-en og det funket - andre feil ble ikke direkte adressert.' },
    { date: '2024-12-20', type: 'annet', title: 'Timebestillingen oppdatert med info fra Trym',
      description: 'Timebestillingen er oppdatert med info fra mailen til Trym.' },
    { date: '2024-11-27', type: 'annet', title: 'Saken overføres Møller A&B',
      description: 'Saken overføres Møller A&B (0003198748).' },
    { date: '2024-11-22', type: 'annet', title: 'Sak må overføres verksted',
      description: 'Saken må overføres verksted (0003198748).' },
    { date: '2024-11-20', type: 'telefon', title: 'Telefon til Audi support + videofeilsøking',
      description: 'Telefon til Audi support om fremgang. Forsøkt feilsøkt uten hell med support over videotelefon (0003198748).' },
    { date: '2024-08-15', displayDate: 'Sensommer 2024', type: 'telefon', title: 'Første kontakt med Audi Digitale Tjenester',
      description: 'Første kontakt pr mail og telefon til "Audi Digitale Tjenester" om feilende kommunikasjon mellom app og bil. Løst over telefon.' },
];

// (RECENT_EMAILS er slått sammen med CONTACTS - kontaktoppføringer med `featured: true`
// vises som store mailkort på "Siste status"-fanen.)
// Hjelpefunksjon: normaliser dato til sorterbar streng (for tidslinje)
function sortKey(dateStr) {
    if (!dateStr || dateStr === 'div') return '0000-00-00';
    // For rangeringer som '2026-06-21..2026-06-30', bruk startdato
    return dateStr.split('..')[0];
}

// Hjelpefunksjon: format visningsdato hvis ikke displayDate er satt
function formatDate(dateStr) {
    if (!dateStr || dateStr === 'div') return 'Diverse datoer';
    const [start, end] = dateStr.split('..');
    const fmt = (d) => {
        const [y, m, day] = d.split('-');
        const months = ['januar','februar','mars','april','mai','juni','juli','august','september','oktober','november','desember'];
        if (!day || !m || !y) return d;
        return `${parseInt(day)}. ${months[parseInt(m)-1]} ${y}`;
    };
    if (end) return `${fmt(start)} - ${fmt(end)}`;
    return fmt(start);
}

// -------------------------------------------------------------------------
// Auto-oppdagelse av bilder basert på filnavnkonvensjon:
//     YYYYMMDD_[kategori_]beskrivelse.jpg|.png|.mp4|.mov
//
// Eksempler:
//   20260830_lading_kabel.jpg  → alle lading-feil på 2026-08-30
//   20260830_kabel_fast.jpg    → alle feil på 2026-08-30 (ingen kategorifilter)
//   20260830_mmi_reset.mp4     → alle mmi-feil på 2026-08-30 (video)
//
// Manifest.js genereres av thumb.sh og lister alle bildefiler i docs/.
// En feil kan overstyre auto-discovery ved å sette `images: [...]` manuelt.
// -------------------------------------------------------------------------
// Samle alle filnavn som er MANUELT tildelt en fault (via images: [...] i data).
// Disse skal aldri shotgun-attaches til andre faults via auto-discovery.
function _collectManuallyClaimed() {
    const claimed = new Set();
    FAULTS.forEach(f => {
        if (f.images && f.images.length > 0) {
            f.images.forEach(img => { if (img && img.full) claimed.add(img.full); });
        }
    });
    return claimed;
}

// Snapshot av filer som ER manuelt claimed FØR auto-discovery har kjørt.
// Frosset ved første call, brukes gjennom hele applyAutoDiscovery-runden.
let _manualClaimsSnapshot = null;

function autoDiscoverImages(fault) {
    if (fault.images && fault.images.length > 0) return fault.images;
    if (typeof IMAGE_MANIFEST === 'undefined') return [];
    // Ingen dato-range støtte: range-faults må sette images manuelt.
    const date = String(fault.date || '');
    if (!date || date === 'div' || date.includes('..')) return [];
    const dateKey = date.replace(/-/g, '');
    const catSlugs = Object.keys(CATEGORIES);
    const claimed = _manualClaimsSnapshot || _collectManuallyClaimed();

    return IMAGE_MANIFEST
        .filter(f => !claimed.has(f))
        .filter(f => f.startsWith(dateKey + '_'))
        .filter(f => {
            const rest = f.slice(dateKey.length + 1).toLowerCase();
            const firstPart = rest.split(/[_.]/)[0];
            if (catSlugs.includes(firstPart)) {
                return firstPart === fault.category;
            }
            return true;
        })
        .map(f => {
            const isVideo = /\.(mp4|mov)$/i.test(f);
            return {
                thumb: 'thumbs/' + (isVideo ? f.replace(/\.(mp4|mov)$/i, '.png') : f),
                full:  f,
                type:  isVideo ? 'video' : 'image'
            };
        });
}

// Kjøres én gang ved oppstart (fra script.js) - fyller inn f.images på alle feil
// som ikke allerede har bilder satt manuelt.
function applyAutoDiscovery() {
    if (typeof IMAGE_MANIFEST === 'undefined') return;
    _manualClaimsSnapshot = _collectManuallyClaimed();
    FAULTS.forEach(f => {
        if (!f.images || f.images.length === 0) {
            f.images = autoDiscoverImages(f);
        }
    });
    _manualClaimsSnapshot = null;
}

// Alle unike bilder i én liste (til bildegalleri, samt "hopp til feil"-link)
function allImages() {
    const seen = new Set();
    const result = [];
    for (const f of FAULTS) {
        for (const img of (f.images || [])) {
            const key = img.full;
            if (seen.has(key)) continue;
            seen.add(key);
            result.push({ ...img, faultTitle: f.title, faultDate: f.displayDate || formatDate(f.date), category: f.category });
        }
    }
    return result;
}
