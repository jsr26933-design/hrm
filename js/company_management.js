/* ===== WorkPilot HR — Company Management Modules ===== */

// 1. Company Profile Renderer
function renderCompany(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Company Profile</h1>
        <p>Manage primary registration details, tax identifiers, and corporate logo settings.</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="saveCompanyProfile()">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          Save Profile
        </button>
      </div>
    </div>

    <!-- KPI summary row -->
    <div class="grid grid-4" style="margin-bottom:24px">
      <div class="stat-card-blue">
        <div class="grad-stat-icon">🏢</div>
        <div class="grad-stat-label">Registered Entity</div>
        <div class="grad-stat-value" style="font-size: 16px; margin: 8px 0;">WorkPilot Services Pvt. Ltd.</div>
        <div class="grad-stat-badge">Incorporated 2022</div>
      </div>
      <div class="stat-card-green">
        <div class="grad-stat-icon">🧾</div>
        <div class="grad-stat-label">GSTIN Status</div>
        <div class="grad-stat-value" style="font-size: 16px; margin: 8px 0;">27AABCW1234F1Z0</div>
        <div class="grad-stat-badge">Active & Verified</div>
      </div>
      <div class="stat-card-orange">
        <div class="grad-stat-icon">📍</div>
        <div class="grad-stat-label">Head Office</div>
        <div class="grad-stat-value" style="font-size: 16px; margin: 8px 0;">Mumbai, Maharashtra</div>
        <div class="grad-stat-badge">4 Branches active</div>
      </div>
      <div class="stat-card-purple">
        <div class="grad-stat-icon">👥</div>
        <div class="grad-stat-label">Total Staff</div>
        <div class="grad-stat-value" style="font-size: 16px; margin: 8px 0;">248 Employees</div>
        <div class="grad-stat-badge">Across all departments</div>
      </div>
    </div>

    <!-- Company Details Card / Form -->
    <div class="card card-premium" style="padding: 24px;">
      <h3 style="margin-bottom: 20px; color: #0F2D6B; font-size: 16px;">Corporate Identity Settings</h3>
      <form id="company-profile-form" onsubmit="event.preventDefault();">
        <div class="form-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px;">
          <div class="form-group-v2">
            <label style="display:block; margin-bottom:6px; font-weight:600; font-size:12px; color:#475569;">Company Name *</label>
            <input type="text" value="WorkPilot Services Pvt. Ltd." style="width:100%; padding:10px; border:1px solid #CBD5E1; border-radius:6px;" required />
          </div>
          <div class="form-group-v2">
            <label style="display:block; margin-bottom:6px; font-weight:600; font-size:12px; color:#475569;">Trade Name / Brand *</label>
            <input type="text" value="WorkPilot HR" style="width:100%; padding:10px; border:1px solid #CBD5E1; border-radius:6px;" required />
          </div>
          <div class="form-group-v2">
            <label style="display:block; margin-bottom:6px; font-weight:600; font-size:12px; color:#475569;">Corporate Identification Number (CIN) *</label>
            <input type="text" value="U72900MH2022PTC384592" style="width:100%; padding:10px; border:1px solid #CBD5E1; border-radius:6px;" required />
          </div>
          <div class="form-group-v2">
            <label style="display:block; margin-bottom:6px; font-weight:600; font-size:12px; color:#475569;">Permanent Account Number (PAN) *</label>
            <input type="text" value="AABCW1234F" style="width:100%; padding:10px; border:1px solid #CBD5E1; border-radius:6px;" required />
          </div>
          <div class="form-group-v2">
            <label style="display:block; margin-bottom:6px; font-weight:600; font-size:12px; color:#475569;">Corporate Email *</label>
            <input type="email" value="contact@workpilot.hr" style="width:100%; padding:10px; border:1px solid #CBD5E1; border-radius:6px;" required />
          </div>
          <div class="form-group-v2">
            <label style="display:block; margin-bottom:6px; font-weight:600; font-size:12px; color:#475569;">Official Phone *</label>
            <input type="text" value="+91 22 6789 4321" style="width:100%; padding:10px; border:1px solid #CBD5E1; border-radius:6px;" required />
          </div>
        </div>
        <div class="form-group-v2" style="margin-bottom: 20px;">
          <label style="display:block; margin-bottom:6px; font-weight:600; font-size:12px; color:#475569;">Registered Office Address *</label>
          <textarea style="width:100%; padding:10px; border:1px solid #CBD5E1; border-radius:6px; height:80px;" required>802, Maker Chambers V, Nariman Point, Mumbai, Maharashtra - 400021</textarea>
        </div>
      </form>
    </div>
  `;
}

function saveCompanyProfile() {
  showToast('Company profile settings saved successfully.');
}

// 2. Branch Management Renderer
function renderBranch(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Branch Management</h1>
        <p>Define physical office locations, geographical limits, and branch-wise admins.</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="showToast('Add Branch feature coming soon!')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add New Branch
        </button>
      </div>
    </div>

    <!-- KPI summary row -->
    <div class="grid grid-3" style="margin-bottom:24px">
      <div class="stat-card-blue">
        <div class="grad-stat-icon">🏢</div>
        <div class="grad-stat-label">Total Branches</div>
        <div class="grad-stat-value">4 Locations</div>
        <div class="grad-stat-badge">Mumbai (HO), Pune, Bangalore, Delhi</div>
      </div>
      <div class="stat-card-green">
        <div class="grad-stat-icon">👥</div>
        <div class="grad-stat-label">Largest Branch</div>
        <div class="grad-stat-value">Mumbai Head Office</div>
        <div class="grad-stat-badge">120 active staff members</div>
      </div>
      <div class="stat-card-orange">
        <div class="grad-stat-icon">📍</div>
        <div class="grad-stat-label">Geo-fenced Locations</div>
        <div class="grad-stat-value">4 Active Fences</div>
        <div class="grad-stat-badge">150m check-in radius enabled</div>
      </div>
    </div>

    <!-- Branches List Table -->
    <div class="table-container">
      <table class="data-table table-modern">
        <thead>
          <tr>
            <th>Branch Name</th>
            <th>Type</th>
            <th>Address</th>
            <th>Employees</th>
            <th>Admin Contact</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Mumbai (HO)</strong></td>
            <td><span class="badge badge-info" style="background: rgba(37,99,235,0.1); color: #2563eb; padding: 2px 8px; border-radius: 4px; font-size:11px;">Head Office</span></td>
            <td>Nariman Point, Mumbai, MH</td>
            <td>120 Staff</td>
            <td>mumbai.admin@workpilot.hr</td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Active</span></td>
          </tr>
          <tr>
            <td><strong>Pune Branch</strong></td>
            <td><span class="badge badge-secondary" style="background: rgba(100,116,139,0.1); color: #475569; padding: 2px 8px; border-radius: 4px; font-size:11px;">Regional</span></td>
            <td>Kalyani Nagar, Pune, MH</td>
            <td>58 Staff</td>
            <td>pune.admin@workpilot.hr</td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Active</span></td>
          </tr>
          <tr>
            <td><strong>Bangalore Office</strong></td>
            <td><span class="badge badge-secondary" style="background: rgba(100,116,139,0.1); color: #475569; padding: 2px 8px; border-radius: 4px; font-size:11px;">Regional</span></td>
            <td>Indiranagar, Bangalore, KA</td>
            <td>45 Staff</td>
            <td>blr.admin@workpilot.hr</td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Active</span></td>
          </tr>
          <tr>
            <td><strong>Delhi NCR Branch</strong></td>
            <td><span class="badge badge-secondary" style="background: rgba(100,116,139,0.1); color: #475569; padding: 2px 8px; border-radius: 4px; font-size:11px;">Regional</span></td>
            <td>Sector 62, Noida, UP</td>
            <td>25 Staff</td>
            <td>delhi.admin@workpilot.hr</td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Active</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

// 3. Department Management Renderer
function renderDepartment(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Department Management</h1>
        <p>Organize employees into departments, allocate operational budgets, and assign heads.</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="showToast('Add Department feature coming soon!')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Department
        </button>
      </div>
    </div>

    <!-- KPI summary row -->
    <div class="grid grid-3" style="margin-bottom:24px">
      <div class="stat-card-blue">
        <div class="grad-stat-icon">📂</div>
        <div class="grad-stat-label">Total Departments</div>
        <div class="grad-stat-value">8 Active</div>
        <div class="grad-stat-badge">Standard core units</div>
      </div>
      <div class="stat-card-green">
        <div class="grad-stat-icon">💻</div>
        <div class="grad-stat-label">Largest Department</div>
        <div class="grad-stat-value">Engineering</div>
        <div class="grad-stat-badge">65 active developers</div>
      </div>
      <div class="stat-card-orange">
        <div class="grad-stat-icon">💰</div>
        <div class="grad-stat-label">Allocated Budget</div>
        <div class="grad-stat-value">₹45.5 Lakhs / yr</div>
        <div class="grad-stat-badge">Operational & travel budget</div>
      </div>
    </div>

    <!-- Department List Table -->
    <div class="table-container">
      <table class="data-table table-modern">
        <thead>
          <tr>
            <th>Department Code</th>
            <th>Department Name</th>
            <th>Head of Department (HoD)</th>
            <th>Total Employees</th>
            <th>Budget Allocation</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>ENG</strong></td>
            <td>Engineering & Development</td>
            <td>Smriti Sharma</td>
            <td>65 Devs</td>
            <td>₹24.0 Lakhs</td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Active</span></td>
          </tr>
          <tr>
            <td><strong>HR</strong></td>
            <td>Human Resources</td>
            <td>Yogesh Kumar</td>
            <td>12 Staff</td>
            <td>₹4.5 Lakhs</td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Active</span></td>
          </tr>
          <tr>
            <td><strong>MKT</strong></td>
            <td>Marketing & Branding</td>
            <td>Rupali Das</td>
            <td>24 Staff</td>
            <td>₹6.5 Lakhs</td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Active</span></td>
          </tr>
          <tr>
            <td><strong>FIN</strong></td>
            <td>Finance & Payroll</td>
            <td>Debraj Paul</td>
            <td>15 Staff</td>
            <td>₹3.0 Lakhs</td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Active</span></td>
          </tr>
          <tr>
            <td><strong>OPS</strong></td>
            <td>Operations</td>
            <td>Anjali Rao</td>
            <td>48 Staff</td>
            <td>₹5.0 Lakhs</td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Active</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

// 4. Machine Master Renderer
function renderMachineMaster(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Machine Master</h1>
        <p>Register biometric machines, RFID scanners, and facial recognition terminals.</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="showToast('Register Device feature coming soon!')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Register New Device
        </button>
      </div>
    </div>

    <!-- KPI summary row -->
    <div class="grid grid-3" style="margin-bottom:24px">
      <div class="stat-card-blue">
        <div class="grad-stat-icon">📟</div>
        <div class="grad-stat-label">Total Registered Devices</div>
        <div class="grad-stat-value">6 Devices</div>
        <div class="grad-stat-badge">Across 4 branch locations</div>
      </div>
      <div class="stat-card-green">
        <div class="grad-stat-icon">⚡</div>
        <div class="grad-stat-label">Online Status</div>
        <div class="grad-stat-value">All 6 Online</div>
        <div class="grad-stat-badge">Real-time sync active</div>
      </div>
      <div class="stat-card-orange">
        <div class="grad-stat-icon">🔄</div>
        <div class="grad-stat-label">Total Syncs Today</div>
        <div class="grad-stat-value">3,420 logs</div>
        <div class="grad-stat-badge">Last sync: 2 mins ago</div>
      </div>
    </div>

    <!-- Machines List Table -->
    <div class="table-container">
      <table class="data-table table-modern">
        <thead>
          <tr>
            <th>Device Name</th>
            <th>Location</th>
            <th>Type</th>
            <th>IP Address / MAC</th>
            <th>Last Active Ping</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>HO Main Entrance</strong></td>
            <td>Mumbai HO - Floor 1</td>
            <td>Facial Recognition</td>
            <td>192.168.1.50</td>
            <td>Just now</td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Online</span></td>
          </tr>
          <tr>
            <td><strong>HO Back Gate</strong></td>
            <td>Mumbai HO - Floor 1</td>
            <td>RFID Card Reader</td>
            <td>192.168.1.51</td>
            <td>1 min ago</td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Online</span></td>
          </tr>
          <tr>
            <td><strong>Pune Reception Door</strong></td>
            <td>Pune Office - Ground Floor</td>
            <td>Biometric Fingerprint</td>
            <td>10.0.1.20</td>
            <td>Just now</td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Online</span></td>
          </tr>
          <tr>
            <td><strong>Bangalore Main Door</strong></td>
            <td>Bangalore Office - Floor 2</td>
            <td>Facial Recognition</td>
            <td>10.0.2.10</td>
            <td>4 mins ago</td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Online</span></td>
          </tr>
          <tr>
            <td><strong>Warehouse Gate 1</strong></td>
            <td>Noida - Warehouse A</td>
            <td>RFID Reader</td>
            <td>192.168.3.15</td>
            <td>2 mins ago</td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Online</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

// 5. Post (Designation/Role) Renderer
function renderPost(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Designation &amp; Post</h1>
        <p>Set employee roles, designations, hierarchy grades, and structure vacancies.</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="showToast('Add Post feature coming soon!')">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Create New Post
        </button>
      </div>
    </div>

    <!-- KPI summary row -->
    <div class="grid grid-3" style="margin-bottom:24px">
      <div class="stat-card-blue">
        <div class="grad-stat-icon">🏷️</div>
        <div class="grad-stat-label">Unique Designations</div>
        <div class="grad-stat-value">18 Roles</div>
        <div class="grad-stat-badge">Across all departments</div>
      </div>
      <div class="stat-card-green">
        <div class="grad-stat-icon">🎓</div>
        <div class="grad-stat-label">Pay Grades Defined</div>
        <div class="grad-stat-value">6 Levels</div>
        <div class="grad-stat-badge">L1 (Exec) to L6 (VP)</div>
      </div>
      <div class="stat-card-orange">
        <div class="grad-stat-icon">💼</div>
        <div class="grad-stat-label">Vacant Positions</div>
        <div class="grad-stat-value">12 Openings</div>
        <div class="grad-stat-badge">Hiring pipeline active</div>
      </div>
    </div>

    <!-- Post Table -->
    <div class="table-container">
      <table class="data-table table-modern">
        <thead>
          <tr>
            <th>Designation Name</th>
            <th>Department</th>
            <th>Grade Level</th>
            <th>Occupied Posts</th>
            <th>Vacant Posts</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Software Engineer</strong></td>
            <td>Engineering</td>
            <td>L2</td>
            <td>40 positions</td>
            <td>4 open</td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Active</span></td>
          </tr>
          <tr>
            <td><strong>Senior Software Engineer</strong></td>
            <td>Engineering</td>
            <td>L3</td>
            <td>15 positions</td>
            <td>2 open</td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Active</span></td>
          </tr>
          <tr>
            <td><strong>HR Manager</strong></td>
            <td>Human Resources</td>
            <td>L4</td>
            <td>2 positions</td>
            <td>1 open</td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Active</span></td>
          </tr>
          <tr>
            <td><strong>Product Manager</strong></td>
            <td>Engineering</td>
            <td>L4</td>
            <td>5 positions</td>
            <td>1 open</td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Active</span></td>
          </tr>
          <tr>
            <td><strong>Sales Manager</strong></td>
            <td>Sales</td>
            <td>L3</td>
            <td>6 positions</td>
            <td>2 open</td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Active</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}
