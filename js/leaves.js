/* ===== WorkPilot HR — Leave Management Module ===== */

function renderLeaves(container) {
  const pending = WP.leaves.pending.filter(l => l.status === 'pending');
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Leave Management</h1>
        <p>Manage employee leave requests and balances</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-secondary" onclick="showToast('Downloading leave report…')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export
        </button>
        <button class="btn btn-primary" onclick="openModal('apply-leave-modal')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Apply Leave
        </button>
      </div>
    </div>

    <!-- Leave Balance Cards -->
    <div class="grid grid-4" style="margin-bottom:24px">
      ${WP.leaves.balances.map(b => `
        <div class="leave-balance-card">
          <div class="leave-type-header">
            <div class="leave-type-dot" style="background:${b.color}"></div>
            <div class="leave-type-name">${b.type}</div>
          </div>
          <div class="leave-balance-numbers">
            <span class="leave-avail" style="color:${b.color}">${b.available}</span>
            <span class="leave-total">/ ${b.total} days</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${Math.round(b.available/b.total*100)}%;background:${b.color}"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--gray-400);margin-top:4px">
            <span>Used: ${b.used}</span>
            <span>Available: ${b.available}</span>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Tabs -->
    <div class="tab-bar" style="margin-bottom:20px">
      <div class="tab-btn active" onclick="switchLeaveTab(this,'lt-pending')">Pending <span class="badge badge-yellow" style="margin-left:4px">${pending.length}</span></div>
      <div class="tab-btn" onclick="switchLeaveTab(this,'lt-all')">All Requests</div>
      <div class="tab-btn" onclick="switchLeaveTab(this,'lt-calendar')">Leave Calendar</div>
      <div class="tab-btn" onclick="switchLeaveTab(this,'lt-policy')">Leave Policy</div>
    </div>

    <!-- Pending Tab -->
    <div id="lt-pending" class="tab-content active">
      <div class="leave-timeline">
        ${pending.map(l => `
          <div class="leave-req-item" id="lreq-${l.id}">
            <div class="leave-req-avatar">
              <div class="emp-avatar" style="background:${avatarColors(l.initials)}">${l.initials}</div>
            </div>
            <div class="leave-req-info">
              <div class="leave-req-name">${l.empName}</div>
              <div class="leave-req-meta">
                <span class="badge badge-gray" style="font-size:10px;margin-right:6px">${l.type}</span>
                ${formatDate(l.from)} → ${formatDate(l.to)}
                <span style="margin-left:6px;color:var(--gray-400);font-size:11px">Applied: ${formatDate(l.applied)}</span>
              </div>
              <div style="font-size:12px;color:var(--gray-500);margin-top:4px">
                <em>"${l.reason}"</em>
              </div>
            </div>
            <div class="leave-req-days">
              <div class="days-num">${l.days}</div>
              <div class="days-label">day${l.days>1?'s':''}</div>
            </div>
            <div class="leave-req-actions">
              <button class="btn btn-success btn-sm" onclick="handleLeave('${l.id}','approve',this)">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                Approve
              </button>
              <button class="btn btn-danger btn-sm" onclick="handleLeave('${l.id}','reject',this)">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Reject
              </button>
              <button class="btn btn-secondary btn-sm" onclick="showToast('Viewing details for ${l.empName}')">Details</button>
            </div>
          </div>
        `).join('')}
        ${pending.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">✅</div><h3>All caught up!</h3><p>No pending leave requests.</p></div>' : ''}
      </div>
    </div>

    <!-- All Requests Tab -->
    <div id="lt-all" class="tab-content">
      <div class="card">
        <div class="card-header">
          <div class="card-title">All Leave Requests</div>
          <div style="display:flex;gap:8px">
            <select class="form-control" style="width:150px;height:36px">
              <option>All Departments</option>
              ${WP.departments.map(d=>`<option>${d.name}</option>`).join('')}
            </select>
            <select class="form-control" style="width:140px;height:36px">
              <option>All Status</option>
              <option>Pending</option><option>Approved</option><option>Rejected</option>
            </select>
          </div>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr><th>Employee</th><th>Leave Type</th><th>From</th><th>To</th><th>Days</th><th>Reason</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              ${WP.leaves.pending.map(l => `
                <tr>
                  <td><div class="emp-cell"><div class="emp-avatar" style="background:${avatarColors(l.initials)};width:30px;height:30px;font-size:11px">${l.initials}</div><span style="font-weight:600;font-size:13px">${l.empName}</span></div></td>
                  <td>${l.type}</td>
                  <td>${formatDate(l.from)}</td>
                  <td>${formatDate(l.to)}</td>
                  <td><strong>${l.days}</strong></td>
                  <td style="color:var(--gray-500);font-size:12px;max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${l.reason}</td>
                  <td>${statusBadge(l.status)}</td>
                  <td>
                    <button class="btn-icon" title="View"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Calendar Tab -->
    <div id="lt-calendar" class="tab-content">
      <div class="card">
        <div class="card-header">
          <div class="card-title">Leave Calendar — June 2025</div>
          <div style="display:flex;gap:8px;align-items:center">
            <button class="btn btn-secondary btn-sm">← May</button>
            <span style="font-size:14px;font-weight:600">June 2025</span>
            <button class="btn btn-secondary btn-sm">Jul →</button>
          </div>
        </div>
        <div class="card-body">
          <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:16px">
            ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=>`<div style="text-align:center;font-size:12px;font-weight:700;color:var(--gray-500);padding:8px">${d}</div>`).join('')}
            ${Array(6).fill(0).map(()=>'<div></div>').join('')}
            ${Array.from({length:30},(_,i)=>{
              const d=i+1;
              const isW=(d+5)%7===0||((d+5)%7===6);
              const leaveEmps=[
                ...(d>=15&&d<=17?['PS']:[]),(d===14?['RM']:[]),
                ...(d>=20&&d<=27?['NG']:[]),(d===16?['DK']:[])
              ];
              return `
                <div style="min-height:70px;border-radius:8px;border:1px solid var(--gray-100);padding:6px;background:${isW?'var(--gray-50)':'white'}">
                  <div style="font-size:12px;font-weight:${d===13?'800':'500'};color:${d===13?'var(--primary)':isW?'var(--gray-300)':'var(--gray-600)'};margin-bottom:3px">${d}</div>
                  ${leaveEmps.map(emp=>`<div style="background:var(--primary-light);color:var(--primary);font-size:10px;font-weight:600;padding:2px 5px;border-radius:4px;margin-top:2px">${emp}</div>`).join('')}
                </div>`;
            }).join('')}
          </div>
          <div style="display:flex;gap:16px;flex-wrap:wrap">
            ${[{l:'PS = Priya Sharma',c:'var(--primary)'},{l:'RM = Rahul Mehta',c:'var(--success)'},{l:'NG = Neha Gupta',c:'var(--accent)'},{l:'DK = Deepak Kumar',c:'var(--purple)'}]
              .map(x=>`<div style="font-size:12px;color:var(--gray-500);display:flex;align-items:center;gap:6px"><div style="width:10px;height:10px;border-radius:2px;background:${x.c}"></div>${x.l}</div>`).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- Leave Policy Tab -->
    <div id="lt-policy" class="tab-content">
      <div class="grid grid-2">
        ${[
          { name: 'Casual Leave', days: 10, carry: 'No', encash: 'No', advance: 'Yes', color: '#2563EB', desc: 'For personal emergencies and casual purposes' },
          { name: 'Sick Leave', days: 12, carry: 'No', encash: 'No', advance: 'No', color: '#059669', desc: 'For medical illness with or without medical certificate' },
          { name: 'Earned Leave', days: 24, carry: 'Yes (max 30)', encash: 'Yes', advance: 'Yes', color: '#F97316', desc: 'Earned @ 1 day per 11 working days' },
          { name: 'Maternity Leave', days: 90, carry: 'No', encash: 'No', advance: 'Yes', color: '#9333EA', desc: 'As per Maternity Benefits Act, 1961' }
        ].map(p => `
          <div class="card">
            <div class="card-body">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
                <div style="width:12px;height:12px;border-radius:50%;background:${p.color}"></div>
                <h3 style="font-size:15px;font-weight:700">${p.name}</h3>
                <span class="badge" style="background:${p.color}22;color:${p.color};margin-left:auto">${p.days} days/yr</span>
              </div>
              <p style="font-size:13px;color:var(--gray-500);margin-bottom:14px">${p.desc}</p>
              ${infoRow('Total Days / Year', p.days + ' days')}
              ${infoRow('Carry Forward', p.carry)}
              ${infoRow('Encashable', p.encash)}
              ${infoRow('Advance Application', p.advance)}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Apply Leave Modal -->
    <div class="modal-backdrop" id="apply-leave-modal">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-icon orange"><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg></div>
          <div class="modal-header-text">
            <div class="modal-title">Apply for Leave</div>
            <div class="modal-subtitle">Submit a leave request for approval</div>
          </div>
          <button class="modal-close" onclick="closeModal('apply-leave-modal')">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Leave Type *</label>
            <select class="form-control">
              ${WP.leaves.balances.map(b=>`<option>${b.type} (${b.available} days available)</option>`).join('')}
            </select>
          </div>
          <div class="form-row cols-2" style="margin-bottom:14px">
            <div class="form-group">
              <label class="form-label">From Date *</label>
              <input type="date" class="form-control"/>
            </div>
            <div class="form-group">
              <label class="form-label">To Date *</label>
              <input type="date" class="form-control"/>
            </div>
          </div>
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Day Type</label>
            <select class="form-control">
              <option>Full Day</option><option>First Half</option><option>Second Half</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Reason *</label>
            <textarea class="form-control" rows="3" placeholder="Enter reason for leave…"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('apply-leave-modal')">Cancel</button>
          <button class="btn btn-primary" onclick="submitLeave()">Submit Request</button>
        </div>
      </div>
    </div>
  `;
}

function switchLeaveTab(btn, tabId) {
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

function handleLeave(id, action, btn) {
  const row = document.getElementById('lreq-' + id);
  if (row) {
    row.style.opacity = '0.4';
    row.style.pointerEvents = 'none';
    setTimeout(() => { row.remove(); }, 400);
  }
  showToast(action === 'approve' ? 'Leave approved successfully!' : 'Leave request rejected.', action === 'approve' ? 'success' : 'error');
}

function submitLeave() {
  closeModal('apply-leave-modal');
  showToast('Leave request submitted for approval!', 'success');
}
