/* ===== WorkPilot HR — Payroll Processing Module ===== */

function renderPayroll(container) {
  const p = WP.payroll;
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Payroll Processing</h1>
        <p>June 2025 · ${p.summary.processed} employees processed</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-secondary" onclick="showToast('Downloading payroll register…','success')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export Register
        </button>
        <button class="btn btn-primary" onclick="openModal('run-payroll-modal')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Run Payroll
        </button>
      </div>
    </div>

    <!-- Payroll Run Banner -->
    <div class="payroll-run-banner">
      <div>
        <h3>June 2025 Payroll</h3>
        <p>Process payroll for ${p.summary.processed} employees · Pending: ${p.summary.pendingApprovals} approvals</p>
      </div>
      <div class="payroll-run-actions">
        <button class="btn-run-payroll" onclick="openModal('run-payroll-modal')">▶ Process Payroll</button>
        <button style="background:rgba(255,255,255,0.15);color:white;padding:10px 16px;border-radius:8px;font-size:13px;font-weight:600;border:1px solid rgba(255,255,255,0.2)" onclick="showToast('Generating payslips…','success')">📄 Generate Payslips</button>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-4" style="margin-bottom:24px">
      <div class="stat-card success">
        <div class="stat-icon green"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
        <div class="stat-body">
          <div class="stat-label">Total Payroll</div>
          <div class="stat-value">₹28.4L</div>
          <div class="stat-change up"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>+1.9% <span>vs last month</span></div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
        <div class="stat-body">
          <div class="stat-label">Employees Processed</div>
          <div class="stat-value">${p.summary.processed}</div>
          <div class="stat-change"><span>of 248 total</span></div>
        </div>
      </div>
      <div class="stat-card warning">
        <div class="stat-icon yellow"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
        <div class="stat-body">
          <div class="stat-label">Pending Approvals</div>
          <div class="stat-value">${p.summary.pendingApprovals}</div>
          <div class="stat-change"><span>requires action</span></div>
        </div>
      </div>
      <div class="stat-card danger">
        <div class="stat-icon red"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg></div>
        <div class="stat-body">
          <div class="stat-label">Total Deductions</div>
          <div class="stat-value">₹4.2L</div>
          <div class="stat-change"><span>PF + ESI + TDS</span></div>
        </div>
      </div>
    </div>

    <div class="grid" style="grid-template-columns:2fr 1fr;gap:20px">
      <!-- Payroll Register Table -->
      <div>
        <div class="card">
          <div class="card-header">
            <div class="card-title">Payroll Register — June 2025</div>
            <div style="display:flex;gap:8px">
              <div class="filter-search" style="max-width:200px;height:36px">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" placeholder="Search…" style="border:none;background:transparent;font-size:13px;outline:none"/>
              </div>
              <select class="form-control" style="width:130px;height:36px">
                <option>All Status</option><option>Processed</option><option>Pending</option><option>On Hold</option>
              </select>
            </div>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr><th>Employee</th><th>Basic</th><th>HRA</th><th>Allowances</th><th>Deductions</th><th>Net Salary</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                ${p.employees.map(e => `
                  <tr>
                    <td>
                      <div class="emp-cell">
                        <div class="emp-avatar" style="background:${avatarColors(e.initials)}">${e.initials}</div>
                        <div>
                          <div class="emp-name">${e.name}</div>
                          <div class="emp-id">${e.dept}</div>
                        </div>
                      </div>
                    </td>
                    <td>₹${(e.basic/1000).toFixed(0)}K</td>
                    <td>₹${(e.hra/1000).toFixed(1)}K</td>
                    <td>₹${(e.allowances/1000).toFixed(1)}K</td>
                    <td style="color:var(--danger);font-weight:600">-₹${(e.deductions/1000).toFixed(1)}K</td>
                    <td style="font-weight:700;color:var(--success)">₹${(e.netSalary/1000).toFixed(1)}K</td>
                    <td>${statusBadge(e.status)}</td>
                    <td>
                      <div class="actions">
                        <button class="btn-icon" onclick="viewPayslip('${e.id}')" title="View Payslip">
                          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                        <button class="btn-icon" onclick="showToast('Downloading payslip for ${e.name}','success')" title="Download">
                          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Payroll History -->
        <div class="card" style="margin-top:20px">
          <div class="card-header">
            <div class="card-title">Payroll History</div>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead><tr><th>Month</th><th>Total Amount</th><th>Employees</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                ${p.history.map(h => `
                  <tr>
                    <td style="font-weight:600">${h.month}</td>
                    <td style="font-weight:700">₹${(h.total/100000).toFixed(2)}L</td>
                    <td>${h.employees}</td>
                    <td>${statusBadge(h.status)}</td>
                    <td><button class="btn btn-ghost btn-sm" onclick="showToast('Downloading ${h.month} register','success')">Download</button></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Payroll Chart + Summary -->
      <div>
        <div class="card" style="margin-bottom:20px">
          <div class="card-header"><div class="card-title">Payroll Trend</div></div>
          <div class="card-body">
            <div class="chart-wrap" style="height:200px"><canvas id="payrollChart"></canvas></div>
          </div>
        </div>

        <!-- Statutory Compliance -->
        <div class="card" style="margin-bottom:20px">
          <div class="card-header"><div class="card-title">Statutory Components</div></div>
          <div class="card-body" style="padding:0">
            ${[
              { label: 'PF (Employer 12%)', val: '₹2,84,400', color: '#2563EB' },
              { label: 'ESI (Employer 3.25%)', val: '₹72,150', color: '#059669' },
              { label: 'Professional Tax', val: '₹12,400', color: '#9333EA' },
              { label: 'TDS (Estimated)', val: '₹1,42,250', color: '#DC2626' }
            ].map(s => `
              <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 20px;border-bottom:1px solid var(--gray-50)">
                <div style="display:flex;align-items:center;gap:8px">
                  <div style="width:8px;height:8px;border-radius:50%;background:${s.color}"></div>
                  <span style="font-size:13px;color:var(--gray-700)">${s.label}</span>
                </div>
                <span style="font-size:13px;font-weight:700;color:${s.color}">${s.val}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- CTC Breakdown -->
        <div class="card">
          <div class="card-header"><div class="card-title">CTC Breakdown</div></div>
          <div class="card-body">
            <div class="chart-wrap" style="height:200px"><canvas id="ctcChart"></canvas></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payslip Modal -->
    <div class="modal-backdrop" id="payslip-modal">
      <div class="modal" id="payslip-content">
        <!-- dynamically filled -->
      </div>
    </div>

    <!-- Run Payroll Modal -->
    <div class="modal-backdrop" id="run-payroll-modal">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-icon green"><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
          <div class="modal-header-text">
            <div class="modal-title">Run June 2025 Payroll</div>
            <div class="modal-subtitle">Process payroll for all 248 active employees</div>
          </div>
          <button class="modal-close" onclick="closeModal('run-payroll-modal')">✕</button>
        </div>
        <div class="modal-body">
          <div style="background:var(--warning-light);border:1px solid var(--warning);border-radius:8px;padding:14px;margin-bottom:16px;display:flex;gap:10px;align-items:flex-start">
            <span style="font-size:18px">⚠️</span>
            <div style="font-size:13px;color:#92400E">Please verify all attendance and leave records before processing payroll. This action cannot be undone once approved.</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${[['Pay Period','June 1–30, 2025'],['Employees','248 Active'],['Estimated Total','₹28,45,000'],['Pay Date','30 Jun 2025'],['Payment Mode','NEFT/Bank Transfer']].map(([k,v])=>`
              <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--gray-100);font-size:13px">
                <span style="color:var(--gray-500)">${k}</span>
                <span style="font-weight:600">${v}</span>
              </div>
            `).join('')}
          </div>
          <label class="checkbox-label" style="margin-top:16px;font-size:13px;color:var(--gray-700)">
            <input type="checkbox" id="payroll-confirm"/> I confirm all data is verified and authorize payroll processing
          </label>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('run-payroll-modal')">Cancel</button>
          <button class="btn btn-success" onclick="processPayroll()">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Process Payroll
          </button>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    initPayrollCharts();
  }, 100);
}

function viewPayslip(empId) {
  const emp = WP.payroll.employees.find(e => e.id === empId) || WP.payroll.employees[0];
  document.getElementById('payslip-content').innerHTML = `
    <div class="payslip-card" style="border:none">
      <div class="payslip-header">
        <div>
          <div class="payslip-brand">🏢 ${WP.currentUser.company}</div>
          <div class="payslip-period" style="color:var(--gray-400);font-size:12px;margin-top:2px">Payslip for June 2025</div>
        </div>
        <button class="modal-close" onclick="closeModal('payslip-modal')" style="color:var(--gray-400)">✕</button>
      </div>
      <div class="payslip-body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;padding:16px;background:var(--gray-50);border-radius:8px">
          ${[['Employee',''+emp.name],['Employee ID',empId],['Designation',emp.designation],['Department',emp.dept],['Pay Period','Jun 1–30, 2025'],['Pay Date','30 Jun 2025']].map(([k,v])=>`
            <div><div style="font-size:11px;color:var(--gray-400);text-transform:uppercase;font-weight:600">${k}</div><div style="font-size:13px;font-weight:600;color:var(--gray-800);margin-top:2px">${v}</div></div>
          `).join('')}
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
          <div class="payslip-section">
            <h4>Earnings</h4>
            ${[['Basic Salary','₹'+emp.basic.toLocaleString()],['HRA','₹'+emp.hra.toLocaleString()],['Medical Allowance','₹1,500'],['Conveyance','₹1,600'],['Special Allowance','₹'+(emp.allowances-3100).toLocaleString()]].map(([l,v])=>`<div class="payslip-row"><span class="label">${l}</span><span class="value">${v}</span></div>`).join('')}
            <div class="payslip-row" style="border-top:1px solid var(--gray-200);margin-top:4px;padding-top:8px">
              <span class="label" style="font-weight:700">Gross Earnings</span>
              <span class="value" style="font-weight:800">₹${(emp.basic+emp.hra+emp.allowances).toLocaleString()}</span>
            </div>
          </div>
          <div class="payslip-section">
            <h4>Deductions</h4>
            ${[['Provident Fund (12%)','₹'+Math.round(emp.basic*0.12).toLocaleString()],['ESI (0.75%)','₹'+Math.round((emp.basic+emp.hra)*0.0075).toLocaleString()],['Professional Tax','₹200'],['TDS','₹'+Math.round(emp.deductions*0.4).toLocaleString()]].map(([l,v])=>`<div class="payslip-row"><span class="label">${l}</span><span class="value deduction">-${v}</span></div>`).join('')}
            <div class="payslip-row" style="border-top:1px solid var(--gray-200);margin-top:4px;padding-top:8px">
              <span class="label" style="font-weight:700">Total Deductions</span>
              <span class="value deduction" style="font-weight:800">-₹${emp.deductions.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div class="payslip-total">
          <span class="label">💰 Net Take Home Pay</span>
          <span class="value">₹${emp.netSalary.toLocaleString()}</span>
        </div>
      </div>
      <div style="padding:16px 24px;display:flex;gap:8px;justify-content:flex-end;border-top:1px solid var(--gray-100)">
        <button class="btn btn-secondary" onclick="closeModal('payslip-modal')">Close</button>
        <button class="btn btn-secondary" onclick="printPayslip()">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Print
        </button>
        <button class="btn btn-primary" onclick="showToast('Downloading payslip PDF…','success')">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download PDF
        </button>
      </div>
    </div>
  `;
  openModal('payslip-modal');
}

function processPayroll() {
  const cb = document.getElementById('payroll-confirm');
  if (!cb || !cb.checked) { showToast('Please confirm before processing.', 'warning'); return; }
  closeModal('run-payroll-modal');
  launchConfetti();
  showToast('🎉 Payroll processed for 248 employees!', 'success');
  setTimeout(()=>showToast('Payslips are being generated…','success'), 1500);
  setTimeout(()=>showToast('Bank transfer initiated via NEFT!','success'), 3000);
}

function initPayrollCharts() {
  const pCtx = document.getElementById('payrollChart');
  if (pCtx) {
    new Chart(pCtx, {
      type: 'line',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun'],
        datasets: [{
          label: 'Payroll (₹L)',
          data: [26.8, 26.95, 27.2, 27.51, 27.9, 28.45],
          borderColor: '#059669',
          backgroundColor: 'rgba(5,150,105,0.08)',
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#059669',
          pointRadius: 4
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 11 } } },
          y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { family: 'Inter', size: 11 }, callback: v => '₹'+v+'L' } }
        }
      }
    });
  }
  const cCtx = document.getElementById('ctcChart');
  if (cCtx) {
    new Chart(cCtx, {
      type: 'doughnut',
      data: {
        labels: ['Basic', 'HRA', 'Allowances', 'Deductions'],
        datasets: [{
          data: [50, 20, 15, 15],
          backgroundColor: ['#2563EB', '#10B981', '#F97316', '#EF4444'],
          borderWidth: 2,
          borderColor: 'white'
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { font: { family: 'Inter', size: 11 }, usePointStyle: true } } },
        cutout: '65%'
      }
    });
  }
}

function printPayslip() {
  const content = document.getElementById('payslip-content');
  if (!content) return;
  const w = window.open('', '_blank', 'width=700,height=900');
  w.document.write(`<!DOCTYPE html><html><head><title>Payslip — WorkPilot HR</title>
    <style>
      body{font-family:Inter,sans-serif;color:#1E293B;margin:0;padding:24px;font-size:13px}
      .header{background:#0F172A;color:white;padding:20px 24px;border-radius:8px 8px 0 0}
      .brand{font-size:18px;font-weight:800}
      .period{font-size:12px;opacity:.6;margin-top:2px}
      .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:16px 24px;background:#F8FAFC}
      .info-item label{font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#94A3B8;font-weight:700}
      .info-item span{display:block;font-size:13px;font-weight:700;margin-top:2px}
      .cols{display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:16px 24px}
      h4{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#64748B;font-weight:700;margin:0 0 10px}
      .row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #F1F5F9;font-size:12px}
      .row .lbl{color:#64748B}
      .row .val{font-weight:600}
      .row .ded{color:#EF4444;font-weight:600}
      .net{background:linear-gradient(135deg,#2563EB,#7C3AED);border-radius:8px;padding:14px 20px;display:flex;justify-content:space-between;align-items:center;margin:16px 24px}
      .net .lbl{font-size:13px;font-weight:700;color:rgba(255,255,255,.8)}
      .net .val{font-size:22px;font-weight:800;color:white}
      .footer{text-align:center;padding:14px;color:#94A3B8;font-size:11px;border-top:1px solid #E2E8F0;margin-top:16px}
    </style></head><body>${content.innerHTML}</body></html>`);
  w.document.close();
  setTimeout(()=>w.print(), 500);
}
