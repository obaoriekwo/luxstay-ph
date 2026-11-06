/* LuxStay PH: shared demo data store.
 * Used by index.html (public site) and admin.html (dashboard).
 * Data lives in the visitor's browser (localStorage), so this is a
 * front-end demo: there is no server or real database.
 */
(function () {
  const KEY = 'luxstay_demo_v1';
  const VERSION = 1;

  const pad = n => String(n).padStart(2, '0');
  // Local date as YYYY-MM-DD (avoids the time-zone shift of toISOString)
  const fmt = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };

  // Default apartments (must match the ids/names used in index.html)
  const DEFAULTS = [
    { id: 1, name: 'The Lagos Suite',      location: 'GRA Phase 2, Port Harcourt', price: 45000, available: true,  ranges: [3, 8, 22, 26] },
    { id: 2, name: 'Garden View Studio',   location: 'Old GRA, Port Harcourt',     price: 22000, available: true,  ranges: [1, 5, 18, 20] },
    { id: 3, name: 'Executive One-Bed',    location: 'Trans Amadi, Port Harcourt', price: 30000, available: false, ranges: [1, 30] },
    { id: 4, name: 'The Penthouse Deluxe', location: 'Woji Estate, Port Harcourt', price: 65000, available: true,  ranges: [10, 14] },
    { id: 5, name: 'Riverside Two-Bed',    location: 'Rumuola, Port Harcourt',     price: 38000, available: true,  ranges: [5, 9, 25, 27] }
  ];

  function rangesToDates(ranges) {
    const now = new Date();
    const out = [];
    for (let i = 0; i < ranges.length; i += 2) {
      const start = ranges[i], end = ranges[i + 1] !== undefined ? ranges[i + 1] : ranges[i];
      for (let d = start; d <= end; d++) {
        const dt = new Date(now.getFullYear(), now.getMonth(), d);
        if (dt.getMonth() === now.getMonth()) out.push(fmt(dt));
      }
    }
    return out;
  }

  // Nights stayed: check-in date up to (not including) check-out date
  function nightsBetween(ci, co) {
    const out = [];
    if (!ci || !co || ci >= co) return out;
    for (let d = parse(ci); fmt(d) < co; d.setDate(d.getDate() + 1)) out.push(fmt(d));
    return out;
  }

  function seed() {
    const now = new Date();
    const next = (day) => fmt(new Date(now.getFullYear(), now.getMonth() + 1, day));
    const ago = (h) => new Date(Date.now() - h * 3600000).toISOString();
    return {
      version: VERSION,
      apartments: DEFAULTS.map(a => ({
        id: a.id, name: a.name, location: a.location, price: a.price,
        available: a.available, bookedDates: rangesToDates(a.ranges)
      })),
      requests: [
        { id: 'r1', type: 'booking', aptId: 4, name: 'Ngozi Eze (sample)', email: 'ngozi@example.com', phone: '+234 803 000 0001',
          checkin: next(3), checkout: next(6), message: 'Arriving late, around 9pm.', status: 'pending', createdAt: ago(5) },
        { id: 'r2', type: 'booking', aptId: 2, name: 'David Okon (sample)', email: 'david@example.com', phone: '+234 803 000 0002',
          checkin: next(10), checkout: next(12), message: '', status: 'pending', createdAt: ago(20) },
        { id: 'r3', type: 'enquiry', aptId: 1, name: 'Amaka Obi (sample)', email: 'amaka@example.com', phone: '',
          checkin: '', checkout: '', message: 'Do you offer airport pickup?', status: 'pending', createdAt: ago(30) }
      ]
    };
  }

  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ }
  }

  let memory = null; // fallback when localStorage is blocked
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.version === VERSION && Array.isArray(s.apartments)) return s;
    } catch (e) { /* ignore */ }
    if (memory) return memory;
    memory = seed();
    save(memory);
    return memory;
  }

  function addRequest(req) {
    const s = load();
    s.requests.unshift(Object.assign({
      id: 'r' + Date.now().toString(36), status: 'pending', createdAt: new Date().toISOString(),
      message: '', phone: '', checkin: '', checkout: ''
    }, req));
    save(s);
    memory = s;
    return s;
  }

  function reset() { memory = seed(); save(memory); return memory; }

  window.LuxStore = { KEY, load, save, reset, addRequest, fmt, parse, nightsBetween };
})();
