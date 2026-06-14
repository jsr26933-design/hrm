/* ===== WorkPilot HR — Employee Management (Premium Rebuild) ===== */

let empView = 'grid';
let empFilter = { dept: 'all', status: 'all', search: '' };

function renderEmployees(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Employee Management</h1>
        <p>${WP.employees.length} employees · ${WP.employees.filter(e=>e.status==='active').length} active across ${WP.departments.length} departments</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-secondary" onclick="exportEmployees()">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export
        </button>
        <button class="btn btn-primary" onclick="openModal('add-emp-modal')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Employee
        </button>
      </div>
    </div>

    <!-- Gradient KPI Row -->
    <div class="grid grid-4" style="margin-bottom:24px">
      <div class="stat-card-blue">
        <div class="grad-stat-icon">👥</div>
        <div class="grad-stat-label">Total Staff</div>
        <div class="grad-stat-value">248</div>
        <div class="grad-stat-badge">8 departments</div>
      </div>
      <div class="stat-card-green">
        <div class="grad-stat-icon">✅</div>
        <div class="grad-stat-label">Active</div>
        <div class="grad-stat-value">241</div>
        <div class="grad-stat-badge">97.2% active rate</div>
      </div>
      <div class="stat-card-orange">
        <div class="grad-stat-icon">🆕</div>
        <div class="grad-stat-label">New This Month</div>
        <div class="grad-stat-value">6</div>
        <div class="grad-stat-badge">↑ +2 vs last month</div>
      </div>
      <div class="stat-card-purple">
        <div class="grad-stat-icon">⚠️</div>
        <div class="grad-stat-label">Inactive</div>
        <div class="grad-stat-value">7</div>
        <div class="grad-stat-badge">Pending offboard</div>
      </div>
    </div>

    <!-- Filter & View Bar -->
    <div class="filter-bar">
      <div class="filter-search" style="max-width:300px">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" placeholder="Search name, ID, role, email…" id="emp-search-input" oninput="filterEmployees(this.value)" autocomplete="off"/>
      </div>
      <select class="filter-select" onchange="filterByDept(this.value)">
        <option value="all">All Departments</option>
        ${[...new Set(WP.employees.map(e=>e.dept))].map(d=>`<option value="${d}">${d}</option>`).join('')}
      </select>
      <select class="filter-select" onchange="filterByStatus(this.value)">
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <select class="filter-select" onchange="showToast('Sorting applied')">
        <option>Sort: Name A–Z</option>
        <option>Sort: Newest First</option>
        <option>Sort: Salary ↑</option>
        <option>Sort: Department</option>
      </select>
      <div style="display:flex;gap:4px;margin-left:auto">
        <button id="btn-grid" class="btn btn-primary btn-sm" onclick="setEmpView('grid')" title="Card view">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        </button>
        <button id="btn-list" class="btn btn-secondary btn-sm" onclick="setEmpView('list')" title="Table view">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
        </button>
      </div>
    </div>

    <!-- Count label -->
    <div id="emp-count-label" style="font-size:12px;color:var(--gray-400);margin-bottom:14px">
      Showing all ${WP.employees.length} employees
    </div>

    <!-- Employee Container -->
    <div id="emp-container">
      ${buildEmpView(WP.employees)}
    </div>

    <!-- Add Employee Modal -->
    <div class="modal-backdrop" id="add-emp-modal">
      <div class="modal modal-lg">
        <div class="modal-header">
          <div class="modal-icon blue">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div class="modal-header-text">
            <div class="modal-title">Add New Employee</div>
            <div class="modal-subtitle">Fill in the details to create a new employee record</div>
          </div>
          <button class="modal-close" onclick="closeModal('add-emp-modal')">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <!-- Stepper -->
          <div class="stepper" id="emp-stepper" style="margin-bottom:24px">
            ${['Personal','Work Details','Compensation','Access'].map((s,i)=>`
              <div class="step ${i===0?'active':''}" id="empstep-${i}">
                <div class="step-circle">${i+1}</div>
                <div class="step-label">${s}</div>
              </div>
            `).join('')}
          </div>
          <div id="emp-form-content">${empFormStep0()}</div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" id="emp-form-back" onclick="empFormBack()" style="display:none">← Back</button>
          <div style="flex:1"></div>
          <button class="btn btn-secondary" onclick="closeModal('add-emp-modal')">Cancel</button>
          <button class="btn btn-primary" id="emp-form-next" onclick="empFormNext()">Continue →</button>
        </div>
      </div>
    </div>

    <!-- Employee Detail Modal -->
    <div class="modal-backdrop" id="emp-detail-modal">
      <div class="modal modal-xl" id="emp-detail-body"></div>
    </div>
  `;
}

/* ── Employee Card V2 ── */
function buildEmpView(emps) {
  if (!emps.length) return `
    <div class="empty-state">
      <div class="empty-state-icon">
        <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
      </div>
      <h3>No employees found</h3>
      <p>Try adjusting your search or filters</p>
      <button class="btn btn-primary" onclick="resetEmpFilters()">Clear Filters</button>
    </div>`;

  if (empView === 'grid') {
    return `<div class="grid-auto">${emps.map(e=>buildEmpCardV2(e)).join('')}</div>`;
  }
  return buildEmpTable(emps);
}

function buildEmpCardV2(e) {
  const bannerColors = {
    '#2563EB':'linear-gradient(135deg,#2563EB,#1D4ED8)',
    '#7C3AED':'linear-gradient(135deg,#7C3AED,#6D28D9)',
    '#059669':'linear-gradient(135deg,#059669,#047857)',
    '#F97316':'linear-gradient(135deg,#F97316,#EA580C)',
    '#DC2626':'linear-gradient(135deg,#DC2626,#B91C1C)',
    '#0891B2':'linear-gradient(135deg,#0891B2,#0E7490)',
    '#9333EA':'linear-gradient(135deg,#9333EA,#7E22CE)',
    '#EA580C':'linear-gradient(135deg,#EA580C,#C2410C)'
  };
  const bg = bannerColors[e.color] || `linear-gradient(135deg,${e.color},${e.color})`;
  return `
    <div class="emp-card-v2" onclick="viewEmployeeModal('${e.id}')">
      <div class="emp-card-v2-banner" style="background:${bg}">
        <div style="position:absolute;top:8px;right:8px">
          <span class="badge ${e.status==='active'?'badge-green':'badge-gray'} badge-dot" style="font-size:10px;border:1px solid rgba(255,255,255,0.3)">${e.status}</span>
        </div>
        <div class="emp-card-v2-avatar" style="background:${bg}">${e.initials}</div>
      </div>
      <div class="emp-card-v2-body">
        <div class="emp-card-v2-name">${e.name}</div>
        <div class="emp-card-v2-role">${e.role}</div>
        <div class="emp-card-v2-dept">${e.dept}</div>
        <div style="font-size:11px;color:var(--gray-400);margin-top:4px">
          <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="vertical-align:middle"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${e.location}
        </div>
      </div>
      <div class="emp-card-v2-meta">
        <div class="emp-card-v2-meta-item">
          <span class="emp-card-v2-meta-val">${e.id}</span>
          <span class="emp-card-v2-meta-lbl">ID</span>
        </div>
        <div class="emp-card-v2-meta-item">
          <span class="emp-card-v2-meta-val">₹${Math.round(e.salary/1000)}K</span>
          <span class="emp-card-v2-meta-lbl">Salary</span>
        </div>
        <div class="emp-card-v2-meta-item">
          <span class="emp-card-v2-meta-val">${yrsExperience(e.joinDate)}</span>
          <span class="emp-card-v2-meta-lbl">Years</span>
        </div>
      </div>
    </div>`;
}

function buildEmpTable(emps) {
  return `
    <div class="card">
      <div class="table-container">
        <table class="data-table table-modern">
          <thead>
            <tr>
              <th class="sortable">Employee</th>
              <th class="sortable">Department</th>
              <th class="sortable">Designation</th>
              <th>Type</th>
              <th>Location</th>
              <th class="sortable">Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${emps.map(e=>`
              <tr>
                <td>
                  <div class="emp-cell">
                    <div class="emp-avatar" style="background:${e.color}">${e.initials}</div>
                    <div>
                      <div class="emp-name">${e.name}</div>
                      <div class="emp-id">${e.id} · ${e.email}</div>
                    </div>
                  </div>
                </td>
                <td><span style="font-size:13px">${e.dept}</span></td>
                <td><span style="font-size:13px">${e.role}</span></td>
                <td><span class="badge badge-gray">${e.type}</span></td>
                <td>
                  <div style="display:flex;align-items:center;gap:4px;font-size:12px;color:var(--gray-500)">
                    <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    ${e.location}
                  </div>
                </td>
                <td><span style="font-weight:700;color:var(--gray-800)">₹${(e.salary/1000).toFixed(0)}K</span></td>
                <td>${statusBadge(e.status)}</td>
                <td>
                  <div class="actions action-btn">
                    <button class="btn btn-outline btn-sm" onclick="viewEmployeeModal('${e.id}')">View</button>
                    <button class="btn-icon" onclick="showToast('Editing ${e.name}…')" title="Edit">
                      <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div class="card-footer" style="display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:13px;color:var(--gray-400)">Showing ${emps.length} of ${WP.employees.length} employees</span>
        <div style="display:flex;gap:4px">
          ${[1,2,3,'…',26].map(p=>`<button class="btn ${p===1?'btn-primary':'btn-secondary'} btn-sm" onclick="showToast('Page ${p}')">${p}</button>`).join('')}
        </div>
      </div>
    </div>`;
}

function viewEmployeeModal(id) {
  const emp = WP.employees.find(e=>e.id===id);
  if (!emp) return;
  const bg = `linear-gradient(135deg,${emp.color},${emp.color}bb)`;
  document.getElementById('emp-detail-body').innerHTML = `
    <div style="position:relative">
      <!-- Header -->
      <div style="background:${bg};padding:32px 32px 60px;border-radius:var(--border-radius-lg) var(--border-radius-lg) 0 0;position:relative;overflow:hidden">
        <div style="position:absolute;top:-40px;right:-40px;width:200px;height:200px;background:rgba(255,255,255,0.06);border-radius:50%"></div>
        <button class="modal-close" onclick="closeModal('emp-detail-modal')" style="position:absolute;top:16px;right:16px;color:rgba(255,255,255,0.7);background:rgba(255,255,255,0.1);border-radius:8px;padding:6px">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div style="display:flex;align-items:center;gap:20px;position:relative;z-index:1">
          <div style="width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;color:white;border:3px solid rgba(255,255,255,0.3);flex-shrink:0">${emp.initials}</div>
          <div>
            <h2 style="font-size:22px;font-weight:800;color:white">${emp.name}</h2>
            <p style="font-size:13px;color:rgba(255,255,255,0.75);margin-top:4px">${emp.role} · ${emp.dept}</p>
            <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
              <span style="font-size:11px;padding:3px 10px;background:rgba(255,255,255,0.15);color:white;border-radius:12px;font-weight:600">${emp.id}</span>
              <span style="font-size:11px;padding:3px 10px;background:rgba(255,255,255,0.15);color:white;border-radius:12px;font-weight:600">${emp.type}</span>
              <span style="font-size:11px;padding:3px 10px;background:rgba(255,255,255,0.15);color:white;border-radius:12px;font-weight:600">📍 ${emp.location}</span>
              ${statusBadge(emp.status)}
            </div>
          </div>
          <div style="margin-left:auto;display:flex;gap:8px">
            <button class="btn-hero-ghost" onclick="showToast('Editing ${emp.name}…','success')">Edit Profile</button>
            <button class="btn-hero-ghost" onclick="showToast('Downloading profile PDF…','success')">⬇ PDF</button>
          </div>
        </div>
      </div>
      <!-- Quick stats bar -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);background:white;border:1px solid var(--gray-200);border-top:none;border-radius:0 0 0 0;margin:0 32px;position:relative;z-index:2;top:-1px">
        ${[
          {label:'Gross Salary', val:'₹'+emp.salary.toLocaleString()},
          {label:'Joining Date', val:formatDate(emp.joinDate)},
          {label:'Experience', val:yrsExperience(emp.joinDate)+' years'},
          {label:'Reports To', val:emp.manager}
        ].map((s,i)=>`
          <div style="padding:14px 20px;${i<3?'border-right:1px solid var(--gray-100)':''}">
            <div style="font-size:11px;color:var(--gray-400);text-transform:uppercase;letter-spacing:.06em;font-weight:600">${s.label}</div>
            <div style="font-size:14px;font-weight:700;color:var(--gray-800);margin-top:3px">${s.val}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Tabs -->
    <div style="padding:20px 32px 0">
      <div class="tab-bar">
        <div class="tab-btn active" onclick="switchEmpDetailTab(this,'edt-info')">Info</div>
        <div class="tab-btn" onclick="switchEmpDetailTab(this,'edt-attendance')">Attendance</div>
        <div class="tab-btn" onclick="switchEmpDetailTab(this,'edt-payroll')">Payroll</div>
        <div class="tab-btn" onclick="switchEmpDetailTab(this,'edt-docs')">Documents</div>
      </div>
    </div>

    <!-- Info Tab -->
    <div id="edt-info" class="tab-content active" style="padding:20px 32px 28px">
      <div class="grid grid-3" style="gap:24px">
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--gray-400);text-transform:uppercase;letter-spacing:.06em;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid var(--primary-muted)">📋 Personal Details</div>
          ${infoRow('Email', emp.email)}
          ${infoRow('Phone', emp.phone)}
          ${infoRow('Location', emp.location)}
          ${infoRow('Date of Joining', formatDate(emp.joinDate))}
        </div>
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--gray-400);text-transform:uppercase;letter-spacing:.06em;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid var(--primary-muted)">🏢 Work Details</div>
          ${infoRow('Department', emp.dept)}
          ${infoRow('Designation', emp.role)}
          ${infoRow('Employee Type', emp.type)}
          ${infoRow('Reporting Manager', emp.manager)}
        </div>
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--gray-400);text-transform:uppercase;letter-spacing:.06em;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid var(--primary-muted)">💰 Compensation</div>
          ${infoRow('Gross Salary', '₹' + emp.salary.toLocaleString())}
          ${infoRow('PF Deduction', '₹' + Math.round(emp.salary * 0.12).toLocaleString())}
          ${infoRow('TDS (Est.)', '₹' + Math.round(emp.salary * 0.05).toLocaleString())}
          ${infoRow('Net Take-Home', '₹' + Math.round(emp.salary * 0.83).toLocaleString())}
        </div>
      </div>
    </div>

    <!-- Attendance Tab -->
    <div id="edt-attendance" class="tab-content" style="padding:20px 32px 28px">
      <div class="grid grid-2" style="gap:20px">
        <div>
          <div style="font-size:13px;font-weight:600;color:var(--gray-500);margin-bottom:12px">June 2025</div>
          <div class="attendance-calendar">
            ${['S','M','T','W','T','F','S'].map(d=>`<div class="cal-header-cell">${d}</div>`).join('')}
            ${Array(6).fill(0).map(()=>'<div class="cal-day empty"></div>').join('')}
            ${Array.from({length:30},(_,i)=>{
              const types=['P','P','P','P','P','W','W','P','P','P','P','P','W','W','H','P','P','P','P','P','W','W','P','P','P','P','P','W','W','P'];
              const t=types[i]; const d=i+1;
              const cls=t==='P'?'present':t==='W'?'weekend':t==='H'?'absent':'present';
              return `<div class="cal-day ${cls}${d===13?' today':''}">${d}</div>`;
            }).join('')}
          </div>
        </div>
        <div>
          <div style="font-size:13px;font-weight:600;color:var(--gray-500);margin-bottom:12px">This Month Summary</div>
          <div class="grid grid-2" style="gap:10px">
            ${[{l:'Present',v:21,c:'var(--success)'},{l:'Absent',v:1,c:'var(--danger)'},{l:'Late',v:0,c:'var(--warning)'},{l:'On Leave',v:0,c:'var(--accent)'}].map(s=>`
              <div style="padding:14px;background:var(--gray-50);border-radius:10px;text-align:center">
                <div style="font-size:24px;font-weight:800;color:${s.c}">${s.v}</div>
                <div style="font-size:11px;color:var(--gray-500);margin-top:3px">${s.l}</div>
              </div>
            `).join('')}
          </div>
          <div style="margin-top:14px">
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:5px">
              <span style="color:var(--gray-500)">Attendance Rate</span>
              <strong>95.5%</strong>
            </div>
            <div class="progress-bar" style="height:8px">
              <div class="progress-fill success" style="width:95.5%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payroll Tab -->
    <div id="edt-payroll" class="tab-content" style="padding:20px 32px 28px">
      <div class="grid grid-2" style="gap:16px">
        ${['Jun 2025','May 2025','Apr 2025','Mar 2025'].map((m,i)=>`
          <div style="border:1px solid var(--gray-200);border-radius:10px;overflow:hidden">
            <div style="background:var(--gray-50);padding:10px 16px;display:flex;justify-content:space-between;align-items:center">
              <span style="font-size:13px;font-weight:700">${m}</span>
              ${i===0?'<span class="badge badge-yellow">Pending</span>':'<span class="badge badge-green">Disbursed</span>'}
            </div>
            <div style="padding:12px 16px">
              ${[['Gross','₹'+(emp.salary+emp.salary*.25).toLocaleString()],['Deductions','-₹'+Math.round(emp.salary*.17).toLocaleString()],['Net','₹'+Math.round(emp.salary*.83).toLocaleString()]].map(([k,v])=>`
                <div style="display:flex;justify-content:space-between;font-size:12px;padding:4px 0">
                  <span style="color:var(--gray-500)">${k}</span>
                  <span style="font-weight:700;color:${k==='Net'?'var(--primary)':k==='Deductions'?'var(--danger)':'var(--gray-700)'}">${v}</span>
                </div>
              `).join('')}
              <button class="btn btn-outline btn-sm" style="width:100%;margin-top:8px;font-size:11px" onclick="showToast('Downloading payslip for ${m}…','success')">⬇ Download Payslip</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Documents Tab -->
    <div id="edt-docs" class="tab-content" style="padding:20px 32px 28px">
      <div class="grid-auto-sm">
        ${['Offer Letter','Employment Contract','PAN Card','Aadhaar Card','Bank Details','Form 16','Appraisal Letter','NDA Agreement'].map(d=>`
          <div onclick="showToast('Downloading ${d}…','success')" style="padding:16px;background:var(--gray-50);border:1px solid var(--gray-200);border-radius:10px;text-align:center;cursor:pointer;transition:var(--transition)" onmouseover="this.style.borderColor='var(--primary)';this.style.background='var(--primary-light)'" onmouseout="this.style.borderColor='var(--gray-200)';this.style.background='var(--gray-50)'">
            <div style="font-size:28px;margin-bottom:8px">📄</div>
            <div style="font-size:12px;font-weight:600;color:var(--gray-700)">${d}</div>
            <div style="font-size:10px;color:var(--gray-400);margin-top:3px">PDF · Click to download</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  openModal('emp-detail-modal');
}

function switchEmpDetailTab(btn, tabId) {
  btn.closest('.tab-bar').querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#edt-info,#edt-attendance,#edt-payroll,#edt-docs').forEach(t=>t.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

/* ── Add Employee Stepper ── */
let empFormStep = 0;
function empFormStep0() {
  return `
    <div class="form-row cols-2" style="margin-bottom:14px">
      <div class="form-group"><label class="form-label">First Name *</label><input type="text" class="form-control" placeholder="Raj"/></div>
      <div class="form-group"><label class="form-label">Last Name *</label><input type="text" class="form-control" placeholder="Sharma"/></div>
    </div>
    <div class="form-row cols-2" style="margin-bottom:14px">
      <div class="form-group"><label class="form-label">Email *</label><input type="email" class="form-control" placeholder="raj@company.com"/></div>
      <div class="form-group"><label class="form-label">Mobile *</label><input type="tel" class="form-control" placeholder="+91 XXXXX XXXXX"/></div>
    </div>
    <div class="form-row cols-3" style="margin-bottom:14px">
      <div class="form-group"><label class="form-label">Date of Birth</label><input type="date" class="form-control"/></div>
      <div class="form-group"><label class="form-label">Gender</label><select class="form-control"><option>Male</option><option>Female</option><option>Other</option></select></div>
      <div class="form-group"><label class="form-label">Blood Group</label><select class="form-control"><option>A+</option><option>B+</option><option>O+</option><option>AB+</option></select></div>
    </div>
    <div class="form-group"><label class="form-label">Permanent Address</label><textarea class="form-control" rows="2" placeholder="Street, City, State, PIN"></textarea></div>`;
}
function empFormStep1() {
  return `
    <div class="form-row cols-2" style="margin-bottom:14px">
      <div class="form-group"><label class="form-label">Department *</label><select class="form-control">${WP.departments.map(d=>`<option>${d.name}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Designation *</label><input type="text" class="form-control" placeholder="Software Engineer"/></div>
    </div>
    <div class="form-row cols-3" style="margin-bottom:14px">
      <div class="form-group"><label class="form-label">Employee Type</label><select class="form-control"><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Intern</option></select></div>
      <div class="form-group"><label class="form-label">Date of Joining *</label><input type="date" class="form-control"/></div>
      <div class="form-group"><label class="form-label">Work Location</label><select class="form-control"><option>Mumbai</option><option>Pune</option><option>Delhi</option><option>Bengaluru</option><option>Remote</option></select></div>
    </div>
    <div class="form-row cols-2">
      <div class="form-group"><label class="form-label">Reporting Manager</label><select class="form-control">${WP.employees.map(e=>`<option>${e.name}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Work Mode</label><select class="form-control"><option>Office</option><option>Remote</option><option>Hybrid</option></select></div>
    </div>`;
}
function empFormStep2() {
  return `
    <div class="form-row cols-2" style="margin-bottom:14px">
      <div class="form-group"><label class="form-label">Gross Salary (₹/month) *</label><input type="number" class="form-control" placeholder="75000"/></div>
      <div class="form-group"><label class="form-label">Pay Structure</label><select class="form-control"><option>Standard Structure</option><option>Senior Structure</option><option>Executive Structure</option></select></div>
    </div>
    <div class="form-row cols-3" style="margin-bottom:14px">
      <div class="form-group"><label class="form-label">PAN Number</label><input type="text" class="form-control" placeholder="ABCDE1234F"/></div>
      <div class="form-group"><label class="form-label">Aadhaar Number</label><input type="text" class="form-control" placeholder="XXXX XXXX XXXX"/></div>
      <div class="form-group"><label class="form-label">PF Account</label><input type="text" class="form-control" placeholder="Auto-generated"/></div>
    </div>
    <div class="form-row cols-2">
      <div class="form-group"><label class="form-label">Bank Account No.</label><input type="text" class="form-control" placeholder="Account number"/></div>
      <div class="form-group"><label class="form-label">IFSC Code</label><input type="text" class="form-control" placeholder="HDFC0001234"/></div>
    </div>`;
}
function empFormStep3() {
  return `
    <div class="form-row cols-2" style="margin-bottom:14px">
      <div class="form-group"><label class="form-label">Portal Access Role</label><select class="form-control">${WP.roles.map(r=>`<option>${r.name}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Login Email</label><input type="email" class="form-control" placeholder="Will be same as employee email"/></div>
    </div>
    <div style="padding:16px;background:var(--primary-light);border:1px solid var(--primary-muted);border-radius:10px;margin-bottom:16px">
      <div style="font-size:13px;font-weight:700;color:var(--primary);margin-bottom:8px">📧 Welcome Email</div>
      <div style="font-size:12px;color:var(--gray-600)">A welcome email with login credentials will be sent to the employee. They can set their password via the link.</div>
      <label class="checkbox-label" style="margin-top:10px;font-size:13px"><input type="checkbox" checked/> Send welcome email on creation</label>
    </div>
    <div style="padding:14px 16px;background:var(--success-light);border:1px solid rgba(16,185,129,0.3);border-radius:10px">
      <div style="font-size:13px;font-weight:700;color:var(--success);margin-bottom:6px">✅ Ready to Create</div>
      <div style="font-size:12px;color:var(--gray-600)">Review all details in previous steps before submitting. Employee ID will be auto-generated.</div>
    </div>`;
}
const empStepFns = [empFormStep0, empFormStep1, empFormStep2, empFormStep3];
function empFormNext() {
  if (empFormStep < 3) {
    empFormStep++;
    updateEmpForm();
  } else {
    closeModal('add-emp-modal');
    empFormStep = 0;
    showToast('Employee added successfully! Welcome email sent.', 'success');
  }
}
function empFormBack() {
  if (empFormStep > 0) { empFormStep--; updateEmpForm(); }
}
function updateEmpForm() {
  document.getElementById('emp-form-content').innerHTML = empStepFns[empFormStep]();
  document.querySelectorAll('[id^=empstep-]').forEach((el,i)=>{
    el.classList.remove('active','done');
    if (i < empFormStep) el.classList.add('done');
    if (i === empFormStep) el.classList.add('active');
    const c = el.querySelector('.step-circle');
    if (c) c.textContent = i < empFormStep ? '✓' : i+1;
  });
  const back = document.getElementById('emp-form-back');
  const next = document.getElementById('emp-form-next');
  if (back) back.style.display = empFormStep > 0 ? 'flex' : 'none';
  if (next) next.textContent = empFormStep === 3 ? '✓ Create Employee' : 'Continue →';
}

/* ── Filters ── */
function filterEmployees(q) { empFilter.search = q.toLowerCase(); applyEmpFilters(); }
function filterByDept(v) { empFilter.dept = v; applyEmpFilters(); }
function filterByStatus(v) { empFilter.status = v; applyEmpFilters(); }
function resetEmpFilters() {
  empFilter = { dept:'all', status:'all', search:'' };
  document.getElementById('emp-search-input').value = '';
  applyEmpFilters();
}
function applyEmpFilters() {
  const filtered = WP.employees.filter(e=>{
    const ms = !empFilter.search || e.name.toLowerCase().includes(empFilter.search) || e.id.toLowerCase().includes(empFilter.search) || e.role.toLowerCase().includes(empFilter.search) || e.email.toLowerCase().includes(empFilter.search);
    const md = empFilter.dept==='all' || e.dept===empFilter.dept;
    const mst = empFilter.status==='all' || e.status===empFilter.status;
    return ms && md && mst;
  });
  const lbl = document.getElementById('emp-count-label');
  if (lbl) lbl.textContent = `Showing ${filtered.length} of ${WP.employees.length} employees${filtered.length<WP.employees.length?' (filtered)':''}`;
  const c = document.getElementById('emp-container');
  if (c) c.innerHTML = buildEmpView(filtered);
}
function setEmpView(v) {
  empView = v;
  document.getElementById('btn-grid').className = `btn ${v==='grid'?'btn-primary':'btn-secondary'} btn-sm`;
  document.getElementById('btn-list').className = `btn ${v==='list'?'btn-primary':'btn-secondary'} btn-sm`;
  applyEmpFilters();
}
function yrsExperience(joinDate) {
  const yrs = (Date.now() - new Date(joinDate)) / (1000*60*60*24*365);
  return yrs < 1 ? '<1' : Math.floor(yrs).toString();
}
function exportEmployees() {
  showToast('Generating Excel export for 248 employees…', 'success');
  setTimeout(()=>showToast('Export ready! Download started.','success'), 1800);
}
