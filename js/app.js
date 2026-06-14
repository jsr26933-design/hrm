/* ===== WorkPilot HR — Core App Controller ===== */

let currentModule = 'dashboard';
let notifOpen = false;

// ── Login ────────────────────────────────────────────────────────────────────
function handleLogin(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-login');
  const origHTML = btn.innerHTML;
  btn.innerHTML = '<span class="spinner"></span>&nbsp;Signing in…';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    // Show FAB
    const fab = document.getElementById('fab-btn');
    if (fab) fab.style.display = 'flex';
    navigate('dashboard');
    showToast('Welcome back, Arjun Kumar! 👋', 'success');
    startClock();
    btn.innerHTML = origHTML;
    btn.disabled = false;
  }, 1200);
}

function handleGoogleLogin() {
  showToast('Signing in with Google...', 'info');
  setTimeout(() => {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    // Show FAB
    const fab = document.getElementById('fab-btn');
    if (fab) fab.style.display = 'flex';
    navigate('dashboard');
    showToast('Welcome back, Arjun Kumar! 👋', 'success');
    startClock();
  }, 1000);
}

function handleLogout() {
  if (!confirm('Sign out of WorkPilot HR?')) return;
  document.getElementById('app').classList.add('hidden');
  document.getElementById('login-screen').classList.remove('hidden');
  showToast('Signed out successfully.');
}

// ── Navigation ────────────────────────────────────────────────────────────────
function navigate(module) {
  currentModule = module;

  // Update nav items
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const activeNav = document.querySelector(`.nav-item[onclick="navigate('${module}')"]`);
  if (activeNav) activeNav.classList.add('active');

  // Update breadcrumb
  const labels = {
    dashboard: 'Dashboard', employees: 'Employee Management',
    attendance: 'Attendance Management', leaves: 'Leave Management',
    payroll: 'Payroll Processing', tasks: 'Task Management',
    tracking: 'Workforce Tracking', gps: 'GPS Attendance',
    reports: 'Reports & Analytics', selfservice: 'Self Service Portal',
    rbac: 'Roles & Access Control', settings: 'Settings',
    hrcalendar: 'HR Calendar', recruitment: 'Recruitment',
    onboarding: 'Setup Wizard', appraisal: 'Performance Appraisal',
    assets: 'Asset Management', helpdesk: 'Help Desk & Announcements'
  };
  document.getElementById('breadcrumb').textContent = labels[module] || module;

  // Render module
  const content = document.getElementById('page-content');
  content.innerHTML = '';

  const renderers = {
    dashboard: renderDashboard,
    employees: renderEmployees,
    attendance: renderAttendance,
    leaves: renderLeaves,
    payroll: renderPayroll,
    tasks: renderTasks,
    tracking: renderTracking,
    gps: renderGPS,
    reports: renderReports,
    selfservice: renderSelfService,
    rbac: renderRBAC,
    settings: renderSettings,
    hrcalendar: renderHRCalendar,
    recruitment: renderRecruitment,
    onboarding: renderOnboardingWizard,
    appraisal: renderAppraisal,
    assets: renderAssets,
    helpdesk: renderHelpDesk
  };

  if (renderers[module]) renderers[module](content);
  closeOverlays();
  closeFAB();
  window.scrollTo(0, 0);
}

// ── Sidebar ──────────────────────────────────────────────────────────────────
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (window.innerWidth <= 900) {
    sidebar.classList.toggle('open');
  } else {
    sidebar.classList.toggle('collapsed');
    // Persist state
    localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
  }
}

// ── Company Switcher ─────────────────────────────────────────────────────────
function toggleCompanyDropdown() {
  const dd = document.getElementById('company-dropdown');
  dd.classList.toggle('open');
}

function switchCompany(name, initials) {
  document.getElementById('active-company-name').textContent = name;
  document.querySelectorAll('.company-option').forEach(el => el.classList.remove('active'));
  // find clicked element via closest
  const clicked = document.activeElement || event.target;
  if (clicked) clicked.closest('.company-option')?.classList.add('active');
  document.getElementById('company-dropdown').classList.remove('open');
  showToast(`Switched to ${name}`, 'success');
  navigate('dashboard');
}

function showAddCompany() {
  showToast('Multi-company setup available in Enterprise plan.', 'warning');
}

// ── Notifications ────────────────────────────────────────────────────────────
function showNotifications() {
  const panel = document.getElementById('notification-panel');
  const overlay = document.getElementById('overlay');
  notifOpen = !notifOpen;
  panel.classList.toggle('open', notifOpen);
  overlay.classList.toggle('active', notifOpen);
}

