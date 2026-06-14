/* ===== WorkPilot HR — Dashboard Module (Premium Redesign) ===== */

function renderDashboard(container) {
  const att = WP.attendance.today;
  const pendingLeavesCount = WP.leaves.pending.filter(l => l.status === 'pending').length;

  container.innerHTML = `
    <!-- HEADER TITLE -->
    <div class="dash-welcome-header" style="margin-bottom: 24px;">
      <h2 style="font-family: 'Poppins', sans-serif; font-size: 20px; font-weight: 700; color: #1E293B;">Welcome to Attendance Dashboard : WorkPilot HRM</h2>
    </div>

    <!-- 8 KPI CARDS GRID -->
    <div class="dash-kpi-grid">
      <!-- Total Departments -->
      <div class="kpi-card">
        <div class="kpi-card-info">
          <span class="kpi-card-label">TOTAL DEPARTMENTS</span>
          <span class="kpi-card-value" data-count="3">0</span>
        </div>
        <div class="kpi-card-icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
        </div>
      </div>
      
      <!-- Total Employees -->
      <div class="kpi-card">
        <div class="kpi-card-info">
          <span class="kpi-card-label">TOTAL EMPLOYEES</span>
          <span class="kpi-card-value" data-count="7">0</span>
        </div>
        <div class="kpi-card-icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
      </div>

      <!-- Total Holidays -->
      <div class="kpi-card">
        <div class="kpi-card-info">
          <span class="kpi-card-label">TOTAL HOLIDAYS</span>
          <span class="kpi-card-value" data-count="0">0</span>
        </div>
        <div class="kpi-card-icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12V21M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9z"/></svg>
        </div>
      </div>

      <!-- Paid Leaves -->
      <div class="kpi-card">
        <div class="kpi-card-info">
          <span class="kpi-card-label">PAID LEAVES</span>
          <span class="kpi-card-value" data-count="6">0</span>
        </div>
        <div class="kpi-card-icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        </div>
      </div>

      <!-- On Leave Today -->
      <div class="kpi-card">
        <div class="kpi-card-info">
          <span class="kpi-card-label">ON LEAVE TODAY</span>
          <span class="kpi-card-value" data-count="0">0</span>
        </div>
        <div class="kpi-card-icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/></svg>
        </div>
      </div>

      <!-- Pending Leave Requests -->
      <div class="kpi-card">
        <div class="kpi-card-info">
          <span class="kpi-card-label">PENDING LEAVE REQUESTS</span>
          <span class="kpi-card-value" data-count="0">0</span>
        </div>
        <div class="kpi-card-icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
      </div>

      <!-- Total Check In Today -->
      <div class="kpi-card">
        <div class="kpi-card-info">
          <span class="kpi-card-label">TOTAL CHECK IN TODAY</span>
          <span class="kpi-card-value" data-count="0">0</span>
        </div>
        <div class="kpi-card-icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/></svg>
        </div>
      </div>

      <!-- Total Check Out Today -->
      <div class="kpi-card">
        <div class="kpi-card-info">
          <span class="kpi-card-label">TOTAL CHECK OUT TODAY</span>
          <span class="kpi-card-value" data-count="0">0</span>
        </div>
        <div class="kpi-card-icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M19.8 12H9"/></svg>
        </div>
      </div>
    </div>

    <!-- PROJECT MANAGEMENT SECTION -->
    <div class="dash-section-title" style="font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 700; color: #1E293B; margin: 30px 0 16px 0; border-bottom: 2px solid #E2E8F0; padding-bottom: 8px;">Project Management</div>
    
    <div class="project-manage-split" style="display: flex; gap: 24px; margin-bottom: 30px;">
      <!-- Left: Chart Details -->
      <div class="chart-panel-left" style="flex: 1.5; background: white; border-radius: 16px; border: 1px solid #E2E8F0; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.03);">
        <div class="chart-panel-header" style="font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 800; color: #475569; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px;">PROJECTS DETAIL</div>
        <div class="chart-wrap-v2" style="height: 250px; position: relative;">
          <canvas id="dashProjectsDetailChart"></canvas>
        </div>
      </div>
      
      <!-- Right: 6 KPI Cards Grid -->
      <div class="project-kpi-grid" style="flex: 1; display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
        <!-- Total Projects -->
        <div class="kpi-card project-card">
          <div class="kpi-card-info">
            <span class="kpi-card-label">TOTAL PROJECTS</span>
            <span class="kpi-card-value" data-count="12">0</span>
          </div>
          <div class="kpi-card-icon-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          </div>
        </div>
        
        <!-- Pending Projects -->
        <div class="kpi-card project-card">
          <div class="kpi-card-info">
            <span class="kpi-card-label">PENDING PROJECTS</span>
            <span class="kpi-card-value" data-count="4">0</span>
          </div>
          <div class="kpi-card-icon-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
        </div>

        <!-- On Hold Projects -->
        <div class="kpi-card project-card">
          <div class="kpi-card-info">
            <span class="kpi-card-label">ON HOLD PROJECTS</span>
            <span class="kpi-card-value" data-count="2">0</span>
          </div>
          <div class="kpi-card-icon-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="10" y1="15" x2="10" y2="9"/><line x1="14" y1="15" x2="14" y2="9"/></svg>
          </div>
        </div>

        <!-- In Progress Projects -->
        <div class="kpi-card project-card">
          <div class="kpi-card-info">
            <span class="kpi-card-label">IN PROGRESS PROJECTS</span>
            <span class="kpi-card-value" data-count="6">0</span>
          </div>
          <div class="kpi-card-icon-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
          </div>
        </div>

        <!-- Finished Projects -->
        <div class="kpi-card project-card">
          <div class="kpi-card-info">
            <span class="kpi-card-label">FINISHED PROJECTS</span>
            <span class="kpi-card-value" data-count="10">0</span>
          </div>
          <div class="kpi-card-icon-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="22 4 12 14.01 9 11.01"/><path d="M2 12A10 10 0 0 1 18 3.55"/></svg>
          </div>
        </div>

        <!-- Cancelled Projects -->
        <div class="kpi-card project-card">
          <div class="kpi-card-info">
            <span class="kpi-card-label">CANCELLED PROJECTS</span>
            <span class="kpi-card-value" data-count="1">0</span>
          </div>
          <div class="kpi-card-icon-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          </div>
        </div>
      </div>
    </div>

    <!-- BOTTOM ROW SECTION -->
    <div class="bottom-manage-split" style="display: flex; gap: 24px; margin-top: 30px;">
      <!-- Left: Top Clients Table -->
      <div class="bottom-panel-card" style="flex: 1.5; background: white; border-radius: 16px; border: 1px solid #E2E8F0; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.03);">
        <div class="panel-card-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid #F1F5F9; padding-bottom: 12px;">
          <span style="font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">TOP CLIENTS</span>
          <a href="#" onclick="showToast('Loading clients database...', 'info')" class="view-all-link" style="font-size: 12px; font-weight: 700; color: #0F2D6B; text-decoration: none;">View All Clients</a>
        </div>
        <div class="panel-card-body">
          <table class="dash-simple-table" style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13.5px;">
            <thead>
              <tr style="border-bottom: 1px solid #F1F5F9; color: #94A3B8; font-weight: 600;">
                <th style="padding: 10px 0;">Client Name</th>
                <th>Industry</th>
                <th>Projects</th>
                <th style="text-align: right;">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #F8FAFC;">
                <td style="padding: 12px 0; color: #1E293B;"><strong>Acme Corporation</strong></td>
                <td style="color: #475569;">Technology</td>
                <td style="color: #475569;">3 Active</td>
                <td style="text-align: right;"><span class="badge-v2 success" style="background: #ECFDF5; color: #10B981; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: 700;">Active</span></td>
              </tr>
              <tr style="border-bottom: 1px solid #F8FAFC;">
                <td style="padding: 12px 0; color: #1E293B;"><strong>Globex Industries</strong></td>
                <td style="color: #475569;">Logistics</td>
                <td style="color: #475569;">2 Active</td>
                <td style="text-align: right;"><span class="badge-v2 success" style="background: #ECFDF5; color: #10B981; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: 700;">Active</span></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #1E293B;"><strong>Initech LLC</strong></td>
                <td style="color: #475569;">Finance</td>
                <td style="color: #475569;">1 Active</td>
                <td style="text-align: right;"><span class="badge-v2 warning" style="background: #FFFBEB; color: #F59E0B; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: 700;">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right: Task Details List -->
      <div class="bottom-panel-card" style="flex: 1; background: white; border-radius: 16px; border: 1px solid #E2E8F0; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.03);">
        <div class="panel-card-header" style="margin-bottom: 16px; border-bottom: 1px solid #F1F5F9; padding-bottom: 12px;">
          <span style="font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">TASK DETAILS</span>
        </div>
        <div class="panel-card-body">
          <div class="dash-task-list" style="display: flex; flex-direction: column; gap: 12px;">
            <div class="dash-task-item" style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: #F8FAFC; border-radius: 12px; font-size: 13px;">
              <span class="task-prio priority-high" style="background: #FEF2F2; color: #EF4444; padding: 2px 8px; border-radius: 10px; font-size: 10.5px; font-weight: 700;">Urgent</span>
              <span class="task-name" style="flex: 1; margin: 0 12px; font-weight: 600; color: #334155; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Complete Q3 Appraisals</span>
              <span class="task-date" style="color: #94A3B8; font-size: 11.5px; font-weight: 500;">Jun 20</span>
            </div>
            <div class="dash-task-item" style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: #F8FAFC; border-radius: 12px; font-size: 13px;">
              <span class="task-prio priority-medium" style="background: #EFF6FF; color: #2563EB; padding: 2px 8px; border-radius: 10px; font-size: 10.5px; font-weight: 700;">Medium</span>
              <span class="task-name" style="flex: 1; margin: 0 12px; font-weight: 600; color: #334155; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Process June Payroll</span>
              <span class="task-date" style="color: #94A3B8; font-size: 11.5px; font-weight: 500;">Jun 28</span>
            </div>
            <div class="dash-task-item" style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: #F8FAFC; border-radius: 12px; font-size: 13px;">
              <span class="task-prio priority-low" style="background: #F1F5F9; color: #64748B; padding: 2px 8px; border-radius: 10px; font-size: 10.5px; font-weight: 700;">Low</span>
              <span class="task-name" style="flex: 1; margin: 0 12px; font-weight: 600; color: #334155; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Review Attendance Policy</span>
              <span class="task-date" style="color: #94A3B8; font-size: 11.5px; font-weight: 500;">Jun 30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    initDashboardCharts();
    animateCounters();
  }, 120);
}

function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    if (isNaN(target)) return;
    if (target === 0) {
      el.textContent = "0";
      return;
    }
    let cur = 0;
    const step = Math.ceil(target / 30) || 1;
    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      el.textContent = cur;
      if (cur >= target) clearInterval(t);
    }, 30);
  });
}

function initDashboardCharts() {
  const pCtx = document.getElementById('dashProjectsDetailChart');
  if (!pCtx) return;
  
  // Clear any existing chart instance to prevent canvas reusable errors
  const existingChart = Chart.getChart(pCtx);
  if (existingChart) {
    existingChart.destroy();
  }

  new Chart(pCtx, {
    type: 'bar',
    data: {
      labels: ['Pending', 'On Hold', 'In Progress', 'Completed', 'Cancelled'],
      datasets: [{
        label: 'Projects',
        data: [4, 2, 6, 10, 1],
        backgroundColor: 'rgba(16, 185, 129, 0.85)',
        borderColor: '#10B981',
        borderWidth: 1.5,
        borderRadius: 6,
        maxBarThickness: 32
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Inter', size: 10, weight: 600 }, color: '#64748B' }
        },
        y: {
          min: 0,
          max: 12,
          grid: { color: 'rgba(226, 232, 240, 0.5)', drawBorder: false },
          ticks: { font: { family: 'Inter', size: 11 }, color: '#94A3B8', stepSize: 2 }
        }
      }
    }
  });
}

// Keep helper approvals functions intact for application logic
function approveLeave(id, btn) {
  const row = btn.closest('[style*="display:flex"]');
  if (row) { row.style.opacity='0.4'; row.style.transition='opacity .3s'; setTimeout(()=>row.remove(), 300); }
  showToast('Leave approved!', 'success');
}

function rejectLeave(id, btn) {
  const row = btn.closest('[style*="display:flex"]');
  if (row) { row.style.opacity='0.4'; row.style.transition='opacity .3s'; setTimeout(()=>row.remove(), 300); }
  showToast('Leave rejected.', 'error');
}
