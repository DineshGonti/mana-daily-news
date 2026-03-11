import { useState, useEffect, useCallback } from 'react';
import { getArticles, addArticle, updateArticle, deleteArticle, catIcons, mandals, districts, fetchGoogleNews } from './store.js';

const C = { primary: '#054A91', secondary: '#28AFFA', accent: '#E71D36' };
const font = 'Impact, Arial Black, sans-serif';

function Logo({ size = 'md', variant = 'stacked' }) {
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

const cats = Object.keys(catIcons);
const stockImages = [
  'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&h=400&fit=crop',
];

const empty = () => ({ status: 'published', breaking: false, category: cats[0], mandal: mandals[0], district: districts[0], img: stockImages[0], te: { title: '', body: '' }, en: { title: '', body: '' }, author: '', time: 'Just now' });

export default function Admin() {
  const [articles, setArticles] = useState([]);
  const [view, setView] = useState('list');
  const [form, setForm] = useState(empty());
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState('');
  const [contentTab, setContentTab] = useState('te');
  const [search, setSearch] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [fetching, setFetching] = useState(false);

  const reload = useCallback(() => setArticles(getArticles()), []);
  useEffect(() => { reload(); }, [reload]);
  useEffect(() => {
    const h = () => reload();
    window.addEventListener('mana-news-updated', h);
    window.addEventListener('storage', h);
    const iv = setInterval(reload, 3000);
    return () => { window.removeEventListener('mana-news-updated', h); window.removeEventListener('storage', h); clearInterval(iv); };
  }, [reload]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const handleSave = () => {
    if (!form.en.title && !form.te.title) { showToast('Add at least one headline'); return; }
    if (!form.author) { showToast('Add reporter name'); return; }
    if (editId) {
      updateArticle(editId, form);
      showToast('Article updated!');
    } else {
      addArticle(form);
      showToast('Article published!');
    }
    setView('list'); setEditId(null); setForm(empty()); reload();
  };

  const handleEdit = (a) => { setForm({ ...a }); setEditId(a.id); setView('form'); };
  const handleDelete = (id) => { if (window.confirm('Delete this article?')) { deleteArticle(id); showToast('Article deleted'); reload(); } };
  const handleToggle = (a) => { updateArticle(a.id, { status: a.status === 'published' ? 'draft' : 'published' }); reload(); };
  const handleDuplicate = (a) => { const dup = { ...a, id: undefined, time: 'Just now' }; delete dup.id; addArticle(dup); showToast('Article duplicated!'); reload(); };

  let shown = filter === 'all' ? articles : articles.filter(a => a.status === filter);
  if (search) shown = shown.filter(a => (a.en.title + a.te.title + a.category + a.mandal + (a.district || '')).toLowerCase().includes(search.toLowerCase()));
  const pub = articles.filter(a => a.status === 'published').length;
  const draft = articles.filter(a => a.status === 'draft').length;
  const autoCount = articles.filter(a => a.autoFetched).length;

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: '#f8f8f8', maxWidth: 500, margin: '0 auto' }}>
      {/* Toast */}
      {toast && <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', background: '#333', color: '#fff', padding: '10px 20px', borderRadius: 8, zIndex: 999, fontSize: 14, fontWeight: 600 }}>{toast}</div>}

      {/* Header */}
      <div style={{ background: C.primary, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size="sm" variant="horizontal" />
          <span style={{ color: 'rgba(255,255,255,.6)', fontSize: 13, fontWeight: 500 }}>Admin</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={async () => { setFetching(true); const n = await fetchGoogleNews(true); setFetching(false); reload(); showToast(n ? `Fetched ${n} news articles!` : 'No new articles found'); }} style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: 'pointer', opacity: fetching ? 0.5 : 1 }} disabled={fetching}>
            {fetching ? '⏳ Fetching...' : '🔄 Fetch News'}
          </button>
          <button onClick={() => { setView('form'); setEditId(null); setForm(empty()); }} style={{ background: C.accent, color: '#fff', border: 'none', padding: '8px 14px', borderRadius: 6, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>+ New</button>
        </div>
      </div>

      {view === 'list' ? (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {/* Stats */}
          <div style={{ display: 'flex', justifyContent: 'space-around', padding: '14px 16px', background: '#fff', borderBottom: '1px solid #eee' }}>
            <div style={{ textAlign: 'center' }}><div style={{ fontSize: 22, fontWeight: 800 }}>{articles.length}</div><div style={{ fontSize: 11, color: '#999' }}>Total</div></div>
            <div style={{ textAlign: 'center' }}><div style={{ fontSize: 22, fontWeight: 800, color: '#22c55e' }}>{pub}</div><div style={{ fontSize: 11, color: '#999' }}>Published</div></div>
            <div style={{ textAlign: 'center' }}><div style={{ fontSize: 22, fontWeight: 800, color: '#f59e0b' }}>{draft}</div><div style={{ fontSize: 11, color: '#999' }}>Drafts</div></div>
            <div style={{ textAlign: 'center' }}><div style={{ fontSize: 22, fontWeight: 800, color: '#8b5cf6' }}>{autoCount}</div><div style={{ fontSize: 11, color: '#999' }}>Auto</div></div>
          </div>

          {/* Search */}
          <div style={{ padding: '10px 16px', background: '#fff', borderBottom: '1px solid #eee' }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..." style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, boxSizing: 'border-box' }} />
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 0, borderBottom: '2px solid #eee', background: '#fff' }}>
            {[['all', `All (${articles.length})`], ['published', `Published (${pub})`], ['draft', `Drafts (${draft})`]].map(([k, label]) => (
              <button key={k} onClick={() => setFilter(k)} style={{ flex: 1, padding: '10px 0', border: 'none', background: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer', color: filter === k ? C.primary : '#999', borderBottom: filter === k ? `2px solid ${C.primary}` : '2px solid transparent' }}>{label}</button>
            ))}
          </div>

          {/* Article list */}
          <div style={{ padding: 12 }}>
            {shown.map(a => (
              <div key={a.id} style={{ background: '#fff', borderRadius: 10, padding: 12, marginBottom: 10, display: 'flex', gap: 10, boxShadow: '0 1px 3px rgba(0,0,0,.06)' }}>
                <img src={a.img} alt="" style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, fontWeight: 700, background: a.status === 'published' ? '#dcfce7' : '#fef9c3', color: a.status === 'published' ? '#16a34a' : '#ca8a04' }}>{a.status === 'published' ? 'Published' : 'Draft'}</span>
                    <span style={{ fontSize: 10, color: '#999' }}>{a.category}</span>
                    <span style={{ fontSize: 10, color: '#999' }}>{a.mandal}{a.district ? `, ${a.district}` : ''}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.en.title || a.te.title}</div>
                  <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{a.author} • {a.time}</div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
                    <button onClick={() => handleEdit(a)} style={{ border: 'none', background: 'none', color: '#3b82f6', fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: 0 }}>Edit</button>
                    <button onClick={() => handleToggle(a)} style={{ border: 'none', background: 'none', color: '#f59e0b', fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: 0 }}>{a.status === 'published' ? 'Unpublish' : 'Publish'}</button>
                    <button onClick={() => handleDuplicate(a)} style={{ border: 'none', background: 'none', color: '#8b5cf6', fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: 0 }}>Duplicate</button>
                    <button onClick={() => handleDelete(a.id)} style={{ border: 'none', background: 'none', color: '#ef4444', fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: 0 }}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
            {shown.length === 0 && <div style={{ textAlign: 'center', color: '#999', padding: 40 }}>No articles found</div>}
          </div>
        </div>
      ) : (
        /* Form View */
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <button onClick={() => { setView('list'); setEditId(null); setForm(empty()); }} style={{ border: 'none', background: 'none', fontSize: 14, fontWeight: 600, color: '#3b82f6', cursor: 'pointer' }}>← Back</button>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{editId ? 'Edit Article' : 'New Article'}</div>
            <div style={{ width: 50 }} />
          </div>

          {/* Image preview */}
          <label style={{ fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 4, display: 'block' }}>Cover Image</label>
          {form.img && (
            <div style={{ marginBottom: 10, position: 'relative', display: 'inline-block' }}>
              <img src={form.img} alt="Preview" style={{ width: '100%', maxHeight: 180, objectFit: 'cover', borderRadius: 10 }} />
              <button onClick={() => setForm({ ...form, img: '' })} style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,.6)', color: '#fff', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', fontSize: 14, lineHeight: '24px', textAlign: 'center' }}>×</button>
            </div>
          )}

          {/* Upload image from device */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <label style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 0', borderRadius: 8, border: `2px dashed ${C.secondary}`, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: C.primary, background: '#f0f8ff' }}>
              <span>📷 Upload Photo</span>
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
                const file = e.target.files[0];
                if (!file) return;
                if (file.size > 2 * 1024 * 1024) { showToast('Image too large (max 2MB)'); return; }
                const reader = new FileReader();
                reader.onload = () => setForm(f => ({ ...f, img: reader.result }));
                reader.readAsDataURL(file);
                e.target.value = '';
              }} />
            </label>
            <label style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 0', borderRadius: 8, border: `2px dashed ${C.secondary}`, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: C.primary, background: '#f0f8ff' }}>
              <span>📸 Take Photo</span>
              <input type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={e => {
                const file = e.target.files[0];
                if (!file) return;
                if (file.size > 2 * 1024 * 1024) { showToast('Image too large (max 2MB)'); return; }
                const reader = new FileReader();
                reader.onload = () => setForm(f => ({ ...f, img: reader.result }));
                reader.readAsDataURL(file);
                e.target.value = '';
              }} />
            </label>
          </div>

          {/* Stock images */}
          <label style={{ fontSize: 11, fontWeight: 600, color: '#999', marginBottom: 4, display: 'block' }}>Or choose stock image</label>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 10, paddingBottom: 4 }}>
            {stockImages.map((img, i) => (
              <img key={i} src={img} alt="" onClick={() => setForm({ ...form, img })} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', cursor: 'pointer', border: form.img === img ? `3px solid ${C.accent}` : '3px solid transparent', flexShrink: 0 }} />
            ))}
          </div>

          {/* Custom image URL */}
          <label style={{ fontSize: 11, fontWeight: 600, color: '#999', display: 'block', marginBottom: 4 }}>Or paste image URL</label>
          <input value={form.img.startsWith('data:') ? '' : form.img} onChange={e => setForm({ ...form, img: e.target.value })} placeholder="https://..." style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 13, marginBottom: 14, boxSizing: 'border-box' }} />

          {/* Category, District & Mandal */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#666', display: 'block', marginBottom: 4 }}>Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14 }}>
                {cats.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#666', display: 'block', marginBottom: 4 }}>District</label>
              <select value={form.district || ''} onChange={e => setForm({ ...form, district: e.target.value })} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14 }}>
                {districts.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#666', display: 'block', marginBottom: 4 }}>Mandal</label>
            <select value={form.mandal} onChange={e => setForm({ ...form, mandal: e.target.value })} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14 }}>
              {mandals.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>

          {/* Breaking toggle */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, cursor: 'pointer' }}>
            <input type="checkbox" checked={form.breaking} onChange={e => setForm({ ...form, breaking: e.target.checked })} />
            <span style={{ fontSize: 14, fontWeight: 600 }}>Breaking News</span>
          </label>

          {/* Content tabs */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 12, borderBottom: '2px solid #eee' }}>
            {[['te', 'Telugu'], ['en', 'English']].map(([k, label]) => (
              <button key={k} onClick={() => setContentTab(k)} style={{ flex: 1, padding: '8px 0', border: 'none', background: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer', color: contentTab === k ? C.primary : '#999', borderBottom: contentTab === k ? `2px solid ${C.primary}` : '2px solid transparent' }}>{label}</button>
            ))}
          </div>

          <label style={{ fontSize: 12, fontWeight: 600, color: '#666', display: 'block', marginBottom: 4 }}>Headline ({contentTab === 'te' ? 'Telugu' : 'English'})</label>
          <input value={form[contentTab].title} onChange={e => setForm({ ...form, [contentTab]: { ...form[contentTab], title: e.target.value } })} placeholder={contentTab === 'te' ? 'తెలుగు శీర్షిక...' : 'English headline...'} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, marginBottom: 12, boxSizing: 'border-box' }} />

          <label style={{ fontSize: 12, fontWeight: 600, color: '#666', display: 'block', marginBottom: 4 }}>Body ({contentTab === 'te' ? 'Telugu' : 'English'})</label>
          <textarea value={form[contentTab].body} onChange={e => setForm({ ...form, [contentTab]: { ...form[contentTab], body: e.target.value } })} placeholder={contentTab === 'te' ? 'తెలుగు వార్త విషయం...' : 'English news body...'} rows={5} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, marginBottom: 12, resize: 'vertical', boxSizing: 'border-box' }} />

          <label style={{ fontSize: 12, fontWeight: 600, color: '#666', display: 'block', marginBottom: 4 }}>Reporter Name</label>
          <input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} placeholder="Reporter name..." style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, marginBottom: 16, boxSizing: 'border-box' }} />

          {/* Status toggle */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {['published', 'draft'].map(s => (
              <button key={s} onClick={() => setForm({ ...form, status: s })} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer', background: form.status === s ? (s === 'published' ? '#22c55e' : '#f59e0b') : '#eee', color: form.status === s ? '#fff' : '#666' }}>
                {s === 'published' ? 'Publish' : 'Save Draft'}
              </button>
            ))}
          </div>

          {/* Preview toggle */}
          <button onClick={() => setShowPreview(!showPreview)} style={{ width: '100%', padding: '10px', borderRadius: 8, border: `2px solid ${C.secondary}`, background: showPreview ? C.secondary : '#fff', color: showPreview ? '#fff' : C.primary, fontWeight: 700, fontSize: 13, cursor: 'pointer', marginBottom: 12 }}>
            {showPreview ? '✕ Hide Preview' : '👁 Preview Article'}
          </button>

          {showPreview && (
            <div style={{ marginBottom: 16, borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,.12)', background: '#fff' }}>
              <div style={{ background: C.primary, padding: '6px 12px', fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: 1 }}>PREVIEW</div>
              {form.img && <img src={form.img} alt="" style={{ width: '100%', height: 180, objectFit: 'cover' }} />}
              <div style={{ padding: 14 }}>
                {form.breaking && <div style={{ display: 'inline-block', background: C.accent, color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 4, marginBottom: 6 }}>BREAKING</div>}
                <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: '#e0f2fe', color: C.primary, fontWeight: 600 }}>{form.category}</span>
                  <span style={{ fontSize: 10, color: '#999' }}>{form.mandal}{form.district ? `, ${form.district}` : ''}</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.3, marginBottom: 6, color: '#1a1a1a' }}>{form.te.title || form.en.title || 'No headline yet...'}</div>
                {(form.te.title && form.en.title) && <div style={{ fontSize: 13, color: '#666', marginBottom: 6, fontStyle: 'italic' }}>{form.en.title}</div>}
                <div style={{ fontSize: 13, color: '#444', lineHeight: 1.5, marginBottom: 8, maxHeight: 80, overflow: 'hidden' }}>{form[contentTab].body || 'No body text yet...'}</div>
                <div style={{ fontSize: 11, color: '#999', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{form.author || 'No reporter'}</span>
                  <span>{form.time || 'Just now'}</span>
                </div>
              </div>
            </div>
          )}

          <button onClick={handleSave} style={{ width: '100%', padding: '14px', borderRadius: 10, border: 'none', background: C.primary, color: '#fff', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
            {editId ? 'Update Article' : 'Publish Article'}
          </button>
        </div>
      )}
    </div>
  );
}
