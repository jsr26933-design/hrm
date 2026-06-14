/* ===== WorkPilot HR — Leave Management Sub-Modules ===== */

// Initialize global leave stores if not already present on WP
if (!WP.leaves) {
  WP.leaves = {
    balances: [
      { type: 'Casual Leave', available: 5, total: 10, used: 5, color: '#2563EB', carry: 'No', encash: 'No', advance: 'Yes', desc: 'For personal emergencies and casual purposes' },
      { type: 'Sick Leave', available: 8, total: 12, used: 4, color: '#059669', carry: 'No', encash: 'No', advance: 'No', desc: 'For medical illness with or without medical certificate' },
      { type: 'Earned Leave', available: 15, total: 24, used: 9, color: '#F97316', carry: 'Yes (max 30)', encash: 'Yes', advance: 'Yes', desc: 'Earned @ 1 day per 11 working days' },
      { type: 'Maternity Leave', available: 90, total: 90, used: 0, color: '#9333EA', carry: 'No', encash: 'No', advance: 'Yes', desc: 'As per Maternity Benefits Act, 1961' }
    ],
    pending: [
      { id: 'LV001', empId: 'EMP002', empName: 'Priya Sharma', initials: 'PS', type: 'Casual Leave', from: '2026-06-15', to: '2026-06-17', days: 3, reason: 'Family function in home town', status: 'pending', applied: '2026-06-13' },
      { id: 'LV002', empId: 'EMP003', empName: 'Rahul Mehta', initials: 'RM', type: 'Sick Leave', from: '2026-06-14', to: '2026-06-14', days: 1, reason: 'Medical checkup appointment', status: 'pending', applied: '2026-06-13' },
      { id: 'LV003', empId: 'EMP010', empName: 'Neha Gupta', initials: 'NG', type: 'Earned Leave', from: '2026-06-20', to: '2026-06-27', days: 6, reason: 'Annual summer vacation', status: 'pending', applied: '2026-06-12' },
      { id: 'LV004', empId: 'EMP011', empName: 'Deepak Kumar', initials: 'DK', type: 'Casual Leave', from: '2026-06-16', to: '2026-06-16', days: 1, reason: 'Personal work at registrar office', status: 'pending', applied: '2026-06-13' },
      { id: 'LV005', empId: 'EMP012', empName: 'Pooja Iyer', initials: 'PI', type: 'Sick Leave', from: '2026-06-13', to: '2026-06-13', days: 1, reason: 'High fever and headache', status: 'approved', applied: '2026-06-12' }
    ]
  };
}

// Initialize Time/Hourly leave request store on WP
if (!WP.leaves.timeRequests) {
  WP.leaves.timeRequests = [
    { id: 'TL001', date: '2026-06-12', type: 'Late Arrival', startTime: '09:00 AM', endTime: '11:00 AM', duration: '2h 00m', reason: 'Dentist appointment', status: 'approved' },
    { id: 'TL002', date: '2026-06-05', type: 'Early Out', startTime: '03:30 PM', endTime: '06:00 PM', duration: '2h 30m', reason: 'Pick up parents from airport', status: 'approved' },
    { id: 'TL003', date: '2026-05-20', type: 'Short Permission', startTime: '11:30 AM', endTime: '01:30 PM', duration: '2h 00m', reason: 'Bank work for home loan', status: 'rejected' }
  ];
}

/* ─────────────────────────────────────────────────────────────────────────────
   1. LEAVE TYPES SECTION (Configuration / Policy overview)
   ───────────────────────────────────────────────────────────────────────────── */
