import { useState, useEffect, useRef, useCallback } from 'react';
import { getArticles, catIcons, mandals, districts, startAutoFetch, fetchGoogleNews } from './store.js';

// Brand colors
const C = { primary: '#054A91', secondary: '#28AFFA', accent: '#E71D36' };

// Logo variants
function Logo({ size = 'md', variant = 'stacked' }) {
  const font = 'Impact, Arial Black, sans-serif';
  if (variant === 'stacked') {
    const s = size === 'lg' ? { mana: 32, daily: 16, gap: 4, line: 3, pad: '2px 10px' }
            : size === 'md' ? { mana: 20, daily: 11, gap: 2, line: 2, pad: '1px 6px' }
            : { mana: 14, daily: 8, gap: 1, line: 1.5, pad: '1px 4px' };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: s.gap, lineHeight: 1 }}>
        <div style={{ fontSize: s.mana, fontWeight: 900, color: C.secondary, letterSpacing: 2, fontFamily: font }}>MANA</div>
        <div style={{ width: '100%', height: s.line, background: '#fff', margin: `${s.gap}px 0` }} />
        <div style={{ background: C.accent, padding: s.pad, display: 'inline-block' }}>
          <span style={{ fontSize: s.daily, fontWeight: 900, color: '#fff', letterSpacing: 1.5, fontFamily: font }}>DAILY NEWS</span>
        </div>
      </div>
    );
  }
  if (variant === 'horizontal') {
    const s = size === 'lg' ? { mana: 28, daily: 14, gap: 10, divW: 2, divH: 28, pad: '2px 8px' }
            : size === 'md' ? { mana: 20, daily: 11, gap: 8, divW: 2, divH: 20, pad: '2px 6px' }
            : { mana: 14, daily: 8, gap: 6, divW: 1.5, divH: 14, pad: '1px 5px' };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: s.gap, lineHeight: 1 }}>
        <div style={{ fontSize: s.mana, fontWeight: 900, color: C.secondary, letterSpacing: 2, fontFamily: font }}>MANA</div>
        <div style={{ width: s.divW, height: s.divH, background: '#fff', flexShrink: 0 }} />
        <div style={{ background: C.accent, padding: s.pad, display: 'inline-flex', alignItems: 'center' }}>
          <span style={{ fontSize: s.daily, fontWeight: 900, color: '#fff', letterSpacing: 1.5, fontFamily: font }}>DAILY NEWS</span>
        </div>
      </div>
    );
  }
  if (variant === 'icon') {
    const s = size === 'lg' ? { box: 56, m: 24, dn: 10, line: 2, gap: 2, pad: '1px 4px', r: 10 }
            : size === 'md' ? { box: 40, m: 18, dn: 7, line: 1.5, gap: 1, pad: '1px 3px', r: 8 }
            : { box: 28, m: 13, dn: 5, line: 1, gap: 1, pad: '0px 2px', r: 6 };
    return (
      <div style={{ width: s.box, height: s.box, borderRadius: s.r, background: C.primary, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: s.gap, lineHeight: 1 }}>
        <div style={{ fontSize: s.m, fontWeight: 900, color: C.secondary, letterSpacing: 1, fontFamily: font }}>M</div>
        <div style={{ width: '60%', height: s.line, background: 'rgba(255,255,255,.4)' }} />
        <div style={{ background: C.accent, padding: s.pad, borderRadius: 2 }}>
          <span style={{ fontSize: s.dn, fontWeight: 900, color: '#fff', letterSpacing: 0.5, fontFamily: font }}>DN</span>
        </div>
      </div>
    );
  }
  return null;
}

