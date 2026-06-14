/* ===== WorkPilot HR — Settings Module ===== */

function renderSettings(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Settings</h1>
        <p>Configure your WorkPilot HR workspace</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="saveAllSettings()">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13"/><polyline points="7 3 7 8 15 8"/></svg>
          Save All Changes
        </button>
      </div>
    </div>

    <div class="grid" style="grid-template-columns:240px 1fr;gap:24px">
      <!-- Settings Nav -->
      <div class="card" style="padding:12px;height:fit-content">
        <nav class="settings-nav">
          ${[
            {id:'general', icon:'⚙️', label:'General'},
            {id:'company', icon:'🏢', label:'Company Profile'},
            {id:'attendance', icon:'✅', label:'Attendance Policy'},
            {id:'leave', icon:'📅', label:'Leave Policy'},
            {id:'payroll', icon:'💰', label:'Payroll Settings'},
            {id:'notifications', icon:'🔔', label:'Notifications'},
            {id:'integrations', icon:'🔗', label:'Integrations'},
            {id:'security', icon:'🔒', label:'Security'},
            {id:'billing', icon:'💳', label:'Billing & Plan'}
          ].map((s,i) => `
            <div class="settings-nav-item ${i===0?'active':''}" onclick="switchSettingsSection(this,'s-${s.id}')">
              <span>${s.icon}</span>
              ${s.label}
            </div>
          `).join('')}
        </nav>
      </div>

      <!-- Settings Content -->
      <div>
        <!-- General -->
        <div id="s-general" class="settings-section active">
          <div class="settings-section-title">General Settings</div>
          <div class="settings-section-desc">Basic configuration for your WorkPilot HR workspace</div>

          <div class="settings-group">
            <div class="settings-group-header">Application</div>
            ${settingRow('App Language', 'Display language for the interface', `<select class="form-control" style="width:180px;height:36px"><option>English (India)</option><option>Hindi</option><option>Tamil</option></select>`)}
            ${settingRow('Date Format', 'Date display format across the app', `<select class="form-control" style="width:180px;height:36px"><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option></select>`)}
            ${settingRow('Time Zone', 'Default timezone for your organization', `<select class="form-control" style="width:180px;height:36px"><option>Asia/Kolkata (IST)</option><option>UTC</option></select>`)}
            ${settingRow('Currency', 'Currency for payroll and reports', `<select class="form-control" style="width:180px;height:36px"><option>INR (₹)</option><option>USD ($)</option><option>EUR (€)</option></select>`)}
          </div>

          <div class="settings-group">
            <div class="settings-group-header">Work Schedule</div>
            ${settingRow('Working Days', 'Default working days per week', `<div style="display:flex;gap:6px">${['Mon','Tue','Wed','Thu','Fri'].map(d=>`<label style="display:flex;flex-direction:column;align-items:center;gap:4px;font-size:11px;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--primary)"/>${d}</label>`).join('')}<label style="display:flex;flex-direction:column;align-items:center;gap:4px;font-size:11px;cursor:pointer"><input type="checkbox" style="accent-color:var(--primary)"/>Sat</label></div>`)}
            ${settingRow('Office Start Time', 'Official working hours start', `<input type="time" class="form-control" style="width:140px" value="09:00"/>`)}
            ${settingRow('Office End Time', 'Official working hours end', `<input type="time" class="form-control" style="width:140px" value="18:00"/>`)}
            ${settingRow('Late Arrival Buffer', 'Minutes grace period before marking late', `<input type="number" class="form-control" style="width:100px" value="15" min="0" max="60"/>`)}
          </div>
        </div>

        <!-- Company Profile -->
        <div id="s-company" class="settings-section">
          <div class="settings-section-title">Company Profile</div>
          <div class="settings-section-desc">Manage your organization's basic information</div>
          <div class="settings-group">
            <div class="settings-group-header">Organization Details</div>
            ${settingRow('Company Name', 'Legal name of your organization', `<input type="text" class="form-control" style="width:280px" value="TechCorp India Pvt. Ltd."/>`)}
            ${settingRow('Industry', 'Your industry sector', `<select class="form-control" style="width:200px;height:36px"><option>Technology</option><option>Manufacturing</option><option>Retail</option><option>Services</option></select>`)}
            ${settingRow('Company Size', 'Number of employees', `<select class="form-control" style="width:200px;height:36px"><option>101-500</option><option>501-1000</option><option>1000+</option></select>`)}
            ${settingRow('PAN Number', 'Company PAN for statutory compliance', `<input type="text" class="form-control" style="width:200px" value="ABCDE1234F"/>`)}
            ${settingRow('GST Number', 'GST registration number', `<input type="text" class="form-control" style="width:220px" value="27ABCDE1234F1Z5"/>`)}
          </div>
          <div class="settings-group">
            <div class="settings-group-header">Registered Address</div>
            ${settingRow('Address', 'Office address', `<textarea class="form-control" style="width:340px;height:70px">123, Business Park, Lower Parel, Mumbai - 400013</textarea>`)}
          </div>
        </div>

        <!-- Attendance Policy -->
        <div id="s-attendance" class="settings-section">
          <div class="settings-section-title">Attendance Policy</div>
          <div class="settings-section-desc">Configure attendance tracking rules and policies</div>
          <div class="settings-group">
            <div class="settings-group-header">Check-in Settings</div>
            ${settingToggle('GPS Attendance', 'Require GPS location for attendance marking', true)}
            ${settingToggle('Selfie Verification', 'Require selfie photo for attendance', true)}
            ${settingToggle('Geo-fence Enforcement', 'Restrict check-in to defined zones only', false)}
            ${settingToggle('Biometric Integration', 'Sync with biometric device data', true)}
            ${settingToggle('Mobile App Check-in', 'Allow check-in via mobile app', true)}
          </div>
          <div class="settings-group">
            <div class="settings-group-header">Overtime Rules</div>
            ${settingToggle('Auto-calculate Overtime', 'Automatically compute overtime hours', true)}
            ${settingRow('Daily OT Threshold', 'Hours after which OT begins', `<input type="number" class="form-control" style="width:80px" value="9"/>`)}
            ${settingToggle('Weekend OT', 'Count weekend work as overtime', false)}
          </div>
        </div>

        <!-- Leave Policy -->
        <div id="s-leave" class="settings-section">
          <div class="settings-section-title">Leave Policy</div>
          <div class="settings-section-desc">Configure leave types and entitlement rules</div>
          <div class="settings-group">
            <div class="settings-group-header">Leave Rules</div>
            ${settingToggle('Allow Advance Leave', 'Employees can apply for future dates', true)}
            ${settingToggle('Auto-approve After N Days', 'Auto-approve if not reviewed in time', false)}
            ${settingRow('Min Days Notice', 'Minimum days before leave date for application', `<input type="number" class="form-control" style="width:80px" value="1"/>`)}
            ${settingRow('Max Consecutive Days', 'Maximum days in a single leave application', `<input type="number" class="form-control" style="width:80px" value="30"/>`)}
            ${settingToggle('Carry Forward', 'Allow unused EL carry to next year', true)}
            ${settingRow('Max Carry Forward Days', 'Maximum EL days carried forward', `<input type="number" class="form-control" style="width:80px" value="30"/>`)}
          </div>
        </div>

        <!-- Payroll Settings -->
        <div id="s-payroll" class="settings-section">
          <div class="settings-section-title">Payroll Settings</div>
          <div class="settings-section-desc">Configure payroll cycles and statutory deductions</div>
          <div class="settings-group">
            <div class="settings-group-header">Payroll Cycle</div>
            ${settingRow('Pay Frequency', 'Payroll processing frequency', `<select class="form-control" style="width:160px;height:36px"><option>Monthly</option><option>Weekly</option><option>Bi-weekly</option></select>`)}
            ${settingRow('Pay Day', 'Day of month salary is disbursed', `<input type="number" class="form-control" style="width:80px" value="30" min="1" max="31"/>`)}
            ${settingRow('Payroll Calculation Basis', 'How to calculate per-day salary', `<select class="form-control" style="width:200px;height:36px"><option>Calendar Days (30)</option><option>Working Days</option></select>`)}
          </div>
          <div class="settings-group">
            <div class="settings-group-header">Statutory Deductions</div>
            ${settingToggle('PF Deduction', 'Enable Provident Fund (12% employee)', true)}
            ${settingToggle('ESI Deduction', 'Enable ESI (0.75% employee)', true)}
            ${settingToggle('Professional Tax', 'Enable state Professional Tax', true)}
            ${settingToggle('TDS Calculation', 'Auto-calculate TDS on salary', true)}
          </div>
        </div>

        <!-- Notifications -->
        <div id="s-notifications" class="settings-section">
          <div class="settings-section-title">Notification Settings</div>
          <div class="settings-section-desc">Choose what alerts you receive and how</div>
          <div class="settings-group">
            <div class="settings-group-header">Email Notifications</div>
            ${settingToggle('Leave Requests', 'Email when leave requests are submitted', true)}
            ${settingToggle('Payroll Processed', 'Email when payroll is completed', true)}
            ${settingToggle('Attendance Alerts', 'Daily attendance summary email', false)}
            ${settingToggle('Task Assignments', 'Email on task assignment', true)}
            ${settingToggle('New Employee Joins', 'Alert on new joinee onboarding', true)}
          </div>
          <div class="settings-group">
            <div class="settings-group-header">In-App Notifications</div>
            ${settingToggle('Push Notifications', 'Show browser push notifications', true)}
            ${settingToggle('Sound Alerts', 'Play sound for new notifications', false)}
          </div>
        </div>

        <!-- Integrations -->
        <div id="s-integrations" class="settings-section">
          <div class="settings-section-title">Integrations</div>
          <div class="settings-section-desc">Connect WorkPilot HR with third-party tools</div>
          <div class="settings-group">
            <div class="settings-group-header">Available Integrations</div>
            ${[
              {name:'Slack', desc:'Team notifications and alerts', icon:'💬', active:true},
              {name:'Google Workspace', desc:'Calendar sync and SSO login', icon:'🔵', active:true},
              {name:'WhatsApp Business', desc:'Send attendance and payslip alerts', icon:'💚', active:false},
              {name:'Zoho Books', desc:'Sync payroll with accounting', icon:'📚', active:false},
              {name:'Tally ERP', desc:'Payroll journal entries export', icon:'🔢', active:false},
              {name:'BioTime / ZKTeco', desc:'Biometric device data sync', icon:'👆', active:true}
            ].map(int=>`
              <div style="display:flex;align-items:center;gap:14px;padding:16px 20px;border-bottom:1px solid var(--gray-100)">
                <span style="font-size:28px">${int.icon}</span>
                <div style="flex:1">
                  <div style="font-size:14px;font-weight:700;color:var(--gray-800)">${int.name}</div>
                  <div style="font-size:12px;color:var(--gray-500);margin-top:2px">${int.desc}</div>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" ${int.active?'checked':''} onchange="showToast('${int.name} integration ${int.active?'disabled':'enabled'}','success')"/>
                  <span class="toggle-slider"></span>
                </label>
                ${int.active?`<button class="btn btn-outline btn-sm" onclick="showToast('Configuring ${int.name}…')">Configure</button>`:''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Security -->
        <div id="s-security" class="settings-section">
          <div class="settings-section-title">Security Settings</div>
          <div class="settings-section-desc">Protect your HR data with robust security controls</div>
          <div class="settings-group">
            <div class="settings-group-header">Authentication</div>
            ${settingToggle('Two-Factor Authentication', 'Require 2FA for all admin logins', true)}
            ${settingToggle('Single Sign-On (SSO)', 'Allow Google/Azure SSO login', false)}
            ${settingRow('Session Timeout', 'Auto-logout after inactivity', `<select class="form-control" style="width:160px;height:36px"><option>30 minutes</option><option>1 hour</option><option>4 hours</option><option>8 hours</option></select>`)}
            ${settingRow('Password Expiry', 'Force password change every N days', `<select class="form-control" style="width:160px;height:36px"><option>90 days</option><option>60 days</option><option>Never</option></select>`)}
          </div>
          <div class="settings-group">
            <div class="settings-group-header">Data Privacy</div>
            ${settingToggle('Audit Log', 'Log all admin actions and changes', true)}
            ${settingToggle('Data Masking', 'Mask sensitive data in exports', false)}
          </div>
        </div>

        <!-- Billing -->
        <div id="s-billing" class="settings-section">
          <div class="settings-section-title">Billing & Plan</div>
          <div class="settings-section-desc">Manage your subscription and usage</div>
          <div style="background:linear-gradient(135deg,var(--secondary),#1E3A5F);border-radius:var(--border-radius-lg);padding:28px;color:white;margin-bottom:20px">
            <div style="display:flex;align-items:flex-start;justify-content:space-between">
              <div>
                <div style="font-size:12px;opacity:.6;text-transform:uppercase;letter-spacing:.08em">Current Plan</div>
                <div style="font-size:26px;font-weight:800;margin-top:6px">Enterprise</div>
                <div style="font-size:13px;opacity:.7;margin-top:4px">₹12,000/month · Billed annually</div>
              </div>
              <div style="background:var(--accent);color:white;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:700">ACTIVE</div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:20px">
              ${[['Employees','Unlimited'],['Storage','50 GB'],['Companies','5'],['API Access','Yes']].map(([k,v])=>`
                <div><div style="font-size:11px;opacity:.5;text-transform:uppercase">${k}</div><div style="font-size:15px;font-weight:700;margin-top:3px">${v}</div></div>
              `).join('')}
            </div>
          </div>
          <div class="card">
            <div class="card-header"><div class="card-title">Invoice History</div></div>
            <div class="table-container">
              <table class="data-table">
                <thead><tr><th>Invoice</th><th>Date</th><th>Amount</th><th>Status</th><th>Download</th></tr></thead>
                <tbody>
                  ${['Jun 2025','May 2025','Apr 2025','Mar 2025'].map((m,i)=>`
                    <tr>
                      <td style="font-weight:600">INV-2025-${String(6-i).padStart(2,'0')}</td>
                      <td>${m}</td>
                      <td style="font-weight:600">₹12,000</td>
                      <td>${statusBadge('processed')}</td>
                      <td><button class="btn btn-ghost btn-sm" onclick="showToast('Downloading invoice…','success')">PDF</button></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

function settingRow(label, desc, control) {
  return `
    <div class="settings-row">
      <div class="settings-row-info">
        <label>${label}</label>
        <p>${desc}</p>
      </div>
      ${control}
    </div>
  `;
}

function settingToggle(label, desc, checked) {
  return `
    <div class="settings-row">
      <div class="settings-row-info">
        <label>${label}</label>
        <p>${desc}</p>
      </div>
      <label class="toggle-switch">
        <input type="checkbox" ${checked?'checked':''} onchange="showToast('${label} setting updated','success')"/>
        <span class="toggle-slider"></span>
      </label>
    </div>
  `;
}

function switchSettingsSection(btn, sectionId) {
  document.querySelectorAll('.settings-nav-item').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.settings-section').forEach(s=>s.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
}

function saveAllSettings() {
  showToast('All settings saved successfully!', 'success');
}