function closeOverlays() {
  notifOpen = false;
  document.getElementById('notification-panel').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
  document.querySelectorAll('.company-dropdown').forEach(d => d.classList.remove('open'));
}

// ── Toast ────────────────────────────────────────────────────────────────────
function showToast(msg, type = 'default') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type !== 'default' ? type : ''}`;
  const icons = {
    success: '✓', warning: '⚠', error: '✕', default: 'ℹ'
  };
  toast.innerHTML = `<span>${icons[type] || icons.default}</span> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ── Live Clock ───────────────────────────────────────────────────────────────
function startClock() {
  function tick() {
    const el = document.getElementById('live-clock');
    if (el) {
      const now = new Date();
      el.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
  }
  tick();
  setInterval(tick, 1000);
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatCurrency(n) {
  if (n >= 100000) return '₹' + (n / 100000).toFixed(2) + 'L';
  if (n >= 1000) return '₹' + (n / 1000).toFixed(1) + 'K';
  return '₹' + n;
}

function formatDate(d) {
  const dt = new Date(d);
  return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function getTodayDate() {
  return new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Morning';
  if (h < 17) return 'Afternoon';
  return 'Evening';
}

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function avatarColors(initials) {
  const colors = ['#2563EB','#7C3AED','#059669','#F97316','#DC2626','#0891B2','#9333EA','#EA580C'];
  const idx = (initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % colors.length;
  return colors[idx];
}

function statusBadge(status) {
  const map = {
    active: 'badge-green', inactive: 'badge-gray', present: 'badge-green',
    absent: 'badge-red', late: 'badge-yellow', 'on-leave': 'badge-orange',
    pending: 'badge-yellow', approved: 'badge-green', rejected: 'badge-red',
    processed: 'badge-green', 'on-hold': 'badge-orange', disbursed: 'badge-blue',
    'field': 'badge-blue', 'checked-in': 'badge-green', remote: 'badge-purple'
  };
  const labels = {
    active: 'Active', inactive: 'Inactive', present: 'Present',
    absent: 'Absent', late: 'Late', 'on-leave': 'On Leave',
    pending: 'Pending', approved: 'Approved', rejected: 'Rejected',
    processed: 'Processed', 'on-hold': 'On Hold', disbursed: 'Disbursed',
    'field': 'Field', 'checked-in': 'Checked In', remote: 'Remote'
  };
  const cls = map[status] || 'badge-gray';
  const lbl = labels[status] || status;
  return `<span class="badge ${cls} badge-dot">${lbl}</span>`;
}

// Modal helpers
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

// Shared UI helpers
function infoRow(label, value) {
  return `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--gray-50);font-size:13px">
    <span style="color:var(--gray-500)">${label}</span>
    <span style="font-weight:600;color:var(--gray-700)">${value}</span>
  </div>`;
}

// Keyboard shortcut
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const si = document.getElementById('global-search-input') || document.querySelector('.search-box input');
    if (si) { si.focus(); si.select(); }
  }
  if (e.key === 'Escape') { closeOverlays(); closeFAB(); }
});

// ── FAB ──────────────────────────────────────────────────────────────────────
let fabOpen = false;
function toggleFAB() {
  fabOpen = !fabOpen;
  const menu = document.getElementById('fab-menu');
  const btn  = document.getElementById('fab-btn');
  if (!menu || !btn) return;
  if (fabOpen) {
    menu.style.display = 'flex';
    btn.style.transform = 'rotate(45deg)';
    btn.style.background = 'var(--secondary)';
  } else {
    closeFAB();
  }
}
function closeFAB() {
  fabOpen = false;
  const menu = document.getElementById('fab-menu');
  const btn  = document.getElementById('fab-btn');
  if (menu) menu.style.display = 'none';
  if (btn)  { btn.style.transform = ''; btn.style.background = ''; }
}

// ── Global Search ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Hide page loader
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 400);
    }, 1600);
  }

  // Restore sidebar state
  if (localStorage.getItem('sidebarCollapsed') === 'true') {
    const sb = document.getElementById('sidebar');
    if (sb) sb.classList.add('collapsed');
  }

  // Wire search input — live results
  const searchInput = document.getElementById('global-search-input');
  const searchResults = document.getElementById('search-results');
  const searchData = [
    {icon:'👥', label:'Employee Management', sub:'View all 248 employees', mod:'employees'},
    {icon:'✅', label:'Attendance',          sub:'Daily attendance tracking', mod:'attendance'},
    {icon:'📅', label:'Leave Management',   sub:'Approvals & balances', mod:'leaves'},
    {icon:'💰', label:'Payroll Processing', sub:'Run payroll, view payslips', mod:'payroll'},
    {icon:'📋', label:'Task Management',    sub:'Kanban board & task list', mod:'tasks'},
    {icon:'📍', label:'GPS Attendance',     sub:'Live employee tracking', mod:'gps'},
    {icon:'📊', label:'Reports & Analytics',sub:'Charts, exports, insights', mod:'reports'},
    {icon:'🎯', label:'Performance',        sub:'Appraisals & OKRs', mod:'appraisal'},
    {icon:'💻', label:'Asset Management',   sub:'Laptops, phones, equipment', mod:'assets'},
    {icon:'🎫', label:'Help Desk',          sub:'Tickets & announcements', mod:'helpdesk'},
    {icon:'📆', label:'HR Calendar',        sub:'Events, leaves, holidays', mod:'hrcalendar'},
    {icon:'💼', label:'Recruitment',        sub:'Jobs & candidate pipeline', mod:'recruitment'},
    {icon:'🔒', label:'Roles & Access',     sub:'Permissions matrix', mod:'rbac'},
    {icon:'⚙️', label:'Settings',          sub:'Configure WorkPilot HR', mod:'settings'},
    // employees as searchable items
    ...WP.employees.slice(0,6).map(e=>({icon:'👤', label:e.name, sub:`${e.role} · ${e.dept}`, mod:'employees', empId:e.id}))
  ];

  if (searchInput && searchResults) {
    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim()) showSearchResults(searchInput.value, searchResults, searchData);
    });
    searchInput.addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) { searchResults.style.display='none'; return; }
      showSearchResults(q, searchResults, searchData);
    });
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const q = e.target.value.trim().toLowerCase();
        const match = searchData.find(s => s.label.toLowerCase().includes(q) || s.sub.toLowerCase().includes(q));
        if (match) { navigate(match.mod); searchInput.value=''; searchResults.style.display='none'; }
        else showToast(`No results for "${searchInput.value}"`);
      }
      if (e.key === 'Escape') { searchResults.style.display='none'; searchInput.blur(); }
    });
    document.addEventListener('click', e => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
      }
    });
  }
});