function renderLeaveTypes(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Leave Types & Policies</h1>
        <p>Manage leave categories, standard allowances, and carry-forward settings</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="openModal('create-leave-type-modal')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Leave Type
        </button>
      </div>
    </div>

    <!-- Active Leave Types Grid -->
    <div class="grid grid-2" style="margin-bottom:24px">
      ${WP.leaves.balances.map(p => `
        <div class="card hover-lift" style="position: relative;">
          <div class="card-body" style="padding: 24px;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
              <div style="width:14px;height:14px;border-radius:50%;background:${p.color}"></div>
              <h3 style="font-size:16px;font-weight:700;color:var(--gray-800);margin:0">${p.type}</h3>
              <span class="badge" style="background:${p.color}22;color:${p.color};margin-left:auto;font-weight:700;font-size:12px;padding:4px 8px">${p.total} days/yr</span>
            </div>
            <p style="font-size:13px;color:var(--gray-500);margin-bottom:16px;line-height:1.5">${p.desc || 'No description provided.'}</p>
            
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; border-top:1px solid var(--gray-100); padding-top:14px;">
              ${infoCol('Carry Forward', p.carry)}
              ${infoCol('Encashable', p.encash)}
              ${infoCol('Advance Application', p.advance)}
              ${infoCol('Current Allocations', p.used + p.available + ' days')}
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Create Leave Type Modal -->
    <div class="modal-backdrop" id="create-leave-type-modal">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-icon orange">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </div>
          <div class="modal-header-text">
            <div class="modal-title">Create Leave Type</div>
            <div class="modal-subtitle">Add a new leave category to the system</div>
          </div>
          <button class="modal-close" onclick="closeModal('create-leave-type-modal')">✕</button>
        </div>
        <div class="modal-body" style="padding: 20px;">
          <form id="create-leavetype-form" onsubmit="submitCreateLeaveType(event)">
            <div class="form-group" style="margin-bottom:14px">
              <label class="form-label" style="font-weight:600;margin-bottom:4px;display:block;">Leave Name *</label>
              <input type="text" id="lt-form-name" class="form-control" placeholder="e.g. Compensatory Off" required style="width:100%;padding:8px;border:1.5px solid var(--gray-200);border-radius:var(--border-radius-sm);font-size:13px;"/>
            </div>
            
            <div class="form-row cols-2" style="margin-bottom:14px; display:grid; grid-template-columns:1fr 1fr; gap:14px;">
              <div class="form-group">
                <label class="form-label" style="font-weight:600;margin-bottom:4px;display:block;">Yearly Limit (Days) *</label>
                <input type="number" id="lt-form-limit" class="form-control" placeholder="10" required style="width:100%;padding:8px;border:1.5px solid var(--gray-200);border-radius:var(--border-radius-sm);font-size:13px;"/>
              </div>
              <div class="form-group">
                <label class="form-label" style="font-weight:600;margin-bottom:4px;display:block;">Theme Color</label>
                <select id="lt-form-color" class="form-control" style="width:100%;padding:8px;border:1.5px solid var(--gray-200);border-radius:var(--border-radius-sm);font-size:13px;background:#fff;">
                  <option value="#2563EB">Blue</option>
                  <option value="#059669">Green</option>
                  <option value="#F97316">Orange</option>
                  <option value="#9333EA">Purple</option>
                  <option value="#EF4444">Red</option>
                  <option value="#06B6D4">Cyan</option>
                </select>
              </div>
            </div>

            <div class="form-row cols-3" style="margin-bottom:14px; display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">
              <div class="form-group">
                <label class="form-label" style="font-weight:600;margin-bottom:4px;display:block;">Carry Forward</label>
                <select id="lt-form-carry" class="form-control" style="width:100%;padding:8px;border:1.5px solid var(--gray-200);border-radius:var(--border-radius-sm);font-size:12px;background:#fff;">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" style="font-weight:600;margin-bottom:4px;display:block;">Encashable</label>
                <select id="lt-form-encash" class="form-control" style="width:100%;padding:8px;border:1.5px solid var(--gray-200);border-radius:var(--border-radius-sm);font-size:12px;background:#fff;">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" style="font-weight:600;margin-bottom:4px;display:block;">Advance Apply</label>
                <select id="lt-form-advance" class="form-control" style="width:100%;padding:8px;border:1.5px solid var(--gray-200);border-radius:var(--border-radius-sm);font-size:12px;background:#fff;">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div class="form-group" style="margin-bottom:14px">
              <label class="form-label" style="font-weight:600;margin-bottom:4px;display:block;">Description *</label>
              <textarea id="lt-form-desc" class="form-control" rows="3" placeholder="Describe the purpose of this leave type..." required style="width:100%;padding:8px;border:1.5px solid var(--gray-200);border-radius:var(--border-radius-sm);font-size:13px;resize:vertical;"></textarea>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px; border-top:1px solid var(--gray-100); padding-top:14px;">
              <button type="button" class="btn btn-secondary" onclick="closeModal('create-leave-type-modal')">Cancel</button>
              <button type="submit" class="btn btn-primary">Create Now</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

function infoCol(label, value) {
  return `<div>
    <div style="font-size:11px;color:var(--gray-400);font-weight:500;">${label}</div>
    <div style="font-size:13px;font-weight:600;color:var(--gray-700);margin-top:2px;">${value}</div>
  </div>`;
}

window.submitCreateLeaveType = function(event) {
  event.preventDefault();

  const name = document.getElementById('lt-form-name').value.trim();
  const limit = parseInt(document.getElementById('lt-form-limit').value);
  const color = document.getElementById('lt-form-color').value;
  const carry = document.getElementById('lt-form-carry').value;
  const encash = document.getElementById('lt-form-encash').value;
  const advance = document.getElementById('lt-form-advance').value;
  const desc = document.getElementById('lt-form-desc').value.trim();

  if (!name || isNaN(limit) || !desc) {
    showToast('Please fill in all fields correctly.', 'error');
    return;
  }

  // Check if exists
  if (WP.leaves.balances.some(b => b.type.toLowerCase() === name.toLowerCase())) {
    showToast(`Leave type "${name}" already exists!`, 'error');
    return;
  }

  WP.leaves.balances.push({
    type: name,
    available: limit,
    total: limit,
    used: 0,
    color: color,
    carry: carry,
    encash: encash,
    advance: advance,
    desc: desc
  });

  closeModal('create-leave-type-modal');
  showToast('New leave type created successfully!', 'success');
  
  // Refresh view
  const content = document.getElementById('page-content');
  renderLeaveTypes(content);
};


/* ─────────────────────────────────────────────────────────────────────────────
   2. LEAVE REQUEST SECTION (Employee Portal View)
   ───────────────────────────────────────────────────────────────────────────── */
function renderLeaveRequest(container) {
  // Filter leaves that belong to current user (EMP001) or mock all requests as belonging to Arjun Kumar for demonstration
  // Let's filter pending and approved requests
  const myRequests = WP.leaves.pending; // For mock display, we show all history

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>My Leave Request Portal</h1>
        <p>Track your remaining leave balances and submit request forms</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="openModal('apply-leave-modal')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Apply Leave
        </button>
      </div>
    </div>

    <!-- Leave Balance Cards -->
    <div class="grid grid-4" style="margin-bottom:24px">
      ${WP.leaves.balances.map(b => `
        <div class="leave-balance-card" style="background:#fff; padding: 20px; border-radius: var(--border-radius); border: 1px solid var(--gray-200); position: relative; overflow: hidden;">
          <div class="leave-type-header" style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
            <div class="leave-type-dot" style="background:${b.color}; width:10px; height:10px; border-radius:50%"></div>
            <div class="leave-type-name" style="font-size:13px; font-weight:700; color:var(--gray-700)">${b.type}</div>
          </div>
          <div class="leave-balance-numbers" style="margin-bottom: 12px;">
            <span class="leave-avail" style="color:${b.color}; font-size: 28px; font-weight:800">${b.available}</span>
            <span class="leave-total" style="font-size:13px; color:var(--gray-400)">/ ${b.total} days left</span>
          </div>
          <div class="progress-bar" style="background:var(--gray-100); height:6px; border-radius:99px; overflow:hidden;">
            <div class="progress-fill" style="width:${Math.round(b.available/b.total*100)}%; background:${b.color}; height:100%"></div>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--gray-400); margin-top:6px">
            <span>Used: ${b.used}d</span>
            <span>Allocated: ${b.total}d</span>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Personal Requests History Table -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">My Leaves History</div>
        <span style="font-size: 12px; color:var(--gray-400);">Showing all leave applications</span>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Leave Type</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Total Days</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${myRequests.map(l => `
              <tr>
                <td><strong style="font-size:12px; color:var(--primary); font-family:monospace;">${l.id}</strong></td>
                <td><span style="font-weight: 600; color: var(--gray-700);">${l.type}</span></td>
                <td>${formatDate(l.from)}</td>
                <td>${formatDate(l.to)}</td>
                <td><strong>${l.days} day${l.days > 1 ? 's' : ''}</strong></td>
                <td style="color:var(--gray-500); font-size:12px; max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis" title="${l.reason}">${l.reason}</td>
                <td>${statusBadge(l.status)}</td>
              </tr>
            `).join('')}
            ${myRequests.length === 0 ? `
              <tr>
                <td colspan="7" style="text-align:center; padding: 30px; color: var(--gray-400);">No requests submitted yet.</td>
              </tr>
            ` : ''}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Apply Leave Modal -->
    <div class="modal-backdrop" id="apply-leave-modal">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-icon orange">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
          </div>
          <div class="modal-header-text">
            <div class="modal-title">Apply for Leave</div>
            <div class="modal-subtitle">Submit a leave request for HR approval</div>
          </div>
          <button class="modal-close" onclick="closeModal('apply-leave-modal')">✕</button>
        </div>
        <div class="modal-body" style="padding:20px;">
          <form id="apply-leave-form" onsubmit="submitApplyLeave(event)">
            <div class="form-group" style="margin-bottom:14px">
              <label class="form-label" style="font-weight:600;margin-bottom:4px;display:block;">Leave Type *</label>
              <select id="al-form-type" class="form-control" style="width:100%;padding:8px;border:1.5px solid var(--gray-200);border-radius:var(--border-radius-sm);font-size:13px;background:#fff;">
                ${WP.leaves.balances.map(b => `<option value="${b.type}">${b.type} (${b.available} days left)</option>`).join('')}
              </select>
            </div>
            
            <div class="form-row cols-2" style="margin-bottom:14px; display:grid; grid-template-columns:1fr 1fr; gap:14px;">
              <div class="form-group">
                <label class="form-label" style="font-weight:600;margin-bottom:4px;display:block;">From Date *</label>
                <input type="date" id="al-form-from" class="form-control" required style="width:100%;padding:8px;border:1.5px solid var(--gray-200);border-radius:var(--border-radius-sm);font-size:13px;"/>
              </div>
              <div class="form-group">
                <label class="form-label" style="font-weight:600;margin-bottom:4px;display:block;">To Date *</label>
                <input type="date" id="al-form-to" class="form-control" required style="width:100%;padding:8px;border:1.5px solid var(--gray-200);border-radius:var(--border-radius-sm);font-size:13px;"/>
              </div>
            </div>

            <div class="form-group" style="margin-bottom:14px">
              <label class="form-label" style="font-weight:600;margin-bottom:4px;display:block;">Day Type</label>
              <select id="al-form-daytype" class="form-control" style="width:100%;padding:8px;border:1.5px solid var(--gray-200);border-radius:var(--border-radius-sm);font-size:13px;background:#fff;">
                <option value="Full Day">Full Day</option>
                <option value="First Half">First Half</option>
                <option value="Second Half">Second Half</option>
              </select>
            </div>

            <div class="form-group" style="margin-bottom:14px">
              <label class="form-label" style="font-weight:600;margin-bottom:4px;display:block;">Reason *</label>
              <textarea id="al-form-reason" class="form-control" rows="3" placeholder="Enter reason for leave request..." required style="width:100%;padding:8px;border:1.5px solid var(--gray-200);border-radius:var(--border-radius-sm);font-size:13px;resize:vertical;"></textarea>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px; border-top:1px solid var(--gray-100); padding-top:14px;">
              <button type="button" class="btn btn-secondary" onclick="closeModal('apply-leave-modal')">Cancel</button>
              <button type="submit" class="btn btn-primary">Submit Request</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

window.submitApplyLeave = function(event) {
  event.preventDefault();

  const type = document.getElementById('al-form-type').value;
  const from = document.getElementById('al-form-from').value;
  const to = document.getElementById('al-form-to').value;
  const dayType = document.getElementById('al-form-daytype').value;
  const reason = document.getElementById('al-form-reason').value.trim();

  if (!from || !to || !reason) {
    showToast('Please fill in all fields.', 'error');
    return;
  }

  const d1 = new Date(from);
  const d2 = new Date(to);
  if (d2 < d1) {
    showToast('To Date cannot be before From Date!', 'error');
    return;
  }

  // Calculate days
  const timeDiff = Math.abs(d2.getTime() - d1.getTime());
  let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  if (dayType !== 'Full Day') {
    diffDays = 0.5;
  }

  // Check balance
  const balance = WP.leaves.balances.find(b => b.type === type);
  if (balance && balance.available < diffDays) {
    showToast(`Insufficient balance for ${type}. Available: ${balance.available} days.`, 'error');
    return;
  }

  // Create Request ID
  const lastId = WP.leaves.pending.length > 0 ? WP.leaves.pending[WP.leaves.pending.length - 1].id : 'LV000';
  const numericPart = parseInt(lastId.replace('LV', '')) + 1;
  const newId = 'LV' + String(numericPart).padStart(3, '0');

  const today = new Date();
  const appliedStr = today.toISOString().split('T')[0];

  const newReq = {
    id: newId,
    empId: WP.currentUser.id,
    empName: WP.currentUser.name,
    initials: WP.currentUser.initials,
    type: type,
    from: from,
    to: to,
    days: diffDays,
    reason: reason,
    status: 'pending',
    applied: appliedStr
  };

  // Add to global store
  WP.leaves.pending.unshift(newReq);

  closeModal('apply-leave-modal');
  showToast('Leave request submitted successfully!', 'success');

  // Refresh page
  const content = document.getElementById('page-content');
  renderLeaveRequest(content);
};


/* ─────────────────────────────────────────────────────────────────────────────
   3. TIME LEAVE REQUEST SECTION (Short Leave & Permissions Portal)
   ───────────────────────────────────────────────────────────────────────────── */
function renderTimeLeaveRequest(container) {
  const reqs = WP.leaves.timeRequests;
  
  // Calculate statistics
  const totalHours = reqs.filter(r => r.status === 'approved').reduce((acc, curr) => {
    const hours = parseFloat(curr.duration.split('h')[0]);
    return acc + hours;
  }, 0);

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Time Leave & Permissions</h1>
        <p>Apply for short permissions, late arrivals, and early departures</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="openModal('time-leave-modal')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Request Permission
        </button>
      </div>
    </div>

    <!-- Stats Cards Row -->
    <div class="grid grid-4" style="margin-bottom:24px">
      <div class="stat-card">
        <div style="font-size:28px; width:48px; height:48px; display:flex; align-items:center; justify-content:center; background-color: var(--gray-50); border-radius:50%">🕒</div>
        <div class="stat-body" style="margin-left: 12px;">
          <div class="stat-label" style="font-size: 12px; color: var(--gray-500); font-weight: 500;">Approved Permissions</div>
          <div class="stat-value" style="font-size: 24px; font-weight: 700; color:var(--primary); margin-top: 2px;">${reqs.filter(r => r.status==='approved').length} requests</div>
        </div>
      </div>
      <div class="stat-card">
        <div style="font-size:28px; width:48px; height:48px; display:flex; align-items:center; justify-content:center; background-color: var(--gray-50); border-radius:50%">⏳</div>
        <div class="stat-body" style="margin-left: 12px;">
          <div class="stat-label" style="font-size: 12px; color: var(--gray-500); font-weight: 500;">Total Out-of-Office Time</div>
          <div class="stat-value" style="font-size: 24px; font-weight: 700; color:var(--accent); margin-top: 2px;">${totalHours.toFixed(1)} hrs</div>
        </div>
      </div>
      <div class="stat-card">
        <div style="font-size:28px; width:48px; height:48px; display:flex; align-items:center; justify-content:center; background-color: var(--gray-50); border-radius:50%">⚖️</div>
        <div class="stat-body" style="margin-left: 12px;">
          <div class="stat-label" style="font-size: 12px; color: var(--gray-500); font-weight: 500;">Monthly Cap</div>
          <div class="stat-value" style="font-size: 24px; font-weight: 700; color:var(--info); margin-top: 2px;">4 times / mo</div>
        </div>
      </div>
      <div class="stat-card">
        <div style="font-size:28px; width:48px; height:48px; display:flex; align-items:center; justify-content:center; background-color: var(--gray-50); border-radius:50%">🔒</div>
        <div class="stat-body" style="margin-left: 12px;">
          <div class="stat-label" style="font-size: 12px; color: var(--gray-500); font-weight: 500;">Remaining Limit</div>
          <div class="stat-value" style="font-size: 24px; font-weight: 700; color:var(--success); margin-top: 2px;">${Math.max(0, 4 - reqs.filter(r => r.status==='approved').length)} left</div>
        </div>
      </div>
    </div>

    <!-- Permissions History Table -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">My Permission History</div>
        <span style="font-size: 12px; color:var(--gray-400);">Hourly leave tracking</span>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Permission Type</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${reqs.map(r => `
              <tr>
                <td><strong style="font-size:12px; color:var(--primary); font-family:monospace;">${r.id}</strong></td>
                <td><span style="font-weight: 600; color: var(--gray-700);">${r.type}</span></td>
                <td>${formatDate(r.date)}</td>
                <td>${r.startTime}</td>
                <td>${r.endTime}</td>
                <td><strong>${r.duration}</strong></td>
                <td style="color:var(--gray-500); font-size:12px; max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis" title="${r.reason}">${r.reason}</td>
                <td>${statusBadge(r.status)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Request Short Permission Modal -->
    <div class="modal-backdrop" id="time-leave-modal">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-icon orange">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div class="modal-header-text">
            <div class="modal-title">Request Permission</div>
            <div class="modal-subtitle">Submit a short or hourly time-based leave</div>
          </div>
          <button class="modal-close" onclick="closeModal('time-leave-modal')">✕</button>
        </div>
        <div class="modal-body" style="padding: 20px;">
          <form id="time-leave-form" onsubmit="submitTimeLeave(event)">
            <div class="form-group" style="margin-bottom:14px">
              <label class="form-label" style="font-weight:600;margin-bottom:4px;display:block;">Permission Type *</label>
              <select id="tl-form-type" class="form-control" style="width:100%;padding:8px;border:1.5px solid var(--gray-200);border-radius:var(--border-radius-sm);font-size:13px;background:#fff;">
                <option value="Short Permission">Short Permission (2 Hours max)</option>
                <option value="Late Arrival">Late Arrival (1-2 Hours)</option>
                <option value="Early Out">Early Departure (1-3 Hours)</option>
              </select>
            </div>

            <div class="form-group" style="margin-bottom:14px">
              <label class="form-label" style="font-weight:600;margin-bottom:4px;display:block;">Date *</label>
              <input type="date" id="tl-form-date" class="form-control" required style="width:100%;padding:8px;border:1.5px solid var(--gray-200);border-radius:var(--border-radius-sm);font-size:13px;"/>
            </div>

            <div class="form-row cols-2" style="margin-bottom:14px; display:grid; grid-template-columns:1fr 1fr; gap:14px;">
              <div class="form-group">
                <label class="form-label" style="font-weight:600;margin-bottom:4px;display:block;">Start Time *</label>
                <input type="time" id="tl-form-start" class="form-control" required style="width:100%;padding:8px;border:1.5px solid var(--gray-200);border-radius:var(--border-radius-sm);font-size:13px;"/>
              </div>
              <div class="form-group">
                <label class="form-label" style="font-weight:600;margin-bottom:4px;display:block;">End Time *</label>
                <input type="time" id="tl-form-end" class="form-control" required style="width:100%;padding:8px;border:1.5px solid var(--gray-200);border-radius:var(--border-radius-sm);font-size:13px;"/>
              </div>
            </div>

            <div class="form-group" style="margin-bottom:14px">
              <label class="form-label" style="font-weight:600;margin-bottom:4px;display:block;">Reason *</label>
              <textarea id="tl-form-reason" class="form-control" rows="3" placeholder="Describe the reason for permission request..." required style="width:100%;padding:8px;border:1.5px solid var(--gray-200);border-radius:var(--border-radius-sm);font-size:13px;resize:vertical;"></textarea>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px; border-top:1px solid var(--gray-100); padding-top:14px;">
              <button type="button" class="btn btn-secondary" onclick="closeModal('time-leave-modal')">Cancel</button>
              <button type="submit" class="btn btn-primary">Submit Request</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

window.submitTimeLeave = function(event) {
  event.preventDefault();

  const type = document.getElementById('tl-form-type').value;
  const date = document.getElementById('tl-form-date').value;
  const startTime = document.getElementById('tl-form-start').value;
  const endTime = document.getElementById('tl-form-end').value;
  const reason = document.getElementById('tl-form-reason').value.trim();

  if (!date || !startTime || !endTime || !reason) {
    showToast('Please fill in all fields.', 'error');
    return;
  }

  // Calculate duration in hours
  const t1 = new Date(`1970-01-01T${startTime}`);
  const t2 = new Date(`1970-01-01T${endTime}`);
  if (t2 <= t1) {
    showToast('End Time must be after Start Time!', 'error');
    return;
  }

  const diffMs = t2 - t1;
  const diffHrs = diffMs / (1000 * 60 * 60);
  const hours = Math.floor(diffHrs);
  const minutes = Math.round((diffHrs - hours) * 60);
  const durationStr = `${hours}h ${String(minutes).padStart(2, '0')}m`;

  // Format 12-hour times
  const format12h = timeStr => {
    const [h, m] = timeStr.split(':');
    const hr = parseInt(h);
    const ampm = hr >= 12 ? 'PM' : 'AM';
    const formattedHr = hr % 12 || 12;
    return `${String(formattedHr).padStart(2, '0')}:${m} ${ampm}`;
  };

  const lastId = WP.leaves.timeRequests.length > 0 ? WP.leaves.timeRequests[WP.leaves.timeRequests.length - 1].id : 'TL000';
  const numericPart = parseInt(lastId.replace('TL', '')) + 1;
  const newId = 'TL' + String(numericPart).padStart(3, '0');

  const newReq = {
    id: newId,
    date: date,
    type: type,
    startTime: format12h(startTime),
    endTime: format12h(endTime),
    duration: durationStr,
    reason: reason,
    status: 'pending'
  };

  WP.leaves.timeRequests.unshift(newReq);

  closeModal('time-leave-modal');
  showToast('Short permission request submitted for approval!', 'success');

  // Refresh view
  const content = document.getElementById('page-content');
  renderTimeLeaveRequest(content);
};


/* ─────────────────────────────────────────────────────────────────────────────
   4. LEAVE APPROVAL SECTION (Admin / Manager Portal View)
   ───────────────────────────────────────────────────────────────────────────── */
function renderLeaveApproval(container) {
  const pending = WP.leaves.pending.filter(l => l.status === 'pending');
  const processed = WP.leaves.pending.filter(l => l.status !== 'pending');

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Leave Approval Queue</h1>
        <p>Review, approve, or reject employee leave applications</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-secondary" onclick="showToast('Exporting approval logs…')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Export Logs
        </button>
      </div>
    </div>

    <!-- Approval KPI Cards Row -->
    <div class="grid grid-4" style="margin-bottom:24px">
      <div class="stat-card">
        <div style="font-size:28px; width:48px; height:48px; display:flex; align-items:center; justify-content:center; background-color: var(--gray-50); border-radius:50%">📥</div>
        <div class="stat-body" style="margin-left: 12px;">
          <div class="stat-label" style="font-size: 12px; color: var(--gray-500); font-weight: 500;">Pending Applications</div>
          <div class="stat-value" style="font-size: 24px; font-weight: 700; color:var(--warning); margin-top: 2px;">${pending.length} files</div>
        </div>
      </div>
      <div class="stat-card">
        <div style="font-size:28px; width:48px; height:48px; display:flex; align-items:center; justify-content:center; background-color: var(--gray-50); border-radius:50%">✅</div>
        <div class="stat-body" style="margin-left: 12px;">
          <div class="stat-label" style="font-size: 12px; color: var(--gray-500); font-weight: 500;">Processed this Week</div>
          <div class="stat-value" style="font-size: 24px; font-weight: 700; color:var(--success); margin-top: 2px;">${processed.length} files</div>
        </div>
      </div>
      <div class="stat-card">
        <div style="font-size:28px; width:48px; height:48px; display:flex; align-items:center; justify-content:center; background-color: var(--gray-50); border-radius:50%">📊</div>
        <div class="stat-body" style="margin-left: 12px;">
          <div class="stat-label" style="font-size: 12px; color: var(--gray-500); font-weight: 500;">Average SLA Time</div>
          <div class="stat-value" style="font-size: 24px; font-weight: 700; color:var(--primary); margin-top: 2px;">4.2 hours</div>
        </div>
      </div>
      <div class="stat-card">
        <div style="font-size:28px; width:48px; height:48px; display:flex; align-items:center; justify-content:center; background-color: var(--gray-50); border-radius:50%">📅</div>
        <div class="stat-body" style="margin-left: 12px;">
          <div class="stat-label" style="font-size: 12px; color: var(--gray-500); font-weight: 500;">Active Leaves Today</div>
          <div class="stat-value" style="font-size: 24px; font-weight: 700; color:var(--info); margin-top: 2px;">2 employees</div>
        </div>
      </div>
    </div>

    <!-- Tabs for Pending vs Resolved Queue -->
    <div class="tab-bar" style="margin-bottom:20px">
      <div class="tab-btn active" onclick="switchApprovalTab(this,'tab-pending')">
        Pending Approvals 
        <span class="badge badge-yellow" id="badge-pending-count" style="margin-left:6px">${pending.length}</span>
      </div>
      <div class="tab-btn" onclick="switchApprovalTab(this,'tab-history')">
        Processed History
      </div>
    </div>

    <!-- Pending Queue Tab -->
    <div id="tab-pending" class="tab-content active">
      <div style="display:flex; flex-direction:column; gap:12px">
        ${pending.map(l => `
          <div class="leave-req-item" id="lreq-${l.id}" style="background:#fff; border:1px solid var(--gray-200); border-radius:var(--border-radius); padding: 18px 24px; display:flex; justify-content:space-between; align-items:center; gap: 20px; transition: var(--transition); border-left: 4px solid var(--warning);">
            <div style="display:flex; align-items:center; gap:14px; flex:1; min-width:0;">
              <div class="emp-avatar" style="background:${avatarColors(l.initials)}; width:40px; height:40px; font-size:14px; font-weight:700; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; flex-shrink:0;">
                ${l.initials}
              </div>
              <div style="flex:1; min-width:0;">
                <div style="font-weight:700; color:var(--gray-800); font-size:14px; margin-bottom:4px;">
                  ${l.empName} <span style="font-weight: 500; color:var(--gray-400); font-size: 11px;">(ID: ${l.empId})</span>
                </div>
                <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; font-size:12px; color:var(--gray-500);">
                  <span class="badge badge-gray" style="font-size:10px">${l.type}</span>
                  <span>📅 ${formatDate(l.from)} → ${formatDate(l.to)}</span>
                  <span style="color:var(--gray-400)">• Applied: ${formatDate(l.applied)}</span>
                </div>
                <div style="font-size:12px; font-style:italic; color:var(--gray-600); margin-top:8px; background: var(--gray-50); padding: 8px 12px; border-radius:var(--border-radius-sm); border:1px solid var(--gray-100);">
                  "${l.reason}"
                </div>
              </div>
            </div>
            
            <div style="text-align:right; flex-shrink:0; display:flex; flex-direction:column; align-items:flex-end; gap:6px;">
              <div style="text-align:right; margin-bottom: 8px;">
                <div class="days-num" style="font-size: 24px; font-weight:800; color: var(--primary);">${l.days}</div>
                <div class="days-label" style="font-size:10px; text-transform:uppercase; font-weight:700; color:var(--gray-400)">Day${l.days>1?'s':''}</div>
              </div>
              <div style="display:flex; gap:8px;">
                <button class="btn btn-success btn-sm" onclick="handleLeaveApproval('${l.id}', 'approve')">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  Approve
                </button>
                <button class="btn btn-danger btn-sm" onclick="handleLeaveApproval('${l.id}', 'reject')">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Reject
                </button>
              </div>
            </div>
          </div>
        `).join('')}
        ${pending.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">✅</div>
            <div class="empty-state-title">Approval Queue Empty</div>
            <p class="empty-state-desc">You are all caught up! There are no pending leave requests to process.</p>
          </div>
        ` : ''}
      </div>
    </div>

    <!-- Processed History Tab -->
    <div id="tab-history" class="tab-content">
      <div class="card">
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${processed.map(l => `
                <tr>
                  <td>
                    <div class="emp-cell">
                      <div class="emp-avatar" style="background:${avatarColors(l.initials)}; width:30px; height:30px; font-size:11px">${l.initials}</div>
                      <span style="font-weight:600; font-size:13px">${l.empName}</span>
                    </div>
                  </td>
                  <td>${l.type}</td>
                  <td>${formatDate(l.from)}</td>
                  <td>${formatDate(l.to)}</td>
                  <td><strong>${l.days}</strong></td>
                  <td style="color:var(--gray-500); font-size:12px; max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis" title="${l.reason}">${l.reason}</td>
                  <td>${statusBadge(l.status)}</td>
                </tr>
              `).join('')}
              ${processed.length === 0 ? `
                <tr>
                  <td colspan="7" style="text-align:center; padding:30px; color:var(--gray-400);">No requests processed yet.</td>
                </tr>
              ` : ''}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

window.switchApprovalTab = function(btn, tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
};

window.handleLeaveApproval = function(id, action) {
  const req = WP.leaves.pending.find(l => l.id === id);
  if (!req) return;

  req.status = action === 'approve' ? 'approved' : 'rejected';
  
  // If approved, deduct from balance
  if (action === 'approve') {
    const balance = WP.leaves.balances.find(b => b.type === req.type);
    if (balance) {
      balance.available = Math.max(0, balance.available - req.days);
      balance.used += req.days;
    }
  }

  showToast(action === 'approve' ? `Leave for ${req.empName} approved successfully!` : `Leave for ${req.empName} rejected.`, action === 'approve' ? 'success' : 'error');

  // Refresh view
  const content = document.getElementById('page-content');
  renderLeaveApproval(content);

  // Update Leave Approval submenu badge count
  const badge = document.querySelector('#leave-management-submenu .nav-badge');
  const pendingCount = WP.leaves.pending.filter(l => l.status === 'pending').length;
  if (badge) {
    if (pendingCount > 0) {
      badge.textContent = pendingCount;
      badge.style.display = 'inline-flex';
    } else {
      badge.style.display = 'none';
    }
  }
};


/* ─────────────────────────────────────────────────────────────────────────────
   LEGACY / ALIASES SUPPORT
   ───────────────────────────────────────────────────────────────────────────── */
function renderLeaves(container) {
  // Fallback points to the primary leave portal (Leave Request)
  renderLeaveRequest(container);
}
