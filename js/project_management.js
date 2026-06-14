/* ===== WorkPilot HR — Project & Client Management Module ===== */

// 1. Projects List Page Renderer
function renderProjects(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Project Directory</h1>
        <p>Monitor project lifecycles, assign project managers, and track task completions.</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="showToast('Create Project feature coming soon!')">
          + Create Project
        </button>
      </div>
    </div>

    <!-- Project KPIs -->
    <div class="grid grid-4" style="margin-bottom:24px">
      <div class="stat-card">
        <div class="stat-icon blue">📁</div>
        <div class="stat-body">
          <div class="stat-label">Total Projects</div>
          <div class="stat-value">12 Projects</div>
          <div class="stat-change"><span>Active contracts</span></div>
        </div>
      </div>
      <div class="stat-card success">
        <div class="stat-icon green">🚀</div>
        <div class="stat-body">
          <div class="stat-label">On Track</div>
          <div class="stat-value">9 Projects</div>
          <div class="stat-change up"><span>75% delivery rate</span></div>
        </div>
      </div>
      <div class="stat-card warning">
        <div class="stat-icon yellow">⚠️</div>
        <div class="stat-body">
          <div class="stat-label">At Risk</div>
          <div class="stat-value">2 Projects</div>
          <div class="stat-change down"><span>Missing milestone deadlines</span></div>
        </div>
      </div>
      <div class="stat-card danger">
        <div class="stat-icon red">🛑</div>
        <div class="stat-body">
          <div class="stat-label">Delayed</div>
          <div class="stat-value">1 Project</div>
          <div class="stat-change"><span>Requires review</span></div>
        </div>
      </div>
    </div>

    <!-- Projects List Table -->
    <div class="table-container">
      <table class="data-table table-modern">
        <thead>
          <tr>
            <th>Project Details</th>
            <th>Project Manager</th>
            <th>Timeline</th>
            <th>Team Size</th>
            <th>Tasks Progress</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div><strong>ERP Implementation</strong></div>
              <div style="font-size:11px; color:var(--gray-400)">Client: Acme Corp</div>
            </td>
            <td><strong>Smriti Sharma</strong></td>
            <td>15 May - 30 Sep 2026</td>
            <td><span class="badge" style="background:#f1f5f9; color:#475569; padding: 2px 8px; border-radius: 4px; font-size: 11px;">8 Members</span></td>
            <td>
              <div style="display:flex; align-items:center; gap:8px;">
                <div style="height:6px; background:#f1f5f9; border-radius:3px; flex:1; overflow:hidden;">
                  <div style="height:100%; width:65%; background:#10B981; border-radius:3px;"></div>
                </div>
                <span style="font-size:11px; font-weight:600; color:var(--gray-600)">65%</span>
              </div>
            </td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size: 11px;">Active</span></td>
          </tr>
          <tr>
            <td>
              <div><strong>Website Redesign</strong></div>
              <div style="font-size:11px; color:var(--gray-400)">Client: Tech Innovations</div>
            </td>
            <td><strong>Yogesh Kumar</strong></td>
            <td>01 Jun - 31 Jul 2026</td>
            <td><span class="badge" style="background:#f1f5f9; color:#475569; padding: 2px 8px; border-radius: 4px; font-size: 11px;">4 Members</span></td>
            <td>
              <div style="display:flex; align-items:center; gap:8px;">
                <div style="height:6px; background:#f1f5f9; border-radius:3px; flex:1; overflow:hidden;">
                  <div style="height:100%; width:30%; background:#3B82F6; border-radius:3px;"></div>
                </div>
                <span style="font-size:11px; font-weight:600; color:var(--gray-600)">30%</span>
              </div>
            </td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size: 11px;">Active</span></td>
          </tr>
          <tr>
            <td>
              <div><strong>Payroll Integration API</strong></div>
              <div style="font-size:11px; color:var(--gray-400)">Client: Global Logistics</div>
            </td>
            <td><strong>Arjun Kumar</strong></td>
            <td>10 Apr - 15 Jun 2026</td>
            <td><span class="badge" style="background:#f1f5f9; color:#475569; padding: 2px 8px; border-radius: 4px; font-size: 11px;">3 Members</span></td>
            <td>
              <div style="display:flex; align-items:center; gap:8px;">
                <div style="height:6px; background:#f1f5f9; border-radius:3px; flex:1; overflow:hidden;">
                  <div style="height:100%; width:95%; background:#10B981; border-radius:3px;"></div>
                </div>
                <span style="font-size:11px; font-weight:600; color:var(--gray-600)">95%</span>
              </div>
            </td>
            <td><span class="badge badge-warning" style="background: rgba(245,158,11,0.1); color: #d97706; padding: 2px 8px; border-radius: 4px; font-size: 11px;">At Risk</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

// 2. Clients List Page Renderer
function renderClients(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Client Management</h1>
        <p>Maintain corporate client accounts, billing information, and active agreements.</p>
      </div>
      <div class="page-header-right">
        <button class="btn btn-primary" onclick="showToast('Add Client feature coming soon!')">
          + Add Client
        </button>
      </div>
    </div>

    <!-- Client KPIs -->
    <div class="grid grid-3" style="margin-bottom:24px">
      <div class="stat-card-blue">
        <div class="grad-stat-icon">🤝</div>
        <div class="grad-stat-label">Active Clients</div>
        <div class="grad-stat-value">18 Accounts</div>
        <div class="grad-stat-badge">Corporate partners</div>
      </div>
      <div class="stat-card-green">
        <div class="grad-stat-icon">📈</div>
        <div class="grad-stat-label">Annual Contract Value</div>
        <div class="grad-stat-value">₹45.6 Lakhs</div>
        <div class="grad-stat-badge">Total billing portfolio</div>
      </div>
      <div class="stat-card-orange">
        <div class="grad-stat-icon">🎯</div>
        <div class="grad-stat-label">Satisfied Clients</div>
        <div class="grad-stat-value">100% Score</div>
        <div class="grad-stat-badge">Zero escalations reported</div>
      </div>
    </div>

    <!-- Clients List Table -->
    <div class="table-container">
      <table class="data-table table-modern">
        <thead>
          <tr>
            <th>Client Organization</th>
            <th>Primary Contact</th>
            <th>Contact Email</th>
            <th>Active Projects</th>
            <th>Contract Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Acme Corp</strong></td>
            <td>John Doe</td>
            <td>john@acme.com</td>
            <td><span class="badge" style="background:#f1f5f9; color:#475569; padding: 2px 8px; border-radius: 4px; font-size: 11px;">2 Projects</span></td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size: 11px;">Active Contract</span></td>
          </tr>
          <tr>
            <td><strong>Tech Innovations</strong></td>
            <td>Jane Smith</td>
            <td>jane@techin.com</td>
            <td><span class="badge" style="background:#f1f5f9; color:#475569; padding: 2px 8px; border-radius: 4px; font-size: 11px;">1 Project</span></td>
            <td><span class="badge badge-success" style="background: rgba(16,185,129,0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size: 11px;">Active Contract</span></td>
          </tr>
          <tr>
            <td><strong>Global Logistics</strong></td>
            <td>Robert Brown</td>
            <td>robert@globallog.com</td>
            <td><span class="badge" style="background:#f1f5f9; color:#475569; padding: 2px 8px; border-radius: 4px; font-size: 11px;">1 Project</span></td>
            <td><span class="badge badge-warning" style="background: rgba(245,158,11,0.1); color: #d97706; padding: 2px 8px; border-radius: 4px; font-size: 11px;">Under Review</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}