// ── Search Results ────────────────────────────────────────────────────────────
function showSearchResults(q, container, data) {
  const filtered = data.filter(s =>
    s.label.toLowerCase().includes(q) || s.sub.toLowerCase().includes(q)
  ).slice(0, 8);

  if (!filtered.length) {
    container.innerHTML = `<div style="padding:16px;text-align:center;font-size:13px;color:var(--gray-400)">No results for "<strong>${q}</strong>"</div>`;
    container.style.display = 'block';
    return;
  }

  container.innerHTML = `
    <div style="padding:8px 14px 6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--gray-400)">Quick Results</div>
    ${filtered.map(s => `
      <div class="search-result-item" onclick="navigate('${s.mod}');document.getElementById('global-search-input').value='';document.getElementById('search-results').style.display='none'">
        <div class="search-result-icon">${s.icon}</div>
        <div>
          <div class="search-result-label">${s.label}</div>
          <div class="search-result-sub">${s.sub}</div>
        </div>
        <span class="search-result-cat">${s.mod}</span>
      </div>
    `).join('')}
    <div style="padding:8px 14px;border-top:1px solid var(--gray-100);font-size:12px;color:var(--gray-400);display:flex;align-items:center;gap:6px">
      <kbd style="font-size:10px;padding:2px 6px;background:var(--gray-100);border-radius:4px">↵ Enter</kbd> to navigate
      <kbd style="font-size:10px;padding:2px 6px;background:var(--gray-100);border-radius:4px;margin-left:4px">Esc</kbd> to close
    </div>
  `;
  container.style.display = 'block';
}

// ── Mobile Nav ────────────────────────────────────────────────────────────────
function setMobileActive(el) {
  document.querySelectorAll('.mobile-nav-item').forEach(n => n.classList.remove('active'));
  el.classList.add('active');
}

// ── Confetti burst (for celebrations) ────────────────────────────────────────
function launchConfetti() {
  const colors = ['#2563EB','#F97316','#10B981','#F59E0B','#7C3AED','#EF4444'];
  for (let i = 0; i < 30; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left:${Math.random()*100}vw;
      top:${Math.random()*30}vh;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-delay:${Math.random()*0.5}s;
      animation-duration:${0.8+Math.random()*0.8}s;
    `;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1600);
  }
}