const L = {
  en: { home: 'Home', categories: 'Categories', profile: 'Profile', saved: 'Saved', all: 'All', breaking: '⚡ BREAKING', readMore: 'Read full story →', swipe: 'Swipe up for next story', appName: 'Mana Daily News', lang: 'Language', mandal: 'Select Mandal', district: 'Select District', notif: 'Notifications', dark: 'Dark Mode', about: 'About', save: 'Save', saved_label: 'Saved', share: 'Share', unsave: 'Unsave', back: '← Back', close: 'Close', noSaved: 'No saved articles yet', allMandals: 'All Mandals', allDistricts: 'All Districts', version: 'Version 1.0.0 (POC)', builtBy: 'Built by Clymin Technologies', tagline: 'Hyperlocal bilingual news for Telangana' },
  te: { home: 'హోమ్', categories: 'విభాగాలు', profile: 'ప్రొఫైల్', saved: 'సేవ్ చేసినవి', all: 'అన్నీ', breaking: '⚡ బ్రేకింగ్', readMore: 'పూర్తి కథనం చదవండి →', swipe: 'తదుపరి కథనం కోసం పైకి స్వైప్ చేయండి', appName: 'మన డైలీ న్యూస్', lang: 'భాష', mandal: 'మండలం ఎంచుకోండి', district: 'జిల్లా ఎంచుకోండి', notif: 'నోటిఫికేషన్లు', dark: 'డార్క్ మోడ్', about: 'గురించి', save: 'సేవ్', saved_label: 'సేవ్ చేసినవి', share: 'షేర్', unsave: 'తీసివేయి', back: '← వెనుకకు', close: 'మూసివేయి', noSaved: 'సేవ్ చేసిన కథనాలు లేవు', allMandals: 'అన్ని మండలాలు', allDistricts: 'అన్ని జిల్లాలు', version: 'వెర్షన్ 1.0.0 (POC)', builtBy: 'క్లైమిన్ టెక్నాలజీస్ నిర్మాణం', tagline: 'తెలంగాణకు హైపర్‌లోకల్ ద్విభాషా వార్తలు' }
};

// Saved articles helpers
function getSaved() { try { return JSON.parse(localStorage.getItem('mana-saved') || '[]'); } catch { return []; } }
function setSaved(ids) { localStorage.setItem('mana-saved', JSON.stringify(ids)); }

