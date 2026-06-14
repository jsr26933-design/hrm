/* ===== WorkPilot HR — Supervisor Management Module ===== */

// 1. Supervisor Daily Page Renderer
function renderSupervisorDaily(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Supervisor Daily Dashboard</h1>
        <p>Manage daily approvals, sign-offs, and attendance corrections for your assigned team.</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="showToast('Daily Supervisor Checklist verified and saved!','success')">
          ✓ Verify Checklist
        </button>
      </div>
    </div>

    <!-- Daily KPIs -->
    <div class="grid grid-4" style="margin-bottom:24px">
      <div class="stat-card success">
        <div class="stat-icon green">👥</div>
        <div class="stat-body">
          <div class="stat-label">Shift Presence</div>
          <div class="stat-value">28 / 30</div>
          <div class="stat-change up"><span>93% present today</span></div>
        </div>
      </div>
      <div class="stat-card warning">
        <div class="stat-icon yellow">📝</div>
        <div class="stat-body">
          <div class="stat-label">Correction Requests</div>
          <div class="stat-value">4 Requests</div>
          <div class="stat-change"><span>Awaiting review</span></div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue">⚡</div>
        <div class="stat-body">
          <div class="stat-label">Checklist Tasks</div>
          <div class="stat-value">5 / 6 Done</div>
          <div class="stat-change up"><span>Last task: Handover review</span></div>
        </div>
      </div>
      <div class="stat-card danger">
        <div class="stat-icon red">⚠️</div>
        <div class="stat-body">
          <div class="stat-label">Deficit Hours Alert</div>
          <div class="stat-value">2 Alerts</div>
          <div class="stat-change down"><span>Short hours flagged</span></div>
        </div>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid" style="grid-template-columns: 2fr 1fr; gap: 20px;">
      <!-- Daily Checklist Card -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Daily Supervisor Checklist</div>
        </div>
        <div class="card-body">
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; align-items:flex-start; gap:12px;">
              <input type="checkbox" checked style="margin-top:4px; transform:scale(1.1);"/>
              <div>
                <div style="font-weight:600; font-size:14px; color:var(--gray-800)">Daily Briefing & Work Assignment</div>
                <p style="font-size:12px; color:var(--gray-500); margin:2px 0 0 0;">Conduct morning shift briefing and assign production targets.</p>
              </div>
            </div>
            <div style="display:flex; align-items:flex-start; gap:12px;">
              <input type="checkbox" checked style="margin-top:4px; transform:scale(1.1);"/>
              <div>
                <div style="font-weight:600; font-size:14px; color:var(--gray-800)">Attendance Correction Review</div>
                <p style="font-size:12px; color:var(--gray-500); margin:2px 0 0 0;">Audit geofence bypass alerts and selfie clock-in overrides.</p>
              </div>
            </div>
            <div style="display:flex; align-items:flex-start; gap:12px;">
              <input type="checkbox" checked style="margin-top:4px; transform:scale(1.1);"/>
              <div>
                <div style="font-weight:600; font-size:14px; color:var(--gray-800)">Mid-day Output Tracking</div>
                <p style="font-size:12px; color:var(--gray-500); margin:2px 0 0 0;">Sync and log mid-day progress indicators for line workers.</p>
              </div>
            </div>
            <div style="display:flex; align-items:flex-start; gap:12px;">
              <input type="checkbox" style="margin-top:4px; transform:scale(1.1);"/>
              <div>
                <div style="font-weight:600; font-size:14px; color:var(--gray-800)">Daily Shift Handover Sign-off</div>
                <p style="font-size:12px; color:var(--gray-500); margin:2px 0 0 0;">Submit production, log files, and machine runtime log to night shift.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Daily Remarks</div>
        </div>
        <div class="card-body">
          <textarea class="form-control" style="width:100%; height:120px; font-size:13px; margin-bottom:12px;" placeholder="Add remarks or notes about today's shift (e.g., machine downtime, safety incident)..."></textarea>
          <button class="btn btn-secondary" style="width:100%;" onclick="showToast('Remarks saved successfully!','success')">Save Remarks</button>
        </div>
      </div>
    </div>
  `;
}

// 2. Supervisor Monthly Page Renderer
function renderSupervisorMonthly(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Supervisor Monthly Review</h1>
        <p>View monthly performance highlights, compliance ratings, and team metrics.</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-secondary" onclick="showToast('Exporting monthly supervisor report...')">
          Export PDF
        </button>
      </div>
    </div>

    <!-- Monthly Stats Summary -->
    <div class="grid grid-3" style="margin-bottom:24px">
      <div class="stat-card-blue">
        <div class="grad-stat-icon">📅</div>
        <div class="grad-stat-label">Average Attendance Rate</div>
        <div class="grad-stat-value">95.4% Presence</div>
        <div class="grad-stat-badge">Highest: Operations Line A</div>
      </div>
      <div class="stat-card-green">
        <div class="grad-stat-icon">🎯</div>
        <div class="grad-stat-label">Target Completion</div>
        <div class="grad-stat-value">102.8% achieved</div>
        <div class="grad-stat-badge">2.8% above monthly threshold</div>
      </div>
      <div class="stat-card-orange">
        <div class="grad-stat-icon">⏱️</div>
        <div class="grad-stat-label">Total Overtime Hours</div>
        <div class="grad-stat-value">148 Hours</div>
        <div class="grad-stat-badge">Team overtime credit approved</div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">Team Performance Matrix — June 2026</div>
      </div>
      <div class="table-container">
        <table class="data-table table-modern">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Presence Rate</th>
              <th>Task Completion</th>
              <th>Average Shift Rating</th>
              <th>Compliance Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Arjun Kumar</strong></td>
              <td>98.2%</td>
              <td>12/12 Tasks (100%)</td>
              <td><span style="font-weight:600; color:#10B981">⭐ 4.9 / 5</span></td>
              <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px;">Excellent</span></td>
            </tr>
            <tr>
              <td><strong>Smriti Sharma</strong></td>
              <td>96.5%</td>
              <td>10/12 Tasks (83%)</td>
              <td><span style="font-weight:600; color:#10B981">⭐ 4.5 / 5</span></td>
              <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px;">Excellent</span></td>
            </tr>
            <tr>
              <td><strong>Yogesh Kumar</strong></td>
              <td>94.8%</td>
              <td>11/12 Tasks (91%)</td>
              <td><span style="font-weight:600; color:#10B981">⭐ 4.6 / 5</span></td>
              <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px;">Excellent</span></td>
            </tr>
            <tr>
              <td><strong>Rupali Das</strong></td>
              <td>95.0%</td>
              <td>9/12 Tasks (75%)</td>
              <td><span style="font-weight:600; color:#3b82f6">⭐ 4.2 / 5</span></td>
              <td><span class="badge badge-info" style="background: rgba(37,99,235,0.1); color: #2563eb; padding: 2px 8px; border-radius: 4px;">Good</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 3. Supervisor Payroll Sheet Renderer
function renderSupervisorPayrollSheet(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Supervisor Payroll Review Sheet</h1>
        <p>Audit and submit shift earnings, overtime credits, and bonus pay adjustments for your department.</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="showToast('Team payroll review sheet submitted to HR!','success')">
          Submit to HR
        </button>
      </div>
    </div>

    <!-- Review KPI cards -->
    <div class="grid grid-3" style="margin-bottom:24px">
      <div class="stat-card-blue">
        <div class="grad-stat-icon">💰</div>
        <div class="grad-stat-label">Estimated Gross Salary</div>
        <div class="grad-stat-value">₹8,45,200</div>
        <div class="grad-stat-badge">24 Employees listed</div>
      </div>
      <div class="stat-card-green">
        <div class="grad-stat-icon">➕</div>
        <div class="grad-stat-label">Approved Overtime Credits</div>
        <div class="grad-stat-value">₹48,750</div>
        <div class="grad-stat-badge">148 Hours clocked</div>
      </div>
      <div class="stat-card-orange">
        <div class="grad-stat-icon">➖</div>
        <div class="grad-stat-label">Short hours deductions</div>
        <div class="grad-stat-value">₹3,400</div>
        <div class="grad-stat-badge">Deficit hours audit logged</div>
      </div>
    </div>

    <!-- Payroll table -->
    <div class="table-container">
      <table class="data-table table-modern">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Worked Days</th>
            <th>Base Pay</th>
            <th>Credit Hours (OT)</th>
            <th>Bonuses</th>
            <th>Total Earnings</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Arjun Kumar</strong></td>
            <td>26 Days</td>
            <td>₹75,000</td>
            <td>₹4,500 <span style="font-size:11px;color:var(--gray-400)">(+12h)</span></td>
            <td><input type="number" class="form-control" style="width:100px; height:32px; font-size:13px;" value="2000" /></td>
            <td><strong>₹81,500</strong></td>
            <td><button class="btn btn-secondary btn-sm" onclick="showToast('Arjun Kumar earnings saved.')">Save</button></td>
          </tr>
          <tr>
            <td><strong>Smriti Sharma</strong></td>
            <td>26 Days</td>
            <td>₹60,000</td>
            <td>₹2,800 <span style="font-size:11px;color:var(--gray-400)">(+7.5h)</span></td>
            <td><input type="number" class="form-control" style="width:100px; height:32px; font-size:13px;" value="1500" /></td>
            <td><strong>₹64,300</strong></td>
            <td><button class="btn btn-secondary btn-sm" onclick="showToast('Smriti Sharma earnings saved.')">Save</button></td>
          </tr>
          <tr>
            <td><strong>Yogesh Kumar</strong></td>
            <td>26 Days</td>
            <td>₹45,000</td>
            <td>₹2,800 <span style="font-size:11px;color:var(--gray-400)">(+7.5h)</span></td>
            <td><input type="number" class="form-control" style="width:100px; height:32px; font-size:13px;" value="0" /></td>
            <td><strong>₹47,800</strong></td>
            <td><button class="btn btn-secondary btn-sm" onclick="showToast('Yogesh Kumar earnings saved.')">Save</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

// 4. Supervisor Payroll Columns Renderer
function renderSupervisorPayrollColumns(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Supervisor Payroll Columns Settings</h1>
        <p>Configure which salary headings, allowances, and statutory columns are visible to your line supervisors.</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="showToast('Payroll column visibility settings updated!','success')">
          Save Settings
        </button>
      </div>
    </div>

    <!-- Settings Grid -->
    <div class="card" style="margin-bottom:24px;">
      <div class="card-header">
        <div class="card-title">Salary Elements Column Configurations</div>
      </div>
      <div class="card-body">
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #f1f5f9; padding-bottom:12px;">
            <div>
              <div style="font-weight:600; color:var(--gray-800)">Base Basic Salary</div>
              <div style="font-size:12px; color:var(--gray-500)">Monthly base pay structure of line workers.</div>
            </div>
            <label class="switch">
              <input type="checkbox" checked />
              <span class="slider round"></span>
            </label>
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #f1f5f9; padding-bottom:12px;">
            <div>
              <div style="font-weight:600; color:var(--gray-800)">Overtime Credit Pay (OT)</div>
              <div style="font-size:12px; color:var(--gray-500)">Hourly rate calculations for extra shifts worked.</div>
            </div>
            <label class="switch">
              <input type="checkbox" checked />
              <span class="slider round"></span>
            </label>
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #f1f5f9; padding-bottom:12px;">
            <div>
              <div style="font-weight:600; color:var(--gray-800)">Food & Shift Allowance</div>
              <div style="font-size:12px; color:var(--gray-500)">Daily cafeteria credits and night shift differential pay.</div>
            </div>
            <label class="switch">
              <input type="checkbox" checked />
              <span class="slider round"></span>
            </label>
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #f1f5f9; padding-bottom:12px;">
            <div>
              <div style="font-weight:600; color:var(--gray-800)">TDS & PF Statutory Deductions</div>
              <div style="font-size:12px; color:var(--gray-500)">Tax deductions and Provident Fund contributions.</div>
            </div>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 5. Supervisor Credit Rules Renderer
function renderSupervisorCreditRules(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Supervisor Credit Rules Config</h1>
        <p>Define standard rules for credit hours, grace periods, and late penalty calculations.</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="showToast('Supervisor credit rules saved!','success')">
          Save Credit Rules
        </button>
      </div>
    </div>

    <!-- Configuration Panels -->
    <div class="grid grid-2" style="gap:20px;">
      <!-- Overtime and Credit Rules -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Overtime Credit Settings</div>
        </div>
        <div class="card-body">
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div>
              <label style="font-size:13px; font-weight:600; color:var(--gray-700); display:block; margin-bottom:6px;">Minimum OT Threshold (minutes)</label>
              <input type="number" class="form-control" value="30" style="height:38px; width:100%;"/>
              <span style="font-size:11px; color:var(--gray-400); margin-top:4px; display:block;">OT starts calculating if clocked extra shift exceeds this.</span>
            </div>
            <div>
              <label style="font-size:13px; font-weight:600; color:var(--gray-700); display:block; margin-bottom:6px;">Weekday Overtime Rate Multiplier</label>
              <input type="text" class="form-control" value="1.25" style="height:38px; width:100%;"/>
            </div>
            <div>
              <label style="font-size:13px; font-weight:600; color:var(--gray-700); display:block; margin-bottom:6px;">Weekend Overtime Rate Multiplier</label>
              <input type="text" class="form-control" value="1.50" style="height:38px; width:100%;"/>
            </div>
          </div>
        </div>
      </div>

      <!-- Late Penalties & Grace Periods -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Grace Periods & Penalties</div>
        </div>
        <div class="card-body">
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div>
              <label style="font-size:13px; font-weight:600; color:var(--gray-700); display:block; margin-bottom:6px;">Late Clock-in Grace Period (minutes)</label>
              <input type="number" class="form-control" value="15" style="height:38px; width:100%;"/>
              <span style="font-size:11px; color:var(--gray-400); margin-top:4px; display:block;">No penalty if arrival is within this grace threshold.</span>
            </div>
            <div>
              <label style="font-size:13px; font-weight:600; color:var(--gray-700); display:block; margin-bottom:6px;">Early Clock-out Penalty Rules</label>
              <select class="form-control" style="height:38px; width:100%;">
                <option>Pro-rata hourly deduction</option>
                <option>Flat half-day deduction</option>
                <option>Mark as present (Manual review required)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
