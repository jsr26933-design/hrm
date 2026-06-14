/* ===== WorkPilot HR — Attendance Management Module ===== */

let isCheckedIn = false;

function renderAttendance(container) {
  const att = WP.attendance.today;
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Attendance Management</h1>
        <p>Track and manage daily employee attendance</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-secondary" onclick="showToast('Downloading attendance report…','success')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export
        </button>
        <button class="btn btn-primary" onclick="openModal('bulk-att-modal')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Bulk Attendance
        </button>
      </div>
    </div>

    <!-- KPI Stats -->
    <div class="grid grid-4" style="margin-bottom:24px">
      <div class="stat-card success">
        <div class="stat-icon green"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4"/></svg></div>
        <div class="stat-body">
          <div class="stat-label">Present</div>
          <div class="stat-value">${att.present}</div>
          <div class="stat-change up"><span>${Math.round(att.present/att.total*100)}% of total</span></div>
        </div>
      </div>
      <div class="stat-card danger">
        <div class="stat-icon red"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div>
        <div class="stat-body">
          <div class="stat-label">Absent</div>
          <div class="stat-value">${att.absent}</div>
          <div class="stat-change down"><span>${Math.round(att.absent/att.total*100)}% of total</span></div>
        </div>
      </div>
      <div class="stat-card warning">
        <div class="stat-icon yellow"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
        <div class="stat-body">
          <div class="stat-label">Late Arrivals</div>
          <div class="stat-value">${att.late}</div>
          <div class="stat-change down"><span>After 9:30 AM</span></div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg></div>
        <div class="stat-body">
          <div class="stat-label">On Leave</div>
          <div class="stat-value">${att.onLeave}</div>
          <div class="stat-change"><span>Approved leaves</span></div>
        </div>
      </div>
    </div>

    <div class="grid" style="grid-template-columns:300px 1fr;gap:20px">
      <!-- Check-in Widget -->
      <div>
        <div class="checkin-card" style="margin-bottom:16px">
          <div class="checkin-time" id="live-clock">--:--:--</div>
          <div class="checkin-date">${getTodayDate()}</div>
          <div class="checkin-status">
            <div style="width:8px;height:8px;border-radius:50%;background:#4ADE80;animation:livePulse 1.5s infinite"></div>
            ${isCheckedIn ? 'Checked In · 09:02 AM' : 'Not Checked In'}
          </div>
          <button class="checkin-btn ${isCheckedIn?'checked-in':''}" id="checkin-btn" onclick="toggleCheckin()">
            ${isCheckedIn ? '🔴 Check Out' : '🟢 Check In'}
          </button>
        </div>

        <!-- My Attendance Calendar -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">My June 2025</div>
          </div>
          <div class="card-body">
            <div class="attendance-calendar">
              ${['S','M','T','W','T','F','S'].map(d=>`<div class="cal-header-cell">${d}</div>`).join('')}
              ${Array(6).fill(0).map(()=>'<div class="cal-day empty"></div>').join('')}
              ${Array.from({length:30},(_,i)=>{
                const d=i+1;
                const types=['P','P','P','P','P','W','W','P','P','P','P','L','W','W','H','P','P','P','P','P','W','W','P','P','P','P','P','W','W','T'];
                const t=types[i];
                const cls=t==='P'?'present':t==='L'?'late':t==='W'?'weekend':t==='H'?'absent':t==='T'?'today present':'';
                return `<div class="cal-day ${cls}">${d}</div>`;
              }).join('')}
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:14px">
              ${[{l:'Present',c:'var(--success)'},{l:'Late',c:'var(--warning)'},{l:'Absent',c:'var(--danger)'},{l:'Holiday',c:'var(--gray-300)'}]
                .map(x=>`<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--gray-500)"><div style="width:8px;height:8px;border-radius:50%;background:${x.c}"></div>${x.l}</div>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Attendance Table + Chart -->
      <div>
        <div class="card" style="margin-bottom:20px">
          <div class="card-header">
            <div class="card-title">Attendance Trend — June 2025</div>
          </div>
          <div class="card-body">
            <div class="chart-wrap" style="height:220px"><canvas id="attTrendChart"></canvas></div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-title">Today's Attendance Log</div>
            <div style="display:flex;gap:8px">
              <input type="date" class="form-control" style="width:160px;height:36px" value="2025-06-13"/>
              <select class="form-control" style="width:140px;height:36px">
                <option>All Status</option>
                <option>Present</option>
                <option>Absent</option>
                <option>Late</option>
                <option>On Leave</option>
              </select>
            </div>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Employee</th><th>Check In</th><th>Check Out</th>
                  <th>Hours Worked</th><th>Location</th><th>Status</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${WP.attendance.records.map(r => `
                  <tr>
                    <td>
                      <div class="emp-cell">
                        <div class="emp-avatar" style="background:${avatarColors(r.empId.slice(-2))}">${r.empId.slice(-2)}</div>
                        <div>
                          <div class="emp-name">${r.empName}</div>
                          <div class="emp-id">${r.empId}</div>
                        </div>
                      </div>
                    </td>
                    <td style="font-weight:600;color:${r.checkIn==='—'?'var(--gray-300)':'var(--gray-700)'}">${r.checkIn}</td>
                    <td style="color:${r.checkOut==='—'?'var(--gray-300)':'var(--gray-700)'}">${r.checkOut}</td>
                    <td><span style="font-weight:600">${r.hours}</span></td>
                    <td>
                      <div style="display:flex;align-items:center;gap:5px;font-size:12px">
                        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        ${r.location}
                      </div>
                    </td>
                    <td>${statusBadge(r.status)}</td>
                    <td>
                      <button class="btn-icon" onclick="showToast('Editing attendance for ${r.empName}')" title="Edit">
                        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="card-footer" style="display:flex;align-items:center;justify-content:space-between">
            <span style="font-size:13px;color:var(--gray-500)">Showing 8 of 248 records</span>
            <div style="display:flex;gap:4px">
              <button class="btn btn-secondary btn-sm">← Prev</button>
              <button class="btn btn-primary btn-sm">Next →</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bulk Attendance Modal -->
    <div class="modal-backdrop" id="bulk-att-modal">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-icon blue"><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
          <div class="modal-header-text">
            <div class="modal-title">Bulk Attendance Upload</div>
            <div class="modal-subtitle">Upload attendance data via Excel/CSV file</div>
          </div>
          <button class="modal-close" onclick="closeModal('bulk-att-modal')">✕</button>
        </div>
        <div class="modal-body">
          <div style="border:2px dashed var(--gray-300);border-radius:12px;padding:40px;text-align:center;margin-bottom:16px;cursor:pointer;transition:var(--transition)" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--gray-300)'">
            <div style="font-size:36px;margin-bottom:10px">📂</div>
            <div style="font-size:14px;font-weight:600;color:var(--gray-700)">Drop your file here</div>
            <div style="font-size:12px;color:var(--gray-400);margin-top:4px">Supports .xlsx, .csv — Max 5MB</div>
            <button class="btn btn-outline" style="margin-top:14px">Browse Files</button>
          </div>
          <a href="#" style="font-size:13px;color:var(--primary)">📥 Download Template</a>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('bulk-att-modal')">Cancel</button>
          <button class="btn btn-primary" onclick="closeModal('bulk-att-modal');showToast('Attendance uploaded!','success')">Upload & Process</button>
        </div>
      </div>
    </div>
  `;

  startClock();
  setTimeout(() => initAttTrendChart(), 100);
}

function toggleCheckin() {
  isCheckedIn = !isCheckedIn;
  const btn = document.getElementById('checkin-btn');
  const statusEl = btn.previousElementSibling;
  if (isCheckedIn) {
    btn.textContent = '🔴 Check Out';
    btn.classList.add('checked-in');
    statusEl.innerHTML = `<div style="width:8px;height:8px;border-radius:50%;background:#4ADE80;animation:livePulse 1.5s infinite"></div> Checked In · ${new Date().toLocaleTimeString('en-IN', {hour:'2-digit',minute:'2-digit'})}`;
    showToast('Checked in successfully!', 'success');
  } else {
    btn.textContent = '🟢 Check In';
    btn.classList.remove('checked-in');
    statusEl.innerHTML = `<div style="width:8px;height:8px;border-radius:50%;background:#94A3B8"></div> Checked Out`;
    showToast('Checked out. Have a great day!', 'success');
  }
}

function initAttTrendChart() {
  const ctx = document.getElementById('attTrendChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jun 1','Jun 3','Jun 5','Jun 7','Jun 9','Jun 11','Jun 13'],
      datasets: [
        { label: 'Present', data: [218,221,215,0,0,212,214], backgroundColor: '#10B981', borderRadius: 4 },
        { label: 'Absent', data: [22,19,25,0,0,21,18], backgroundColor: '#EF4444', borderRadius: 4 },
        { label: 'Late', data: [8,8,8,0,0,15,12], backgroundColor: '#F59E0B', borderRadius: 4 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top', labels: { font: { family: 'Inter', size: 11 }, usePointStyle: true } } },
      scales: {
        x: { stacked: true, grid: { display: false }, ticks: { font: { family: 'Inter', size: 11 } } },
        y: { stacked: true, grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { family: 'Inter', size: 11 } } }
      }
    }
  });
}

// ── Attendance Logs Renderer ──
function renderAttendanceLogs(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Attendance Logs</h1>
        <p>Audit and search check-in and check-out logs for all employees.</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-secondary" onclick="showToast('Exporting attendance logs...')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export CSV
        </button>
      </div>
    </div>

    <!-- Filter toolbar -->
    <div class="card" style="margin-bottom:24px; padding:16px;">
      <div style="display:flex; gap:16px; flex-wrap:wrap;">
        <div style="flex:1; min-width:200px;">
          <label style="font-size:12px; font-weight:600; color:var(--gray-500); display:block; margin-bottom:6px;">Search Employee</label>
          <input type="text" class="form-control" placeholder="Search by name or ID..." style="height:38px;"/>
        </div>
        <div style="width:180px;">
          <label style="font-size:12px; font-weight:600; color:var(--gray-500); display:block; margin-bottom:6px;">Date</label>
          <input type="date" class="form-control" value="2026-06-14" style="height:38px;"/>
        </div>
        <div style="width:160px;">
          <label style="font-size:12px; font-weight:600; color:var(--gray-500); display:block; margin-bottom:6px;">Status</label>
          <select class="form-control" style="height:38px;">
            <option>All Statuses</option>
            <option>Present</option>
            <option>Absent</option>
            <option>Late</option>
            <option>Half Day</option>
          </select>
        </div>
        <div style="width:160px;">
          <label style="font-size:12px; font-weight:600; color:var(--gray-500); display:block; margin-bottom:6px;">Sync Status</label>
          <select class="form-control" style="height:38px;">
            <option>All Syncs</option>
            <option>Synced</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Logs Table -->
    <div class="table-container">
      <table class="data-table table-modern">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Check-in Details</th>
            <th>Check-out Details</th>
            <th>Total Hours</th>
            <th>Device/Source</th>
            <th>Sync Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="emp-cell">
                <div class="emp-avatar" style="background:#3B82F6">AK</div>
                <div>
                  <div class="emp-name">Arjun Kumar</div>
                  <div class="emp-id">WP-001</div>
                </div>
              </div>
            </td>
            <td>
              <div><strong>09:02 AM</strong></div>
              <div style="font-size:11px; color:var(--gray-400)">📍 Mumbai HO (Geofence In)</div>
            </td>
            <td>
              <div><strong>06:15 PM</strong></div>
              <div style="font-size:11px; color:var(--gray-400)">📍 Mumbai HO (Geofence Out)</div>
            </td>
            <td><span style="font-weight:600">9.2 hrs</span></td>
            <td><span class="badge" style="background:#f1f5f9; color:#475569; padding: 2px 8px; border-radius: 4px; font-size: 11px;">iOS App (Face ID)</span></td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size: 11px;">Synced</span></td>
          </tr>
          <tr>
            <td>
              <div class="emp-cell">
                <div class="emp-avatar" style="background:#10B981">SS</div>
                <div>
                  <div class="emp-name">Smriti Sharma</div>
                  <div class="emp-id">WP-004</div>
                </div>
              </div>
            </td>
            <td>
              <div><strong>09:15 AM</strong></div>
              <div style="font-size:11px; color:var(--gray-400)">📍 Mumbai HO (Geofence In)</div>
            </td>
            <td>
              <div><strong>06:00 PM</strong></div>
              <div style="font-size:11px; color:var(--gray-400)">📍 Mumbai HO (Geofence Out)</div>
            </td>
            <td><span style="font-weight:600">8.75 hrs</span></td>
            <td><span class="badge" style="background:#f1f5f9; color:#475569; padding: 2px 8px; border-radius: 4px; font-size: 11px;">Android App (Fingerprint)</span></td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size: 11px;">Synced</span></td>
          </tr>
          <tr>
            <td>
              <div class="emp-cell">
                <div class="emp-avatar" style="background:#F59E0B">YK</div>
                <div>
                  <div class="emp-name">Yogesh Kumar</div>
                  <div class="emp-id">WP-008</div>
                </div>
              </div>
            </td>
            <td>
              <div><strong>09:45 AM</strong> <span style="color:var(--warning); font-size:11px; font-weight:600;">(Late)</span></div>
              <div style="font-size:11px; color:var(--gray-400)">📍 Pune Office (Geofence In)</div>
            </td>
            <td>
              <div><strong>06:30 PM</strong></div>
              <div style="font-size:11px; color:var(--gray-400)">📍 Pune Office (Geofence Out)</div>
            </td>
            <td><span style="font-weight:600">8.75 hrs</span></td>
            <td><span class="badge" style="background:#f1f5f9; color:#475569; padding: 2px 8px; border-radius: 4px; font-size: 11px;">Biometric Reader</span></td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size: 11px;">Synced</span></td>
          </tr>
          <tr>
            <td>
              <div class="emp-cell">
                <div class="emp-avatar" style="background:#8B5CF6">RD</div>
                <div>
                  <div class="emp-name">Rupali Das</div>
                  <div class="emp-id">WP-012</div>
                </div>
              </div>
            </td>
            <td>
              <div><strong>09:05 AM</strong></div>
              <div style="font-size:11px; color:var(--gray-400)">📍 Pune Office (Geofence In)</div>
            </td>
            <td>
              <div><strong>05:45 PM</strong></div>
              <div style="font-size:11px; color:var(--gray-400)">📍 Pune Office (Geofence Out)</div>
            </td>
            <td><span style="font-weight:600">8.6 hrs</span></td>
            <td><span class="badge" style="background:#f1f5f9; color:#475569; padding: 2px 8px; border-radius: 4px; font-size: 11px;">Web Portal</span></td>
            <td><span class="badge badge-warning" style="background: rgba(245,158,11,0.1); color: #d97706; padding: 2px 8px; border-radius: 4px; font-size: 11px;">Pending</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

// ── Attendance Report Renderer ──
function renderAttendanceReport(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Attendance Analytics & Report</h1>
        <p>Analyze company-wide attendance rates, top late-comers, and absent trends.</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="showToast('Downloading monthly attendance PDF report...')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download PDF Report
        </button>
      </div>
    </div>

    <!-- Stats summary grid -->
    <div class="grid grid-4" style="margin-bottom:24px">
      <div class="stat-card">
        <div class="stat-icon blue">📈</div>
        <div class="stat-body">
          <div class="stat-label">Avg Presence Rate</div>
          <div class="stat-value">94.2%</div>
          <div class="stat-change up"><span>+1.5% this month</span></div>
        </div>
      </div>
      <div class="stat-card success">
        <div class="stat-icon green">⏱️</div>
        <div class="stat-body">
          <div class="stat-label">Avg Clock-in Time</div>
          <div class="stat-value">9:12 AM</div>
          <div class="stat-change up"><span>5 mins earlier</span></div>
        </div>
      </div>
      <div class="stat-card warning">
        <div class="stat-icon yellow">⚠️</div>
        <div class="stat-body">
          <div class="stat-label">Late Clock-ins</div>
          <div class="stat-value">4.8%</div>
          <div class="stat-change down"><span>-0.8% decrease</span></div>
        </div>
      </div>
      <div class="stat-card danger">
        <div class="stat-icon red">❌</div>
        <div class="stat-body">
          <div class="stat-label">Unexcused Absences</div>
          <div class="stat-value">0.6%</div>
          <div class="stat-change"><span>Stable trend</span></div>
        </div>
      </div>
    </div>

    <div class="grid grid-2" style="margin-bottom:24px; gap:20px;">
      <!-- Attendance Statistics -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Presence by Department</div>
        </div>
        <div class="card-body">
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div>
              <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:600; margin-bottom:4px;">
                <span>Operations</span>
                <span>96.8%</span>
              </div>
              <div style="height:8px; background:#f1f5f9; border-radius:4px; overflow:hidden;">
                <div style="height:100%; width:96.8%; background:#10B981; border-radius:4px;"></div>
              </div>
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:600; margin-bottom:4px;">
                <span>Engineering</span>
                <span>94.5%</span>
              </div>
              <div style="height:8px; background:#f1f5f9; border-radius:4px; overflow:hidden;">
                <div style="height:100%; width:94.5%; background:#3B82F6; border-radius:4px;"></div>
              </div>
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:600; margin-bottom:4px;">
                <span>Human Resources</span>
                <span>95.0%</span>
              </div>
              <div style="height:8px; background:#f1f5f9; border-radius:4px; overflow:hidden;">
                <div style="height:100%; width:95%; background:#8B5CF6; border-radius:4px;"></div>
              </div>
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:600; margin-bottom:4px;">
                <span>Sales & Marketing</span>
                <span>91.2%</span>
              </div>
              <div style="height:8px; background:#f1f5f9; border-radius:4px; overflow:hidden;">
                <div style="height:100%; width:91.2%; background:#F59E0B; border-radius:4px;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick regularization list -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Pending Regularizations</div>
        </div>
        <div class="card-body" style="padding:0;">
          <table class="data-table" style="font-size:13px;">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Missed Punch Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Amit Singh</strong></td>
                <td>12 Jun 2026</td>
                <td><button class="btn btn-secondary btn-sm" onclick="showToast('Approved regularization')">Approve</button></td>
              </tr>
              <tr>
                <td><strong>Rahul Verma</strong></td>
                <td>11 Jun 2026</td>
                <td><button class="btn btn-secondary btn-sm" onclick="showToast('Approved regularization')">Approve</button></td>
              </tr>
              <tr>
                <td><strong>Sanjana Rao</strong></td>
                <td>10 Jun 2026</td>
                <td><button class="btn btn-secondary btn-sm" onclick="showToast('Approved regularization')">Approve</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ── Daily Credit Summary Renderer ──
function renderDailyCreditSummary(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Daily Attendance Credit Summary</h1>
        <p>Review standard shift durations, total hours clocked, and overtime/deficit credits.</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="showToast('Syncing all credits with Payroll...')">
          🔄 Sync with Payroll
        </button>
      </div>
    </div>

    <!-- Summary KPI cards -->
    <div class="grid grid-3" style="margin-bottom:24px">
      <div class="stat-card-blue">
        <div class="grad-stat-icon">🕒</div>
        <div class="grad-stat-label">Total Clocked Hours</div>
        <div class="grad-stat-value">1,984 Hours</div>
        <div class="grad-stat-badge">Company-wide today</div>
      </div>
      <div class="stat-card-green">
        <div class="grad-stat-icon">📈</div>
        <div class="grad-stat-label">Overtime Credits</div>
        <div class="grad-stat-value">+64.5 Hours</div>
        <div class="grad-stat-badge">Extra worked hours approved</div>
      </div>
      <div class="stat-card-orange">
        <div class="grad-stat-icon">📉</div>
        <div class="grad-stat-label">Deficit Hours</div>
        <div class="grad-stat-value">-12.0 Hours</div>
        <div class="grad-stat-badge">Shortfall hours flagged</div>
      </div>
    </div>

    <!-- Credits Table -->
    <div class="table-container">
      <table class="data-table table-modern">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Shift Type</th>
            <th>Standard Hours</th>
            <th>Clocked Hours</th>
            <th>Credit Hours (OT)</th>
            <th>Shift Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Arjun Kumar</strong></td>
            <td>General Shift (09:00 - 18:00)</td>
            <td>8.0 hrs</td>
            <td>9.2 hrs</td>
            <td><span style="color:#10B981; font-weight:700;">+1.2 hrs</span></td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Completed</span></td>
          </tr>
          <tr>
            <td><strong>Smriti Sharma</strong></td>
            <td>General Shift (09:00 - 18:00)</td>
            <td>8.0 hrs</td>
            <td>8.75 hrs</td>
            <td><span style="color:#10B981; font-weight:700;">+0.75 hrs</span></td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Completed</span></td>
          </tr>
          <tr>
            <td><strong>Yogesh Kumar</strong></td>
            <td>General Shift (09:00 - 18:00)</td>
            <td>8.0 hrs</td>
            <td>8.75 hrs</td>
            <td><span style="color:#10B981; font-weight:700;">+0.75 hrs</span></td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Completed</span></td>
          </tr>
          <tr>
            <td><strong>Rupali Das</strong></td>
            <td>General Shift (09:00 - 18:00)</td>
            <td>8.0 hrs</td>
            <td>8.6 hrs</td>
            <td><span style="color:#10B981; font-weight:700;">+0.6 hrs</span></td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Completed</span></td>
          </tr>
          <tr>
            <td><strong>Amit Singh</strong></td>
            <td>General Shift (09:00 - 18:00)</td>
            <td>8.0 hrs</td>
            <td>6.5 hrs</td>
            <td><span style="color:#EF4444; font-weight:700;">-1.5 hrs</span></td>
            <td><span class="badge badge-warning" style="background: rgba(245,158,11,0.1); color: #d97706; padding: 2px 8px; border-radius: 4px; font-size:11px;">Short Hours</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}
