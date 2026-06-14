/* ===== WorkPilot HR — Employee Self Service Portal ===== */

function renderSelfService(container) {
  const u = WP.currentUser;
  container.innerHTML = `
    <!-- Profile Banner -->
    <div class="ss-profile-card">
      <div class="ss-avatar">
        ${u.initials}
        <div class="ss-avatar-edit" onclick="showToast('Photo upload coming soon','warning')">
          <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        </div>
      </div>
      <div class="ss-info">
        <h2>${u.name}</h2>
        <p>${u.role} · ${u.department}</p>
        <div class="ss-info-grid">
          <div class="ss-info-item">
            <label>Employee ID</label>
            <span>${u.id}</span>
          </div>
          <div class="ss-info-item">
            <label>Company</label>
            <span>${u.company}</span>
          </div>
          <div class="ss-info-item">
            <label>Date of Joining</label>
            <span>${formatDate(u.joinDate)}</span>
          </div>
          <div class="ss-info-item">
            <label>Location</label>
            <span>${u.location}</span>
          </div>
          <div class="ss-info-item">
            <label>Phone</label>
            <span>${u.phone}</span>
          </div>
          <div class="ss-info-item">
            <label>Email</label>
            <span style="font-size:12px">${u.email}</span>
          </div>
        </div>
      </div>
      <div style="margin-left:auto;display:flex;flex-direction:column;gap:10px;align-items:flex-end">
        <button class="btn-outline-white" onclick="openModal('edit-profile-modal')" style="display:flex;align-items:center;gap:6px;padding:8px 16px;background:rgba(255,255,255,0.1);color:white;border:1.5px solid rgba(255,255,255,0.2);border-radius:8px;font-size:13px;font-weight:600;cursor:pointer">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          Edit Profile
        </button>
        <button class="btn-outline-white" onclick="showToast('Downloading profile PDF','success')" style="display:flex;align-items:center;gap:6px;padding:8px 16px;background:rgba(255,255,255,0.07);color:rgba(255,255,255,0.7);border:1.5px solid rgba(255,255,255,0.1);border-radius:8px;font-size:13px;font-weight:600;cursor:pointer">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download Profile
        </button>
      </div>
    </div>

    <!-- Quick Links -->
    <div class="ss-quick-links">
      ${[
        {icon:'💰', label:'My Payslips', color:'#ECFDF5', action: "navigate('payroll')"},
        {icon:'📅', label:'Apply Leave', color:'#FFF7ED', action: "openModal('apply-leave-modal2')"},
        {icon:'✅', label:'My Attendance', color:'#EFF6FF', action: "navigate('attendance')"},
        {icon:'📋', label:'My Tasks', color:'#F3E8FF', action: "navigate('tasks')"},
        {icon:'📄', label:'My Documents', color:'#ECFEFF', action: "showSSDocs()"},
        {icon:'🎓', label:'Training', color:'#FFFBEB', action: "showToast('Training portal coming soon','warning')"},
        {icon:'📊', label:'My Reports', color:'#FEF2F2', action: "navigate('reports')"},
        {icon:'🔒', label:'Change Password', color:'#F0FDF4', action: "openModal('change-pass-modal')"}
      ].map(q=>`
        <div class="ss-quick-link" onclick="${q.action}">
          <div class="ss-quick-link-icon" style="background:${q.color}">
            <span style="font-size:24px">${q.icon}</span>
          </div>
          <span>${q.label}</span>
        </div>
      `).join('')}
    </div>

    <!-- Tabs: Payslips / Leave / Attendance / Documents -->
    <div class="tab-bar" style="margin-bottom:20px">
      <div class="tab-btn active" onclick="switchSSTab(this,'ss-payslips')">My Payslips</div>
      <div class="tab-btn" onclick="switchSSTab(this,'ss-leave')">Leave Status</div>
      <div class="tab-btn" onclick="switchSSTab(this,'ss-attendance')">Attendance</div>
      <div class="tab-btn" onclick="switchSSTab(this,'ss-docs')">Documents</div>
    </div>

    <!-- Payslips Tab -->
    <div id="ss-payslips" class="tab-content active">
      <div class="card">
        <div class="card-header"><div class="card-title">Payslip History</div></div>
        <div class="table-container">
          <table class="data-table">
            <thead><tr><th>Month</th><th>Gross Pay</th><th>Deductions</th><th>Net Pay</th><th>Status</th><th>Download</th></tr></thead>
            <tbody>
              ${['Jun 2025','May 2025','Apr 2025','Mar 2025','Feb 2025','Jan 2025'].map((m,i)=>`
                <tr>
                  <td style="font-weight:600">${m}</td>
                  <td>₹${(95000+i*200).toLocaleString()}</td>
                  <td style="color:var(--danger)">-₹${(9200+i*50).toLocaleString()}</td>
                  <td style="font-weight:700;color:var(--success)">₹${(85800-i*50).toLocaleString()}</td>
                  <td>${statusBadge(i===0?'processed':'disbursed')}</td>
                  <td>
                    <button class="btn btn-outline btn-sm" onclick="showToast('Downloading ${m} payslip','success')">
                      <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      PDF
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Leave Status Tab -->
    <div id="ss-leave" class="tab-content">
      <div class="grid grid-2" style="margin-bottom:20px">
        <div class="card">
          <div class="card-header"><div class="card-title">Leave Balances</div></div>
          <div class="card-body">
            ${WP.leaves.balances.map(b=>`
              <div style="margin-bottom:14px">
                <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:600;margin-bottom:4px">
                  <span style="color:var(--gray-700)">${b.type}</span>
                  <span style="color:${b.color}">${b.available} / ${b.total} days</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width:${Math.round(b.available/b.total*100)}%;background:${b.color}"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <div class="card-title">Apply Leave</div>
          </div>
          <div class="card-body">
            <div class="form-group" style="margin-bottom:12px">
              <label class="form-label">Leave Type</label>
              <select class="form-control">${WP.leaves.balances.map(b=>`<option>${b.type}</option>`).join('')}</select>
            </div>
            <div class="form-row cols-2" style="margin-bottom:12px">
              <div class="form-group"><label class="form-label">From</label><input type="date" class="form-control"/></div>
              <div class="form-group"><label class="form-label">To</label><input type="date" class="form-control"/></div>
            </div>
            <div class="form-group" style="margin-bottom:12px">
              <label class="form-label">Reason</label>
              <textarea class="form-control" rows="2" placeholder="Reason for leave…"></textarea>
            </div>
            <button class="btn btn-primary" style="width:100%" onclick="showToast('Leave application submitted!','success')">Submit Request</button>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">My Leave History</div></div>
        <div class="table-container">
          <table class="data-table">
            <thead><tr><th>Type</th><th>From</th><th>To</th><th>Days</th><th>Status</th></tr></thead>
            <tbody>
              ${WP.leaves.pending.filter(l=>l.empId==='EMP001'||l.empId==='EMP002').slice(0,3).map(l=>`
                <tr>
                  <td>${l.type}</td>
                  <td>${formatDate(l.from)}</td>
                  <td>${formatDate(l.to)}</td>
                  <td><strong>${l.days}</strong></td>
                  <td>${statusBadge(l.status)}</td>
                </tr>
              `).join('')}
              <tr><td>Casual Leave</td><td>15 Mar 2025</td><td>15 Mar 2025</td><td><strong>1</strong></td><td>${statusBadge('approved')}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Attendance Tab -->
    <div id="ss-attendance" class="tab-content">
      <div class="card">
        <div class="card-header">
          <div class="card-title">Attendance — June 2025</div>
          <span class="badge badge-green">Present: 21 days</span>
        </div>
        <div class="card-body">
          <div class="attendance-calendar" style="max-width:420px;margin:0 auto">
            ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=>`<div class="cal-header-cell">${d}</div>`).join('')}
            ${Array(6).fill(0).map(()=>'<div class="cal-day empty"></div>').join('')}
            ${Array.from({length:30},(_,i)=>{
              const d=i+1;
              const types=['P','P','P','P','P','W','W','P','P','P','P','P','W','W','H','P','P','P','P','P','W','W','P','P','P','P','P','W','W','P'];
              const t=types[i];
              const cls=t==='P'?'present':t==='L'?'late':t==='W'?'weekend':t==='H'?'absent':'present';
              return `<div class="cal-day ${cls}">${d}</div>`;
            }).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- Documents Tab -->
    <div id="ss-docs" class="tab-content">
      <div class="card">
        <div class="card-header">
          <div class="card-title">My Documents</div>
          <button class="btn btn-primary btn-sm" onclick="showToast('Upload document feature','success')">Upload Document</button>
        </div>
        <div class="card-body">
          <div class="grid grid-4">
            ${['Offer Letter','Employment Contract','Last Appraisal Letter','PAN Card','Aadhaar Card','Bank Details','Form 16','IT Declaration'].map(d=>`
              <div style="padding:16px;background:var(--gray-50);border:1px solid var(--gray-200);border-radius:10px;text-align:center;cursor:pointer;transition:var(--transition)" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--gray-200)'" onclick="showToast('Downloading ${d}','success')">
                <div style="font-size:32px;margin-bottom:8px">📄</div>
                <div style="font-size:12px;font-weight:600;color:var(--gray-700)">${d}</div>
                <div style="font-size:10px;color:var(--gray-400);margin-top:4px">PDF · Click to download</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- Apply Leave Modal (Self Service) -->
    <div class="modal-backdrop" id="apply-leave-modal2">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-icon orange"><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg></div>
          <div class="modal-header-text"><div class="modal-title">Apply for Leave</div><div class="modal-subtitle">Submit a leave request for approval</div></div>
          <button class="modal-close" onclick="closeModal('apply-leave-modal2')">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Leave Type *</label>
            <select class="form-control">${WP.leaves.balances.map(b=>`<option>${b.type} (${b.available} days available)</option>`).join('')}</select>
          </div>
          <div class="form-row cols-2" style="margin-bottom:14px">
            <div class="form-group"><label class="form-label">From Date *</label><input type="date" class="form-control"/></div>
            <div class="form-group"><label class="form-label">To Date *</label><input type="date" class="form-control"/></div>
          </div>
          <div class="form-group">
            <label class="form-label">Reason *</label>
            <textarea class="form-control" rows="3" placeholder="Enter reason for leave…"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('apply-leave-modal2')">Cancel</button>
          <button class="btn btn-primary" onclick="closeModal('apply-leave-modal2');showToast('Leave request submitted!','success')">Submit Request</button>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div class="modal-backdrop" id="edit-profile-modal">
      <div class="modal modal-lg">
        <div class="modal-header">
          <div class="modal-icon blue"><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
          <div class="modal-header-text"><div class="modal-title">Edit Profile</div><div class="modal-subtitle">Update your personal information</div></div>
          <button class="modal-close" onclick="closeModal('edit-profile-modal')">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-row cols-2" style="margin-bottom:14px">
            <div class="form-group"><label class="form-label">Full Name</label><input type="text" class="form-control" value="${u.name}"/></div>
            <div class="form-group"><label class="form-label">Email</label><input type="email" class="form-control" value="${u.email}"/></div>
          </div>
          <div class="form-row cols-2" style="margin-bottom:14px">
            <div class="form-group"><label class="form-label">Phone</label><input type="tel" class="form-control" value="${u.phone}"/></div>
            <div class="form-group"><label class="form-label">Location</label><input type="text" class="form-control" value="${u.location}"/></div>
          </div>
          <div class="form-group">
            <label class="form-label">Emergency Contact</label>
            <input type="text" class="form-control" placeholder="+91 XXXXX XXXXX"/>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('edit-profile-modal')">Cancel</button>
          <button class="btn btn-primary" onclick="closeModal('edit-profile-modal');showToast('Profile updated!','success')">Save Changes</button>
        </div>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div class="modal-backdrop" id="change-pass-modal">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-icon blue"><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
          <div class="modal-header-text"><div class="modal-title">Change Password</div><div class="modal-subtitle">Secure your account</div></div>
          <button class="modal-close" onclick="closeModal('change-pass-modal')">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group" style="margin-bottom:14px"><label class="form-label">Current Password</label><input type="password" class="form-control" placeholder="••••••••"/></div>
          <div class="form-group" style="margin-bottom:14px"><label class="form-label">New Password</label><input type="password" class="form-control" placeholder="Min 8 characters"/></div>
          <div class="form-group"><label class="form-label">Confirm New Password</label><input type="password" class="form-control" placeholder="Re-enter new password"/></div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('change-pass-modal')">Cancel</button>
          <button class="btn btn-primary" onclick="closeModal('change-pass-modal');showToast('Password changed successfully!','success')">Update Password</button>
        </div>
      </div>
    </div>
  `;
}

function switchSSTab(btn, tabId) {
  btn.closest('.tab-bar').querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#ss-payslips,#ss-leave,#ss-attendance,#ss-docs').forEach(t=>t.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

function showSSDocs() {
  // Switch to the docs tab
  const docBtn = document.querySelector('.tab-btn[onclick*="ss-docs"]');
  if (docBtn) docBtn.click();
}