export default function App() {
  const [lang, setLang] = useState('en');  // UI language - English default
  const [newsLang, setNewsLang] = useState('te');  // News content language - Telugu default
  const [articles, setArticles] = useState([]);
  const [cat, setCat] = useState('All');
  const [tab, setTab] = useState('home');
  const [idx, setIdx] = useState(0);
  const [splash, setSplash] = useState(true);
  const [dark, setDark] = useState(() => localStorage.getItem('mana-dark') === 'true');
  const [savedIds, setSavedIds] = useState(getSaved);
  const [selectedMandal, setSelectedMandal] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [notif, setNotif] = useState(() => localStorage.getItem('mana-notif') !== 'false');
  const [fullStory, setFullStory] = useState(null);
  const [toast, setToast] = useState('');
  const t = L[lang];

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2000); };

  const reload = useCallback(() => {
    const a = getArticles().filter(x => x.status === 'published');
    setArticles(a);
  }, []);

  useEffect(() => { reload(); startAutoFetch(); }, [reload]);
  useEffect(() => {
    const h = () => reload();
    window.addEventListener('mana-news-updated', h);
    window.addEventListener('storage', h);
    const iv = setInterval(reload, 3000);
    return () => { window.removeEventListener('mana-news-updated', h); window.removeEventListener('storage', h); clearInterval(iv); };
  }, [reload]);

  useEffect(() => { const t = setTimeout(() => setSplash(false), 1800); return () => clearTimeout(t); }, []);
  useEffect(() => { localStorage.setItem('mana-dark', dark); }, [dark]);
  useEffect(() => { localStorage.setItem('mana-notif', notif); }, [notif]);

  // Filtering
  let filtered = articles;
  if (cat !== 'All') filtered = filtered.filter(a => a.category === cat);
  if (selectedDistrict !== 'All') filtered = filtered.filter(a => a.district === selectedDistrict);
  if (selectedMandal !== 'All') filtered = filtered.filter(a => a.mandal === selectedMandal);

  useEffect(() => { setIdx(0); }, [cat, selectedMandal, selectedDistrict]);

  // Save/unsave
  const toggleSave = (id) => {
    let next;
    if (savedIds.includes(id)) {
      next = savedIds.filter(x => x !== id);
      showToast(lang === 'te' ? '🔖 తీసివేయబడింది' : '🔖 Removed from saved');
    } else {
      next = [...savedIds, id];
      showToast(lang === 'te' ? '🔖 సేవ్ చేయబడింది!' : '🔖 Saved!');
    }
    setSavedIds(next);
    setSaved(next);
  };

  // Share
  const handleShare = async (article) => {
    const content = lang === 'te' ? article.te : article.en;
    const text = `${content.title}\n\n${content.body}\n\n— Mana Daily News`;
    if (navigator.share) {
      try { await navigator.share({ title: content.title, text }); } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      showToast(lang === 'te' ? '📋 కాపీ చేయబడింది!' : '📋 Copied to clipboard!');
    }
  };

  // Dark mode colors
  const bg = dark ? '#1a1a2e' : '#fff';
  const bgCard = dark ? '#16213e' : '#fff';
  const textPrimary = dark ? '#e0e0e0' : '#1a1a1a';
  const textSecondary = dark ? '#aaa' : '#999';
  const textBody = dark ? '#ccc' : '#444';
  const border = dark ? '#2a2a4a' : '#eee';

  if (splash) return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: C.primary }}>
      <Logo size="lg" />
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,.6)', marginTop: 14 }}>మన డైలీ న్యూస్ • Hyperlocal News</div>
      <div style={{ width: 40, height: 3, background: 'rgba(255,255,255,.4)', borderRadius: 2, marginTop: 20, animation: 'pulse 1s infinite' }}/>
    </div>
  );

  // Full story overlay
  if (fullStory) return (
    <FullStoryView article={fullStory} lang={lang} newsLang={newsLang} t={t} dark={dark} bg={bg} textPrimary={textPrimary} textBody={textBody} onClose={() => setFullStory(null)} savedIds={savedIds} toggleSave={toggleSave} handleShare={handleShare} />
  );

  if (tab === 'categories') return <CategoriesScreen t={t} lang={lang} setCat={c => { setCat(c); setTab('home'); }} setTab={setTab} dark={dark} bg={bg} textPrimary={textPrimary} border={border} />;
  if (tab === 'saved') return <SavedScreen t={t} lang={lang} newsLang={newsLang} articles={articles} savedIds={savedIds} toggleSave={toggleSave} setTab={setTab} setFullStory={setFullStory} dark={dark} bg={bg} bgCard={bgCard} textPrimary={textPrimary} textSecondary={textSecondary} border={border} />;
  if (tab === 'profile') return <ProfileScreen t={t} lang={lang} setLang={setLang} newsLang={newsLang} setNewsLang={setNewsLang} setTab={setTab} dark={dark} setDark={setDark} notif={notif} setNotif={setNotif} selectedMandal={selectedMandal} setSelectedMandal={setSelectedMandal} selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict} bg={bg} bgCard={bgCard} textPrimary={textPrimary} textSecondary={textSecondary} border={border} />;

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: bg }}>
      {/* Toast */}
      {toast && <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', background: '#333', color: '#fff', padding: '10px 20px', borderRadius: 8, zIndex: 999, fontSize: 14, fontWeight: 600 }}>{toast}</div>}

      {/* Header */}
      <div style={{ background: C.primary, padding: '10px 16px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
          <Logo size="sm" variant="horizontal" />
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {['All', ...Object.keys(catIcons)].map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ flex: '0 0 auto', padding: '6px 14px', borderRadius: 20, border: 'none', background: cat === c ? C.accent : 'rgba(255,255,255,.15)', color: '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
              {c === 'All' ? t.all : c}
            </button>
          ))}
        </div>
      </div>

      {/* News Cards */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: textSecondary, fontSize: 16 }}>No news in this category</div>
        ) : (
          <NewsCard article={filtered[idx]} lang={lang} newsLang={newsLang} t={t} idx={idx} total={filtered.length} onNext={() => setIdx(i => Math.min(i + 1, filtered.length - 1))} onPrev={() => setIdx(i => Math.max(i - 1, 0))} savedIds={savedIds} toggleSave={toggleSave} handleShare={handleShare} setFullStory={setFullStory} dark={dark} textPrimary={textPrimary} textSecondary={textSecondary} textBody={textBody} border={border} />
        )}
      </div>

      {/* Bottom Nav */}
      <BottomNav tab={tab} setTab={setTab} t={t} dark={dark} bg={bg} border={border} />
    </div>
  );
}

