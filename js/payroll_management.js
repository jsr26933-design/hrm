/* ===== WorkPilot HR — Payroll Management Module ===== */

// 1. Payroll Settings Renderer
function renderPayrollSettings(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Payroll Settings</h1>
        <p>Configure statutory rates, Standard Working Days, and monthly payroll calculation cycles.</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="showToast('Payroll configurations saved!','success')">
          Save Settings
        </button>
      </div>
    </div>

    <div class="grid grid-2" style="gap:20px; margin-bottom:24px;">
      <!-- Statutory configurations -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Statutory Contribution Rates</div>
        </div>
        <div class="card-body">
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div>
              <label style="font-size:13px; font-weight:600; color:var(--gray-700); display:block; margin-bottom:6px;">Provident Fund (PF) Employee Share (%)</label>
              <input type="text" class="form-control" value="12.00" style="height:38px; width:100%;"/>
            </div>
            <div>
              <label style="font-size:13px; font-weight:600; color:var(--gray-700); display:block; margin-bottom:6px;">Provident Fund (PF) Employer Share (%)</label>
              <input type="text" class="form-control" value="12.00" style="height:38px; width:100%;"/>
            </div>
            <div>
              <label style="font-size:13px; font-weight:600; color:var(--gray-700); display:block; margin-bottom:6px;">Employee State Insurance (ESI) Rate (%)</label>
              <input type="text" class="form-control" value="0.75" style="height:38px; width:100%;"/>
            </div>
          </div>
        </div>
      </div>

      <!-- Calculation rules -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Standard Payroll Rules</div>
        </div>
        <div class="card-body">
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div>
              <label style="font-size:13px; font-weight:600; color:var(--gray-700); display:block; margin-bottom:6px;">Standard Working Days in Month</label>
              <input type="number" class="form-control" value="26" style="height:38px; width:100%;"/>
            </div>
            <div>
              <label style="font-size:13px; font-weight:600; color:var(--gray-700); display:block; margin-bottom:6px;">Overtime (OT) Multiplier</label>
              <input type="text" class="form-control" value="1.25" style="height:38px; width:100%;"/>
            </div>
            <div>
              <label style="font-size:13px; font-weight:600; color:var(--gray-700); display:block; margin-bottom:6px;">Salary Disbursal Date</label>
              <input type="number" class="form-control" value="5" style="height:38px; width:100%;"/>
              <span style="font-size:11px; color:var(--gray-400); margin-top:4px; display:block;">Default day of the following month.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 2. Advance Salary Requests Renderer
function renderAdvanceSalary(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Advance Salary Requests</h1>
        <p>Review and audit short-term advance salary loans requested by employees.</p>
      </div>
    </div>

    <!-- Stats row -->
    <div class="grid grid-3" style="margin-bottom:24px">
      <div class="stat-card-blue">
        <div class="grad-stat-icon">💸</div>
        <div class="grad-stat-label">Total Outstandings</div>
        <div class="grad-stat-value">₹1,25,000</div>
        <div class="grad-stat-badge">8 Loans active</div>
      </div>
      <div class="stat-card-green">
        <div class="grad-stat-icon">📅</div>
        <div class="grad-stat-label">Recovered This Month</div>
        <div class="grad-stat-value">₹32,500</div>
        <div class="grad-stat-badge">Auto salary deduction</div>
      </div>
      <div class="stat-card-orange">
        <div class="grad-stat-icon">⚠️</div>
        <div class="grad-stat-label">Pending Requests</div>
        <div class="grad-stat-value">2 Requests</div>
        <div class="grad-stat-badge">Awaiting HR approval</div>
      </div>
    </div>

    <!-- Advances Table -->
    <div class="table-container">
      <table class="data-table table-modern">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Requested Amount</th>
            <th>Repayment Period</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Amit Singh</strong></td>
            <td>₹25,000</td>
            <td>5 Months (₹5,000/mo)</td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Active</span></td>
            <td><button class="btn btn-secondary btn-sm" onclick="showToast('Advance loan details loaded')">Details</button></td>
          </tr>
          <tr>
            <td><strong>Rahul Verma</strong></td>
            <td>₹15,000</td>
            <td>3 Months (₹5,000/mo)</td>
            <td><span class="badge badge-warning" style="background: rgba(245,158,11,0.1); color: #d97706; padding: 2px 8px; border-radius: 4px; font-size:11px;">Pending Approval</span></td>
            <td>
              <button class="btn btn-secondary btn-sm" onclick="showToast('Request Approved','success')">Approve</button>
              <button class="btn btn-danger btn-sm" style="padding:4px 8px; font-size:11px; background:#ef4444; color:white; border:none;" onclick="showToast('Request Rejected')">Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

// 3. Employee Salary Configurations Renderer
function renderEmployeeSalary(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Employee Salary structures</h1>
        <p>Set basic pay scales, allowances, and statutory parameters by employee profile.</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="showToast('Salary structures updated!','success')">
          + Add Salary Structure
        </button>
      </div>
    </div>

    <!-- Salary Profiles Table -->
    <div class="table-container">
      <table class="data-table table-modern">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Designation</th>
            <th>Monthly Basic Pay</th>
            <th>HRA Allowance</th>
            <th>Special Allowance</th>
            <th>Actions</th>
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
            <td>Super Admin</td>
            <td><strong>₹75,000</strong></td>
            <td>₹30,000</td>
            <td>₹15,000</td>
            <td><button class="btn btn-secondary btn-sm" onclick="showToast('Editing Arjun Kumar pay structure')">Edit Pay</button></td>
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
            <td>HR Manager</td>
            <td><strong>₹60,000</strong></td>
            <td>₹24,000</td>
            <td>₹10,000</td>
            <td><button class="btn btn-secondary btn-sm" onclick="showToast('Editing Smriti Sharma pay structure')">Edit Pay</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

// 4. Tax and TDS Reports Renderer
function renderTaxReport(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Tax & TDS Audits</h1>
        <p>Generate monthly TDS summaries, form 16 declarations, and professional tax reports.</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-secondary" onclick="showToast('Downloading Quarterly TDS return report...')">
          📥 Quarterly Return
        </button>
      </div>
    </div>

    <div class="grid grid-3" style="margin-bottom:24px;">
      <div class="stat-card">
        <div class="stat-icon blue">💼</div>
        <div class="stat-body">
          <div class="stat-label">Total TDS Deducted</div>
          <div class="stat-value">₹1,84,500</div>
          <div class="stat-change"><span>TDS current quarter</span></div>
        </div>
      </div>
      <div class="stat-card success">
        <div class="stat-icon green">📊</div>
        <div class="stat-body">
          <div class="stat-label">TDS Filings Status</div>
          <div class="stat-value">On Schedule</div>
          <div class="stat-change up"><span>Q1 returns filed</span></div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange">🏛️</div>
        <div class="stat-body">
          <div class="stat-label">Professional Tax</div>
          <div class="stat-value">₹4,800</div>
          <div class="stat-change"><span>Monthly state compliance</span></div>
        </div>
      </div>
    </div>

    <!-- Tax Files -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">Tax Documents Downloads</div>
      </div>
      <div class="card-body">
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f1f5f9; padding-bottom:8px;">
            <span>Form 24Q (E-TDS Return Draft) — Q1 2026</span>
            <button class="btn btn-secondary btn-sm" onclick="showToast('Downloading Form 24Q E-TDS Return Draft...')">Download</button>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f1f5f9; padding-bottom:8px;">
            <span>Monthly TDS Liability Excel Sheet — May 2026</span>
            <button class="btn btn-secondary btn-sm" onclick="showToast('Downloading Monthly TDS Liability Excel Sheet...')">Download</button>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f1f5f9; padding-bottom:8px;">
            <span>State Professional Tax Challan PDF — May 2026</span>
            <button class="btn btn-secondary btn-sm" onclick="showToast('Downloading PT Challan PDF...')">Download</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 5. TADA (Travel and Daily Allowance) Expense Claims Renderer
function renderTada(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>TA/DA Expense Reimbursements</h1>
        <p>Audit and approve employee claims for Travel Allowance (TA) and Daily Allowance (DA).</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="showToast('Submit Expense claim feature coming soon!')">
          + Submit Expense Claim
        </button>
      </div>
    </div>

    <!-- KPIs -->
    <div class="grid grid-3" style="margin-bottom:24px">
      <div class="stat-card-blue">
        <div class="grad-stat-icon">🚗</div>
        <div class="grad-stat-label">Total Claims Approved</div>
        <div class="grad-stat-value">₹24,800</div>
        <div class="grad-stat-badge">Reimbursement this month</div>
      </div>
      <div class="stat-card-green">
        <div class="grad-stat-icon">💰</div>
        <div class="grad-stat-label">Pending Claim Amount</div>
        <div class="grad-stat-value">₹12,450</div>
        <div class="grad-stat-badge">Awaiting verification</div>
      </div>
      <div class="stat-card-orange">
        <div class="grad-stat-icon">🛡️</div>
        <div class="grad-stat-label">Monthly Budget Cap</div>
        <div class="grad-stat-value">31% used</div>
        <div class="grad-stat-badge">₹50,000 threshold limit</div>
      </div>
    </div>

    <!-- TADA list -->
    <div class="table-container">
      <table class="data-table table-modern">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Expense Date</th>
            <th>Allowance Type</th>
            <th>Amount Claimed</th>
            <th>Details / Bill</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Arjun Kumar</strong></td>
            <td>12 Jun 2026</td>
            <td>Travel Allowance (TA)</td>
            <td><strong>₹1,850</strong></td>
            <td>Mumbai to Pune Client site visit fuel receipts</td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size:11px;">Approved</span></td>
            <td><button class="btn btn-secondary btn-sm" onclick="showToast('Viewing receipt PDF...')">View Bill</button></td>
          </tr>
          <tr>
            <td><strong>Amit Singh</strong></td>
            <td>11 Jun 2026</td>
            <td>Daily Allowance (DA)</td>
            <td><strong>₹900</strong></td>
            <td>Field tracking client site site meals daily allowance</td>
            <td><span class="badge badge-warning" style="background: rgba(245,158,11,0.1); color: #d97706; padding: 2px 8px; border-radius: 4px; font-size:11px;">Pending</span></td>
            <td>
              <button class="btn btn-secondary btn-sm" onclick="showToast('Claim Approved','success')">Approve</button>
              <button class="btn btn-danger btn-sm" style="padding:4px 8px; font-size:11px; background:#ef4444; color:white; border:none;" onclick="showToast('Claim Rejected')">Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}
