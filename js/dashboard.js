/* ===== WorkPilot HR — Dashboard Module (Premium Redesign) ===== */

function renderDashboard(container) {
  const att = WP.attendance.today;
  const pendingLeavesCount = WP.leaves.pending.filter(l => l.status === 'pending').length;

  container.innerHTML = `
    <!-- HEADER TITLE -->
    <div class="dash-welcome-header" style="margin-bottom: 24px;">
      <h2 style="font-family: 'Poppins', sans-serif; font-size: 20px; font-weight: 700; color: #1E293B;">Welcome to Attendance Dashboard - HisabMitra</h2>
    </div>

    <!-- 8 KPI CARDS GRID -->
    <div class="dash-kpi-grid">
      <!-- Total Departments -->
      <div class="kpi-card">
        <div class="kpi-card-info">
          <span class="kpi-card-label">TOTAL DEPARTMENTS</span>
          <span class="kpi-card-value" data-count="3">0</span>
        </div>
        <div class="kpi-card-icon-wrap" onclick="navigate('department')" style="cursor: pointer;">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>
      
      <!-- Total Employees -->
      <div class="kpi-card">
        <div class="kpi-card-info">
          <span class="kpi-card-label">TOTAL EMPLOYEES</span>
          <span class="kpi-card-value" data-count="7">0</span>
        </div>
        <div class="kpi-card-icon-wrap" onclick="navigate('employees')" style="cursor: pointer;">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>

      <!-- Total Holidays -->
      <div class="kpi-card">
        <div class="kpi-card-info">
          <span class="kpi-card-label">TOTAL HOLIDAYS</span>
          <span class="kpi-card-value" data-count="0">0</span>
        </div>
        <div class="kpi-card-icon-wrap" onclick="navigate('hrcalendar')" style="cursor: pointer;">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>

      <!-- Paid Leaves -->
      <div class="kpi-card">
        <div class="kpi-card-info">
          <span class="kpi-card-label">PAID LEAVES</span>
          <span class="kpi-card-value" data-count="6">0</span>
        </div>
        <div class="kpi-card-icon-wrap" onclick="navigate('leave-types')" style="cursor: pointer;">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>

      <!-- On Leave Today -->
      <div class="kpi-card">
        <div class="kpi-card-info">
          <span class="kpi-card-label">ON LEAVE TODAY</span>
          <span class="kpi-card-value" data-count="0">0</span>
        </div>
        <div class="kpi-card-icon-wrap" onclick="navigate('leave-approval')" style="cursor: pointer;">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>

      <!-- Pending Leave Requests -->
      <div class="kpi-card">
        <div class="kpi-card-info">
          <span class="kpi-card-label">PENDING LEAVE REQUESTS</span>
          <span class="kpi-card-value" data-count="0">0</span>
        </div>
        <div class="kpi-card-icon-wrap" onclick="navigate('leave-approval')" style="cursor: pointer;">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>

      <!-- Total Check In Today -->
      <div class="kpi-card">
        <div class="kpi-card-info">
          <span class="kpi-card-label">TOTAL CHECK IN TODAY</span>
          <span class="kpi-card-value" data-count="0">0</span>
        </div>
        <div class="kpi-card-icon-wrap" onclick="navigate('attendance-logs')" style="cursor: pointer;">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>

      <!-- Total Check Out Today -->
      <div class="kpi-card">
        <div class="kpi-card-info">
          <span class="kpi-card-label">TOTAL CHECK OUT TODAY</span>
          <span class="kpi-card-value" data-count="0">0</span>
        </div>
        <div class="kpi-card-icon-wrap" onclick="navigate('attendance-logs')" style="cursor: pointer;">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
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
            <span class="kpi-card-value" data-count="0">0</span>
          </div>
          <div class="kpi-card-icon-wrap" onclick="navigate('projects')" style="cursor: pointer;">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>
        
        <!-- Pending Projects -->
        <div class="kpi-card project-card">
          <div class="kpi-card-info">
            <span class="kpi-card-label">PENDING PROJECTS</span>
            <span class="kpi-card-value" data-count="0">0</span>
          </div>
          <div class="kpi-card-icon-wrap" onclick="navigate('projects')" style="cursor: pointer;">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>

        <!-- On Hold Projects -->
        <div class="kpi-card project-card">
          <div class="kpi-card-info">
            <span class="kpi-card-label">ON HOLD PROJECTS</span>
            <span class="kpi-card-value" data-count="0">0</span>
          </div>
          <div class="kpi-card-icon-wrap" onclick="navigate('projects')" style="cursor: pointer;">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>

        <!-- In Progress Projects -->
        <div class="kpi-card project-card">
          <div class="kpi-card-info">
            <span class="kpi-card-label">IN PROGRESS PROJECTS</span>
            <span class="kpi-card-value" data-count="0">0</span>
          </div>
          <div class="kpi-card-icon-wrap" onclick="navigate('projects')" style="cursor: pointer;">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>

        <!-- Finished Projects -->
        <div class="kpi-card project-card">
          <div class="kpi-card-info">
            <span class="kpi-card-label">FINISHED PROJECTS</span>
            <span class="kpi-card-value" data-count="0">0</span>
          </div>
          <div class="kpi-card-icon-wrap" onclick="navigate('projects')" style="cursor: pointer;">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>

        <!-- Cancelled Projects -->
        <div class="kpi-card project-card">
          <div class="kpi-card-info">
            <span class="kpi-card-label">CANCELLED PROJECTS</span>
            <span class="kpi-card-value" data-count="0">0</span>
          </div>
          <div class="kpi-card-icon-wrap" onclick="navigate('projects')" style="cursor: pointer;">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
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
          <a href="#" onclick="navigate('clients')" class="view-all-link" style="font-size: 12px; font-weight: 700; color: #0F2D6B; text-decoration: none;">View All Clients</a>
        </div>
        <div class="panel-card-body">
          <table class="dash-simple-table" style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
            <thead>
              <tr style="border-bottom: 1px solid #F1F5F9; color: #94A3B8; font-weight: 600; text-transform: uppercase;">
                <th style="padding: 10px 0;">Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th style="text-align: right;">Project</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="4" style="text-align: center; color: #94A3B8; padding: 36px 0; font-weight: 600;">No records found!</td>
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
          <div class="chart-wrap-v2" style="height: 250px; position: relative;">
            <canvas id="dashTasksDetailChart"></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- RECENT PROJECTS SECTION -->
    <div class="bottom-panel-card" style="margin-top: 30px; background: white; border-radius: 16px; border: 1px solid #E2E8F0; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.03);">
      <div class="panel-card-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid #F1F5F9; padding-bottom: 12px;">
        <span style="font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">RECENT PROJECTS</span>
        <a href="#" onclick="navigate('projects')" class="view-all-link" style="font-size: 12px; font-weight: 700; color: #0F2D6B; text-decoration: none;">View All Projects</a>
      </div>
      <div class="panel-card-body">
        <table class="dash-simple-table" style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
          <thead>
            <tr style="border-bottom: 1px solid #F1F5F9; color: #94A3B8; font-weight: 600; text-transform: uppercase;">
              <th style="padding: 10px 0;">Title</th>
              <th>Clients</th>
              <th>Deadline</th>
              <th>Users</th>
              <th>Completion</th>
              <th style="text-align: right;">Priority</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="6" style="text-align: center; color: #94A3B8; padding: 36px 0; font-weight: 600;">No records found!</td>
            </tr>
          </tbody>
        </table>
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
      labels: ['Pending', 'On Hold', 'In progress', 'Completed', 'Cancelled'],
      datasets: [{
        label: 'Projects',
        data: [0, 0, 0, 0, 0],
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
          max: 1.0,
          grid: { color: 'rgba(226, 232, 240, 0.5)', drawBorder: false },
          ticks: { font: { family: 'Inter', size: 11 }, color: '#94A3B8', stepSize: 0.1 }
        }
      }
    }
  });

  const tCtx = document.getElementById('dashTasksDetailChart');
  if (!tCtx) return;
  
  const existingTasksChart = Chart.getChart(tCtx);
  if (existingTasksChart) {
    existingTasksChart.destroy();
  }

  new Chart(tCtx, {
    type: 'doughnut',
    data: {
      labels: ['Pending', 'On Hold', 'In progress', 'Completed', 'Cancelled'],
      datasets: [{
        data: [0, 0, 0, 1, 0], // Draw solid completed green ring to match screenshot
        backgroundColor: ['#3B82F6', '#EF4444', '#6366F1', '#10B981', '#F59E0B'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            padding: 15,
            font: { family: 'Inter', size: 11, weight: 600 },
            color: '#64748B'
          }
        }
      },
      cutout: '75%'
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