function NewsCard({ article, lang, newsLang = 'te', t, idx, total, onNext, onPrev, savedIds, toggleSave, handleShare, setFullStory, dark, textPrimary, textSecondary, textBody, border }) {
  const startY = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  const handleStart = (y) => { startY.current = y; setDragging(true); };
  const handleMove = (y) => { if (dragging) setOffsetY(startY.current - y); };
  const handleEnd = () => { setDragging(false); if (offsetY > 60) onNext(); else if (offsetY < -60) onPrev(); setOffsetY(0); };

  useEffect(() => {
    const h = (e) => { if (e.key === 'ArrowDown' || e.key === 'ArrowRight') onNext(); if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') onPrev(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onNext, onPrev]);

  const a = article;
  const content = newsLang === 'te' ? a.te : a.en;
  const isSaved = savedIds.includes(a.id);

  return (
    <div
      onTouchStart={e => handleStart(e.touches[0].clientY)}
      onTouchMove={e => handleMove(e.touches[0].clientY)}
      onTouchEnd={handleEnd}
      onMouseDown={e => handleStart(e.clientY)}
      onMouseMove={e => dragging && handleMove(e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={() => dragging && handleEnd()}
      style={{ height: '100%', display: 'flex', flexDirection: 'column', userSelect: 'none', transform: `translateY(${-offsetY * 0.3}px)`, transition: dragging ? 'none' : 'transform .3s ease' }}
    >
      <div style={{ position: 'relative', height: '42%', overflow: 'hidden' }}>
        <img src={a.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(transparent 50%, rgba(0,0,0,.4))' }} />
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {a.breaking && <span style={{ background: C.accent, color: '#fff', padding: '3px 10px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>{t.breaking}</span>}
          <span style={{ background: C.primary, color: '#fff', padding: '3px 10px', borderRadius: 4, fontSize: 11 }}>{catIcons[a.category]} {a.category}</span>
          <span style={{ background: 'rgba(0,0,0,.6)', color: '#fff', padding: '3px 10px', borderRadius: 4, fontSize: 11 }}>📍 {a.mandal}{a.district ? `, ${a.district}` : ''}</span>
        </div>
        <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 5 }}>
          {Array.from({ length: Math.min(total, 7) }).map((_, i) => (
            <div key={i} style={{ width: i === idx % 7 ? 18 : 6, height: 6, borderRadius: 3, background: i === idx % 7 ? '#fff' : 'rgba(255,255,255,.5)', transition: 'all .3s' }} />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, padding: '16px 18px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: lang === 'te' ? 19 : 20, fontWeight: 800, lineHeight: 1.3, color: textPrimary, marginBottom: 8 }}>{content.title}</h2>
        <div style={{ fontSize: 12, color: textSecondary, marginBottom: 10 }}>{a.author} • {a.time}</div>
        <p style={{ fontSize: 14, color: textBody, lineHeight: 1.6, flex: 1, overflow: 'hidden' }}>{content.body}</p>
        <button onClick={() => setFullStory(a)} style={{ color: C.accent, fontWeight: 700, fontSize: 14, marginTop: 8, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>{t.readMore}</button>
        <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 12, marginTop: 8, borderTop: `1px solid ${border}` }}>
          <button onClick={() => toggleSave(a.id)} style={{ fontSize: 12, color: isSaved ? C.accent : textSecondary, background: 'none', border: 'none', cursor: 'pointer', fontWeight: isSaved ? 700 : 400 }}>
            {isSaved ? '🔖 ' + t.unsave : '🔖 ' + t.save}
          </button>
          <button onClick={() => handleShare(a)} style={{ fontSize: 12, color: textSecondary, background: 'none', border: 'none', cursor: 'pointer' }}>📤 {t.share}</button>
        </div>
        <div style={{ textAlign: 'center', fontSize: 11, color: dark ? '#555' : '#ccc', marginTop: 8 }}>↕ {t.swipe}</div>
      </div>
    </div>
  );
}

function FullStoryView({ article, lang, newsLang = 'te', t, dark, bg, textPrimary, textBody, onClose, savedIds, toggleSave, handleShare }) {
  const a = article;
  const content = newsLang === 'te' ? a.te : a.en;
  const isSaved = savedIds.includes(a.id);

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: bg }}>
      <div style={{ background: C.primary, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onClose} style={{ color: '#fff', background: 'none', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{t.back}</button>
        <Logo size="sm" variant="horizontal" />
        <div style={{ width: 50 }} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <img src={a.img} alt="" style={{ width: '100%', height: 220, objectFit: 'cover' }} />
        <div style={{ padding: '16px 18px' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
            {a.breaking && <span style={{ background: C.accent, color: '#fff', padding: '3px 10px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>{t.breaking}</span>}
            <span style={{ background: C.primary, color: '#fff', padding: '3px 10px', borderRadius: 4, fontSize: 11 }}>{catIcons[a.category]} {a.category}</span>
            <span style={{ background: dark ? '#333' : '#f0f0f0', color: dark ? '#ccc' : '#666', padding: '3px 10px', borderRadius: 4, fontSize: 11 }}>📍 {a.mandal}{a.district ? `, ${a.district}` : ''}</span>
          </div>
          <h1 style={{ fontSize: lang === 'te' ? 22 : 24, fontWeight: 800, lineHeight: 1.3, color: textPrimary, marginBottom: 10 }}>{content.title}</h1>
          <div style={{ fontSize: 13, color: '#999', marginBottom: 16 }}>{a.author} • {a.time}</div>
          <p style={{ fontSize: 16, color: textBody, lineHeight: 1.8, marginBottom: 16 }}>{content.body}</p>
          {content.extra && <p style={{ fontSize: 16, color: textBody, lineHeight: 1.8, marginBottom: 16 }}>{content.extra}</p>}
          <div style={{ display: 'flex', gap: 12, paddingTop: 16, borderTop: `1px solid ${dark ? '#333' : '#eee'}` }}>
            <button onClick={() => toggleSave(a.id)} style={{ flex: 1, padding: '12px', borderRadius: 8, border: 'none', background: isSaved ? C.accent : (dark ? '#2a2a4a' : '#f0f0f0'), color: isSaved ? '#fff' : textPrimary, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              {isSaved ? '🔖 ' + t.unsave : '🔖 ' + t.save}
            </button>
            <button onClick={() => handleShare(a)} style={{ flex: 1, padding: '12px', borderRadius: 8, border: 'none', background: dark ? '#2a2a4a' : '#f0f0f0', color: textPrimary, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>📤 {t.share}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SavedScreen({ t, lang, newsLang = 'te', articles, savedIds, toggleSave, setTab, setFullStory, dark, bg, bgCard, textPrimary, textSecondary, border }) {
  const saved = articles.filter(a => savedIds.includes(a.id));
  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: bg }}>
      <div style={{ background: C.primary, padding: '14px 16px', display: 'flex', justifyContent: 'center' }}><Logo size="sm" variant="horizontal" /></div>
      <div style={{ padding: '12px 16px', fontWeight: 700, fontSize: 18, color: textPrimary }}>🔖 {t.saved_label}</div>
      <div style={{ flex: 1, padding: '0 16px 16px', overflowY: 'auto' }}>
        {saved.length === 0 ? (
          <div style={{ textAlign: 'center', color: textSecondary, marginTop: 60, fontSize: 15 }}>{t.noSaved}</div>
        ) : saved.map(a => {
          const content = newsLang === 'te' ? a.te : a.en;
          return (
            <div key={a.id} style={{ background: bgCard, borderRadius: 10, padding: 12, marginBottom: 10, display: 'flex', gap: 10, border: `1px solid ${border}` }}>
              <img src={a.img} alt="" onClick={() => setFullStory(a)} style={{ width: 70, height: 70, borderRadius: 8, objectFit: 'cover', cursor: 'pointer' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div onClick={() => setFullStory(a)} style={{ fontSize: 14, fontWeight: 700, color: textPrimary, cursor: 'pointer', marginBottom: 4 }}>{content.title}</div>
                <div style={{ fontSize: 11, color: textSecondary }}>{a.author} • {a.category}</div>
                <button onClick={() => toggleSave(a.id)} style={{ marginTop: 6, fontSize: 12, color: C.accent, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 600 }}>{t.unsave}</button>
              </div>
            </div>
          );
        })}
      </div>
      <BottomNav tab="saved" setTab={setTab} t={t} dark={dark} bg={bg} border={border} />
    </div>
  );
}

function CategoriesScreen({ t, lang, setCat, setTab, dark, bg, textPrimary, border }) {
  const cats = Object.entries(catIcons);
  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: bg }}>
      <div style={{ background: C.primary, padding: '14px 16px', display: 'flex', justifyContent: 'center' }}><Logo size="sm" variant="horizontal" /></div>
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: textPrimary, marginBottom: 4 }}>{t.categories || 'Categories'}</div>
        <div style={{ fontSize: 13, color: dark ? '#aaa' : '#888', marginBottom: 12 }}>Tap a category to see related news</div>
      </div>
      <div style={{ flex: 1, padding: '0 16px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, overflowY: 'auto' }}>
        <button onClick={() => setCat('All')} style={{ padding: '20px 12px', borderRadius: 12, border: `2px solid ${C.secondary}`, background: dark ? '#0a1628' : '#f0f8ff', cursor: 'pointer', fontSize: 15, fontWeight: 700, color: C.primary, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, gridColumn: '1 / -1' }}>
          <span style={{ fontSize: 28 }}>📰</span>
          {t.all || 'All News'}
        </button>
        {cats.map(([name, icon]) => (
          <button key={name} onClick={() => setCat(name)} style={{ padding: '20px 12px', borderRadius: 12, border: `1px solid ${border}`, background: dark ? '#16213e' : '#fff', cursor: 'pointer', fontSize: 15, fontWeight: 600, color: textPrimary, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 28 }}>{icon}</span>
            {name}
          </button>
        ))}
      </div>
      <BottomNav tab="categories" setTab={setTab} t={t} dark={dark} bg={bg} border={border} />
    </div>
  );
}

function ProfileScreen({ t, lang, setLang, newsLang, setNewsLang, setTab, dark, setDark, notif, setNotif, selectedMandal, setSelectedMandal, selectedDistrict, setSelectedDistrict, bg, bgCard, textPrimary, textSecondary, border }) {
  const [showMandal, setShowMandal] = useState(false);
  const [showDistrict, setShowDistrict] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  if (showAbout) return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: bg }}>
      <div style={{ background: C.primary, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => setShowAbout(false)} style={{ color: '#fff', background: 'none', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{t.back}</button>
        <Logo size="sm" variant="horizontal" />
        <div style={{ width: 50 }} />
      </div>
      <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto' }}>
        <div style={{ marginBottom: 20 }}><Logo size="lg" variant="stacked" /></div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: textPrimary, marginBottom: 8 }}>{t.appName}</h2>
        <p style={{ fontSize: 14, color: textSecondary, textAlign: 'center', marginBottom: 16 }}>{t.tagline}</p>
        <div style={{ background: dark ? '#16213e' : '#f5f5f5', borderRadius: 12, padding: 20, width: '100%', marginBottom: 16 }}>
          <p style={{ fontSize: 14, color: textPrimary, lineHeight: 1.7, marginBottom: 12 }}>Mana Daily News is a hyperlocal bilingual news platform built for Telangana's Tier 2 and Tier 3 cities. We deliver news in both Telugu and English, covering politics, sports, education, agriculture, health, entertainment, business and technology at the mandal level.</p>
          <p style={{ fontSize: 14, color: textPrimary, lineHeight: 1.7 }}>Our mission is to bridge the information gap in rural and semi-urban Telangana by delivering timely, accurate, and locally relevant news.</p>
        </div>
        <div style={{ fontSize: 13, color: textSecondary, textAlign: 'center' }}>
          <div>{t.version}</div>
          <div style={{ marginTop: 4 }}>{t.builtBy}</div>
        </div>
      </div>
    </div>
  );

  if (showMandal) return (
    <PickerScreen title={t.mandal} items={['All', ...mandals]} selected={selectedMandal} onSelect={(v) => { setSelectedMandal(v); setShowMandal(false); }} onBack={() => setShowMandal(false)} t={t} dark={dark} bg={bg} bgCard={bgCard} textPrimary={textPrimary} border={border} />
  );

  if (showDistrict) return (
    <PickerScreen title={t.district} items={['All', ...districts]} selected={selectedDistrict} onSelect={(v) => { setSelectedDistrict(v); setShowDistrict(false); }} onBack={() => setShowDistrict(false)} t={t} dark={dark} bg={bg} bgCard={bgCard} textPrimary={textPrimary} border={border} />
  );

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: bg }}>
      <div style={{ background: C.primary, padding: '14px 16px', display: 'flex', justifyContent: 'center' }}><Logo size="sm" variant="horizontal" /></div>
      <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
        <div style={{ background: `linear-gradient(135deg, ${C.primary}, #032d5a)`, borderRadius: 12, padding: 16, color: '#fff', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#fff', color: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800 }}>D</div>
          <div><div style={{ fontWeight: 700, fontSize: 17 }}>Dinesh</div><div style={{ fontSize: 12, opacity: .8 }}>dinesh.gonti@clymin.com</div></div>
        </div>

        <SettingRow icon="🌐" label={lang === 'en' ? 'App Language' : 'యాప్ భాష'} dark={dark} textPrimary={textPrimary} border={border} right={
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={() => setLang('en')} style={{ padding: '4px 12px', borderRadius: 14, border: 'none', background: lang === 'en' ? C.primary : (dark ? '#333' : '#eee'), color: lang === 'en' ? '#fff' : textPrimary, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>EN</button>
            <button onClick={() => setLang('te')} style={{ padding: '4px 12px', borderRadius: 14, border: 'none', background: lang === 'te' ? C.primary : (dark ? '#333' : '#eee'), color: lang === 'te' ? '#fff' : textPrimary, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Te</button>
          </div>
        }/>
        <SettingRow icon="📰" label={lang === 'en' ? 'News Language' : 'వార్తల భాష'} dark={dark} textPrimary={textPrimary} border={border} right={
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={() => setNewsLang('en')} style={{ padding: '4px 12px', borderRadius: 14, border: 'none', background: newsLang === 'en' ? C.primary : (dark ? '#333' : '#eee'), color: newsLang === 'en' ? '#fff' : textPrimary, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>EN</button>
            <button onClick={() => setNewsLang('te')} style={{ padding: '4px 12px', borderRadius: 14, border: 'none', background: newsLang === 'te' ? C.primary : (dark ? '#333' : '#eee'), color: newsLang === 'te' ? '#fff' : textPrimary, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Te</button>
          </div>
        }/>
        <SettingRow icon="🏛️" label={t.district} dark={dark} textPrimary={textPrimary} border={border} onClick={() => setShowDistrict(true)} right={<span style={{ color: textSecondary, fontSize: 13 }}>{selectedDistrict === 'All' ? t.allDistricts : selectedDistrict} ›</span>} />
        <SettingRow icon="📍" label={t.mandal} dark={dark} textPrimary={textPrimary} border={border} onClick={() => setShowMandal(true)} right={<span style={{ color: textSecondary, fontSize: 13 }}>{selectedMandal === 'All' ? t.allMandals : selectedMandal} ›</span>} />
        <SettingRow icon="🔔" label={t.notif} dark={dark} textPrimary={textPrimary} border={border} right={
          <button onClick={() => setNotif(!notif)} style={{ width: 44, height: 24, borderRadius: 12, border: 'none', background: notif ? '#22c55e' : (dark ? '#444' : '#ddd'), cursor: 'pointer', position: 'relative', transition: 'background .3s' }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: notif ? 22 : 2, transition: 'left .3s', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />
          </button>
        }/>
        <SettingRow icon="🌙" label={t.dark} dark={dark} textPrimary={textPrimary} border={border} right={
          <button onClick={() => setDark(!dark)} style={{ width: 44, height: 24, borderRadius: 12, border: 'none', background: dark ? '#22c55e' : (dark ? '#444' : '#ddd'), cursor: 'pointer', position: 'relative', transition: 'background .3s' }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: dark ? 22 : 2, transition: 'left .3s', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />
          </button>
        }/>
        <SettingRow icon="ℹ️" label={t.about} dark={dark} textPrimary={textPrimary} border={border} onClick={() => setShowAbout(true)} right={<span style={{ color: textSecondary }}>›</span>} />
      </div>
      <BottomNav tab="profile" setTab={setTab} t={t} dark={dark} bg={bg} border={border} />
    </div>
  );
}

function PickerScreen({ title, items, selected, onSelect, onBack, t, dark, bg, bgCard, textPrimary, border }) {
  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: bg }}>
      <div style={{ background: C.primary, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBack} style={{ color: '#fff', background: 'none', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{t.back}</button>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>{title}</span>
        <div style={{ width: 50 }} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
        {items.map(item => (
          <button key={item} onClick={() => onSelect(item)} style={{ width: '100%', padding: '14px 16px', marginBottom: 4, borderRadius: 8, border: `1px solid ${border}`, background: selected === item ? C.primary : bgCard, color: selected === item ? '#fff' : textPrimary, fontSize: 15, fontWeight: selected === item ? 700 : 400, cursor: 'pointer', textAlign: 'left' }}>
            {item === 'All' ? (title.includes('Mandal') || title.includes('మండలం') ? t.allMandals : t.allDistricts) : item}
            {selected === item && ' ✓'}
          </button>
        ))}
      </div>
    </div>
  );
}

function SettingRow({ icon, label, right, onClick, dark, textPrimary, border }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 4px', borderBottom: `1px solid ${border}`, cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ fontSize: 15, fontWeight: 500, color: textPrimary }}>{label}</span>
      </div>
      {right}
    </div>
  );
}

function BottomNav({ tab, setTab, t, dark, bg, border }) {
  const items = [
    { key: 'home', label: t.home, icon: '⌂', isLogo: true },
    { key: 'categories', label: t.categories, icon: '⊞' },
    { key: 'saved', label: t.saved || 'Saved', icon: '🔖' },
    { key: 'profile', label: t.profile, icon: '⊙' },
  ];
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px 0 14px', borderTop: `1px solid ${border}`, background: bg }}>
      {items.map(i => (
        <button key={i.key} onClick={() => setTab(i.key)} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, color: tab === i.key ? C.primary : (dark ? '#666' : '#999'), fontSize: 18 }}>
          {i.isLogo ? <Logo size="sm" variant="icon" /> : <span>{i.icon}</span>}
          <span style={{ fontSize: 10, fontWeight: tab === i.key ? 700 : 400 }}>{i.label}</span>
        </button>
      ))}
    </div>
  );
}
